const http = require('http')
const SSE = require('sse')

const PORT = process.env.PORT || 3000
const EVENT_TYPE = undefined

const lines = process.stdin.pipe(require('split2')())
const server = http
  .createServer((req, res) => {
    console.log('server handles')
  })
  .listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
    const sse = new SSE(server, {path: '/events', headers: { 'Access-Control-Allow-Origin': '*', 'Content-Length': ''}})
    sse.on('connection', (client) => {
      console.log('connected!')
      var id = 1
      lines.on('data', line => {
        console.log({line})
        client.send(EVENT_TYPE, line, id++)
      })
    })
  })

//function processLine (line) {
//  console.log({line: line.toString()})
//}
//
//lines.on('data', processLine)
//process.stdin.on('data', processLine)
