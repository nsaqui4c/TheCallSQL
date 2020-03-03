const bcrypt = require('bcryptjs');


const passEncrypt=(user)=>{
    console.log("insied")
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user, salt, (err, hash) => {
                if (err) reject(err,"error encrypting password");

                console.log(user);
                console.log(hash);

                

                resolve(hash);
            });

        });
    })
}


passEncrypt("123456").then(hash=>{
    bcrypt.compare("123456",hash,(err,match)=>{
        if(match)
        console.log("match");
    })
});
