$(document).ready(function () {

let selectedState;

$("select.uk-select").change(function(){
    selectedState = $(this).children("option:selected").val();
});

$("#submitBtn").on("click", function (event) {
  event.preventDefault();
    console.log(selectedState);

  var newUsr = {
    "first_name": $("#fNameInput").val().trim(),
    "last_name": $("#lNameInput").val().trim(),
    "address": $("#addressInput").val().trim(),
    "city": $("#cityInput").val().trim(),
    "state": selectedState,
    "zip": $("#zipInput").val().trim(),
    "email": $("#emailInput").val().trim(),
    "phone": $("#phoneInput").val().trim(),
    "isPatient": true,
    "account_key": $("#passwordInput").val().trim()
  };

  console.log(newUsr);

  $.post("/signup", newUsr, function (data, status, xhr) {
    console.log(data);
    console.log(status);
    console.log(xhr);
    
    switch (xhr.status) {
      case 200: {
        window.location.href = "/dashboard";
        break;
      }
      case 401: {
        window.location.href = "/signup";
        break;
      }
      case 404: {
        window.location.href = "*";
        break;
      }
      case 500: {
        alert("Refresh Page!");
        break;
      }
    }
    
  });

});
});