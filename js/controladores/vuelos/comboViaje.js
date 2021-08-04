let DATA_VIAJE;
$(document).ready(function() {

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

});