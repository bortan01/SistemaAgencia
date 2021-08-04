$(document).ready(function() {
    let explorer = $("#kv-explorer");
    let ListaDatos;
    let idSerevicio;
    let tabla;
    inicializarValidaciones();
    inicializarComboContacto();
    inicializarTabla();
    inicializarCombo();

    //BOTON DE EDITAR
    $(document).on('click', '.btn-group .btn-primary', function() {
        $('#loadingActualizar').hide();
        let fila = $(this).closest("tr");
        let data = tabla.row(fila).data();
        idSerevicio = $(this).attr("name");

        // //MANDALOS LOS VALORES AL MODAL
        document.getElementById("nombre").value = data.nombre_servicio;
        document.getElementById("costos_defecto").value = data.costos_defecto;
        document.getElementById("descripcion_servicio").value = data.descripcion_servicio;

        $('#tipo_servicio').val(data.id_tipo_servicio);
        $('#tipo_servicio').trigger('change');

        $('#contacto_servicio').val(data.id_contacto);
        $('#contacto_servicio').trigger('change');

        $('#numero_filas').val(data.filas);
        $('#asientos_derecho').val(data.asiento_derecho);
        $('#asientos_izquierdo').val(data.asiento_izquierdo);

        // para desactivar el combo cuando es tipo tranporte
        if (data.id_tipo_servicio == 2) {
            $("#tipo_servicio").prop("disabled", true);
        } else {
            $("#tipo_servicio").prop("disabled", false);
        }

        if (data.filas) {
            $('#configuracionAsientos').show();
            $('#dibujoAsientos').show();
            //LA VARIABLE MAPA Y METODOS ESTAN DEFINIDOS EN asiento-bus/js/admin-configuracion.js
            numero_filas = data.filas;
            asientos_derecho = data.asiento_derecho;
            asientos_izquierdo = data.asiento_izquierdo;
            if (data.fila_trasera == "1") {
                $('#checkTrasero').prop('checked', true);
            } else {
                $('#checkTrasero').prop('checked', false);
            }
            miMapa = [];
            borrarTodo();
            crearStrFila();
            crearFilas();
            dibujarAsientos();
            //PARA LOS HACIENTOS QUE HAN SIDO DESHABILITADOS
            sc.get(data.asientos_deshabilitados).status('selected');

        } else {
            $('#configuracionAsientos').hide();
            $('#dibujoAsientos').hide();
        }
        $('#modal-editar').modal('show');

    });
    //BOTON EDITAR LA FOTO
    $(document).on('click', '.btn-group .btn-warning', function() {
        $('#modal-imagenes').modal('show');
        let identificador = $(this).attr("name");
        let nombreTabla = 'servicios_adicionales';
        let informacionAdicional = { tipo: nombreTabla, identificador: identificador };
        let urlFotos = [];
        let infoFotos = [];

        $.ajax({
            url: URL_SERVIDOR + "Imagen/show?tipo=" + nombreTabla + "&identificador=" + identificador,
            method: "GET",

        }).done(function(response) {
            //REST_Controller::HTTP_OK
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
                uploadUrl: URL_SERVIDOR + '/Imagen/save',
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
    //BOTON PARA ELIMINAR
    $(document).on('click', '.btn-group .btn-danger', function(evento) {
        idSerevicio = $(this).attr("name");
        fila = $(this).closest("tr");

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
        } else {
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'error',
                text: "Complete los campos",
                showConfirmButton: true,
            });
        }
    });
    //CUANDO EL MODAL SE CIERRA
    $('#modal-imagenes').on('hidden.bs.modal', function(e) {
            console.log("cerrando modal")
            explorer.fileinput('destroy');
        })
        //CLICK EN EL LINK DEL CONTACTO
    $(document).on('click', '.info_contacto', function() {
        $('#modal_ver_contacto').modal('show');
        let fila = $(this).closest("tr");
        let data = tabla.row(fila).data();
        console.log(data);

        $("#spanCorreo").html(data.correo);
        $("#spanTelefono").html(data.telefono);
        $("#spanNombre").html(data.nombre_contacto);
        $("#imgContacto").attr("src", data.url);
    });
    // BOTON DE IMPRIMIR
    $(document).on('click', '#print', function() {
        // OBTENEMOS EL VALOR DEL FILTRO DE LA TABLA
        let MiTabla = $("#tabla_servicios").DataTable();
        let data = MiTabla.rows({ search: 'applied' }).data().length;
        let tr = $('#cabeceraTabla');
        var th = tr.find('th');
        console.log(th);

    });

    //CUANDO HAY CAMBIOS EN EL COMBO TIPO DE SERVICIO 
    $('#tipo_servicio').on('select2:select', function(e) {
        let id = e.params.data.id;
        // si el id es 2 (TRANSPORTE) MOSTTRAREMOS LA OPCION PARA AGREGARLO
        if (id == 2) {
            $('#configuracionAsientos').show();
            $('#dibujoAsientos').show();
            //LA VARIABLE MAPA Y METODOS ESTAN DEFINIDOS EN asiento-bus/js/admin-configuracion.js
            numero_filas = 2;
            asientos_derecho = 2;
            asientos_izquierdo = 2;

            $('#numero_filas').val(numero_filas);
            $('#asientos_derecho').val(asientos_derecho);
            $('#asientos_izquierdo').val(asientos_izquierdo);
            $('#checkTrasero').prop('checked', false);

            miMapa = [];
            borrarTodo();
            crearStrFila();
            crearFilas();
            dibujarAsientos();
        } else {
            $('#configuracionAsientos').hide();
            $('#dibujoAsientos').hide();
        }

    });

    function inicializarTabla() {
        tabla = $("#tabla_servicios").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "ServiciosAdicionales/obtenerServicio",
                "method": "GET",
                "dataSrc": function(json) {
                    //PARA CONPROVAR QUE EL SERVICIO EXISTE
                    if (json.servicio) {
                        for (let i = 0, ien = json.servicio.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button type="button" name="' + json.servicio[i].id_servicios + '" class="btn btn-primary" data-toggle="modal"';
                            html += '            data-target="">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button type="button" name="' + json.servicio[i].id_servicios + '" class="btn btn-warning" data-toggle="modal"';
                            html += '            data-target="#modal-galeria">';
                            html += '            <i class="fas fa-image" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button type="button" name="' + json.servicio[i].id_servicios + '" class="btn btn-danger" data-toggle="modal"';
                            html += '            data-target="#modal-eliminar">';
                            html += '            <i class="fas fa-trash" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';
                            json.servicio[i]["botones"] = html;

                            let html2 = "";
                            html2 += '<a class="info_contacto" href="#">' + json.servicio[i].nombre_contacto + '';
                            html2 += '    <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">';
                            html2 += '        <div class="ocultar card bg-light">';
                            html2 += '            <div class="card-body">';
                            html2 += '                <div class="row">';
                            html2 += '                    <div class="col-7">';
                            html2 += '                        <p class="text-muted text-sm">';
                            html2 += '                            <b>Nombre de Contacto</b>';
                            html2 += '                            ' + json.servicio[i].nombre_contacto + '';
                            html2 += '                        </p>';
                            html2 += '                        <ul class="ml-4 mb-0 fa-ul text-muted">';
                            html2 += '                            <li class="small">';
                            html2 += '                                <span class="fa-li">';
                            html2 += '                                    <i class="fas fa-lg fa-mail-bulk"> </i>';
                            html2 += '                                </span> ' + json.servicio[i].correo + '';
                            html2 += '                            </li>';
                            html2 += '                            <li class="small">';
                            html2 += '                                <span class="fa-li">';
                            html2 += '                                    <i class="fas fa-lg fa-phone"></i>';
                            html2 += '                                </span> Teléfono #: ' + json.servicio[i].telefono + '';
                            html2 += '                            </li>';
                            html2 += '                        </ul>';
                            html2 += '                    </div>';
                            html2 += '                    <div class="col-5 text-center">';
                            html2 += '                        <img src="' + json.servicio[i].url + '" alt=""';
                            html2 += '                            class="img-fluid">';
                            html2 += '                    </div>';
                            html2 += '                </div>';
                            html2 += '            </div>';
                            html2 += '            <div class="card-footer"></div>';
                            html2 += '        </div>';
                            html2 += '    </div>';
                            html2 += '</a>';

                            json.servicio[i]["contacto"] = html2;


                        }
                        $('#loading').hide();
                        return json.servicio;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "tipo_servicio" },
                { data: "nombre_servicio" },
                { data: "costos_defecto" },
                { data: "contacto" },
                { data: "descripcion_servicio" },
                { data: "botones" },
            ]
        });

    }

    function inicializarCombo() {
        $.ajax({
            url: URL_SERVIDOR + "TipoServicio/show",
            method: "GET"
        }).done(function(response) {
            //REST_Controller::HTTP_OK
            let myData = [];
            if (response.tipo) {
                let lista = response.tipo;
                for (let index = 0; index < lista.length; index++) {
                    myData.push({
                        id: lista[index].id_tipo_servicio,
                        text: lista[index].tipo_servicio
                    });
                }
                $('#tipo_servicio').select2({ data: myData });
            } else {
                $('#tipo_servicio').select2();
            }
        }).fail(function(response) {
            $('#tipo_servicio').select2();

        }).always(function(xhr, opts) {
            $('#loading').hide();
        });
    }

    function inicializarValidaciones() {
        $('#miFormulario').validate({
            rules: {
                nombre: {
                    required: true,
                    minlength: 3,
                    maxlength: 40
                },
                costos_defecto: {
                    required: true,
                    number: true,
                    min: 0
                },
                informacion_contacto: {
                    required: true,
                    minlength: 10,
                },
                descripcion_servicio: {
                    required: true,
                    minlength: 10,
                },
                numero_filas: {
                    required: true,
                    min: 2,
                    max: 30
                },
                asientos_derecho: {
                    required: true,
                    min: 2,
                    max: 7
                },
                asientos_izquierdo: {
                    required: true,
                    min: 2,
                    max: 7
                }
            },
            messages: {
                nombre: {
                    required: "Ingrese un nombre",
                    minlength: "Logitud del nombre debe ser mayor a 3",
                    maxlength: "Logitud del nombre no debe exceder a 40",
                },
                costos_defecto: {
                    required: "Ingrese un numero",
                    number: "Ingrese un numero",
                    min: "Debe de ser mayor que 0"
                },
                informacion_contacto: {
                    required: "La informacion de contacto es necesaria",
                    minlength: "Debe de tener una longitud minima de 10",
                },
                descripcion_servicio: {
                    required: "La descripcion del servico es necesaria",
                    minlength: "Debe de tener una longitud minima de 10",
                },
                numero_filas: {
                    required: "Ingrese el valor",
                    min: "El valor minimo es 2",
                    max: "El valor maximo es 30"
                },
                asientos_derecho: {
                    required: "Ingrese el valor",
                    min: "El valor minimo es 2",
                    max: "El valor maximo es 7"
                },
                asientos_izquierdo: {
                    required: "Ingrese el valor",
                    min: "El valor minimo es 2",
                    max: "El valor maximo es 7"
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
        let form = new FormData();

        form.append("id_servicios", idSerevicio);
        form.append("id_tipo_servicio", document.getElementById("tipo_servicio").value);
        form.append("nombre_servicio", document.getElementById("nombre").value);
        form.append("costos_defecto", document.getElementById("costos_defecto").value);
        form.append("descripcion_servicio", document.getElementById("descripcion_servicio").value);
        form.append("id_contacto", document.getElementById("contacto_servicio").value);

        let tipoServicio = $('#tipo_servicio').select2("data");
        let fila_trasera = $('#checkTrasero').prop('checked');
        if (tipoServicio[0].text === "Transporte") {
            let asientos_disponibles = numero_filas * (asientos_derecho + asientos_izquierdo);
            if (fila_trasera) {
                asientos_disponibles += asientos_derecho + asientos_izquierdo + 1;
            }
            //LE RESTAMOS LOS ASIENTOS QUE HAN SIDO INAVILITADOS
            asientos_disponibles -= sc.find('e.selected').seatIds.length;

            form.append("asientos_deshabilitados", sc.find('e.selected').seatIds);
            form.append("filas", $('#numero_filas').val());
            form.append("asiento_derecho", $('#asientos_derecho').val());
            form.append("asiento_izquierdo", $('#asientos_izquierdo').val());
            form.append("fila_trasera", fila_trasera);
            form.append("asientos_dispobibles", asientos_disponibles);
        }

        //OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "ServiciosAdicionales/update",
            method: "POST",
            mimeType: "multipart/form-data",
            data: form,
            timeout: 0,
            processData: false,
            contentType: false,
        }).done(function(response) {
            //REST_Controller::HTTP_OK
            console.log(response);
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
            $('#loadingActualizar').hide();
        });
    }

    function eliminar() {
        let data = {
            "id_servicios": idSerevicio
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO

        $.ajax({
            url: URL_SERVIDOR + "ServiciosAdicionales/elimination",
            method: "DELETE",
            timeout: 0,
            data: data
        }).done(function(response) {
            //REST_Controller::HTTP_OK
            const Toast = Swal.mixin();
            tabla.ajax.reload(null, false);
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
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

    function inicializarComboContacto() {
        //COMBO DE TIPOS 
        $('#tipo_servicio').select2();
        //COMBO DE CONTACTOS
        $.ajax({
            url: URL_SERVIDOR + "Contacto/show",
            method: "GET"
        }).done(function(response) {
            //REST_Controller::HTTP_OK
            let myData = [];
            if (response.contactos) {
                let lista = response.contactos;
                for (let index = 0; index < lista.length; index++) {
                    myData.push({
                        id: lista[index].id_contacto,
                        text: lista[index].nombre_contacto
                    });
                }
                $('#contacto_servicio').select2({ data: myData });
            } else {
                $('#contacto_servicio').select2();
            }
        }).fail(function(response) {
            $('#contacto_servicio').select2();

        }).always(function(xhr, opts) {
            //  $('#loading').hide();
        });
    }
});