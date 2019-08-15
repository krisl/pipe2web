const http = require('http')
const SSE = require('sse')

const PORT = 3000
const EVENT_TYPE = undefined

const server = http
  .createServer((req, res) => {
    console.log('server handles')
  })
  .listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
    const sse = new SSE(server, {path: '/events'})
    sse.on('connection', (client) => {
      console.log('connected!')
      let id = 1
      setInterval(() => {
        client.send(EVENT_TYPE, JSON.stringify({info: 'blah', x: 2}), id++)
      }, 3000)
    })
  })


