$(document).ready(function () {

  let phoneVals = '';
  let userPhoneNum = '';
  let password = '';
  let selectedState;
  
  $(".phoneInput").keyup(function () {
    if (this.value.length == this.maxLength) {
        $(this).next('.phoneInput').focus();
        phoneVals += $(this)[0].value;
  }
    if(phoneVals.length === 10) {
      userPhoneNum = phoneVals;
    }
  });  

  function checkPasswordMatch() {
    password = $("#passwordInput").val();
    var confirmPassword = $("#passwordInputConfirm").val();

    if (password != confirmPassword) {
      $(".passwordMatch").text("Passwords do not match!");
      return false;
    } else {
      $(".passwordMatch").text("Passwords match.");
      return true;
    }

}
   $("#passwordInputConfirm").keyup(checkPasswordMatch);


$("select.uk-select").change(function(){
    selectedState = $(this).children("option:selected").val();
});

$("#submitBtn").on("click", function (event) {
  event.preventDefault();

  if(checkPasswordMatch() && password.length > 7) {
    var newUsr = {
      "username": $("#userName").val().trim(),
      "first_name": $("#fNameInput").val().trim(),
      "last_name": $("#lNameInput").val().trim(),
      "address": $("#addressInput").val().trim(),
      "city": $("#cityInput").val().trim(),
      "state": selectedState,
      "zip": $("#zipInput").val().trim(),
      "email": $("#emailInput").val().trim(),
      "phone": userPhoneNum,
      "isPatient": true,
      "account_key": password
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
  } else {
    alert("passwords do not match");
  }
});
});