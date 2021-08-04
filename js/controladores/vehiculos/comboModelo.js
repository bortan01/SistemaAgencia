let DATA_MODELO;
$(document).ready(function() {

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

});