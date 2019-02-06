var db = require("../models");
var passport = require('passport');

module.exports = function(app) {

  //PATIENT INFO
  app.post("/api/message", function (req, res) {
    if(req.isAuthenticated()){
      db.pMessage.create({
        title: req.body.title,
        body: req.body.body,
        receiver: req.body.receiverUuid,
        PatientUuid: req.session.passport.user.uuid
      });
  
      res.status(200);
      res.send("Message Sent!");
    }
    else{
      res.status(401);
    }
  });

  app.post("/api/record", function (req, res) {
    if(req.isAuthenticated()){
      db.Record.create({
        event: req.body.event,
        description: req.body.description,
        location_name: req.body.location_name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        PatientUuid: req.session.passport.user.uuid
      });
  
      res.status(200);
      res.send("Record Uploaded!");
    }
    else{
      res.status(401);
    }
  });

  app.post("/api/appointment",function(req,res){
    if(req.isAuthenticated()){

    }
    else{

    }

  });
  //END OF PATIENT INFO

  //STAFF INFO 
  app.post("/api/staff/message", function (req, res) {
    if(req.isAuthenticated()){
      db.sMessage.create({
        title: req.body.title,
        body: req.body.body,
        receiver: req.body.receiverUuid,
        StaffUuid: req.session.passport.user.uuid
      });
  
      res.status(200);
      res.send("Message Sent!");
    }
    else{
      res.status(401);
    }

  });

  app.post("api/staff/appointment",function(req,res){
    if(req.isAuthenticated()){

    }
    else{

    }
  });
  //END OF STAFF INFO
};
