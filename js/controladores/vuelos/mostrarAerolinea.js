
    let idAerolineas;
    let tabla;
    inicializarMascara();

    inicializarValidaciones();
    inicializarTabla();
    $('#loadingActualizarAerolinea').hide();
    
    //BOTON MOSTRAR
    
    $(document).on('click', '.btn-group .btn-primary', function() {
        let fila = $(this).closest("tr");
        let data = tabla.row(fila).data();
        console.log(data);
        idAerolineas = data.idaerolinea;
        document.getElementById("nombre_aerolinea").value = data.nombre_aerolinea;
        document.getElementById("nombre_alianza").value = data.nombre_alianza; 
        document.getElementById("sitioWeb").value = data.sitioWeb;   
        document.getElementById("telefonoContacto").value = data.telefonoContacto; 
    });

    //BOTON PARA ELIMINAR
    $(document).on('click', '.btn-group .btn-danger', function(evento) {
        idAerolineas = $(this).attr("name");
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
        let form = $("#miFormulario");
        form.validate();
        if (form.valid()) {
            actualizar();
        }
    });



    function inicializarTabla() {
        tabla = $("#tabla_aerolinea").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "aerolinea/aerolinea",
                "method": "GET",
                "dataSrc": function(json) {
                    console.log(json.aerolineas);

                    if (json.aerolineas) {
                        for (let i = 0, ien = json.aerolineas.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button title="Editar" type="button" name="' + json.aerolineas[i].idaerolinea + '" class="btn btn-primary" data-toggle="modal"';
                            html += '            data-target="#modal-editar">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';

                            html += '        <button title="Eliminar" type="button" name="' + json.aerolineas[i].idaerolinea + '" class="btn btn-danger" data-toggle="modal"';
                            html += '            data-target="#modal-eliminar">';
                            html += '            <i class="fas fa-trash" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';
                            json.aerolineas[i]["botones"] = html;

                        }
                        $('#loading').hide();
                        return json.aerolineas;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "nombre_aerolinea" },
                { data: "nombre_alianza" },
                { data: "sitioWeb" },
                { data: "telefonoContacto" },
                { data: "botones" },
            ]
        });

    }

    function inicializarValidaciones() {
        $('#miFormulario').validate({
            rules: {
                sitioWeb: {
                    required: true,
                    email: true
                },

                telefonoContacto: {
                    required: true,
                    minlength: 8,
                    maxlength: 15
                }
            },
            messages: {
                sitioWeb: {
                    required: "Ingrese la url del sitio web",
                    email: "Ingrese un correo valido"
                },

                telefonoContacto: {
                    required: "Ingrese el numero de telefono",
                    minlength: "Logitud del numero de telefono debe ser mayor a 8",
                    maxlength: "Logitud del numero de telefono excede",
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
        $('#loadingActualizarAerolinea').show();
        let data = {
            "idaerolinea": idAerolineas,
            "sitioWeb": document.getElementById("sitioWeb").value,
            "telefonoContacto": document.getElementById("telefonoContacto").value

        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "aerolinea/actualizarAerolinea",
            method: "PUT",
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
                $('#modal-editar').modal('hide');;
                tabla.ajax.reload(null, false);
            });
        }).fail(function(response) {
            console.log(response);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function(xhr, opts) {
            $('#loadingActualizarAerolinea').hide();
        });
    }

    function eliminar() {
        let data = {
            "idaerolinea": idAerolineas
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO

        $.ajax({
            url: URL_SERVIDOR + "aerolinea/eliminarAerolinea",
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

    function inicializarMascara() {
        let telef = $('#telefonoContacto');
        telef.inputmask("(+123) 1234-5678");
        telef.inputmask({ "mask": "(+999) 9999-9999" });
    }
