const con = require('./connection');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;






const getUser = (email) => {
    return new Promise((resolve, reject) => {
        
        con.getCon.then((connect) => {
            connect.query(`SELECT * FROM cuser where email='${email}'`, (err, rows) => {
                if (err) reject(err, "error fetching data from DB");

                resolve(rows)

            })
        }).catch((msg, err) => {
            console.log(msg, err)
        });
    })
}


const registerUser = (userToRegister) => {
    return new Promise((resolve, reject) => {

        con.getCon.then((connect) => {

            sql = "insert into cuser set ?";
            userToRegister.type = 'R';
            userToRegister.reset = 'T';

            connect.query(sql, userToRegister, (err, rows) => {
                if (err) reject(err, "error inserting data to DB");
                resolve(rows);

            })
        }).catch((msg, err) => {
            console.log(msg, err)
        });

    })



}

const passEncrypt = (user) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user, salt, (err, hash) => {
                if (err) reject(err, "error encrypting password");

                console.log(user);
                console.log(hash);
                resolve(hash);
            });

        });
    })
}


const createPostText= (heading,text)=>{
    return new Promise((resolve,reject)=>{

        con.getCon.then((connect) => {

            sql = "insert into post set ?";
            value={
                heading:heading,
                text:text
            }

            connect.query(sql, value, (err, rows) => {
                if (err) reject(err, "error inserting data to DB");
               // connect.end();
                resolve(rows);

            })
        }).catch((msg, err) => {
            console.log(msg, err)
        });
    });
}


var getPost= ()=>{ return new Promise((resolve,reject)=>{

        con.getCon.then((connect) => {

        sql = "select * from post order by date desc";
       
        connect.query(sql, (err, rows) => {
            if (err) reject(err, "error inserting data to DB");

            resolve(rows);

        })
    }).catch((msg, err) => {
        console.log(msg, err)
    });

});

}


const subscribeUser=(user)=>{
    return new Promise((resolve,reject)=>{
        con.getCon.then((connect) => {
            
            sql=`update cuser set ? where email='${user.email}'`;
            console.log("========"+sql)
            value={
                age:user.age,
                gender:user.gender,
                profession:user.profession,
                mobno:user.mobile,
                adress:user.address,
                city:user.city,
                state:user.state,
                country:user.country,
                type:'S' 
            }
            connect.query(sql,value, (err, rows) => {
                if (err) reject(err, "error inserting data to DB");
    
                resolve(rows);
    
            })
            
        }).catch((msg, err) => {
            console.log(msg, err)
        })
    })
}




module.exports = { getuser: getUser, regUser: registerUser, passEncrypt: passEncrypt,createPostText:createPostText,getPost:getPost,subscribeUser:subscribeUser };