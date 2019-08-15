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
    res.writeHead(200, {
      "Connection": "keep-alive",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache"
    })
    res.write("\n")

    setInterval(() => {
      res.write(`data: ${JSON.stringify({info: 'blah', x: 2})}`)
      res.write("\n\n")
    }, 3000)
  })
  .listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })


