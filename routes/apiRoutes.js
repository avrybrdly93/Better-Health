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

// Routes for patients 
module.exports = function(app) {
  // GET route for getting all the patients
  app.get("/api/patient", function(req, res) {
  
      db.Patient.findAll({}).then(function(dbPatient) {
    
       res.json(dbPatient);
      });
  });

  app.post("/api/patient", function(req, res) {
      console.log(req.body);
 
      db.Patient.create({
          text: req.body.text,
          complete: req.body.complete
      }).then(function(dbPatient) {
   
          res.json(dbPatient);
      });
  });

  app.delete("/api/patient/:id", function(req, res) {
      db.Patient.destroy({where:{id:req.params.id}})
  .then(function(dbPatient){
      res.json(dbPatient);
  });

  });

  app.put("/api/patient", function(req, res) {

  });
};

// This is for medstaff
module.exports = function(app) {
  // GET route for getting all the patients
  app.get("/api/medstaff", function(req, res) {
  
      db.Medstaff.findAll({}).then(function(dbMedstaff) {
    
       res.json(dbMedstaff);
      });
  });

  app.post("/api/medstaff", function(req, res) {
      console.log(req.body);
 
      db.Medstaff.create({
          text: req.body.text,
          complete: req.body.complete
      }).then(function(dbMedstaff) {
   
          res.json(dbMedstaff);
      });
  });

  app.delete("/api/medstaff/:id", function(req, res) {
      db.Medstaff.destroy({where:{id:req.params.id}})
  .then(function(dbMedstaff){
      res.json(dbMedstaff);
  });

  });

  app.put("/api/medstaff", function(req, res) {

  });
};

