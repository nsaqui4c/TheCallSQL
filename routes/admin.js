const express = require('express');
const router = express.Router();
const passport = require('passport');
const utility = require('../config/utilities');
const fs = require("fs");

const { adminAuthenticated } = require('../config/auth');


const handleError = (err, res) => {

  console.log("===============", err);
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!", err);
};



// new POst Page
router.get('/createNewPost', adminAuthenticated, (req, res) => res.render('uploadPost'));


//Upload new post
router.post("/upload", (req, res) => {


  // console.log(req.body.post)

  utility.createPostText(req.body.heading, req.body.post).then(rows => {
    pid = rows.insertId;


    //Uploading Image
    if (req.files) {
      // console.log("start uploading image");
      const tempPath = req.files.file
      const targetPath = "./public/upload/" + pid + ".png";

      tempPath.mv(targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");

      });


    }
    else res.status(200)
      .contentType("text/plain")
      .end("File uploaded!");

  }).catch((msg, err) => {
    console.log(msg, err)
    return handleError(err, res);
  });



}
);


module.exports = router; 