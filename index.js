// const express = require('express'); // imports the express module locally so it can be used within the file //
// const app = express(); //  declares a variable that encapsulates Express’s functionality to configure my web server //

// const http = require('http'), // One method would be to import more Node modules into your project. You could use the http module in conjunction with the url module to parse the request URL and send a response accordingly to the URL path as you did back in Exercise 2.2: Node.js Modules:
//  url = require('url');

//http.createServer((request, response) => {
//  let requestURL = url.parse(request.url, true);
//  if ( requestURL.pathname == '/documentation.html') {
//    response.writeHead(200, {'Content-Type': 'text/plain'});
//    response.end('Documentation on the bookclub API.\n');
//  } else {
//    response.writeHead(200, {'Content-Type': 'text/plain'});
//    response.end('Welcome to my book club!\n');
//  }

//}).listen(8080);

//console.log('My first Node test server is running on Port 8080.');

const express = require('express'); // using Express is that it simplifies the Node.js syntax. Rather than importing and using modules, you could, instead, use the following (much simpler) code to do the trick:
const app = express();

let topBooks = [
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling'
  },
  {
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien'
  },
  {
    title: 'Twilight',
    author: 'Stephanie Meyer'
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my book club!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/books', (req, res) => {
  res.json(topBooks);
});


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});