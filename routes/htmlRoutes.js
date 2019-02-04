var db = require("../models");
var passport = require('passport');

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    if (req.isAuthenticated()) {
      var user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      }
      res.render("dashboard", user);
    }
    else {
      res.render("index");
    }
  });

  app.get("/dashboard", function (req, res) {
    console.log("%%%%%%%%% is logged in: " + req.isAuthenticated());

    if (req.isAuthenticated()) {

      db.User.findOne({
        where: {
          uuid: req.session.passport.user
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
    else {
      var user = {
        id: null,
        isloggedin: req.isAuthenticated()
      }
      res.redirect("/login");
    }

  });

  app.get("/messages", function(req, res) {
    res.render("messages");
  });

  app.get("/profile", function(req, res) {
    res.render("profile");
  });

  app.get("/signup", function (req, res) {
    if(req.isAuthenticated()){
      res.redirect("/dashboard");
    }
    else{
      res.render("signup");
    }
  });

  app.get("/login", function (req, res) {
    if(req.isAuthenticated()){
      res.redirect("/dashboard");
    }
    else{
      res.render("login");
    }
  });

  app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
      req.logout();
      res.clearCookie('user_sid');
      res.clearCookie('first_name');
      res.clearCookie('user_id');
      res.redirect('/');
    });
  });

  app.post("/signup", function (req, res, next) {
    passport.authenticate('local-signup', function (err, usr, info) {
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
        res.send("Go Ahead");
      });
    })(req, res, next);
  });


  app.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, usr, info) {
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

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

