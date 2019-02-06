$(document).ready(function(){

    new AppointmentPicker(document.getElementById('time-form'), {
      interval: 30,
      mode: '12h',
      startTime: 9,
      endTime: 18,
      minTime: 13,
      maxTime: 17,
      disabled: ['4:00 pm', '4:30 pm'],
      allowReset: false,
      large: true
    });
    
      // In this code, jQuery is used to "download" the data from our server
      // We then dynamically display this content in our table. This is very similar to the group projects you just completed.
      // It's also very similar to the NYT search application. In fact, I copied a ton of code from there.
    
      function runApptQuery() {
        // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
        $.ajax({ url: "/api/tables", method: "GET" })
          .then(function(apptData) {
    
            // Here we then log the tableData to console, where it will show up as an object.
            console.log(apptData);
            console.log("------------------------------------");
    
            // Loop through and display each of the customers
            for (var i = 0; i < apptData.length; i++) {
    
              // Get a reference to the tableList element and populate it with tables
              var apptList = $("#apptList");
    
              // Then display the fields in the HTML (Section Name, Date, URL)
              var listItem = $("<li class='list-group-item mt-4'>");
    
              listItem.append(
                // $("<h2>").text("Table #" + (i + 1)),
                $("<hr>"),
                $("<h2>").text("Date & Time: " + apptData[i].apptDate + "&" + tableData[i].apptTime),
                $("<h2>").text("Name: " + apptData[i].patientName),
                $("<h2>").text("Email: " + apptData[i].patientEmail),
                $("<h2>").text("Phone: " + apptData[i].phoneNumber),
                
              );
    
              apptList.append(listItem);
              console.log(listItem);
            }
          });
          
      }
    
      // This function resets all of the data in our tables. This is intended to let you restart a demo.
      function clearTable() {
        alert("Clearing...");
    
        // Clear the tables on the server and then empty the elements on the client
        $.ajax({ url: "/api/clear", method: "POST" }).then(function() {
          $("#apptList").empty();
        });
      }
    
      $("#clear").on("click", clearTable);
    
    
      // Run Queries!
      // ==========================================
      runApptQuery();
      
  });
  
  