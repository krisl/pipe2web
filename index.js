const http = require('http')

const PORT = 3000

http
  .createServer((req, res) => {
    console.log(`Request url ${req.url}`)
    req.on('close', () => {
      if (!res.finished) {
        res.end()
        console.log(`Closing`)
      }
    })
  })
  .listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })


