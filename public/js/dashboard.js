$(document).ready(function () {
    var docFName;
    var docLName;
    var docID;

    $("#bookBtn").on("click", function () {
        $.ajax({
            method: "GET",
            url: "/api/staff"
        }).then(function(result){
            console.log(result);
            $("#bookModalBody").empty();
            $("#bookModalTitle").text("Choose Appointment Staff");

            //var someSpace=$("<div>");
            // console.log(result.length);
              if(result.length>0){
              let table = $("<table>");
              table.addClass("uk-table uk-table-striped");
              let tableBody = $("<tbody>");
              tableBody.appendTo(table);
              table.appendTo($("#bookModalBody"));
                for(var i=0;i<result.length;i++){
                  let tableRow = $("<tr>");
                  tableRow.appendTo(tableBody);
                  let tableData = $("<td>");
                  tableData.appendTo(tableRow);
                  tableData.append("<p>"+result[i].last_name+", "+result[i].first_name+" - "+result[i].title+" - "+result[i].specialization);
                  var newBtn = $("<button>Book Me</button>");
    
                  newBtn.attr({
                      "data-id": result[i].uuid,
                      "data-fName": result[i].first_name,
                      "data-lName": result[i].last_name,
                       "class": " btn uk-button uk-button-primary uk-button-large uk-height-match"
                  });
  
                  newBtn.addClass("staffBookMe");
                  newBtn.appendTo(tableRow);
                 } 
                } else {
                $("#bookModalBody").append("No Doctors Available Right Now. Check Again Soon.");
            }

            $("bookModalBody").empty();
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

        $("#bookModalBody").append("<h4>Fill out the form below to book your next appointment.</h4><br>");

        var newForm = $("<form>").addClass("uk-grid-small");

        // This is for the date-picker
        $(newForm).append("Date:   <input type='text' class='uk-input'   id='dateField'><br><br>");  
      
        $(newForm).append("Time:   <input type='text' class='uk-input' id='timeField'><br><br>");
        $(newForm).append("Reason: <input type='text' class='uk-input' id='reasonField'><br><br>");
        $(newForm).append("<br><button class='btn uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom' id='bookFormSubmit'>Submit</button>");

        $("#bookModalBody").append(newForm);

    });

    $('body').on('click', '#bookFormSubmit', function () {
        event.preventDefault();

        var dateField = $("#dateField").val();
        var timeField = $("#timeField").val();
        var apptReason = $("#reasonField").val();

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
            console.log(result);
        });

        $("#bookModalBody").empty();

        $("#bookModalTitle").text("Appointment Confirmation Details");

        $("#bookModalBody").append("<h2>Date:</h2><h3>" + dateField + "</h3>");
        $("#bookModalBody").append("<h2>Time:</h2><h3>" + timeField + "</h3>");
        $("#bookModalBody").append("<h2>Reason:</h2><h3>" + apptReason + "</h3>");

      
    setTimeout(function(){ location.reload(); }, 3000);
    
          
    });


    // Card for Appointment

    $.ajax({
        method: "GET",
        url: "/api/appointments"
    }).then(function (result) {
        console.log(result);
        if (result.length > 0) {
            $("#book-card-title").text(` Next Appointment`)
            $("#book-card-body").text(`${result[result.length-1].appt_reason} with ${result[result.length-1].staff_fName} ${result[result.length-1].staff_lName} at ${result[result.length-1].time} on ${result[0].date}`)
        }

    });
    
   





});
// (function (global, factory) {
// 	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
// 	typeof define === 'function' && define.amd ? define('uikit', factory) :
// 	(factory());
// }(this, (function () { 'use strict';
// })));