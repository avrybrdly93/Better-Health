$(document).ready(function(){
    $("#submitBtn").on("click",function(event){
        event.preventDefault();

        var tryUsr= {
            "email": $("#emailInput").val().trim(),
            "account_key": $("#passwordInput").val().trim()
        }

        $.post("/login",tryUsr,function(data,status,xhr){
            //console.log(data);
            
            //console.log(status);
            //console.log(xhr);
            $("#loginForm")[0].reset();
            
            switch(xhr.status){
                case 200:{
                    window.location.href="/dashboard";
                    break;
                }
                case 401:{
                    window.location.href="/login";
                    break;
                }
                case 404:{
                    window.location.href="*";
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