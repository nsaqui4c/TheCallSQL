const express = require('express');
const router = express.Router();
const utility = require('../config/utilities');
//const con = require('./connection');

const handleError = (err, res) => {

    console.log("===============",err);
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!",err);
  };


router.get('/',(req, res) => {
    
    utility.getPost().then(rows=>{

       // console.log(rows)

       
        res.render('welcome', {
            posts: rows
            })



    }).catch((err)=>{
        return handleError(err, res);
    })
    

});


module.exports = router; 