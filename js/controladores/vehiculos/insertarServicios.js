$('#loadingRegistroServicio').hide();

$("#btnAgregar").on('click', function (e) {
    $('#loadingRegistroServicio').show();
    e.preventDefault();
    $.ajax({
        url: URL_SERVIDOR + "serviciosVehiculo/servicios",
        method: 'POST',
        data: $("#register-servicio").serialize()

    }).done(function (response) {
        $('#loadingRegistroServicio').hide();
        guardarBitacora();
        $("#modal-servicio").modal('toggle');

        document.getElementById("register-servicio").reset();

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
    }).fail(function (response) {
        $('#loadingRegistroServicio').hide();
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