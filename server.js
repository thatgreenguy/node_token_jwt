var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

// To create, sign and verify tokens
var jwt = require('jsonwebtoken');

// To pull in all app config details
var config = require('./config');

// To pull in our mongoose model(s)
var User = require('./app/models/user');

// ====================================
// Configuration
// ====================================
var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

// Utilise body-parser so we can get info from POST and/or URL parameters
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Utilise morgan for logging request(s) to console
app.use(morgan('dev'));

// ====================================
// ROUTE Handling
// ====================================

// Get an instance of the router for API routes
var apiRoutes = express.Router();

// TODO: Route to authenticate a user (POST http://localhost:8080/api/authenticate)


// TODO: Route middleware to verify a token


// Route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res){
  res.send('Hello the API is at http://localhost:' + port + '/api');
});

// Route to return all uses (GET http://localhost:8080/api/users
apiRoutes.get('/users', function(req, res){
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// Setup initial user
// app.get('/setup', function(req, res){
//
//   // Create a sample user
//   var paul = new User({
//     name: 'Paul Green',
//     password: 'password',
//     admin: true
//   });
//
//   // Save the sample user
//   paul.save(function(err) {
//     if (err) throw err;
//       console.log('User saved successfully');
//       res.json({ success: true });
//   });
// });

// Apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// ====================================
// Start the server
// ====================================
app.listen(port);
console.log('Listening at : http://localhost:' + port);
