var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

// Test for Record Page

describe("GET /api/record", function() {
  //this.timeout(10000);
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("test request for records", function(done) {
    // Add some examples to the db to test with
    db.Record.bulkCreate([
      {
        event: "Broken Leg Surgery",
        description: "First surgery operating on broken leg",
        location_name: "Riverside Community Hospital",
        address: "5555 Downtown Avenue",
        city: "Riverside",
        state: "CA",
        zip: "92506",
        PatientUuid: "9c4f9a10-2991-11e9-a310-6d0753733a9d"
      },
      {
        event: "Broken Arm Surgery",
        description: "First surgery operating on broken leg",
        location_name: "Riverside Community Hospital",
        address: "5555 Downtown Avenue",
        city: "Riverside",
        state: "CA",
        zip: "92506",
        PatientUuid: "9c4f9a10-2991-11e9-a310-6d0753733a9d"
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/record").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        //expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        // expect(responseBody)ƒ
        //   .to.be.an("array")
        //   .that.has.lengthOf(0);

        // expect(responseBody[0]).to.be.an("object");
        // .that.includes({
        //   event: "",
        //   description: "Patients sign in"
        // });

        // expect(responseBody[1])
        //   .to.be.an("object")
        //   .that.includes({
        //     text: "Username and password",
        //     description:
        //       "The patient goes to a dashboard after entering login info"
        //   });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});

// test for message

describe("GET/api/message", function() {
  
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("test request for messages", function(done) {
    
    db.pMessages.bulkCreate([
         {
        title: "Message",
        body: "Concerns on the leg pain",
        receiever: "Staff Uuid",
        createdAt: "February 6, 2019",
        updatedAt: "February 7, 2019",
        PatientUuid: "9c4f9a10-2991-11e9-a310-6d0753733a9d"
      },
      {
        title: "Message",
        body: "Requests for appintments",
        receiever: "Staff Uuid",
        createdAt: "February 6, 2019",
        updatedAt: "February 7, 2019",
        PatientUuid: "9c4f9a10-2991-11e9-a310-6d0753733a9d"
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/message").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;
      expect(responseStatus).to.equal(200);
      done();
      });
    });
  });
});

// test for appointment route

describe("GET/api/appointment", function() {
  
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("test request for appointments", function(done) {
    
    db.pAppts.bulkCreate([
   {
        date: "22 Jan, 2019",
        time: "3pm-4pm",
        doctor_name: "Tom Hanks",
        createdAt: "January 15, 2019",
        updatedAt: "January 20, 2019",
        PatientUuid: "9c4f9a10-2991-11e9-a310-6d0753733a9d"
        
      },
      {
        date: "1 Feb, 2019",
        time: "3pm-4pm",
        doctor_name: "Lisa Parkley",
        createdAt: "January 20, 2019",
        updatedAt: "January 21, 2019",
        PatientUuid: "9c4f9a10-2991-11e9-a310-6d0753733a9d"
        
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/appintments").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;
      expect(responseStatus).to.equal(200);
      done();
      });
    });
  });
});

// test for staff messages

describe("GET/api/staff/message", function() {
  
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("test request for staff messages", function(done) {
    
    db.sMessages.bulkCreate([
   {
         
        title: "Message",
        body: "Quick notes for coming appointment",
        receiever: "PatientUuid",
        createdAt: "February 6, 2019",
        updatedAt: "February 7, 2019",
        StaffUuid: "9c4f9a10-2991-11e9-a310-6d0753733a9d"
      
        
      },
      {
        title: "Message",
        body: "Recommendations",
        receiever: "PatientUuid",
        createdAt: "February 6, 2019",
        updatedAt: "February 7, 2019",
        StaffUuid: "9c4f9a10-2991-11e9-a310-6d0753733a9d"
      
        
        
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/appintments").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;
      expect(responseStatus).to.equal(200);
      done();
      });
    });
  });
});

// test for staff appointments

describe("/api/staff/appointment", function() {
  
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("test request for staff appointments", function(done) {
    
    db.sAppts.bulkCreate([
   {
        patient_name: "Ana Sanora",
        time: "3pm-4pm",
        date: "Feb 5, 2019",
        room_number: "203",
        visit_reason: "regular headaches",
        createdAt: "February 1, 2019",
        updatedAt: "February 3, 2019",
        StaffUuid: "9c4f9a10-2991-11e9-a310-6d0753733a9d"
        
      },
      {
        patient_name: "Tom Stevenson",
        time: "2pm-4pm",
        date: "Feb 10, 2019",
        room_number: "202",
        visit_reason: "compulsive eating disorder",
        createdAt: "February 1, 2019",
        updatedAt: "February 3, 2019",
        StaffUuid: "9c4f9a10-2991-11e9-a310-6d0753733a9d"
        
        
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/staff/appointment").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;
      expect(responseStatus).to.equal(200);
      done();
      });
    });
  });
});