$(document).ready(function () {
    let explorer = $("#kv-explorer");
    let ListaDatos;
    let idSeleccionado;
    let tabla;
    inicializarValidaciones();
    inicializarTabla();
    inicializarComboTipo();
    inicializarComboContacto();

    //BOTON DE EDITAR
    $(document).on('click', '.btn-group .btn-primary', function () {
        $('#loadingActualizar').show();
        idSeleccionado = $(this).attr("name");

        $.ajax({
            url: `${URL_SERVIDOR}SitioTuristico/show?id_sitio_turistico=${idSeleccionado}&estado=1`,
            method: "GET"
        }).done(function (response) {
            let lista = response.sitios;
            if (lista) {
                console.log(lista);
                //MANDALOS LOS VALORES AL MODAL
                document.getElementById("nombre").value = lista[0].nombre_sitio;
                document.getElementById("precio_sitio").value = lista[0].precio_sitio;
                document.getElementById("descripcion").value = lista[0].descripcion_sitio;
                document.getElementById("ComboTipo").value = response.sitios[0].id_tipo_sitio;
                $('#ComboTipo').trigger('change');
                document.getElementById("contacto_servicio").value = response.sitios[0].id_contacto;
                $('#contacto_servicio').trigger('change');
            }
        }).fail(function (response) {
            console.log(response);
        }).always(function (xhr, opts) {
            $('#modal-editar').modal('show');
            $('#loadingActualizar').hide();
        });;
    });
    //BOTON EDITAR LA FOTO
    $(document).on('click', '.btn-group .btn-warning', function () {
        $('#modal-imagenes').modal('show');
        let identificador = $(this).attr("name");
        let nombreTabla = 'sitio_turistico';
        let informacionAdicional = { tipo: nombreTabla, identificador: identificador };
        let urlFotos = [];
        let infoFotos = [];
        $.ajax({
            url: URL_SERVIDOR + "Imagen/show?tipo=" + nombreTabla + "&identificador=" + identificador,
            method: "GET",

        }).done(function (response) {
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
                // POR CADA FOTO SE LLAMARA A ESTE SERVICIO
                uploadUrl: URL_SERVIDOR + '/Imagen/save',
                uploadExtraData: informacionAdicional,
                overwriteInitial: false,
                initialPreviewAsData: true,
                // initialPreviewFileType : 'pdf',
                allowedFileExtensions: ["jpg", "png", "gif", "pdf"],
                initialPreview: urlFotos,
                initialPreviewConfig: infoFotos,
                required: true,
                maxFileSize: 10000,
                maxFilesNum: 10,

            });
        });
    });
    //BOTON PARA ELIMINAR
    $(document).on('click', '.btn-group .btn-danger', function (evento) {
        idSeleccionado = $(this).attr("name");


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
            if (result.value) {
                eliminar();
            }
        });
    });
    //BOTON PARA ACTUALIZAR
    $(document).on('click', '#btnActualizar', function (evento) {
        evento.preventDefault();//para evitar que la pagina se recargue
        let form = $("#formularioEditar");
        form.validate();
        if (form.valid()) {
            actualizar();
        }
    });
    //CUANDO EL MODAL SE CIERRA
    $('#modal-imagenes').on('hidden.bs.modal', function (e) {
        console.log("cerrando modal")
        explorer.fileinput('destroy');
    })
    //BOTON DE COORDENADAS
    $(document).on('click', '#btn-mapa', function (evento) {
        $('#coordenadas').val("13.645382, -88.870769");
        $("#coordenadas-error").hide();
        $("#coordenadas").removeClass("is-invalid");
    });
    //CLICK EN EL LINK DEL CONTACTO
    $(document).on('click', '.info_contacto', function () {
        $('#modal_ver_contacto').modal('show');
        let fila = $(this).closest("tr");
        let data = tabla.row(fila).data();
        $("#spanCorreo").html(data.correo);
        $("#spanTelefono").html(data.telefono);
        $("#spanNombre").html(data.nombreContacto);
        $("#imgContacto").attr("src", data.url);
    });

    function inicializarTabla() {
        tabla = $("#tabla_servicios").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "SitioTuristico/show",
                "method": "GET",
                "dataSrc": function (json) {
                    //PARA CONPROVAR QUE EL SERVICIO EXISTE
                    if (json.sitios) {
                        for (let i = 0, ien = json.sitios.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button type="button" name="' + json.sitios[i].id_sitio_turistico + '" class="btn btn-primary" data-toggle="modal"';
                            html += '            data-target="">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button type="button" name="' + json.sitios[i].id_sitio_turistico + '" class="btn btn-warning" data-toggle="modal"';
                            html += '            data-target="#modal-galeria">';
                            html += '            <i class="fas fa-image" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button type="button" name="' + json.sitios[i].id_sitio_turistico + '" class="btn btn-danger" data-toggle="modal"';
                            html += '            data-target="#modal-eliminar">';
                            html += '            <i class="fas fa-trash" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';
                            json.sitios[i]["botones"] = html;

                            let html2 = "";
                            html2 += '<a class="info_contacto" href="#">' + json.sitios[i].contactoN + '';
                            html2 += '    <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">';
                            html2 += '        <div class="ocultar card bg-light">';
                            html2 += '            <div class="card-body">';
                            html2 += '                <div class="row">';
                            html2 += '                    <div class="col-7">';
                            html2 += '                        <p class="text-muted text-sm">';
                            html2 += '                            <b>Nombre de Contacto</b>';
                            html2 += '                            ' + json.sitios[i].contactoN + '';
                            html2 += '                        </p>';
                            html2 += '                        <ul class="ml-4 mb-0 fa-ul text-muted">';
                            html2 += '                            <li class="small">';
                            html2 += '                                <span class="fa-li">';
                            html2 += '                                    <i class="fas fa-lg fa-mail-bulk"> </i>';
                            html2 += '                                </span> ' + json.sitios[i].correo + '';
                            html2 += '                            </li>';
                            html2 += '                            <li class="small">';
                            html2 += '                                <span class="fa-li">';
                            html2 += '                                    <i class="fas fa-lg fa-phone"></i>';
                            html2 += '                                </span> Teléfono #: ' + json.sitios[i].telefono + '';
                            html2 += '                            </li>';
                            html2 += '                        </ul>';
                            html2 += '                    </div>';
                            html2 += '                    <div class="col-5 text-center">';
                            html2 += '                        <img src="' + json.sitios[i].url + '" alt=""';
                            html2 += '                            class="img-fluid">';
                            html2 += '                    </div>';
                            html2 += '                </div>';
                            html2 += '            </div>';
                            html2 += '            <div class="card-footer"></div>';
                            html2 += '        </div>';
                            html2 += '    </div>';
                            html2 += '</a>';
                            json.sitios[i]["nombreContacto"] = json.sitios[i].contactoN;
                            json.sitios[i]["contactoN"] = html2;


                        }
                        $('#loading').hide();
                        return json.sitios;


                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "nombre_sitio" },
                { data: "precio_sitio" },
                { data: "contactoN" },
                { data: "descripcion_sitio" },
                { data: "botones" },
            ]
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
        // let myCoordnada = document.getElementById("coordenadas").value;
        // myCoordnada = myCoordnada.split(', ');

        let data = {
            "id_sitio_turistico": idSeleccionado,
            "nombre_sitio": document.getElementById("nombre").value,
            // "longitud": myCoordnada[1],
            // "latitud": myCoordnada[0],
            "descripcion": document.getElementById("descripcion").value,
            "tipo": document.getElementById("ComboTipo").value,
            "informacion_contacto": document.getElementById("contacto_servicio").value,
            "precio_sitio": document.getElementById("precio_sitio").value,

        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "SitioTuristico/update",
            method: "PUT",
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
                $('#modal-editar').modal('hide');;
                tabla.ajax.reload(null, false);
            });
        }).fail(function (response) {
            console.log(response);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            //  $('#loadingActualizar').hide();
        });
    }
    function eliminar() {
        let data = {
            "id_sitio_turistico": idSeleccionado
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO

        $.ajax({
            url: URL_SERVIDOR + "SitioTuristico/elimination",
            method: "DELETE",
            timeout: 0,
            data: data
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            tabla.ajax.reload(null, false);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            });
        }).fail(function (response) {

            console.log(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }
    function inicializarComboTipo() {
        $.ajax({
            url: URL_SERVIDOR + "TipoSitio/show",
            method: "GET"
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            let myData = [];
            if (response.tipo) {
                let lista = response.tipo;
                for (let index = 0; index < lista.length; index++) {
                    myData.push({
                        id: lista[index].id_tipo_sitio,
                        text: lista[index].tipo_sitio
                    });
                }
                $('#ComboTipo').select2(
                    { data: myData }
                );
            } else {
                $('#ComboTipo').select2();
            }
        }).fail(function (response) {
            $('#ComboTipo').select2();

        }).always(function (xhr, opts) {
            $('#loading').hide();
        });

    }
    function inicializarComboContacto() {
        //COMBO DE CONTACTOS
        $.ajax({
            url: URL_SERVIDOR + "Contacto/show",
            method: "GET"
        }).done(function (response) {
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
                $('#contacto_servicio').select2(
                    { data: myData }
                );
            } else {
                $('#contacto_servicio').select2();
            }
        }).fail(function (response) {
            $('#contacto_servicio').select2();

        }).always(function (xhr, opts) {
            $('#loading').hide();
        });
    }
});