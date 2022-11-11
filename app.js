require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");


const passport = require('passport');
const session = require('express-session');
const UserDetails = require('./models/userDetails');


const app = express();
const port = 3000;

const database_url = process.env.DATABASE_URL;

mongoose
  .connect(database_url)
  .then(() => {
    console.log("Database connected!");
  })
  .catch(() => {
    console.log("Could not connect to database!");
  });

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(UserDetails.createStrategy());
// passport.use('local-signup', new LocalStrategy({
//   // by default, local strategy uses username and password, we will override with email
//   usernameField: 'username',
//   passwordField: 'password',
//   passReqToCallback: true // allows us to pass back the entire request to the callback
// },
//   function (req, username, password, done) {

//     // find a user whose email is the same as the forms email
//     // we are checking to see if the user trying to login already exists
//     User.findOne({ 'local.username': username }, function (err, user) {
//       // if there are any errors, return the error
//       if (err)
//         return done(err);

//       // check to see if theres already a user with that email
//       if (user) {
//         return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//       } else {

//         // if there is no user with that email
//         // create the user
//         var newUser = new User();

//         // set the user's local credentials
//         newUser.local.username = username;
//         newUser.local.password = password;

//         // save the user
//         newUser.save(function (err) {
//           if (err)
//             throw err;
//           return done(null, newUser);
//         });
//       }

//     });
    passport.serializeUser(UserDetails.serializeUser());
    passport.deserializeUser(UserDetails.deserializeUser());
    // UserDetails.register({username:'admin', active: false}, 'admin');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static("public"));
    app.set("view engine", "ejs");
    app.set("views", __dirname + "/views");

    
    app.use(router);
    app.listen(port, () => {
      console.log(`App is running at https://localhost:${port}`);
    });
