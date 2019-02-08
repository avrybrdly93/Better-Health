$(document).ready(function(){
  var docFName;
  var docLName;
  var docID;

    $("#msgBtn").on("click",function(){
        $.ajax({
            method: "GET",
            url: "/api/staff"
        }).then(function(result){
            console.log(result);
        });
    });
 
    $("#bookBtn").on("click",function(){
        $.ajax({
            method: "GET",
            url: "/api/staff"
        }).then(function(result){
            console.log(result);
            $("#modalBody").empty();
            $("#modalTitle").text("Choose Appointment Staff");
 
            var someSpace=$("<div>");
 
            if(result.length>0){
                for(var i=0;i<result.length;i++){
                    var someDiv=$("<div>");
                    $(someDiv).append("<p>"+result[i].last_name+", "+result[i].first_name+" - "+result[i].title+" - "+result[i].specialization);
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
 
                $("#modalBody").append(someSpace);
            }
            else{
                $("#modalBody").append("No Doctors Available Right Now. Check Again Soon.");
            }
        });
    });
 
    $('body').on('click', '.staffBookMe', function() {
        docFName=$(this).attr("data-fName");
        docLName=$(this).attr("data-lName");
        docID=$(this).attr("data-id");
 
        console.log(docID);
        console.log(docFName);
        console.log(docLName);
 
        $("#modalTitle").text("Appointment Details");
 
        $("#modalBody").empty();
 
        $("#modalBody").append("<p>Fill out the form below to book your next appointment.</p>");
 
        var newForm=$("<form>").addClass("uk-grid-small");
 
        $(newForm).append("<input type='text' id='dateField'>");
        $(newForm).append("<input type='text' id='timeField'>");
        $(newForm).append("<input type='text' id='reasonField'>");
        $(newForm).append("<button id='bookFormSubmit'>Submit</button>");
 
        $("#modalBody").append(newForm);
    });
 
    $('body').on('click', '#bookFormSubmit', function() {
        event.preventDefault();
 
        var newAppt={
            date: $("#dateField").val(),
            time: $("#timeField").val(),
            appt_reason: $("#reasonField").val(),
            staff_fName: docFName,
            staff_lName: docLName,
        };
 
        console.log(newAppt);
 
        $.ajax("/api/appointment/"+docID,{
            type: "POST",
            data: newAppt
        }).then(function(result){
            console.log(result);
 
        });
 
    });

    $("#records").on("click", function() {
        $.ajax({
          method: "GET",
          url: "/api/records"
        }).then(function(result) {
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

});