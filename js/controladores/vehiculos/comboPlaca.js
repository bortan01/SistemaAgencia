let DATA_PLACA;
$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: URL_SERVIDOR + "vehiculo/vehiculos",
        async: false,
        dataType: "json",
        success: function(data) {

            let myData = [];
            DATA_PLACA = data.autos;
            for (let index = 0; index < DATA_PLACA.length; index++) {
                myData.push({
                    id: DATA_PLACA[index].idvehiculo,
                    text: DATA_PLACA[index].placa
                    
                });
            }
            $('#id_placa').select2({ data: myData });
        },
        error: function(err) {
            //si da un error ya que quede la alerta
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: 'No hay Vehiculos para mostrar',
                showConfirmButton: true,
            });
        }
    });

});