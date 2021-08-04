$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: URL_SERVIDOR + "usuario/obtenerUsuario",
        async: false,
        dataType: "json",
        success: function(data) {

            let $select = $('#id_cliente');
            $.each(data.usuarios, function(i, name) {
                $select.append('<option value=' + name.id_cliente + '>' + name.nombre +
                    '</option>');
            });
        },
        error: function(err) {
            //si da un error ya que quede la alerta
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