var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "newUser",
  password:"",
  database: "tcdb",
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
   // console.log("getconnection ",con.state)
    if(con.state==='disconnected'){
    con.connect(function(err) {
        console.log("trying ......!",con.state);
      if (err) reject('error connecting to db', err);
      resolve(con);
         
    });
}
else
resolve(con);
})

module.exports={ getCon:getConnection};
