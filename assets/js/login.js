$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();

        var formData = {
            uuid: $('#uuid').val(),
            email: $('#email').val()
        };

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://localhost:8080/user/login',
            data: JSON.stringify(formData),
            success: function(response) {
                alert('Inicio de sesión exitoso.');
                console.log(response);
                // Redirigir al usuario a index.html
                window.location.replace('index.html');
            },
            error: function(error) {
                alert('Credenciales incorrectas. Por favor, verifica tu UUID y email.');
                console.error(error);
            }
        });
    });
});
