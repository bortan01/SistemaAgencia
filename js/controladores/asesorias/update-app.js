$(document).ready(function (){

    $("#btnActualizar").on('click', function(e) {
        $('#loadingActualizarEventos').show();
        e.preventDefault();
        // recolectarDatos();
         let form = obtenerInfo();
         $.ajax({
            url: URL_SERVIDOR+"Cita/updateCita",
            method: 'POST',
            mimeType: "multipart/form-data",
            data: form,
            timeout: 0,
            processData: false,
            contentType: false,
        }).done(function (response) {
        $('#loadingActualizarEventos').hide();            
          $("#modal_eventos").modal('toggle');
          $('#calendar').fullCalendar('refetchEvents');
        
            //REST_Controller::HTTP_OK
            //let respuestaDecodificada = JSON.parse(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: 'Registro actualizado con exito',
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA 
                //guardarBitacora();
                //location.reload(); //NO QUIERO QUE RECARGUE ME ACTUALIZA SOLA
            });

        }).fail(function (response) {
        $('#loadingActualizarEventos').hide();

            //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
            let respuestaDecodificada = JSON.parse(response.responseText);
           
            console.log(response)
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Error',
                icon: 'error',
                text: respuestaDecodificada.mensaje,
                showConfirmButton: true,
            });

        });

    });

     function obtenerInfo(){
        let form = new FormData();

        
        form.append("id_cita",       document.getElementById("txtId").value);
        form.append("fecha", document.getElementById("txtFecha2").value); 
        form.append("start", document.getElementById("timeUpdate").value);


        return form;
    }


});