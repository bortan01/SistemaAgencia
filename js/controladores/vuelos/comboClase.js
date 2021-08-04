let DATA_CLASE;

$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: URL_SERVIDOR + "tipo_clases/clases",
        async: false,
        dataType: "json",
        success: function(data) {
            let myData = [];
            DATA_CLASE = data.clase;
            for (let index = 0; index < DATA_CLASE.length; index++) {
                myData.push({
                    id: DATA_CLASE[index].idclase ,
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

});