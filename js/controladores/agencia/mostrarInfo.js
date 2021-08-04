$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: URL_SERVIDOR + "general/general",
        async: false,
        dataType: "json",
        success: function(data) {


            for (let i = 0, ien = data.datos_generales.length; i < ien; i++) {

                $('#nombre_a').text(data.datos_generales[i].nombre_agencia);
                $('#direccion_a').text(data.datos_generales[i].direccion_agencia);
                $('#telefono_a').text(data.datos_generales[i].telefono_agencia);
                $('#email_a').text(data.datos_generales[i].email_agencia);

            }

        },
        error: function(err) {
            //si da un error ya que quede la alerta
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: 'No hay Información de la Agencia para mostrar',
                showConfirmButton: true,
            });
        }
    });

});