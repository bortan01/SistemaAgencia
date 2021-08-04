$("#btnGuardar").on('click', function(e) {

    e.preventDefault();
    let data = {
        "transmision": document.getElementById("transmision").value
    };
   
    $.ajax({
        url: URL_SERVIDOR + "transmisionVehiculo/transmision",
        method: 'POST',
        data: data

    }).done(function(response) {

        $("#modal-transmision").modal('toggle');
        ///TODO OK CIERRA EL MODAL CARGA EL COMBO ANTES VACIARLO

        $('#id_transmision').empty();//vacia el combo y despues se llena es como un recargar sin que cargue la pagina
        let DATA_TRANSMISION;
        $.ajax({
            type: "GET",
            url: URL_SERVIDOR + "transmisionVehiculo/transmision",
            async: false,
            dataType: "json",
            success: function(data) {
    
                let myData = [];
                DATA_TRANSMISION = data.transmision;
                for (let index = 0; index < DATA_TRANSMISION.length; index++) {
                    myData.push({
                        id: DATA_TRANSMISION[index].idtransmicion,
                        text: DATA_TRANSMISION[index].transmision
                    });
                }
                ///LE CARGAMOS LA DATA 
                $('#id_transmision').select2({ data: myData });
    
             
            },
            error: function(err) {
                //si da un error ya que quede la alerta
                const Toast = Swal.mixin();
                Toast.fire({
                    title: 'Oops...',
                    icon: 'error',
                    text: 'No hay Transmisión para mostrar',
                    showConfirmButton: true,
                });
            }
        });


        ////************************fin de cargar el combo */


        const Toast = Swal.mixin();
        Toast.fire({
            title: 'Exito...',
            icon: 'success',
            text: response.mensaje,
            showConfirmButton: true,
        }).then((result) => {
          
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