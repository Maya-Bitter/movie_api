const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let users = [

{
id: 1,
name: "Alexander",
favouriteMovies: []
},

{ 
id: 2,
name: "Joe",
favouriteMovies: ["Scream VI"]
},

]

let movies = [

{
"Title": "Luther: The Fallen Sun",
"Description": "A dark psychological crime drama starring Idris Elba as Luther, a man struggling with his own terrible demons, who might be as dangerous as the depraved murderers he hunts.",

"Genre": {
"Name": "Thriller",
"Description": "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that evokes excitement and suspense in the audience. The suspense element found in most films' plots is particularly exploited by the filmmaker in this genre. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible."
},

"Director": {
"Name": "Jamie Payne",
"Bio": "Jamie Payne is an English film director, entered the film industry with his debut The Dance of Shiva. After that, he mainly directed British television series. For The Hour he received the award for Best International Television Series at the Geneva Film Festival in 2011. In 2013 he directed two episodes of the British cult series Doctor Who and the following year he began directing his first American series with Legends. At the same time, he was also a producer. Finally, he produced four episodes for the television series Luther in 2019 and directed the spinoff Luther: The Fallen Sun in 2023. According to his own statements, he was glad that he had more time for shooting than with the series. He also praised the efforts of lead actor Idris Elba.",
"Birth": "1968",
},

ImageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xsW7M4b4gawgFKCzcXHL2MSeswj.jpg",
Featured: false
},

{
"Title": "Plane",
"Description": "After a heroic job of successfully landing his storm-damaged aircraft in a war zone, a fearless pilot finds himself between the agendas of multiple militias planning to take the plane and its passengers hostage.",

"Genre": {
"Name": "Action",
"Description": "Film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.",
},

"Director": {
"Name": "Jean-Francois Richet",
"Bio": "Jean-Francois Richet is a French screenwriter, director, and producer, born on July 2, 1966 in Paris. He grew up in Meaux, a suburb east of Paris.",
"Birth": "1966",
},

ImageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qi9r5xBgcc9KTxlOLjssEbDgO0J.jpg",
Featured: false
},

{
"Title": "Pulp Fiction",
"Description": "A burger-loving hit man, his philosophical partner, a drug-addled gangste\'s moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",

"Genre": {
"Name": "Thriller",
"Description": "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that evokes excitement and suspense in the audience.[1] The suspense element found in most films' plots is particularly exploited by the filmmaker in this genre. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible."
},

"Director": {
"Name": "Quentin Jerome Tarantino",
"Bio": "Quentin Jerome Tarantino is an American film director, screenwriter, producer, cinematographer and actor. In the early 1990s he was an independent filmmaker whose films used nonlinear storylines and aestheticization of violence. His films have earned him a variety of Academy Award, Golden Globe, BAFTA and Palme d'Or Awards and he has been nominated for Emmy and Grammy Awards. In 2007, Total Film named him the 12th-greatest director of all time.",
"Birth": "1963",
},

ImageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
Featured: false
},

{ 
"Title": "Forrest Gump",
"Description": "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him",

"Genre": {
"Name": "Drama",
"Description": "Drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy)."
},

"Director": {
"Name": "Robert Lee Zemeckis",
"Bio": "Robert Lee Zemeckis is an American film director, producer and screenwriter. Zemeckis first came to public attention in the 1980s as the director of the comedic time-travel Back to the Future film series, as well as the Academy Award-winning live-action/animation epic Who Framed Roger Rabbit (1988), though in the 1990s he diversified into more dramatic fare, including 1994's Forrest Gump, for which he won an Academy Award for Best Director.",
"Birth": "1951",
},

ImageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
Featured: false
},

{ 
"Title": "Scream VI",
"Description": "Following the latest Ghostface killings, the four survivors leave Woodsboro behind and start a fresh chapter",

"Genre": {
"Name": "Horror",
"Description": "Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes. Horror films often explore dark subject matter and may deal with transgressive topics or themes. Broad elements include monsters, apocalyptic events, and religious or folk beliefs. Cinematic techniques used in horror films have been shown to provoke psychological reactions in an audience."
},

"Director": {
"Name": "Matt Bettinelli-Olpin",
"Bio": "Matt Bettinelli-Olpin is an American director, writer, actor and musician.", 
"Birth": "1978"
},

ImageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/aePBN8ffLCHoUXp8lkA5P29CXdx.jpg",
Featured: false
},

{ 
"Title": "Schindler\'s List",
"Description": "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.",

"Genre": {
"Name": "Drama",
"Description": "Drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy)."
},

"Director": {
"Name": "Steven Allan Spielberg",
"Bio": "Steven Allan Spielberg is an American film director, writer and producer. A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director of all time. Spielberg is the recipient of various accolades, including three Academy Awards, a Kennedy Center honor, four Directors Guild of America Awards, two BAFTA Awards, a Cecil B. DeMille Award and an AFI Life Achievement Award. Seven of his films have been inducted into the National Film Registry by the Library of Congress as 'culturally, historically or aesthetically significant'.",
"Birth": "1946",
},

ImageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
Featured: false
},

{ 
"Title": "Fight Club",
"Description": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",

"Genre": {
"Name": "Drama",
"Description": "Drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy)."
},

"Director": {
"Name": "David Andrew Leo Fincher",
"Bio": "David Andrew Leo Fincher is an American film director. His films, mostly psychological thrillers and biographical dramas, have received 40 nominations at the Academy Awards, including three for him as Best Director. Born in Denver, Colorado, Fincher was interested in filmmaking at an early age. He directed numerous music videos, most notably Madonna/'s 'Express Yourself' in 1989 and 'Vogue' in 1990, both of which won him the MTV Video Music Award for Best Direction. He made his feature film debut with Alien 3 (1992), which garnered mixed reviews, followed by the thriller Seven (1995), which was better received. Fincher found lukewarm success with The Game (1997) and Fight Club (1999), but the latter eventually became a cult classic. In 2002, he returned to prominence with the thriller Panic Room starring Jodie Foster.",
"Birth": "1962",
},

ImageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
Featured: false
},

{ 
"Title": "Marriage Story",
"Description": "A stage director and an actress struggle through a grueling, coast-to-coast divorce that pushes them to their personal extremes.",

"Genre": {
"Name": "Drama",
"Description": "Drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy)."
},

"Director": {
"Name": "Noah Baumbach", 
"Bio": "Noah Baumbach is an American filmmaker. He received Academy Award nominations for writing his films The Squid and the Whale (2005) and Marriage Story (2019), both of which he also directed, while the former garnered him one of the few screenwriters to ever sweep 'The Big Four' critics awards: Los Angeles Film Critics Association, National Board of Review, New York Film Critics Circle, and National Society of Film Critics.", 
"Birth": "1969",
},

ImageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2JRyCKaRKyJAVpsIHeLvPw5nHmw.jpg",
Featured: false
},
  
];

// Gets the list of data about ALL movies 

// READ //

app.get('/movies', (req, res) => {
  res.json(movies);
})

// Gets data (description, genre, director, image URL, about a single movie by title to the movie //

// READ //

app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find( movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
   } else { 
    res.status(400).send('no such movie')
   }

  })

  // Gets data about a genre (description) by name/title //

  // READ //

app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

  if (genre) {
    res.status(200).json(genre);
    } else { 
    res.status(400).send('no such genre')
    }

  })

  // Gets data about a director (bio, birth year, death year) by name //

  // READ //

app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if (director) {
    res.status(200).json(director);
    } else { 
    res.status(400).send('no such director')
    }

  })

  // Allow new users to register //

  // CREATE //

app.post('/users', (req, res) => {
const newUser = req.body;

  if(newUser.name) {
  newUser.id = uuid.v4();
  users.push(newUser);
  res.status(201).json(newUser)
  } else {
  res.status(400).send('users need names')
}

})

// Allow users to update their username // I recive an error // 

// UPDATE //

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user  = users.find(user => user.id == id);

  if (user) {
    user.name= updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('no such user')
  }

})
  
// Allow users to add a movie to their list of favorites //

// create //

app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
 
  let user  = users.find(user => user.id == id);

  if (user) {
    user.favouriteMovies.push(movieTitle);
    res.status(200).send('$ movieTitle} has been added to user ${id} array'); // I receive an error //
  } else {
    res.status(400).send('no such user')
  }
     
  })

// Allow users to delete a movie to their list of favorites //

// DELETE //

app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
 
  let user  = users.find(user => user.id == id);

  if (user) {
    user.favouriteMovies = users.favouriteMovies.filter(title => title !== movieTitle);
    res.status(200).send('$ {movieTitle} has been removed from user ${id} array'); // I receive an error //
  } else {
    res.status(400).send('no such user')
  }
     
  })

  // Allow existing users to deregister  //

// DELETE //

app.delete('/users/:id/', (req, res) => {
  const { id } = req.params;
 
  let user  = users.find(user => user.id == id);

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send('user ${id} has been deleted'); // the message is not correct - user ${id} has been deleted //
  } else {
    res.status(400).send('no such user')
  }
     
  })
    
app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
