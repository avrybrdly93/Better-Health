var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("POST /api/message", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should save a message", function(done) {
    // Create an object to send to the endpoint
    var reqBody = {
      text: "Hey Doc!",
      description: "this will post patient message for doctor"
    };

    // POST the request body to the server
    request
      .post("/api/message")
      .send(reqBody)
      .end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("object")
          .that.includes(reqBody);

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});

describe("POST /api/record", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should save a message", function(done) {
    // Create an object to send to the endpoint
    var reqBody = {
      text: "Broken Leg",
      description: "This will post user record"
    };

    // POST the request body to the server
    request
      .post("/api/record")
      .send(reqBody)
      .end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("object")
          .that.includes(reqBody);

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});

describe("POST /api/appointment", function() {
    // Before each test begins, create a new request server for testing
    // & delete all examples from the db
    beforeEach(function() {
      request = chai.request(server);
      return db.sequelize.sync({ force: true });
    });
  
    it("should save the appointment", function(done) {
      // Create an object to send to the endpoint
      var reqBody = {
        text: "Appointment",
        description: "This will post patient appointment"
      };
  
      // POST the request body to the server
      request
        .post("/api/appointment")
        .send(reqBody)
        .end(function(err, res) {
          var responseStatus = res.status;
          var responseBody = res.body;
  
          // Run assertions on the response
  
          expect(err).to.be.null;
  
          expect(responseStatus).to.equal(200);
  
          expect(responseBody)
            .to.be.an("object")
            .that.includes(reqBody);
  
          // The `done` function is used to end any asynchronous tests
          done();
        });
    });
  });

  describe("POST /api/staff/message", function() {
    // Before each test begins, create a new request server for testing
    // & delete all examples from the db
    beforeEach(function() {
      request = chai.request(server);
      return db.sequelize.sync({ force: true });
    });
  
    it("should save staff message", function(done) {
      // Create an object to send to the endpoint
      var reqBody = {
        text: "Hey Patient!",
        description: "This will post staff message to patient"
      };
  
      // POST the request body to the server
      request
        .post("/api/staff/message")
        .send(reqBody)
        .end(function(err, res) {
          var responseStatus = res.status;
          var responseBody = res.body;
  
          // Run assertions on the response
  
          expect(err).to.be.null;
  
          expect(responseStatus).to.equal(200);
  
          expect(responseBody)
            .to.be.an("object")
            .that.includes(reqBody);
  
          // The `done` function is used to end any asynchronous tests
          done();
        });
    });
  });

  describe("POST /api/staff/appointment", function() {
    // Before each test begins, create a new request server for testing
    // & delete all examples from the db
    beforeEach(function() {
      request = chai.request(server);
      return db.sequelize.sync({ force: true });
    });
  
    it("should post patient appt to customer", function(done) {
      // Create an object to send to the endpoint
      var reqBody = {
        text: "patient appointment",
        description: "This will post patient appointment to staff calendar"
      };
  
      // POST the request body to the server
      request
        .post("/api/staff/appointment")
        .send(reqBody)
        .end(function(err, res) {
          var responseStatus = res.status;
          var responseBody = res.body;
  
          // Run assertions on the response
  
          expect(err).to.be.null;
  
          expect(responseStatus).to.equal(200);
  
          expect(responseBody)
            .to.be.an("object")
            .that.includes(reqBody);
  
          // The `done` function is used to end any asynchronous tests
          done();
        });
    });
  });