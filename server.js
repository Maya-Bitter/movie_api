//  task 2.2 : 3.import the module at the top of your “server.js” file.url  -
// HTTP Module (Web Server) was originaly here and I deleted the server module, is that correct? //

const url = require('url'); 

// The first line of the code requires the module (which is necessary no matter which module you’re using) //

let addr = 'http://localhost:8080/default.html?year=2017&month=february';

// In the next line, a new variable is declared, which is assigned a string. The string happens to be a URL. This is the URL you’re going to parse //

let q = url.parse(addr, true);

// Following this is yet another new variable declaration. This variable, is assigned the function, which has been accessed through using dot notation. It passes two arguments: (which is the URL) and (don’t worry too much about this for now). This is what will do the actual parsing, but in order to see the results, you’ll need to create some console logs. 

// The three console logs below each return a different part of the parsed URL: the host (), the pathname (), and the serialized portion (), which is everything after the question mark in the URL.qparse()urladdrtrueq.hostq.pathnameq.search
  
console.log(q.host); // returns 'localhost:8080'
console.log(q.pathname); // returns '/default.html'
console.log(q.search); // returns '?year=2017&month=february'

// While these console logs are great in that they let you see each part of the parsed URL, you won’t be able to actually do anything with that data. For this, you’ll need to declare another variable, which is what happens another line down. Here, a new variable, , is declared. Then, it’s assigned the function off of the variable. This returns a formatted object with the year and month included in the URL (), which allows you to specifically target the month in the following console log ()//

let qdata = q.query; // returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); // returns 'february'

// For incoming requests, parse the to determine if the URL contains the word “documentation” 
//( is one of the objects passed to 's callback function; it contains the request data, such as the requested URL). 
//If it does, return the “documentation.html” file to the user; otherwise return the “index.html” file. 

// my question: I wanted to ask if I should compose myself the URL since this example has already a URL = [localhost:8080/default.html?year=2017&month=february](http://localhost:8080/default.html?year=2017&month=february)';
// I dont understand what it my URL other than the http://localhost:8080/

// that is the File System Module requested in task 2.2 4. //

if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
    } else {
    filePath = 'index.html';
    }
    
    fs.readFile(filePath, (err, data) => {
    if (err) {
    throw err;
    }
    
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
    
    });
    
    }).listen(8080);
    console.log('My test server is running on Port 8080.');

    // I want to combine the two like explained here https://www.w3schools.com/nodejs/nodejs_url.asp but it is not clear to me //

