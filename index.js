const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

  const morgan = require('morgan'); // Morgan is imported locally //
  methodOverride = require('method-override');
  const app = express();
  const mongoose = require('mongoose');   // Integrating Mongoose with a REST API //
  const Models = require('./models.js');

  const Movies = Models.Movie;
  const Users = Models.User;
  const Genres = Models.Genre;
  const Directors = Models.Director;

mongoose.connect('mongodb://127.0.0.1:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true }); 
// This allows Mongoose to connect to that database so it can perform CRUD operations on the documents it contains from within your REST API //

app.use(bodyParser.json());

app.use(morgan("common"));

// welcome text when in localhost8080/ //

// READ //

app.get("/", (req, res) => {
res.send("Welcome to MyFlix site!");
});

// Return a JSON object of all movies /movies //

// READ //

app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get all users //

// READ //

app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Gets JSON object (description, genre, director, image URL) about a single movie by title //

// READ //

app.get('/movies/:Title', (req, res) => {
  Movies.findOne({Title: req.params.Title})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Gets JSON genre info (description)

// READ //

app.get('/genre/:Name', (req, res) => { // should it be a movie before the /genre ??? 
Genres.findOne({Name: req.params.Name})
.then((genre) => {
  res.json(genre.Description);
})
.catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
});
});

// Gets Json data about a director (bio, birth year, death year) by name //

// READ //

app.get('/director/:Name', (req, res) => { // should it be a movie before the /director ??? 
  Directors.findOne({Name: req.params.Name})
  .then((director) => {
    res.json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
  });

// Allow new users to register //

// CREATE //

/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

app.post('/users', (req, res) => {
Users.findOne({ Username: req.body.Username })
.then((user) => {
  if (user) {
    return res.status(400).send(req.body.Username + 'already exists');
  } else {
    Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then((user) =>{res.status(201).json(user) })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    })
  }
})
.catch((error) => {
  console.error(error);
  res.status(500).send('Error: ' + error);
});
});

// UPDATE //

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// create //

// Add a movie to a user's list of favorites //

app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// DELETE //

// Allow users to delete a movie to their list of favorites //

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

// DELETE //

// Allow existing users to deregister  //

// Delete a user by username

app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// access documentation.html using express.static 

//app.use('/documentation.html',press.static("public"));

//error handling

//app.use((err, req, res, next) => {
//  console.error(err.stack);
//  res.status(500).send(Ërror");
//});

// decomentation.html //

  app.get('/documentation.html', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});
   
app.listen(8001, () => {
  console.log('Your app is listening on port 8001');
});
