$(document).ready(function () {

  $(function() {
    $("input").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('#loginBtn').click();
            return false;
        } else {
            return true;
        }
    });
});


  // Front-End input validation with parsley
  $('#signup-form').parsley().on('field:validate', function () {
    var ok = $('.parsley-error').length === 0;
    $('.bs-callout-info').toggleClass('hidden', !ok);
    $('.bs-callout-warning').toggleClass('hidden', ok);
  })
    .on('form:submit', function () {
      console.log("submittted");
      return false; // Don't submit form for this demo
    });

  document.querySelector('.img__btn').addEventListener('click', function () {
    document.querySelector('.cont').classList.toggle('s--signup');
  });

  let phoneVals = '';
  let userPhoneNum = '';
  let password = '';
  let selectedState;

  $(".phoneInput").keyup(function () {
    if (this.value.length == this.maxLength) {
      $(this).next('.phoneInput').focus();
      phoneVals += $(this)[0].value;
    }
    if (phoneVals.length === 10) {
      userPhoneNum = phoneVals;
    }
  });

  function checkPasswordMatch() {
    password = $("#passwordSignup").val();
    var confirmPassword = $("#passwordInputConfirm").val();

    if (password != confirmPassword) {
      $(".passwordMatch").text("Passwords do not match!");
      return false;
    } else if (password.length > 7) {
      $(".passwordMatch").text("Passwords match.");
      return true;
    } else {
      $(".passwordMatch").text("Password needs to be at least eight characters.");
    }
  }

  $("#passwordInputConfirm").keyup(checkPasswordMatch);


  $("select.uk-select").change(function () {
    selectedState = $(this).children("option:selected").val();
  });

  $("#signUpBtn").on("click", function (event) {
    event.preventDefault();
    console.log("connected");

    let username = $("#username").val().trim() || null;
    let first_name = $("#fNameInput").val().trim() || null;
    let last_name = $("#lNameInput").val().trim() || null;
    let address = $("#addressInput").val().trim() || null;
    let city = $("#cityInput").val().trim() || null;
    let state = selectedState;
    let zip = $("#zipInput").val().trim() || null;
    let email = $("#emailSignup").val().trim() || null;
    let phone = userPhoneNum || null;
    let account_key = password || null;
    let newUsr;

    var userObj = {
      "username": username,
      "first_name": first_name,
      "last_name": last_name,
      "address": address,
      "city": city,
      "state": state,
      "zip": zip,
      "email": email,
      "phone": phone,
      "account_key": account_key
    };

    checkCredentials();
    addUserData();
    postSignup();

    function checkCredentials() {
      for (var key in userObj) {
        //console.log(key, userObj[key]);
        if (userObj[key] === null) {
          console.log("missing credentials");
        }
      }
    }

    function addUserData() {
      if (checkPasswordMatch() && password.length > 7) {
        newUsr = {
          "username": username,
          "first_name": first_name,
          "last_name": last_name,
          "address": address,
          "city": city,
          "state": state,
          "zip": zip,
          "email": email,
          "phone": phone,
          "account_key": account_key
        };
      } else {
        console.log("passwords do not match or are not long enough");
      }
    }
    function postSignup() {
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

    }
  });

  $("#usernameLogin").on("click", function() {
    $(".wrong-info").text("");
  });

  $("#passwordLogin").on("click", function() {
    $(".wrong-info").text("");
  });

  $("#loginBtn").on("click", function (event) {
    event.preventDefault();
    console.log("asdf");
    var tryUsr = {
      "username": $("#usernameLogin").val().trim(),
      "account_key": $("#passwordLogin").val().trim()
    }

    $.post("/login", tryUsr, function (data, status, xhr) {
      //console.log(data);

      //console.log(status);
      //console.log(xhr);
      //$("#loginForm")[0].reset();

      if (data.success === false) {
        $(".wrong-info").text("Incorrect username or password.");
      }
      else {
        switch (xhr.status) {
          case 200: {
            window.location.href = "/dashboard";
            break;
          }
          case 401: {
            window.location.href = "/login";
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
      }
    });
  });
});