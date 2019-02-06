$(document).ready(function () {
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();

        var user = $("#emailInput").val().trim();
        var pw = $("#passwordInput").val().trim();
        var btn = $("#submitbtn");

        btn.click(() => {
            if (user === "") {
                btn.attr("onclick", UIkit.notification({ message: '<span uk-icon=\'icon: user\'></span> Username/email is incorrect, try again.' }));
            }
        })

        var tryUsr = {
            "email": $("#emailInput").val().trim(),
            "account_key": $("#passwordInput").val().trim()
        }

        $.post("/login", tryUsr, function (data, status, xhr) {
            //console.log(data);

            //console.log(status);
            //console.log(xhr);
            // $("#loginForm")[0].reset();

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
        });
    });
});