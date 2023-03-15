const express = require('express'); // imports the express module locally so it can be used within the file //
const app = express(); //  declares a variable that encapsulates Express’s functionality to configure my web server //

app.use('/documentation', express.static('public')); // added the express.static to serve your “documentation.html” file from the public folder 

// simplifies the Node.js syntax. Rather than importing and using modules, you could, instead, use the following (much simpler) code to do the trick:

let topMovies = [

{
title: 'Luther: The Fallen Sun',
year: '2023',
time: '2h 9m', 
genre: 'Thriller, Crime, Action, Drama',
overview: 'A dark psychological crime drama starring Idris Elba as Luther, a man struggling with his own terrible demons, who might be as dangerous as the depraved murderers he hunts.',
url: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xsW7M4b4gawgFKCzcXHL2MSeswj.jpg'
},

{
title: 'Plane',
year: '2023',
time: '1h 47m', 
genre: 'Action, Adventure, Thriller',
overview: 'After a heroic job of successfully landing his storm-damaged aircraft in a war zone, a fearless pilot finds himself between the agendas of multiple militias planning to take the plane and its passengers hostage.',
url: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qi9r5xBgcc9KTxlOLjssEbDgO0J.jpg'
},
    
{
title: 'Forrest Gump',
year: '1994',
time: '2h 22m', 
genre: 'Comedy, Drama, Romance',
overview: 'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what 	anyone imagined he could do. But despite all he has achieved, his one true love eludes him.',
url: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'
},

{
title: 'Pulp Fiction',
year: '1994',
time: '2h 34m',
genre: 'Thriller, Crime', 
overview: 'A burger-loving hit man, his philosophical partner, a drug-addled gangste\'s moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.',
url: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'
},

{ 
title: 'Schindler\'s  List',
year: '1993',
time: '3h 15m',
genre: 'Drama, History, War', 
overview: 'The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.',
url: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg'
},

{  
title: 'Pretty Woman',
year: '1990',
time: '1h 59m',
genre: 'Comedy, Romance', 
overview: 'When a millionaire wheeler-dealer enters a business contract with a Hollywood hooker Vivian Ward, he loses his heart in the bargain.',
url: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hVHUfT801LQATGd26VPzhorIYza.jpg'

},

{ 
title: 'Scream VI',
year: '2023',
time: ' 2h 3m', 
genre: 'Horror, Mystery, Thriller', 
overview: 'Following the latest Ghostface killings, the four survivors leave Woodsboro behind and start a fresh chapter.',
url: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/aePBN8ffLCHoUXp8lkA5P29CXdx.jpg'
},

{   
title: 'Fight Club',
year: '1999',
time: '2h 19m',
genre: 'Drama, Thriller, Comedy',
overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
url: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
},
    
{   
title: 'The Silence of the Lambs',
year: '1991',
time: '1h 59m',
genre: 'Crime, Drama, Thriller', 
overview: 'Clarice Starling is a top student at the FBI\'s training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism. Crawford believes that Lecter may have insight into a case and that Starling, as an attractive young woman, may be just the bait to draw him out.',
url: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg'
},
   
{ 
title: 'The Intouchables',
year: '2011',
time: '1h 53m',
genre: 'Drama, Comedy', 
overview: '1h 53m',
url: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/323BP0itpxTsO0skTwdnVmf7YC9.jpg'
},

];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my top 10 movies page!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});