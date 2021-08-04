$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: URL_SERVIDOR + "marcaVehiculo/marca",
        async: false,
        dataType: "json",
        success: function(data) {

            let $select = $('#id_marca');
            $.each(data.marcas, function(i, name) {
                $select.append('<option value=' + name.id_marca + '>' + name.marca +
                    '</option>');
            });
        },
        error: function(err) {
            //si da un error ya que quede la alerta
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: 'No hay Marcas para mostrar',
                showConfirmButton: true,
            });
        }
    });

});