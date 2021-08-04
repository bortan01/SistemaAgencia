$(document).ready(function() {

    $("#btnModelo").on('click', function(e) {


        e.preventDefault();
        let myData = {
            "modelo": document.getElementById("modeloCarro").value,
            "id_marca": document.getElementById("id_marca").value
        }
        $('#loadingActualizar').show();

        $.ajax({
            url: URL_SERVIDOR + "modeloVehiculo/modelo",
            method: 'POST',
            data: myData

        }).done(function(response) {

            $("#modal-modelo").modal('toggle');
            //inicio actualizar combo sin recargar pagina
            $('#id_modelo').empty();
            let DATA_MODELO;
            $.ajax({
                type: "GET",
                url: URL_SERVIDOR + "modeloVehiculo/modelo",
                async: false,
                dataType: "json",
                success: function(data) {

                    let myData = [];
                    DATA_MODELO = data.modelo;
                    for (let index = 0; index < DATA_MODELO.length; index++) {
                        myData.push({
                            id: DATA_MODELO[index].idmodelo,
                            text: DATA_MODELO[index].modelo
                        });
                    }
                    $('#id_modelo').select2({ data: myData });
                },
                error: function(err) {
                    //si da un error ya que quede la alerta
                    const Toast = Swal.mixin();
                    Toast.fire({
                        title: 'Oops...',
                        icon: 'error',
                        text: 'No hay Modelos para mostrar',
                        showConfirmButton: true,
                    });
                }
            });
            //document.getElementById("form-modelo").reset();
            //fin actualizar combo sin recargar pagina
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA 
                //location.reload();
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