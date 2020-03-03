const express = require('express');
const router = express.Router();
const passport = require('passport');
const utility = require('../config/utilities');
const fs = require("fs");


const handleError = (err, res) => {

    console.log("===============",err);
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!",err);
  };
  


// new POst Page
router.get('/createNewPost', (req, res) => res.render('uploadPost'));


//Upload new post
router.post("/upload", (req, res) => {


    console.log(req.body.post)


    
     console.log("upload working fi");
      const tempPath = req.files.file
      const targetPath = "./public/upload/1.png";

        console.group(tempPath,targetPath)

      tempPath.mv(targetPath, err => {
        if (err) return handleError(err, res);
    
        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");

        });

    }
  );


module.exports = router; 