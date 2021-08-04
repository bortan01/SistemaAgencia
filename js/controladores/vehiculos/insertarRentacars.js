$(document).ready(function() {

    $("#btnGuardar").on('click', function(e) {


        e.preventDefault();
        let myData = {

            "usuario_renta": document.getElementById("nombreUsuario").value,
            "contrasena_renta": document.getElementById("pass").value,
            "rentaCar": document.getElementById("rentaCar").value,
            "telefono_renta": document.getElementById("telefono").value,
            "lugar_renta": document.getElementById("lugar").value,
            "descripcion_renta": document.getElementById("descripcion").value
        }

        $.ajax({
            url: URL_SERVIDOR + "rentacars/renta",
            method: 'POST',
            data: myData

        }).done(function(response) {

            document.getElementById("register-renta").reset();

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA 
                location.reload();
            });
        }).fail(function(response) {
            //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
            let respuestaDecodificada = JSON.parse(response.responseText);
            let listaErrores = "";

            if (respuestaDecodificada.errores) {
                ///ARREGLO DE ERRORES 
                let erroresEnvioDatos = respuestaDecodificada.errores;
                for (mensaje in erroresEnvioDatos) {
                    listaErrores += erroresEnvioDatos[mensaje] + "\n";
                    //toastr.error(erroresEnvioDatos[mensaje]);
                };
            } else {
                listaErrores = respuestaDecodificada.mensaje
            }
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: listaErrores,
                showConfirmButton: true,
            });

        })


    });
});