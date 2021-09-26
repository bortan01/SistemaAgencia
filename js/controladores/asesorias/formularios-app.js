$(document).ready(function () {
    let explorer = $("#kv-explorer");
    let id_regunta;
    let tabla;
    let id;
    //inicializarValidaciones();
    inicializarComboRama();
    inicializarTabla();
    //BOTON MOSTRAR EL REPORTE
    $(document).on('click', '.btn-group .btn-secondary', function () {
        let fila = $(this).closest("tr");
        let data = tabla.row(fila).data();
        let id_cita = data.id_cita;
        let nombre = data.nombre;
        let id_cliente = data.id_cliente;
        let correo = data.correo;
        console.log(data)
        window.location = `reporte.php?idCita=${id_cita}&cliente=${nombre}&idCliente=${id_cliente}&correo=${correo}`;
    });
    //FIN DE MOSTRAMOS EL REPORTE

    //BOTON EDITAR LA FOTO
    $(document).on('click', '.btn-group .btn-warning', function () {
        $('#modal-imagenesEncomienda').modal('show');
        let identificador = $(this).attr("name");
        let nombreTabla = 'pasaportes';
        let informacionAdicional = { tipo: nombreTabla, identificador: identificador };
        let urlFotos = [];
        let infoFotos = [];

        $.ajax({
            url: URL_SERVIDOR + "Imagen/show?tipo=" + nombreTabla + "&identificador=" + identificador,
            method: "GET",

        }).done(function (response) {
            //REST_Controller::HTTP_OK
            console.log(URL_SERVIDOR + "Imagen/show?tipo=" + nombreTabla + "&identificador=" + identificador);
            response.forEach(element => {
                let informacion = {
                    url: URL_SERVIDOR + "Imagen/delete",
                    key: element.id_foto
                };
                infoFotos.push(informacion);
                urlFotos.push(element.foto_path);
            });
            explorer.fileinput({
                theme: 'fas',
                language: 'es',
                uploadUrl: URL_SERVIDOR + 'Imagen/save',
                uploadExtraData: informacionAdicional,
                overwriteInitial: false,
                initialPreviewAsData: true,
                initialPreview: urlFotos,
                initialPreviewConfig: infoFotos,
                required: true,
                maxFileSize: 2000,
                maxFilesNum: 10,
                allowedFileExtensions: ["jpg", "png", "gif"]

            });
        });
    });

    //CUANDO EL MODAL SE CIERRA
    $('#modal-imagenesEncomienda').on('hidden.bs.modal', function (e) {
        console.log("cerrando modal")
        explorer.fileinput('destroy');
    })

    //BOTON DE EDITAR
    $(document).on('click', '.btn-group .btn-primary', function () {
        let fila = $(this).closest("tr");
        let data = tabla.row(fila).data();
        let id_cita = data.id_cita;
        let nombre = data.nombre;
        let id_cliente = data.id_cliente;
        window.location = `editarInformacion.php?idCita=${id_cita}&cliente=${nombre}&idCliente=${id_cliente}`;
    });

    //BOTON PARA ELIMINAR
    $(document).on('click', '.btn-group .btn-danger', function (evento) {
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
    $(document).on('click', '#btnActualizar', function (evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        // let form = $("#editar");
        // form.validate();
        //if (form.valid()) {
        actualizar();
        //}
    });

    //CUANDO EL MODAL SE CIERRA
    $('#modal-imagenes').on('hidden.bs.modal', function (e) {
        console.log("cerrando modal")
        explorer.fileinput('destroy');
    })

    function inicializarTabla() {
        tabla = $("#formularios").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "Cita/Pasaportes",
                "method": "GET",
                "dataSrc": function (json) {
                    //console.log(json.preguntas);

                    if (json.citas) {
                        for (let i = 0, ien = json.citas.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button title="Editar" type="button" name="' + json.citas[i].id_cita + '" class="btn btn-primary" data-toggle="modal"';
                            html += '            data-target="#modal-editar">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button title="Reporte" type="button" name="' + json.citas[i].id_cita + '" class="btn btn-secondary" data-toggle="modal"';
                            html += '            data-target="#modal-cotizacion">';
                            html += '            <i class="fas fa-eye" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button title="Galería" type="button" name="' + json.citas[i].id_cita + '" class="btn btn-warning" data-toggle="modal"';
                            html += '            data-target="#modal-galeria">';
                            html += '            <i class="fas fa-image" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';
                            json.citas[i]["botones"] = html;

                        }
                        $('#loading').hide();
                        return json.citas;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "nombre" },
                { data: "fecha" },
                { data: "hora" },
                { data: "botones" },
            ]
        });

    }

    function inicializarValidaciones() {
        $('#editar').validate({
            rules: {
                id_rama: {
                    required: true,
                    number: true
                },
                pregunta: {
                    required: true,
                    minlength: 10,
                    maxlength: 40
                },
                mas_respuestas: {
                    required: true,
                    minlength: 2,
                }
            },
            messages: {
                id_rama: {
                    required: "Seleccione la rama de la pregunta",
                },
                pregunta: {
                    required: "Ingrese la pregunta",
                    minlength: "Debe de tener una longitud minima de 10",
                    maxlength: "Debe de tener una longitud maxima de 40"
                },
                mas_respuestas: {
                    required: "Seleccione si va a contener mas respuestas",

                }

            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-group').append(error);
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('is-invalid');

            }
        });

    }

    function actualizar() {
        $('#loadingActualizar').show();

        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "FormularioMigratorio/updateFormulario",
            method: 'POST',
            data: $("#editar-form").serialize()
        }).done(function (response) {
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
        }).fail(function (response) {
            console.log(response);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Error',
                icon: 'error',
                text: response.mensaje,
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
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
        }).done(function (response) {
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
        }).fail(function (response) {

            console.log(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Error',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }

    function inicializarComboRama() {
        //COMBO DE CONTACTOS
        $.ajax({
            url: URL_SERVIDOR + "Asesoria/ramita",
            method: "GET"
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            var $select = $('#id_rama');
            $.each(response.ramas, function (i, name) {
                $select.append('<option value=' + name.id_rama + '>' + name.categoria_rama +
                    '</option>');
            });
        }).fail(function (response) {
            var $select = $('#id_rama');
            $select.append('<option disabled="" selected>Seleccione</option>');

        }).always(function (xhr, opts) {
            $('#loading').hide();
        });
    }
});