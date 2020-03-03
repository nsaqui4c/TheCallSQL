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





module.exports = { getuser: getUser, regUser: registerUser, passEncrypt: passEncrypt };