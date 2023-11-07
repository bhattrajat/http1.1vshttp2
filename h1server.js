const http = require('http');
const fs = require('fs');
const server = http.createServer();

server.on('error', (err) => console.error(err));

server.on('request', (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream('http1.html').pipe(res);
  } else if (req.url.startsWith('/images')) {
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    fs.createReadStream(`.${req.url}`).pipe(res);
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000, 'localhost');
