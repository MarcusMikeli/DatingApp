const http = require('http');
const app = require('./app')

const port = process.env.PORT || 3000;

// WE NEED TO PASS A LISTENER (VIDEO 2 - 7MIN)
const server = http.createServer(app);

server.listen(port);
