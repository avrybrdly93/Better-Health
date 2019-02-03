var localStrategy = require("passport-local").Strategy;

var db = require("../models");

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.uuid);
    });

    passport.deserializeUser(function (uuid, done) {
        db.User.findById(uuid).then(function (user) {
            if (user) {
                done(null, user.get());
            }
            else {
                done(user.errors, null)
            }
        });
    });

    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'account_key',
        passReqToCallback: true
    }, function (req, email, account_key, done) {
        process.nextTick(function () {
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(function (user, err) {
                if (err) {
                    console.log("err", err)
                    return done(err);
                }
                if (user) {
                    console.log('signupMessage', 'That email is already taken.');
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } 
                else {
                    db.User.create({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        address: req.body.address,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        email: req.body.email,
                        phone: req.body.phone,
                        isPatient: req.body.isPatient,
                        account_key: db.User.generateHash(account_key)
                    }).then(function (dbUser) {
                        return done(null, dbUser);
                    }).catch(function (err) { console.log(err); });
                }
            });
        });
    }));

    passport.use('local-login', new localStrategy({
        usernameField: 'email',
        passwordField : 'account_key',
        passReqToCallback : true 
    },function(req, email, account_key, done) { 
        db.User.findOne({
            where: {
                email: req.body.email 
            }
        }).then(function(user, err) {
            (!user.validPassword(req.body.account_key));
            if (!user){
                console.log("No User Found");
                return done(null, false, req.flash('loginMessage', 'No user found.')); 
            }
            if (user && !user.validPassword(req.body.account_key)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
            }
            
            return done(null, user);
        });
    }));
}