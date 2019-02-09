var db = require("../models");
var passport = require('passport');

module.exports = function (app) {
  // Load index/home page
  app.get("/", function (req, res) {
    if (req.isAuthenticated()) {
      var user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated(),
        type: req.session.passport.user.type
      }

      if(req.session.passport.user.type==="Staff"){
        res.redirect("/staff/dashboard");
      }
      else{
        res.redirect("/dashboard")
      }
    }
    else {
      res.render("index");
    }
  });

  //LOGOUT FOR BOTH STAFF - PATIENTS
  app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
      req.logout();
      res.clearCookie('user_sid');
      res.clearCookie('first_name');
      res.clearCookie('user_id');
      res.redirect('/');
    });
  });

  //PATIENT GET ROUTES
  app.get("/portal", function (req, res) {
    if (req.isAuthenticated()) {

      if(req.session.passport.user.type==="Staff"){
        res.redirect("/staff/dashboard");
      }
      else {
        res.redirect("/dashboard");
      }
    }
    else {
      res.render("portal");
    }
  });

  app.get("/profile", function (req, res) {
    res.render("profile");
  });

  app.get("/holistic", function (req, res) {
    res.render("holistic/choice");
  });

  app.get("/dashboard", function (req, res) {
    console.log("%%%%%%%%% is logged in: " + req.isAuthenticated());

    if (req.isAuthenticated()) {

      if(req.session.passport.user.type==="Staff"){
        res.redirect("/staff/dashboard");
      }
      else{
        db.Patient.findOne({
          where: {
            uuid: req.session.passport.user.uuid
          }
        }).then(function (dbUser) {
          var user = {
            userInfo: dbUser.dataValues,
            id: req.session.passport.user,
            isloggedin: req.isAuthenticated()
          }
          res.render("dashboard");
        });
      }
    }
    else {
      var user = {
        id: null,
        isloggedin: req.isAuthenticated()
      }
      res.redirect("/portal");
    }

  });
  //END OF PATIENT GET ROUTES

  //STAFF GET ROUTES
  app.get("/staff/signup", function (req, res) {
    if (req.isAuthenticated()) {
      if(req.session.passport.user.type==="Staff"){
        res.redirect("/staff/dashboard");
      }
      else{
        res.redirect("/dashboard");
      }
    }
    else {
      res.render("staffsignup");
    }
  });

  app.get("/staff/login", function (req, res) {
    if (req.isAuthenticated()) {
      if(req.session.passport.user.type==="Staff"){
        res.redirect("/staff/dashboard");
      }
      else{
        res.redirect("/dashboard");
      }
    }
    else {
      res.render("stafflogin");
    }
  });

  app.get("/staff/dashboard", function (req, res) {
    console.log("%%%%%%%%% is logged in: " + req.isAuthenticated());
    if (req.isAuthenticated()) {

      if(req.session.passport.user.type==="Staff"){
        db.Staff.findOne({
          where: {
            uuid: req.session.passport.user.uuid
          }
        }).then(function (dbUser) {
          var user = {
            userInfo: dbUser.dataValues,
            id: req.session.passport.user,
            isloggedin: req.isAuthenticated()
          }
          res.render("staffdashboard");
        });
      }
      else{
        res.redirect("/dashboard");
      }
    }
    else {
      var user = {
        id: null,
        isloggedin: req.isAuthenticated()
      }
      res.redirect("/admin/login");
    }

  });
  //END OF STAFF GET ROUTES

  //PATIENT POST ROUTES
  app.post("/signup", function (req, res, next) {
    passport.authenticate('local-signup-patients', function (err, usr, info) {
      console.log("info", info);
      if (err) {
        console.log("Passport Error: " + err);
        return next(err);
      }
      if (!usr) {
        console.log("user error " + usr);
        return res.send({ success: false, message: 'Authentication Failed' });
      }

      req.login(usr, loginErr => {
        if (loginErr) {
          console.log("Login Error " + loginErr);
          return next(loginErr);
        }
        console.log('redirecting....');
        res.cookie('first_name', usr.first_name);
        res.cookie('user_id', usr.uuid);
        res.status(200);
        res.send("Signed Up!");
      });
    })(req, res, next);
  });


  app.post('/login', function (req, res, next) {
    passport.authenticate('local-login-patients', function (err, usr, info) {
      console.log("\n\n\n########userrrr", usr)
      if (err) {
        console.log("passport err", err);
        return next(err); // will generate a 500 error
      }
      if (!usr) {
        return res.send({ success: false, message: 'Authentication Failed' });
      }
      req.login(usr, loginErr => {
        if (loginErr) {
          console.log("loginerr", loginErr);
          return next(loginErr);
        }

        console.log('redirecting....');
        res.cookie('first_name', usr.first_name);
        res.cookie('user_id', usr.uuid);

        res.status(200);
        res.send("Go Ahead");
      });
    })(req, res, next);
  });
  //END OF PATIENT POST ROUTES

  //STAFF POST ROUTES
  app.post("/staff/signup", function (req, res, next) {
    passport.authenticate('local-signup-staff', function (err, usr, info) {
      console.log("info", info);
      if (err) {
        console.log("Passport Error: " + err);
        return next(err);
      }
      if (!usr) {
        console.log("user error " + usr);
        return res.send({ success: false, message: 'Authentication Failed' });
      }

      req.login(usr, loginErr => {
        if (loginErr) {
          console.log("Login Error " + loginErr);
          return next(loginErr);
        }
        console.log('redirecting....');
        res.cookie('first_name', usr.first_name);
        res.cookie('user_id', usr.uuid);
        res.status(200);
        res.send("Signed Up!");
      });
    })(req, res, next);
  });

  app.post('/staff/login', function (req, res, next) {
    passport.authenticate('local-login-staff', function (err, usr, info) {
      console.log("\n\n\n########userrrr", usr)
      if (err) {
        console.log("passport err", err);
        return next(err); // will generate a 500 error
      }
      if (!usr) {

        return res.send({ success: false, message: 'Authentication Failed' });
      }
      req.login(usr, loginErr => {
        if (loginErr) {
          console.log("loginerr", loginErr);
          return next(loginErr);
        }

        console.log('redirecting....');
        res.cookie('first_name', usr.first_name);
        res.cookie('user_id', usr.uuid);

        res.status(200);
        res.send("Go Ahead");
      });
    })(req, res, next);
  });
  //END OF STAFF POST ROUTES

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
}; 