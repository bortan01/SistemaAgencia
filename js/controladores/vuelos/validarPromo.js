$(document).ready(function() {

    let myData = {
        "fecha_actual": document.getElementById("fecha").value
    }

    $.ajax({
        url: URL_SERVIDOR + "promocionVuelo/validarPromocion",
        method: 'PUT',
        data: myData

    }).done(function(response) {

     
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