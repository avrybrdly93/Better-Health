$(document).ready(function(){
    //STAFF APPOINTMENTS
    $("#apptsBtn").on("click",function(){
        $("#appBody").empty();

        $.ajax({
            method: "GET",
            url: "/api/staff/appointments"
        }).then(function(result){
            if(result.length>0){
                for(var i=0;i<result.length;i++){
                    var newRow=$("<tr>");

                    $(newRow).append("<td>"+result[i].patient_fName+"</td>");
                    $(newRow).append("<td>"+result[i].patient_lName+"</td>");
                    $(newRow).append("<td>"+result[i].date+"</td>");
                    $(newRow).append("<td>"+result[i].time+"</td>");
                    $(newRow).append("<td>"+result[i].appt_reason+"</td>");

                    $("#appBody").append(newRow);
                }
            }
            else{
                $("#appBody").append("<p>No Appointments Right Now.</p>");
            }
        }); 
    });
    //END OF STAFF APPOINTMENTS

    //STAFF MESSAGES
    $("#msgsBtn").on("click",function(){

    });
    //END OF MESSAGES

    //RECORDS
    $("#recordsBtn").on("click",function(){

    });
    //END OF RECORDS
});