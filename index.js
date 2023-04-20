const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

  const morgan = require('morgan'); // Morgan is imported locally //
  methodOverride = require('method-override');
  const app = express();
  const mongoose = require('mongoose');   // Integrating Mongoose with a REST API //
  const Models = require('./models.js');

  const { check, validationResult } = require('express-validator'); 

  const Movies = Models.Movie;
  const Users = Models.User;

// This allows Mongoose to connect to that database so it can perform CRUD operations on the documents it contains from within your REST API //

// mongoose.connect(process.env.CONNECTION_URI || 'mongodb://127.0.0.1:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true }); OLD CODE //

mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // NEW CODE

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("common"));

const cors = require('cors'); // Implement CORS into your app, ensuring that all domains are allowed to make requests to your API //
app.use(cors());

//const allowedOrigins =  THIS CODE DOESNT WORK.
//['http://localhost:8001', 
//'http://localhost:1234', 
//'https://m-flix.herokuapp.com'];

//app.use(cors({
// origin: (origin, callback) => {
//   if(!origin) return callback(null, true);
//   if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
//     let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
//     return callback(new Error(message ), false);
//   }
//   return callback(null, true);
// }
//}));

// ensure that a user input field called “Username” within the body of an HTTP request contained only alphanumeric characters //

check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric()

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

// welcome text when in localhost8001/ //

// READ //

app.get("/", (req, res) => {
res.send("Welcome to MyFlix site!");
});

// Return a JSON object of all movies /movies //

// READ //

app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get specific user by username //

// READ //

app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({Username: req.params.Username})
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Gets JSON object (description, genre, director, image URL) about a single movie by title //

// READ //

app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.get('/movies/genre/:genreName', passport.authenticate('jwt', { session: false }), (req, res) => {
Movies.findOne({ 'Genre.Name': req.params.genreName })
.then((movie) => {
  res.json(movie.Genre);
})
.catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
});
});

// Gets Json data about a director (bio, birth year, death year) by name //

// READ //

app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }), (req, res) => {
Movies.findOne({ 'Director.Name': req.params.directorName })
.then((movie) => {
  res.json(movie.Director);
})
.catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
});
}); 

// Code with validation to allow new users to register //

app.post('/users',
// Validation logic here for request
//you can either use a chain of methods like .not().isEmpty()
//which means "opposite of isEmpty" in plain english "is not empty"
//or use .isLength({min: 5}) which means
//minimum value of 5 characters are only allowed
[
check('Username', 'Username is required').isLength({min: 5}),
check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
check('Password', 'Password is required').not().isEmpty(),
check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {

// check the validation object for errors
let errors = validationResult(req);

if (!errors.isEmpty()) {
return res.status(422).json({ errors: errors.array() });
}

let hashedPassword = Users.hashPassword(req.body.Password);
Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
.then((user) => {
if (user) {
//If the user is found, send a response that it already exists
return res.status(400).send(req.body.Username + ' already exists');
} else {
Users
.create({
  Username: req.body.Username,
  Password: hashedPassword,
  Email: req.body.Email,
  Birthday: req.body.Birthday
})
.then((user) => { res.status(201).json(user) })
.catch((error) => {
  console.error(error);
  res.status(500).send('Error: ' + error);
});
}
})
.catch((error) => {
  console.error(error);
  res.status(500).send('Error: ' + error);
});
});

// new code fo allow new users to register + hashPassword //

//app.post('/users', (req, res) => {
//let hashedPassword = Users.hashPassword(req.body.Password);
//Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
//.then((user) => {
//if (user) {
//If the user is found, send a response that it already exists
//return res.status(400).send(req.body.Username + ' already exists');
//} else {
//Users
// .create({
//    Username: req.body.Username,
//    Password: hashedPassword,
//    Email: req.body.Email,
//    Birthday: req.body.Birthday
//  })
//  .then((user) => { res.status(201).json(user) })
//  .catch((error) => {
//    console.error(error);
//    res.status(500).send('Error: ' + error);
//  });
//}
//})
//.catch((error) => {
//console.error(error);
//res.status(500).send('Error: ' + error);
//});
//});

// Allow new users to register old code //

// CREATE //

/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

//  app.post('/users', (req, res) => { 
//  Users.findOne({ Username: req.body.Username })
//  .then((user) => {
//  if (user) {
//  return res.status(400).send(req.body.Username + 'already exists');
//  } else {
//    Users
//      .create({
//        Username: req.body.Username,
//        Password: req.body.Password,
//        Email: req.body.Email,
//        Birthday: req.body.Birthday
//      })
//      .then((user) =>{res.status(201).json(user) })
//    .catch((error) => {
//      console.error(error);
//     res.status(500).send('Error: ' + error);
//    })
//  }
//})
//.catch((error) => {
//  console.error(error);
//  res.status(500).send('Error: ' + error);
//});
//});

// update user info old code //

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

//app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
//Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
//{
//  Username: req.body.Username,
//  Password: req.body.Password,
//  Email: req.body.Email,
//  Birthday: req.body.Birthday
//}
//}, { 
//new: true 
//})
//.then((updatedUser) => {res.status(201).json(updatedUser)})
//.catch((error) => {
//console.error(error);
//res.status(500).send('Error: ' + err);
//})
//.catch((error) => {
//console.error(error);
//res.status(500).send('Error: ' + err);
//})
//});

// update user info new with hashPassword & validation // 

app.put('/users/:Username', 

// Validation logic here for request
//you can either use a chain of methods like .not().isEmpty()
//which means "opposite of isEmpty" in plain english "is not empty"
//or use .isLength({min: 5}) which means
//minimum value of 5 characters are only allowed

[
check('Username', 'Username is required').isLength({min: 5}),
check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
check('Password', 'Password is required').not().isEmpty(),
check('Email', 'Email does not appear to be valid').isEmail()
],

passport.authenticate('jwt', { session: false }), (req, res) => {

// check the validation object for errors
let errors = validationResult(req);

if (!errors.isEmpty()) {
return res.status(422).json({ errors: errors.array() });
}

let hashedPassword = Users.hashPassword(req.body.Password);
Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
{
  Username: req.body.Username,
  Password: req.body.Password,
  Email: req.body.Email,
  Birthday: req.body.Birthday
}
}, { 
new: true 
})
.then((updatedUser) => {res.status(201).json(updatedUser)})
.catch((error) => {
console.error(error);
res.status(500).send('Error: ' + err);
})
.catch((error) => {
console.error(error);
res.status(500).send('Error: ' + err);
})
});  

// create //

// Add a movie to a user's list of favorites

app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { 
    new: true 
    })
    .then((updatedUser) => {res.status(201).json(updatedUser)})
    .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + err);
    })
    .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + err);
    })
    });  
      
// DELETE //

// Allow users to delete a movie to their list of favorites //

app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
Users.findOneAndUpdate({ Username: req.params.Username }, {
  $pull: { FavoriteMovies: req.params.MovieID }
},
{ 
  new: true 
  })
  .then((updatedUser) => {res.status(201).json(updatedUser)})
  .catch((error) => {
  console.error(error);
  res.status(500).send('Error: ' + err);
  })
  .catch((error) => {
  console.error(error);
  res.status(500).send('Error: ' + err);
  })
  }); 

// DELETE //

// Allow existing users to deregister  //

// Delete a user by username

app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
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
   
const port = process.env.PORT || 8001;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});