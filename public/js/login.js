$(function() {
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        $.post('login', {
            username: $('#username').val(),
            password: $('#password').val()
        }, function(res) {
            console.log(res);
            if (res.status == false) {
                $("#ErrMsg").html(res.msg)
            } else {
                window.location.href = "http://localhost:3000/";
            }
        });
    });
})
