const LocalStrategy = require('passport-local').Strategy;
const utility = require('../config/utilities');
const bcrypt = require('bcryptjs');

module.exports =function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            utility.getuser(email).then(user=>{
               
                if (user.length == 0) {
                    return done(null, false, { message: `email ${email} is not registered` });
                }

                if (user.length > 1) {
                    return done(null, false, { message: 'Please contact administrator' });
                }

                bcrypt.compare(password, user[0].password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        
                    return done(null, user[0]);
                    }
                    else {
                        return done(null, false, { message: 'Password incorrect' });
                      }
                })


            }).catch((msg, err) => {
            console.log(msg, err)
        });

        })
    )  
    
    passport.serializeUser(function(user, done) {
        
        done(null, user.email);
      });
    
      passport.deserializeUser(function(id, done) 
      {
        utility.getuser(id).then(user=>{
           
            done(null,user[0])
        })
        
      });
}
