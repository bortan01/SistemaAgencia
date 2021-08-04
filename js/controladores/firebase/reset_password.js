inicializarValidaciones();

$("#login-btn").on("click", function () {
  let correo = document.getElementById("email").value;
  const Toast = Swal.mixin();
  let form = $("#login-form");
  form.validate();
  if (form.valid()) {
    let btnHTML = $(this).html();
    $(this).html("<img id='loader' src='img/loader.svg' alt='Loading...!' />");
    firebase
      .auth()
      .sendPasswordResetEmail(correo)
      .then(function () {
        $("#login-btn").html(btnHTML);
        // if (data.user.uid != "") {
        //   window.location.href = "index.php";
        Toast.fire({
          title: 'Bien Hecho',
          icon: 'success',
          text: 'Revisa tu correo pera restablecer tu contraseña',
          showConfirmButton: true,
        });
        document.getElementById("email").value = '';

      }).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorMessage);
        Toast.fire({
          title: 'Oops...',
          icon: 'error',
          text: 'Intente más tarde',
          showConfirmButton: true,
        });
      });
  } else {
    Toast.fire({
      title: 'Oops...',
      icon: 'error',
      text: 'Digite Credenciales',
      showConfirmButton: true,
    });
  }


});

$(".login-register-btn").on("click", function () {
  changeForm(this);
});

function changeForm($this) {
  $($this).children("span").toggleClass("active");

  $(".content").toggleClass("active");
}
$(".card input").on("focus blur", function () {
  $(".card").toggleClass("active");
});

function inicializarValidaciones() {
  $('#login-form').validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 4
      }
    },
    messages: {
      email: {
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