$(document).ready(function () {
  var docFName;
  var docLName;
  var docID;
  var docTitle;
  var docSP;

  //MESSAGES
  $("#msgBtn").on("click", function () {
    $.ajax({
      method: "GET",
      url: "/api/staff"
    }).then(function (result) {
      console.log(result);
      $("#msgModalBody").empty();
      $("#msgModalTitle").empty();
      $("#msgModalTitle").append("<h2 class class='uk-modal-title'>Messgae Our Staff</h2>");

      var someMSpace = $("<div>");

      if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
          var someMDiv = $("<div>");
          $(someMDiv).append("<p>" + result[i].last_name + ", " + result[i].first_name + " - " + result[i].title + " - " + result[i].specialization);
          var newMBtn = $("<button>Message Me</button>");

          $(newMBtn).attr({
            "data-id": result[i].uuid,
            "data-fName": result[i].first_name,
            "data-lName": result[i].last_name,
            "data-title": result[i].title,
            "data-specialization": result[i].specialization
          });

          $(newMBtn).addClass("staffMsgMe");
          $(someMDiv).append(newMBtn);
          $(someMSpace).append(someMDiv);
        }

        $("#msgModalBody").append(someMSpace);
      }
      else {
        $("#bookModalBody").append("No Staff Available Right Now. Check Again Soon.");
      }
    });
  });

  $('body').on('click', '.staffMsgMe', function () {
    docFName = $(this).attr("data-fName");
    docLName = $(this).attr("data-lName");
    docID = $(this).attr("data-id");
    docTitle=$(this).attr("data-title");
    // console.log(docID);
    // console.log(docFName);
    // console.log(docLName);
    $("#msgModalBody").empty();
    $("#msgModalTitle").empty();

    $("#msgModalTitle").append("<h2 class='uk-modal-title'>"+docFName+" "+docLName+"</h2>");
    $("#msgModalTitle").append("<small>"+docTitle+"</small>");
    getMessages();
    
  });

  function getMessages(){
    $.ajax({
      method: "GET",
      url: "/api/messages/"+docID
    }).then(function(result){
      $("#msgModalBody").empty();
      console.log(result);
      if(result.length>0){
        for(var i=0;i<result.length;i++){
          $("#msgModalBody").append("<p>"+result[i].sender_fName+" - "+result[i].body+"</p>");
          $("#msgModalBody").append("<small>Sent at: "+result[i].createdAt+"</small><br>");
        } 
      }
      else{
        $("#msgModalBody").append("No Message History");
      }

      var msgForm = $("<form>").addClass("uk-grid-small");
      $(msgForm).append("<input type='text' id='msgBody' placeholder='Send Message...'>");
      $(msgForm).append("<button id='msgSubmitBtn'>Send</button>");
      $("#msgModalBody").append(msgForm);
    });
  }

  $('body').on('click', '#msgSubmitBtn', function () {
    var newMsg = {
      "body": $("#msgBody").val().trim(),
      "receiver_fName": docFName,
      "receiver_lName": docLName
    };

    $.ajax("/api/message/" + docID, {
      type: "POST",
      data: newMsg
    }).then(function (result) {
      console.log(result);
      getMessages();
    });
  });

  //END OF MESSAGES

  //BOOK APPOINTMENT
  $("#bookBtn").on("click", function () {
    $.ajax({
      method: "GET",
      url: "/api/staff"
    }).then(function (result) {
      console.log(result);
      $("#bookModalBody").empty();
      $("#bookModalTitle").text("Choose Appointment Staff");

      var someSpace = $("<div>");

      if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
          var someDiv = $("<div>");
          $(someDiv).append("<p>" + result[i].last_name + ", " + result[i].first_name + " - " + result[i].title + " - " + result[i].specialization);
          var newBtn = $("<button>Book Me</button>");

          $(newBtn).attr({
            "data-id": result[i].uuid,
            "data-fName": result[i].first_name,
            "data-lName": result[i].last_name,
          });

          $(newBtn).addClass("staffBookMe");
          $(someDiv).append(newBtn);
          $(someSpace).append(someDiv);
        }

        $("#bookModalBody").append(someSpace);
      }
      else {
        $("#bookModalBody").append("No Doctors Available Right Now. Check Again Soon.");
      }
    });
  });

  $('body').on('click', '.staffBookMe', function () {
    docFName = $(this).attr("data-fName");
    docLName = $(this).attr("data-lName");
    docID = $(this).attr("data-id");

    console.log(docID);
    console.log(docFName);
    console.log(docLName);

    $("#bookModalTitle").text("Appointment Details");

    $("#bookModalBody").empty();

    $("#bookModalBody").append("<p>Fill out the form below to book your next appointment.</p>");

    var newForm = $("<form>").addClass("uk-grid-small");

    $(newForm).append("<input type='text' id='dateField'>");
    $(newForm).append("<input type='text' id='timeField'>");
    $(newForm).append("<input type='text' id='reasonField'>");
    $(newForm).append("<button id='bookFormSubmit'>Submit</button>");

    $("#bookModalBody").append(newForm);
  });

  $('body').on('click', '#bookFormSubmit', function () {
    event.preventDefault();

    var newAppt = {
      date: $("#dateField").val(),
      time: $("#timeField").val(),
      appt_reason: $("#reasonField").val(),
      staff_fName: docFName,
      staff_lName: docLName,
    };

    console.log(newAppt);

    $.ajax("/api/appointment/" + docID, {
      type: "POST",
      data: newAppt
    }).then(function (result) {
      //console.log(result);
      location.reload();
    });

  });

  //RECORDS 
  $("#recordsBtn").on("click", function () {
    $.ajax({
      method: "GET",
      url: "/api/records"
    }).then(function (result) {
      var tableBody = $(".recordHistory");
      $("#recordSheetName").text(result[1] + " " + result[2]);
      console.log(result);
      if (result[0].length > 0) {
        for (let i = 0; i < result[0].length; i++) {
          var newRow = $("<tr>");
          var recordEvent = $("<td>").text(result[0][i].event);
          var recordDescription = $("<td>").text(result[0][i].description);
          var recordlocation = $("<td>").text(result[0][i].location_name);
          var options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          };

          var recordDate = $("<td>").text(
            new Date(result[0][i].createdAt).toLocaleDateString("en-US")
          );

          newRow.append(
            recordEvent,
            recordDescription,
            recordlocation,
            recordDate
          );
          tableBody.append(newRow);
        }
      } else {
        tableBody.append("<p>No Records Found</p>");
      }
    });
  });
  //END OF RECORDS
});