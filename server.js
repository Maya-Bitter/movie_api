const http = require('http'),
  fs = require('fs'),
  url = require('url');

  // added variable declarations at the top. //
  
http.createServer((request, response) => { // server creation. The module is being used here to create a new server //
  let addr = request.url, // a new variable has been declared, which has been assigned the function. Remember from above that using allows you to get the URL from the request (which, in this case, is the first argument of the function:  //
    q = url.parse(addr, true), // After this, the function is being used on the new variable, and the results of that are being set to a new variable, . On the next line, a new variable, is declared, but it's set to an empty string. This will be where you store the path of the file; however, right now, it's just acting as an empty container, as you'll be piecing the file path together and placing it in your empty variable in the next statement
    filePath = '';

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => { // log of recent requests made to your server - it can be used to debug your code, track the most visited URLs, and more//
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });

  if (q.pathname.includes('documentation')) { // statement that checks what the exact pathname of the entered URL is //
    filePath = (__dirname + '/documentation.html'); // is being used to check whether the of (the URL) includes the words “documentation”.//
  } else {
    filePath = 'index.html'; // If doesn't include “documentation”, the statement returns “index.html” //
  }

  fs.readFile(filePath, (err, data) => { // the file system module  //
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

}).listen(8080);
console.log('My test server is running on Port 8080.');