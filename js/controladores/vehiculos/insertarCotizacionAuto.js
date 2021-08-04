$(document).ready(function() {

    $("#btnGuardarCotizacionV").on('click', function(e) {


        e.preventDefault();
        let myData = {

            "id_usuario": document.getElementById("comboUsuario").value,
            "modelo": document.getElementById("id_modelo").value,
            "anio": document.getElementById("anio").value,
            "caracteristicas": document.getElementById("caracteristicas").value,
            "direccion_recogida": document.getElementById("direccion_recogida").value,
            "fechaRecogida": document.getElementById("fechaRecogida").value,
            "HoraRecogida": document.getElementById("timepicker").value,
            "direccion_devolucion": document.getElementById("direccion_devolucion").value,
            "fechaDevolucion": document.getElementById("fechaDevolucion").value,
            "HoraDevolucion": document.getElementById("timepicker2").value
        }

        $.ajax({
            url: URL_SERVIDOR + "cotizarVehiculo/cotizar",
            method: 'POST',
            data: myData

        }).done(function(response) {
            guardarBitacora();
            document.getElementById("register-cotizarVehiculo").reset();
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