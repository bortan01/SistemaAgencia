inicializarValidaciones();
// BOTON DE LOGIN
$("#login-btn").on("click", function () { login(); });
// SI DA ENTER
$('#password').keypress(function (e) {
  var keycode = (e.keyCode ? e.keyCode : e.which);
  if (keycode == '13') {
    login();
    e.preventDefault();
    return false;
  }
});
// ALGO
$(".card input").on("focus blur", function () {
  $(".card").toggleClass("active");
});
function changeForm($this) {
  $($this).children("span").toggleClass("active");

  $(".content").toggleClass("active");
}
function inicializarValidaciones() {
  $('#login-form').validate({
    rules: {
      username: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 4
      }
    },
    messages: {
      username: {
        required: "Ingrese el correo",
        email: "Ingrese un correo valido"
      },
      password: {
        required: "Ingrese la contraseña",
        minlength: "Debe tener una longitud minima de 4"
      }
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');

    }
  });
}
function initPreferencias(resp) {
  localStorage.setItem("id_clienteA", resp.id_cliente);
  localStorage.setItem("nombreA", resp.nombre);
  localStorage.setItem("correoA", resp.correo);
  localStorage.setItem("nivelA", resp.nivel);
  localStorage.setItem("celularA", resp.celular);
  localStorage.setItem("duiA", resp.dui);
  localStorage.setItem("fotoA", resp.foto);
  localStorage.setItem("user_uuidA", resp.user_uuid);
}
function login() {

  const Toast = Swal.mixin();
  let form = $("#login-form");
  form.validate();
  if (form.valid()) {
    let btnHTML = $("#login-btn").html();
    $("#login-btn").html("<img id='loader' src='img/loader.svg' alt='Loading...!' />");
    $("#login-btn").prop('disabled', true);
    $.ajax({
      url: URL_SERVIDOR + "Usuario/loginUser",
      method: "POST",
      data: $("#login-form").serialize()
    }).done(function (resp) {
      //NUESTRO SERVICIO RETORNARA UN TOKEN QUE ES EL
      // QUE OCUPAREMOS PARA MANEJAR LA SESION DEL USUARIO
      $("#login-btn").prop('disabled', true);
      if (!resp.err) {
        if (resp.nivel == 'EMPLEADO' || resp.nivel == 'ADMINISTRADOR' || resp.nivel == 'RENTA CARS') {
          //aqui estamos guardando la foto de perfil del usuario          
          let token = resp.token;
          firebase
            .auth()
            .signInWithCustomToken(token)
            .then(function (data) {
              initPreferencias(resp);
              $("#login-btn").html(btnHTML);
              if (data.user.uid != "") {
                console.log(resp);
                $.post("vistas/session/start.php", { action: "start", nivel: resp.nivel },
                  function (data) {
                    location = 'home.php';
                  });
              }
            }).catch(function (error) {
              // Handle Errors here.
              let errorCode = error.code;
              let errorMessage = error.message;
              alert(errorMessage);
            });
        } else {
          $("#login-btn").html(btnHTML);
          Toast.fire({
            title: 'Oops...',
            icon: 'error',
            text: 'No tienes los permisos necesarios',
            showConfirmButton: true,
          });
        }
      } else {
        Toast.fire({
          title: 'Oops...',
          icon: 'error',
          text: 'Credenciales no validas',
          showConfirmButton: true,
        });
      }

    }).fail(function (resp) {
      console.log("here")
      const Toast = Swal.mixin();
      $("#login-btn").prop('disabled', false);
      if (resp.responseJSON.err) {
        if (resp.responseJSON.mensaje == 'EMAIL_NOT_FOUND') {

          Toast.fire({
            title: 'Oops...',
            icon: 'error',
            text: 'Correo electrónico no registrado',
            showConfirmButton: true,
          });
        }
        else if (resp.responseJSON.mensaje == 'INVALID_EMAIL') {
          Toast.fire({
            title: 'Oops...',
            icon: 'error',
            text: 'Correo electrónico no valido',
            showConfirmButton: true,
          });
        }
      } else {
        Toast.fire({
          title: 'Oops...',
          icon: 'error',
          text: 'Credenciales no validas',
          showConfirmButton: true,
        });
      }
      $("#login-btn").html(btnHTML);

    });

  } else {
    Toast.fire({
      title: 'Oops...',
      icon: 'error',
      text: 'Digite Credenciales',
      showConfirmButton: true,
    });
  }
}