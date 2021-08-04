let DATA_UNIDAD;

$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: URL_SERVIDOR + "Producto/unidades",
        async: false,
        dataType: "json",
        success: function(data) {
            let $select = $('#id_unidad');
                $select.append('<option value="">Seleccione</option>');
            let myData = [];
            DATA_UNIDAD = data.unidad;
            for (let index = 0; index < DATA_UNIDAD.length; index++) {
                myData.push({
                    id: DATA_UNIDAD[index].id_unidad,
                    text: DATA_UNIDAD[index].unidad_medida
                });
            }

            ///LE CARGAMOS LA DATA 
            $('#id_unidad').select2({ data: myData });
        },

        error: function(err) {
            //si da un error ya que quede la alerta
            $('#id_unidad').select2({});
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: 'No hay Usuarios para mostrar',
                showConfirmButton: true,
            });
        }
    });



});