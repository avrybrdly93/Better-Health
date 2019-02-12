var localStrategy = require("passport-local").Strategy;

var db = require("../models");

module.exports = function (passport) {
    passport.serializeUser(function (entity, done) {
        done(null, entity);
    });

    passport.deserializeUser(function (obj, done) {
        switch (obj.type) {
            case "Patient": {
                db.Patient.findById(obj.uuid).then(function (user) {
                    if (user) {
                        done(null, user.get());
                    }
                    else {
                        done(user.errors, null)
                    }
                });

                break;
            }
            case "Staff": {
                db.Staff.findById(obj.uuid).then(function (user) {
                    if (user) {
                        done(null, user.get());
                    }
                    else {
                        done(user.errors, null);
                    }
                });

                break;
            }
            default: {
                done(new Error('no entity type:', obj.type), null);
                break;
            }

        }
    });

    passport.use('local-signup-patients', new localStrategy({
        usernameField: 'username',
        passwordField: 'account_key',
        passReqToCallback: true
    }, function (req, username, account_key, done) {
        process.nextTick(function () {
            db.Patient.findOne({
                where: {
                    username: username
                }
            }).then(function (user, err) {
                if (err) {
                    console.log("err", err)
                    return done(err);
                }
                if (user) {
                    console.log('signupMessage', 'That username or email is already taken.');
                    return done(null, false, req.flash('signupMessage', 'That username or email is already taken.'));
                }
                else {
                    db.Patient.create({
                        username: req.body.username,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        address: req.body.address,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        email: req.body.email,
                        phone: req.body.phone,
                        //StaffUuid: db.Patient.findDoctor(),
                        type: "Patient",
                        account_key: db.Patient.generateHash(account_key)
                    }).then(function (dbUser) {
                        return done(null, dbUser);
                    }).catch(function (err) { console.log(err); });
                }
            });
        });
    }));

    passport.use('local-login-patients', new localStrategy({
        usernameField: 'username',
        passwordField: 'account_key',
        passReqToCallback: true
    }, function (req, username, account_key, done) {
        db.Patient.findOne({
            where: {
                username: req.body.username
            }
        }).then(function(user, err) {
            try{
                (!user.validPassword(req.body.account_key));
            }
            catch(err){
                console.log(err);
            }
            
            if (!user){
                console.log("No User Found");
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
            if (user && !user.validPassword(req.body.account_key)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }

            return done(null, user);
        });
    }));


    passport.use('local-signup-staff', new localStrategy({
        usernameField: 'username',
        passwordField: 'account_key',
        passReqToCallback: true
    }, function (req, username, account_key, done) {
        process.nextTick(function () {
            db.Staff.findOne({
                where: {
                    username: username
                }
            }).then(function (user, err) {
                if (err) {
                    console.log("err", err)
                    return done(err);
                }
                if (user) {
                    console.log('signupMessage', 'That username or email is already taken.');
                    return done(null, false, req.flash('signupMessage', 'That username or email is already taken.'));
                }
                else {
                    db.Staff.create({
                        username: req.body.username,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        title: req.body.title,
                        specialization: req.body.specialization,
                        address: req.body.address,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        email: req.body.email,
                        phone: req.body.phone,
                        type: "Staff",
                        account_key: db.Staff.generateHash(account_key)
                    }).then(function (dbUser) {
                        return done(null, dbUser);
                    }).catch(function (err) { console.log(err); });
                }
            });
        });
    }));

    passport.use('local-login-staff', new localStrategy({
        usernameField: 'username',
        passwordField: 'account_key',
        passReqToCallback: true
    }, function (req, username, account_key, done) {
        db.Staff.findOne({
            where: {
                username: req.body.username
            }
        }).then(function(user, err) {
            try{
                (!user.validPassword(req.body.account_key));
            }
            catch(err){
                console.log(err);
            }
            if (!user){
                console.log("No User Found");
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
            if (user && !user.validPassword(req.body.account_key)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }

            return done(null, user);
        });
    }));
}