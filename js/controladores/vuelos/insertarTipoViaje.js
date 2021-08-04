$(document).ready(function() {

    $("#btnAgregarViaje").on('click', function(e) {

        e.preventDefault();

        let myData = {
            "nombre_tipoviaje": document.getElementById("nombre_tipoviajes").value,
            "descripcion": document.getElementById("descripcion_tipoViaje").value,
        }

        $.ajax({
            url: URL_SERVIDOR + "tipo_viaje/viajes",
            method: 'POST',
            data: myData

        }).done(function(response) {
            guardarBitacora();
            $("#modal-tipoViaje").modal('toggle');
            document.getElementById("register-viaje").reset();

            $('#idtipo_viaje').empty();
            let DATA_VIAJE;

            $.ajax({
                type: "GET",
                url: URL_SERVIDOR + "tipo_viaje/viajes",
                async: false,
                dataType: "json",
                success: function(data) {

                    let myData = [];
                    DATA_VIAJE = data.viaje;
                    for (let index = 0; index < DATA_VIAJE.length; index++) {
                        myData.push({
                            id: DATA_VIAJE[index].idtipo_viaje,
                            text: DATA_VIAJE[index].nombre_tipoviaje
                        });
                    }
                    $('#idtipo_viaje').select2({ data: myData });
                },
                error: function(err) {
                    //si da un error ya que quede la alerta
                    const Toast = Swal.mixin();
                    Toast.fire({
                        title: 'Oops...',
                        icon: 'error',
                        text: 'No hay Tipos de Viaje para mostrar',
                        showConfirmButton: true,
                    });
                }
            });

            // document.getElementById("register-viaje").reset();
            //fin actualizar combo sin recargar
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