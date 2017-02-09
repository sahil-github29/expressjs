$(function() {
    $('#registrationForm').submit(function(e) {
        e.preventDefault();
        $.post('/registration', {
            name: $('#name').val(),
            username: $('#username').val(),
            email: $('#email').val(),
            confirm_password: $('#confirm_password').val(),
            password: $('#password').val()
        }, function(res) {
            $(".errMsg").remove()
            console.log(res);
            // console.log('res.status : ', res.status);
            if (res.status == false) {
                $( "<p class='errMsg'>* " + res.msg + "</p>" ).insertAfter("#"+res.param).css("color","red");
            } else {
                window.location.href = "http://localhost:3000/login";
            }
        });
    });
})
