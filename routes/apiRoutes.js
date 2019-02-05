var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
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

