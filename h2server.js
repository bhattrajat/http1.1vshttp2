const http2 = require('http2');

const fs = require('node:fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem'),
});

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  if (headers[':path'] === '/') {
    stream.respond({
      'content-type': 'text/html; charset=utf-8',
      ':status': 200,
    });
    fs.createReadStream('http2.html').pipe(stream);
  } else if (headers[':path'].startsWith('/images')) {
    stream.respond({
      ':status': 200,
      'content-type': 'image/jpg',
    });
    fs.createReadStream(`.${headers[':path']}`).pipe(stream);
  } else {
    stream.respond({
      ':status': 404,
    });
  }
});

server.listen(8443, '127.0.0.1');
