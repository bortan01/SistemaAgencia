
let DATA_ALIANZA;

$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: URL_SERVIDOR + "alianzas/alianzas",
        dataType: "json",
        success: function(data) {

            let myData = [];
            DATA_ALIANZA = data.alianzas;
            for (let index = 0; index < DATA_ALIANZA.length; index++) {
                myData.push({
                    id: DATA_ALIANZA[index].idalianza,
                    text: DATA_ALIANZA[index].nombre_alianza
                });
            }
            $('#id_alianza').select2({ data: myData });
        },
        error: function(err) {
            //si da un error ya que quede la alerta
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: 'No hay Alianzas para mostrar',
                showConfirmButton: true,
            });
        }
    });

});