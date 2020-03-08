const express = require('express');
const router = express.Router();
const passport = require('passport');
const utility = require('../config/utilities');
const { ensureAuthenticated } = require('../config/auth');

//var nodemailer = require("nodemailer");

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
      
    })(req, res, next);
  });

// router.post('/login', (req, res) => {
//     const loginDetail={email,password}=req.body;
//     console.log(loginDetail);
//     let errors = [];
//     if (!email || !password) {
//         errors.push({ msg: 'Please enter all fields' });
//     }

//     res.render('login', { errors, email});

// })


// register Page
router.get('/register', (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
    const userToRegister = { fname, lname, email, password, password2, city, state, country } = req.body;
    let errors = [];

    if (!fname || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', { errors, fname, email, lname, city, state, country });

    } else {
        utility.getuser(email).then(user => {
            //console.log("promiseGet", user, user.length)

            if (user.length > 0) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {errors,fname,email,lname,city, state,country});
            }
            else {
                utility.passEncrypt(userToRegister.password).then(hash => {
                    userToRegister.password = hash;
                    utility.regUser(userToRegister).then(result => {
                       // console.log("promiseAdd", result, result.affectedRows)
                        req.flash('success_msg','You are now registered and can log in' );
                        res.redirect('/users/login');
                    });
                });
            }
        })


    }
});


// Subscription Page
router.get('/subscribe', (req, res) => res.render('subscription'));


//freecopy

router.get('/freecopy', ensureAuthenticated, (req, res) =>
    res.render('freecopy', {
    user: req.user
    })
);


// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
  });


module.exports = router; 