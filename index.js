const express = require('express'); // imports the express module locally so it can be used within the file //
const app = express(); //  declares a variable that encapsulates Express’s functionality to configure my web server //

const http = require('http');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Welcome to my book club!\n');
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');