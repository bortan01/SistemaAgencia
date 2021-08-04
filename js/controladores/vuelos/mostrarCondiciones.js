$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: URL_SERVIDOR + "infoadicional/informacion",
        async: false,
        dataType: "json",
        success: function(data) {


            let $label = $('#condiciones');
            $.each(data.informacion, function(i, name) {
                $label.append('<option value=' + name.idinfo_adicional + '>' + name.condiciones +
                    '</option>');
            });
        },
        error: function(err) {
            //si da un error ya que quede la alerta
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: 'No hay Condiciones para mostrar',
                showConfirmButton: true,
            });
        }
    });

});