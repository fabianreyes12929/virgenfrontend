$(document).ready(function() {
    $('#registerForm').submit(function(event) {
        event.preventDefault();

        var formData = {
            name: $('#name').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            isPilgrim: $('#isPilgrim').val() === 'true',
            uuid: $('#uuid').val()
        };

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://localhost:8080/user/create',
            data: JSON.stringify(formData),
            success: function(response) {
                alert('Usuario registrado correctamente.');
                console.log(response);
                // Redirigir al usuario al formulario de inicio de sesión
                window.location.replace('login.html');
            },
            error: function(error) {
                alert('Error al registrar el usuario.');
                console.error(error);
            }
        });
    });
});
