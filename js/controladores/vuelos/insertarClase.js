$(document).ready(function() {
    $('#loadingTipoClase').hide();

    $("#btnAgregarClase").on('click', function(e) {
        $('#loadingTipoClase').show();
        e.preventDefault();

        let myData = {
            "nombre_clase": document.getElementById("nombre_clases").value,
            "descripcion": document.getElementById("descripcion_clases").value,
        }

        $.ajax({
            url: URL_SERVIDOR + "tipo_clases/clases",
            method: 'POST',
            data: myData

        }).done(function(response) {

            $('#loadingTipoClase').hide();
            $("#modal-tipoClase").modal('toggle');
            document.getElementById("register-clase").reset();

            //inicio actualizar combo
            $('#idclase').empty();
            let DATA_CLASE;

            $.ajax({
                type: "GET",
                url: URL_SERVIDOR + "tipo_clases/clases",
                async: false,
                dataType: "json",
                success: function(data) {
                      // let tabla esta definada en clases-app.js
                  
                    tabla.ajax.reload(null, false);

                    let myData = [];
                    DATA_CLASE = data.clase;
                    for (let index = 0; index < DATA_CLASE.length; index++) {
                        myData.push({
                            id: DATA_CLASE[index].idclase,
                            text: DATA_CLASE[index].nombre_clase
                        });
                    }
                    $('#idclase').select2({ data: myData });
                },
                error: function(err) {
                    //si da un error ya que quede la alerta
                    const Toast = Swal.mixin();
                    Toast.fire({
                        title: 'Oops...',
                        icon: 'error',
                        text: 'No hay Tipos de Clase para mostrar',
                        showConfirmButton: true,
                    });
                }
            });

            //fin actualizar combo
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
               // location.reload();
            });
        }).fail(function(response) {
            $('#loadingTipoClase').hide();
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