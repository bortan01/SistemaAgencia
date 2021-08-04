$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: URL_SERVIDOR + "Asesoria/ramita",
        async: false,
        dataType: "json",
        success: function(data) {

            var $select = $('#custom-tabs-one-tab');
            var $nuevo = $('#custom-tabs-one-tabContent');
            $.each(data.ramas, function(i, name) {
                if (name.num_rama == 1) {
                    // alert('rama 1')
                    $select.append(' <li class="nav-item"><a class="nav-link active"' +
                        'id="custom-tabs-one-home-' + name.num_rama + '" data-toggle="pill"' +
                        'href="#custom-tabs-one-' + name.num_rama + '" role="tab" aria-controls="custom-tabs-one-home"' +
                        'aria-selected="true">' + name.categoria_rama + '</a></li>');
                    $nuevo.append('<div class="tab-pane fade show active" id="custom-tabs-one-' + name.num_rama + '" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">' +
                        '<div class="form-group" id="' + name.num_rama + '"></div></div>');

                } else {
                    //alert(name.num_rama+"rama");
                    $select.append('<li class="nav-item">' +
                        '<a class="nav-link" id="custom-tabs-one-' + name.num_rama + '-tab" data-toggle="pill"' +
                        'href="#custom-tabs-one-' + name.num_rama + '" role="tab" aria-controls="custom-tabs-one-' + name.num_rama + '"' +
                        'aria-selected="false">' + name.categoria_rama + '</a></li>');

                    $nuevo.append('<div class="tab-pane fade" id="custom-tabs-one-' + name.num_rama + '"' +
                        'role="tabpanel" aria-labelledby="custom-tabs-one-' + name.num_rama + '-tab">' +
                        '<div class="form-group" id="' + name.num_rama + '"> </div></div>')
                }

            });
        },
        error: function(err) {
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Error',
                icon: 'error',
                text: 'No hay Ramas para mostrar',
                showConfirmButton: true,
            });
        }
    });

});