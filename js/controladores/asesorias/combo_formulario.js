$(document).ready(function() {

        $.ajax({
            type: "GET",
            url: URL_SERVIDOR+"Cita/formularioMigratorioCitas",
            async: false,
            dataType: "json",
            success: function(data) {

                var $select = $('#citas_dias');
                $select.append('<option disabled="" selected>Seleccione la cita</option>');
                $.each(data.citas, function(i, name) {
                    $select.append('<option value=' + name.id_cita + '>' + name.nombre+
                        '</option>');
                });
            },
            error: function(err) {
                var $select = $('#combo_rama');
                $select.append('<option disabled value="" selected>Seleccione la cita</option>');
              /* const Toast = Swal.mixin();
            Toast.fire({
                title: 'Error'
                icon: 'error',
                text:'No hay Ramas para mostrar',
                showConfirmButton: true,
            });*/
            }
        });

    });