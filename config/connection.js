var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "thecghtd_newUser",
  //password:"",
  password:"Pass1word",
  database: "thecghtd_tcdb",
  port: 3306
});

// const func=(callback)=>{

//     con.connect(function(err) {
//         console.log("trying ......!",con.state);
//       if (err) throw err;
//       console.log("Connected!");
    
//     });

//     callback(con);
    
// }

const getConnection =new Promise((resolve,reject)=>{
   console.log("getconnection ",con.state)
    if(con.state==='disconnected'){
    con.connect(function(err) {
        console.log("trying ......!",con.state);
      if (err){
        console.log("========error connecting DB=============", err)
        reject('error connecting to db', err);
      } 
      else      
      resolve(con);
         
    });
}
else
resolve(con);
})

module.exports={ getCon:getConnection};
