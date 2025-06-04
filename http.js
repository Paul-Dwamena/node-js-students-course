const http = require('http');

const server = http.createServer((req,res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    if (req.url === '/' && req.method === 'GET') {
        res.end('Hello! This is the home page.');
      } else if (req.url === '/about' && req.method === 'GET') {
        res.end('This is the About page.');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }

})


server.listen(3000, ()=>{
    console.log('Server running on http://localhost:3000/')
})