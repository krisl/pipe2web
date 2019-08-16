const http = require('http')
const SSE = require('sse')

const PORT = 3000
const EVENT_TYPE = undefined

const lines = process.stdin.pipe(require('split2')())
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
      lines.on('data', line => {
        client.send(EVENT_TYPE, line, id++)
      })
    })
  })

//function processLine (line) {
//  console.log({line: line.toString()})
//}
//
//process.stdin.pipe(require('split2')()).on('data', processLine)
//process.stdin.on('data', processLine)
