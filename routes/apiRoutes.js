var db = require("../models");
var passport = require('passport');

module.exports = function (app) {

  //PATIENT GET INFO
  app.get("/api/messages", function (req, res) {
    if (req.isAuthenticated() && req.session.passport.user.type==="Patient") {
      db.sMessage.findAll({
        where: {
          receiver: req.session.passport.user.uuid
        }
      }).then(function (result) {
        res.send(result);
      });
    }
    else{
      res.send("Access Not Granted.");
    }
  });

  app.get("/api/records", function (req, res) {
    if(req.isAuthenticated() && req.session.passport.user.type==="Patient"){
      db.Record.findAll({
        where: {
          PatientUuid: req.session.passport.user.uuid
        }
      }).then(function (result) {
        res.send(result);
      });
    }
    else{
      res.send("Access Not Granted.");
    }
  });

  app.get("/api/appointments", function (req, res) {
    if(req.isAuthenticated() && req.session.passport.user.type==="Patient"){
      db.pAppt.findAll({
        where: {
          PatientUuid: req.session.passport.user.uuid
        }
      }).then(function (result) {
        res.send(result);
      });
    }
    else{
      res.send("Access Not Granted.");
    }
  });
  //END OF PATIENT GET INFO

  //STAFF GET INFO
  app.get("/api/staff/messages", function (req, res) {
    if(req.isAuthenticated() && req.session.passport.user.type==="Staff"){
      db.pMessage.findAll({
        where: {
          receiver: req.session.passport.user.uuid
        }
      }).then(function (result) {
        res.send(result);
      });
    }
    else{
      res.send("Access Not Granted.");
    }
  });

  app.get("/api/staff/apointments", function (req, res) {
    if(req.isAuthenticated() && req.session.passport.user.type==="Staff"){
      db.sAppt.findAll({
        where: {
          StaffUuid: req.session.passport.user.uuid
        }
      }).then(function (result) {
        res.send(result);
      });
    }
    else{
      res.send("Access Not Granted.");
    }
  });
  //END OF STAFF GET INFO

  //PATIENT POST INFO
  app.post("/api/message", function (req, res) {
    if(req.isAuthenticated() && req.session.passport.user.type==="Patient"){
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
      res.send("Permission Not Given.");
    }
  });

  app.post("/api/record", function (req, res) {

    if(req.isAuthenticated() && req.session.passport.user.type==="Patient"){
      db.Record.create({
        event: req.body.event,
        description: req.body.description,
        location_name: req.body.location_name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        PatientUuid: req.body.PatientUuid
      });

      res.status(200);
      res.send("Record Uploaded!");
    }
    else{
      res.send("Permission Not Given.");
    }
  });

  app.post("/api/appointment", function (req, res) {
    if(req.isAuthenticated() && req.session.passport.user.type==="Patient"){
      db.pAppt.create({
        date: req.body.date,
        time: req.body.time,
        doctor_name: req.body.doctor_name,
        appt_reason: req.body.appt_reason,
        PatientUuid: req.session.passport.user.uuid
      });
      res.status(200);
      res.send("Appointment booked!");
    }
    else{
      res.send("Permission Not Given.")
    }
  });
  //END OF PATIENT POST INFO

  //STAFF POST INFO 
  app.post("/api/staff/message", function (req, res) {
    if(req.isAuthenticated() && req.session.passport.user.type==="Staff"){
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
      res.send("Permission Not Given.")
    }
  });

  app.post("api/staff/appointment", function (req, res) {
    if(req.isAuthenticated()){
      db.sAppt.create({
        StaffUuid: req.body.StaffUuid,
        date: req.body.date,
        time: req.body.time,
        patient_name: req.body.patient_name,
        visit_reason: req.body.visit_reason,
        room_number: req.body.room_number
  
      });
      res.status(200);
      res.send("Appointment booked!");
    }
    else{
      res.send("Permission Not Given.")
    }
  });
  //END OF STAFF POST INFO
};
