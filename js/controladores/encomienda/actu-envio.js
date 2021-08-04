$(document).ready(function() {
    let tabla;

    //inicializarValidaciones();
    // inicializarCombo()
    // inicializarComboRama();
    inicializarTabla();

    //BOTON DE EDITAR
    $(document).on('click', '.btn-group .btn-success', function() {
        $('#loadingActualizar').hide();
        id_encomienda = $(this).attr("name");

        window.location = `${URL_SISTEMA}vistas/encomiendas/actualizacionRegistro.php?ac=` + id_encomienda;


    });

    //BOTON PARA ELIMINAR
    $(document).on('click', '.btn-group .btn-danger', function(evento) {
        idpregunta = $(this).attr("name");
        fila = $(this).closest("tr");

        const Toast = Swal.mixin();
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Se Eliminará este registro!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        }).then((result) => {
            console.log(result);
            if (result.value) {
                eliminar();
            }
        })
    });
    //BOTON PARA ACTUALIZAR
    $(document).on('click', '#btnActualizar', function(evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#register-form");
        form.validate();
        if (form.valid()) {
            actualizar();
        }
    });


    function inicializarTabla() {
        tabla = $("#tabla_actu-envio").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "Encomienda/encomienda",
                "method": "GET",
                "dataSrc": function(json) {
                    //console.log(json.preguntas);

                    if (json.Encomiendas) {
                        for (let i = 0, ien = json.Encomiendas.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button type="button" name="' + json.Encomiendas[i].id_encomienda + '" class="btn btn-success" style="background-color:#0E6251;"; data-toggle="modal"';
                            html += '         data-target="#modal-editar">';
                            html += '            <i class="fas fa-map-marked-alt" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';
                            json.Encomiendas[i]["botones"] = html;

                        }
                        $('#loading').hide();
                        return json.Encomiendas;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "nombre" },
                { data: "ciudad_origen" },
                { data: "codigo_postal_origen" },
                { data: "fecha" },
                { data: "botones" },
                { data: "estado" },
            ],
            columnDefs: [
                { "className": "dt-center", "targets": "_all" },

                { targets: [5], visible: false },
            ]
        });

    }

    //CUANDO HAY CAMBIO EN EL RADIO BUTTON
    $(document).on('change', 'input[type=radio][name="radioEnvio"]', function() {
        tabla.draw();
    });
    // PARA HACER FILTRAR REGISTROS EN LA TABLA DE A CUERDO CON RADIO BUTTON
    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex) {
            let opcionSeleccionada = $("input[name='radioEnvio']:checked").val();
            switch (opcionSeleccionada) {
                case 'Enviado':
                    return (data[5] == 'Enviado');
                case 'Entregado':
                    return (data[5] == 'Entregado');
                default:
                    return true;
            }
        }
    );

    function inicializarValidaciones() {
        $('#register-form').validate({

            rules: {
                id_rama: {
                    required: true
                },
                pregunta: {
                    minlength: 10
                },
                "opcion_respuesta[]": {
                    required: true
                }
            },
            messages: {
                id_rama: {
                    required: "Seleccione una rama"
                },
                pregunta: {
                    minlength: "Lapregunta debe de tener una longitud minima de 10"
                },
                "opcion_respuesta[]": {
                    required: "Seleccione las opciones de respuestas, puede agregar más, pulse el botón agregar más"
                }
            },
            errorElement: 'span',
            errorPlacement: function(error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-group').append(error);
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('is-invalid');

            }
        });

    }

    function actualizar() {
        $('#loadingActualizar').show();
        $.ajax({
            url: URL_SERVIDOR + "Asesoria/updateCerrada",
            method: "POST",
            timeout: 0,
            data: $('#register-form').serialize()
        }).done(function(response) {
            //REST_Controller::HTTP_OK
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                $('#modal-editar').modal('hide');
                tabla.ajax.reload(null, false);
            });
        }).fail(function(response) {
            console.log(response);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Error',
                icon: 'error',
                text: "ERROR EN ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function(xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }


    function eliminar() {
        let data = {
            "id_pregunta": idpregunta
        };
        $.ajax({
            url: URL_SERVIDOR + "Asesoria/deletePregunta",
            method: "DELETE",
            timeout: 0,
            data: data
        }).done(function(response) {
            //REST_Controller::HTTP_OK
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                tabla.ajax.reload(null, false);
            });
        }).fail(function(response) {

            console.log(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function(xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }

});