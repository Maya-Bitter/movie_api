const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');
  morgan = require('morgan'); // Morgan is imported locally //
  methodOverride = require('method-override');
  const mongoose = require('mongoose');   // Integrating Mongoose with a REST API //
const Models = require('./models.js');

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true }); // This allows Mongoose to connect to that database so it can perform CRUD operations on the documents it contains from within your REST API //

const Movies = Models.Movie;
const Users = Models.User;

const app = express();

app.use(bodyParser.json());

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
  
  app.get('/documentation.html', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});
   
app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
