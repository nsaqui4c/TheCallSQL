const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

//static file
app.use( express.static( "public" ) );



//ROUTES

app.use('/' ,(req, res) => res.send('welcome'));
app.use('/users', require('./routes/users.js'));





const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));