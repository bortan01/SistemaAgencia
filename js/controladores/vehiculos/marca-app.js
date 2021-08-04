$("#btnAgregar").on('click', function(e) {

    e.preventDefault();
    $('#loadingActualizar').show();

    $.ajax({
        url: URL_SERVIDOR + "marcaVehiculo/marca",
        method: 'POST',
        data: $("#register-marca").serialize()

    }).done(function(response) {

        $("#modal-marca").modal('toggle');

        document.getElementById("register-marca").reset();

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