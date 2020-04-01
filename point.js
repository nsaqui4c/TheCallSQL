const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const fileupload=require("express-fileupload");


const app = express();
app.use(fileupload());


// Passport Config
require('./config/passport')(passport);

//static file
app.use( express.static( "public" ) );

//MIDDLEWARE
app.use(expressLayouts);
app.set('view engine','ejs');


// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {  }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});




//ROUTES

app.use('/',require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/admin'));





const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));