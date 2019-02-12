$(document).ready(function () {
    var pFName;
    var pLName;
    var pID;

    //STAFF APPOINTMENTS
    $("#apptsBtn").on("click", function () {
        $("#appBody").empty();

        $.ajax({
            method: "GET",
            url: "/api/staff/appointments"
        }).then(function (result) {
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    var newRow = $("<tr>");

                    $(newRow).append("<td>" + result[i].patient_fName + "</td>");
                    $(newRow).append("<td>" + result[i].patient_lName + "</td>");
                    $(newRow).append("<td>" + result[i].date + "</td>");
                    $(newRow).append("<td>" + result[i].time + "</td>");
                    $(newRow).append("<td>" + result[i].appt_reason + "</td>");

                    $("#appBody").append(newRow);
                }
            }
            else {
                $("#appBody").append("<p>No Appointments Right Now.</p>");
            }
        });
    });
    //END OF STAFF APPOINTMENTS

    //STAFF MESSAGES
    $("#msgsBtn").on("click", function () {
        $.ajax({
            method: "GET",
            url: "/api/patients"
        }).then(function (result) {
            //console.log(result);
            $("#staffMsgBody").empty();
            $("#staffMsgTitle").empty();
            $("#staffMsgTitle").append("<h2 class class='uk-modal-title'>Messages</h2>");

            var someMSpace = $("<div>");

            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    var someMDiv = $("<div>");
                    $(someMDiv).append("<p>" + result[i].last_name + ", " + result[i].first_name);
                    var newMBtn = $("<button>Message</button>");

                    $(newMBtn).attr({
                        "data-id": result[i].uuid,
                        "data-fName": result[i].first_name,
                        "data-lName": result[i].last_name,
                    });

                    $(newMBtn).addClass("patientMsgMe");
                    $(someMDiv).append(newMBtn);
                    $(someMSpace).append(someMDiv);
                }

                $("#staffMsgBody").append(someMSpace);
            }
            else {
                $("#staffMsgBody").append("No Staff Available Right Now. Check Again Soon.");
            }
        });
    });

    $('body').on('click', '.patientMsgMe', function () {
        pFName = $(this).attr("data-fName");
        pLName = $(this).attr("data-lName");
        pID = $(this).attr("data-id");

        $("#staffMsgBody").empty();
        $("#staffMsgTitle").empty();

        $("#staffMsgTitle").append("<h2 class='uk-modal-title'>" + pFName + " " + pLName + "</h2>");
        getMessages();

    });

    function getMessages() {
        $.ajax({
            method: "GET",
            url: "/api/staff/messages/" + pID
        }).then(function (result) {
            $("#staffMsgBody").empty();
            //console.log("RESULT: "+result);
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    console.log(result[i]);
                    $("#staffMsgBody").append("<p>" + result[i].sender_fName + " - " + result[i].body + "</p>");
                    $("#staffMsgBody").append("<small>Sent at: " + result[i].createdAt + "</small><br>");
                }
            }
            else {
                $("#staffMsgBody").append("No Message History");
            }

            var msgForm = $("<form>").addClass("uk-grid-small");
            $(msgForm).append("<input type='text' id='msgBody' placeholder='Send Message...'>");
            $(msgForm).append("<button id='msgSubmitBtn'>Send</button>");
            $("#staffMsgBody").append(msgForm);
        });
    }

    $('body').on('click', '#msgSubmitBtn', function () {
        var newMsg = {
            "body": $("#msgBody").val().trim(),
            "receiver_fName": pFName,
            "receiver_lName": pLName
        };

        $.ajax("/api/staff/message/" + pID, {
            type: "POST",
            data: newMsg
        }).then(function (result) {
            //console.log(result);
            getMessages();
        });
    });
    //END OF MESSAGES

    //Search RECORDS
    $("#recordsBtn").on("click", function () {
        $("#staffRTitle").empty();
        $("#staffRBody").empty();

        $("#staffRTitle").append("<h2 class='uk-modal-title'>Search Records</h2>");

        $.ajax({
            method: "GET",
            url: "/api/patients"
        }).then(function (result) {
            //console.log(result);

            if (result.length > 0) {
                let table = $("<table>");
                table.addClass("uk-table uk-table-striped");
                let tableBody = $("<tbody>");
                $(table).append(tableBody);


                for (var i = 0; i < result.length; i++) {
                    let tableRow = $("<tr>");

                    $(tableRow).append("<td>" + result[i].last_name + "</td>");
                    $(tableRow).append("<td>" + result[i].first_name + "</td>");
                    var newBtn = $("<button>View</button>");

                    newBtn.attr({
                        "data-id": result[i].uuid,
                        "data-fName": result[i].first_name,
                        "data-lName": result[i].last_name,
                        "class": "btn"
                    });

                    newBtn.addClass("patientViewBtn");
                    newBtn.appendTo(tableRow);
                    $(tableBody).append(tableRow);
                }
                table.appendTo($("#staffRBody"));
            }
            else {
                $("#staffRBody").append("<i>No Patients Available Right Now. Check Again Soon.</i>");
            }
        });

    });

    $('body').on('click', '.patientViewBtn', function () {
        pID = $(this).attr("data-id");
        pFName = $(this).attr("data-fName");
        pLName = $(this).attr("data-lName");

        $("#staffRBody").empty();
        $("#staffRTitle").empty();
        $("#staffRTitle").append("<h2 class='uk-modal-title'>"+pLName+", "+pFName+"</h2>");

        $.ajax({
            method: "GET",
            url: "/api/staff/records/"+pID
        }).then(function(result){
            if (result.length > 0) {
                let table = $("<table>");
                table.addClass("uk-table uk-table-striped");
                let tableBody = $("<tbody>");
                $(table).append(tableBody);


                for (var i = 0; i < result.length; i++) {
                    let tableRow = $("<tr>");

                    $(tableRow).append("<td>"+result[i].event+"</td>");
                    $(tableRow).append("<td>"+result[i].description+"</td>");
                    $(tableRow).append("<td>"+result[i].location_name+"</td>");
                    $(tableRow).append("<td>"+result[i].date+"</td>");

                    $(tableBody).append(tableRow);
                }
                table.appendTo($("#staffRBody"));
            }
            else {
                $("#staffRBody").append("No Doctors Available Right Now. Check Again Soon.");
            }
        });

    });
    //END OF Search RECORDS

    //CREATE RECORDS
    $("#createBtn").on("click", function () {
        $("#createBody").empty();
        $("#createTitle").empty();
        $("#createTitle").append("<h2 class='uk-modal-title'>Create Record</h2>");

        $.ajax({
            method: "GET",
            url: "/api/patients"
        }).then(function (result) {
            //console.log(result);

            if (result.length > 0) {
                let table = $("<table>");
                table.addClass("uk-table uk-table-striped");
                let tableBody = $("<tbody>");
                $(table).append(tableBody);


                for (var i = 0; i < result.length; i++) {
                    let tableRow = $("<tr>");

                    tableRow.append("<td>" + result[i].last_name + "</td>");
                    tableRow.append("<td>" + result[i].first_name + "</td>");
                    var newBtn = $("<button>Create</button>");

                    newBtn.attr({
                        "data-id": result[i].uuid,
                        "data-fName": result[i].first_name,
                        "data-lName": result[i].last_name,
                        "class": "btn"
                    });

                    newBtn.addClass("patientCreateBtn");
                    newBtn.appendTo(tableRow);
                    $(tableBody).append(tableRow);
                }
                table.appendTo($("#createBody"));
            }
            else {
                $("#createBody").append("No Patients Found!");
            }
        });
    });

    $('body').on('click', '.patientCreateBtn', function () {
        pID = $(this).attr("data-id");
        pFName = $(this).attr("data-fName");
        pLName = $(this).attr("data-lName");

        $("#createBody").empty();
        var createForm = $("<form>");

        $(createForm).append("<input type='text' id='eventInput' placeholder='Medical Record'>");
        $(createForm).append("<input type='text' id='descInput' placeholder='Description'>");
        $(createForm).append("<input type='text' id='dateInput' placeholder='Date'>");
        $(createForm).append("<input type='text' id='locInput' placeholder='Location'>");
        $(createForm).append("<input type='text' id='addressInput' placeholder='Address'>");
        $(createForm).append("<input type='text' id='cityInput' placeholder='City'>");
        $(createForm).append("<input type='text' id='stateInput' placeholder='State'>");
        $(createForm).append("<input type='text' id='zipInput' placeholder='Zip'><br>");
        $(createForm).append("<button id='createRecSubmit' class='btn'>Create Record</button>");

        $("#createBody").append(createForm);
    });

    $('body').on('click', '#createRecSubmit', function () {
        var newRecord = {
            event: $("#eventInput").val().trim(),
            description: $("#descInput").val().trim(),
            location_name: $("#locInput").val().trim(),
            date: $("#dateInput").val().trim(),
            address: $("#addressInput").val().trim(),
            city: $("#cityInput").val().trim(),
            state: $("#stateInput").val().trim(),
            zip: $("#zipInput").val().trim(),
            patient_fName: pFName,
            patient_lName: pLName,
        };

        $.ajax("/api/record/" + pID, {
            type: "POST",
            data: newRecord
        }).then(function (result) {
            console.log(result);
            //location.reload();
        });

    });
    //END OF CREATE RECORDS
});