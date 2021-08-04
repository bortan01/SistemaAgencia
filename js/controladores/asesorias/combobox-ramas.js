$(document).ready(function() {

        $.ajax({
            type: "GET",
            url: URL_SERVIDOR+"Asesoria/ramita",
            dataType: "json",
            success: function(data) {

                var $select = $('#combo_rama');
                $select.append('<option disabled="" selected>Seleccione</option>');
                $.each(data.ramas, function(i, name) {
                    $select.append('<option value=' + name.id_rama + '>' + name.categoria_rama+
                        '</option>');
                });
            },
            error: function(err) {
                var $select = $('#combo_rama');
                $select.append('<option disabled="" selected>Seleccione</option>');
              /* const Toast = Swal.mixin();
            Toast.fire({
                title: 'Error',
                icon: 'error',
                text:'No hay Ramas para mostrar',
                showConfirmButton: true,
            });*/
            }
        });

    });