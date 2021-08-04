$(document).ready(function() {
    let explorer = $("#kv-explorer");
    let idSeleccionado;
    let tabla;
    inicializarValidaciones();
    inicializarTabla();
    inicializarMascara();
    inicializarFoto();

    //BOTON DE EDITAR
    $(document).on('click', '.btn-group .btn-primary', function() {
        $('#loadingActualizar').hide();
        $('#modal-editar').modal('show');
        let fila = $(this).closest("tr");
        let data = tabla.row(fila).data();
        $('#nombreCliente').val(data.nombre);
        $('#correo').val(data.correo);
        $('#celular').val(data.celular);
        $('#dui').val(data.dui);
        idSeleccionado = data.id_cliente;

    });
    //BOTON EDITAR FOTO PERFIL 
    $(document).on('click', 'a[name ="camara"]', function() {
        //inicializamos nuevamente el input de foto
        inicializarFoto();
        ///abrimos el modal
        $('#modal-perfil').modal('show');
        //recuperamos la informacion
        let fila = $(this).closest("tr");
        let data = tabla.row(fila).data();
        console.log(data);
        ///le enviamos la imagen del cliente al avatar
        let $avatar = $('.file-default-preview');
        console.log($avatar.html(`<img src="${data.foto}" style="width: 186px;">`));
        console.log(data);
        ///le damos el valor al id seleccionado
        idSeleccionado = data.id_cliente;
    });
    //OTRA PARA CAMBIAR LA FOTO DE PERFIL 
    $(document).on('click', '.img-responsive', function() {
        //inicializamos nuevamente el input de foto
        inicializarFoto();
        ///abrimos el modal
        $('#modal-perfil').modal('show');
        //recuperamos la informacion
        let fila = $(this).closest("tr");
        let data = tabla.row(fila).data();
        console.log(data);
        ///le enviamos la imagen del cliente al avatar
        let $avatar = $('.file-default-preview');
        console.log($avatar.html(`<img src="${data.foto}" style="width: 186px;">`));
        console.log(data);
        ///le damos el valor al id seleccionado
        idSeleccionado = data.id_cliente;
    });
    //BOTON EDITAR DOCUMENTOS
    $(document).on('click', '.btn-group .btn-warning', function() {
        $('#modal-imagenes').modal('show');
        let identificador = $(this).attr("name");
        let nombreTabla = 'usuario_documentos';
        let informacionAdicional = { tipo: nombreTabla, identificador: identificador };
        let urlFotos = [];
        let infoFotos = [];
        console.log(identificador);
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
                maxFileSize: 2000,
                maxFilesNum: 10,
                allowedFileExtensions: ["jpg", "png", "gif"]

            });
        });
    });
    //BOTON PARA ELIMINAR
    $(document).on('click', '.btn-group .btn-danger', function(evento) {
        idSeleccionado = $(this).attr("name");

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
            if (result.value) {
                eliminar();
            }
        });
    });
    //BOTON PARA RESTAURAR USUARIOS 
    $(document).on('click', '.restaurarUsuario', function(evento) {
        idSeleccionado = $(this).attr("name");

        Swal.fire({
            title: '¿Estas seguro?',
            text: "Se Restaurar este registro!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Restaurar!'
        }).then((result) => {
            if (result.value) {
                restaurar()
            }
        });
    });
    //BOTON PARA ACTUALIZAR
    $(document).on('click', '#btnActualizar', function(evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#formularioEditar");
        form.validate();
        if (form.valid()) {
            actualizar();
        }
    });
    //BOTON DEL MODAL PARA ACTUALIZA LA FOTO DE PERFIL
    $(document).on('click', '#actualizarFotoPerfil', function(evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        //PARA SABER SI SE HA SELECCIONADO UNA FOTO 
        if (document.getElementById("foto").files[0]) {
            ActualizarFotoPerfil();
        } else {
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'error',
                text: "Seleccione una Imagen",
                showConfirmButton: true,
            });
        }
    });
    //CUANDO EL MODAL SE CIERRA DE LOS DOCUUMENTOS
    $('#modal-imagenes').on('hidden.bs.modal', function(e) {
        console.log("cerrando modal")
        explorer.fileinput('destroy');
    });


    //BOTON DE EDITAR
    $(document).on('click', '.btn-group .btn-info', function() {
        $('#loadingActualizar').hide();
        id_cliente = $(this).attr("name");

        window.location = `${URL_SISTEMA}vistas/cliente/serviciosAdquiridos.php?ac=` + id_cliente;


    });
    //CUANDO EL MODAL DE LA FOTOGRAFIA 
    $('#modal-perfil').on('hidden.bs.modal', function(e) {
            console.log("DESTRUYENDO DE NUEVO");
            $("#foto").fileinput('destroy');
            $("#formulario_perfil").trigger("reset");

        })
        //INICIALIZANDO LA TABLA
    function inicializarTabla() {
        tabla = $("#tabla_cliente").DataTable({
            responsive: true,
            autoWidth: false,
            deferRender: true,
            columns: [
                { data: "image" },
                { data: "nombre" },
                { data: "correo" },
                { data: "celular" },
                { data: "dui" },
                { data: "botones" },
                { data: "foto" },
                { data: "nivel" },
                { data: "activo" },
            ],
            columnDefs: [
                { "className": "dt-center", "targets": "_all" },
                { targets: [0], width: "13%" },
                { targets: [6], visible: false },
                { targets: [7], visible: false },
                { targets: [8], visible: false },
            ],
            ajax: {
                url: URL_SERVIDOR + "Usuario/obtenerUsuario",
                method: "GET",
                dataSrc: function(json) {
                    //PARA CONPROVAR QUE EL SERVICIO EXISTE
                    if (json.usuarios) {
                        for (let i = 0, ien = json.usuarios.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button type="button" name="' + json.usuarios[i].id_cliente + '" class="btn btn-primary" data-toggle="modal"';
                            html += '            data-target="">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button type="button" name="' + json.usuarios[i].id_cliente + '" class="btn btn-warning" data-toggle="modal"';
                            html += '            data-target="#modal-galeria">';
                            html += '            <i class="fas fa-image" style="color: white"></i>';
                            html += '        </button>';

                            if (json.usuarios[i].activo == "1") {
                                html += '        <button type="button" name="' + json.usuarios[i].id_cliente + '" class="btn btn-danger" data-toggle="modal"';
                                html += '            data-target="#modal-eliminar">';
                                html += '            <i class="fas fa-trash" style="color: white"></i>';
                                html += '        </button>';
                                html += '        <button type="button" name="' + json.usuarios[i].id_cliente + '" class="btn btn-success" data-toggle="modal"';
                                html += '            data-target="">';
                                html += '            <i class="fab fa-telegram-plane" style="color: white"></i>';
                                html += '        </button>';

                            } else {
                                html += '        <button type="button" name="' + json.usuarios[i].id_cliente + '" class="btn btn-success restaurarUsuario" data-toggle="modal"';
                                html += '            data-target="">';
                                html += '            <i class="fa fa-arrow-alt-circle-up" style="color: white"></i>';
                                html += '        </button>';
                            }
                            html += '        <button type="button" name="' + json.usuarios[i].id_cliente + '"  class="btn btn-info" data-toggle="modal"';
                            html += '            data-target="">';
                            html += '            <i class="fa fa-signal" style="color: white"></i>';
                            html += '        </button>';

                            html += '    </div>';
                            html += '</td>';
                            json.usuarios[i]["botones"] = html;

                            let html2 = "";
                            html2 += '      <div class="hovereffect">   ';
                            html2 += '         <img class="img-responsive rounded"';
                            html2 += `            src="${json.usuarios[i].foto}" `;
                            html2 += '            alt="" >';
                            html2 += '            <div class="my-overlay">';
                            html2 += '               <p>';
                            html2 += '                  <a name="camara" href="#">';
                            html2 += '                     <i class="fas fa-camera" style="color: white;"></i>';
                            html2 += '                  </a>';
                            html2 += '               </p>';
                            html2 += '            </div>';
                            html2 += '      </div>';
                            json.usuarios[i]["image"] = html2;
                        }
                        $('#loading').hide();
                        return json.usuarios;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },

        });

    }
    //CUANDO HAY CAMBIO EN EL RADIO BUTTON
    $(document).on('change', 'input[type=radio][name="radioUsuario"]', function() {
        tabla.draw();
    });
    // PARA HACER FILTRAR REGISTROS EN LA TABLA DE A CUERDO CON RADIO BUTTON
    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex) {
            let opcionSeleccionada = $("input[name='radioUsuario']:checked").val();
            switch (opcionSeleccionada) {
                case 'CLIENTE':
                    return (data[7] == "CLIENTE" && data[8] == '1');
                case 'EMPLEADO':
                    return (data[7] == "EMPLEADO" && data[8] == '1');
                case 'RENTA CARS':
                    return (data[7] == "RENTA CARS" && data[8] == '1');
                case 'INACTIVOS':
                    return data[8] == "0";
                default:
                    return true;
            }
        }
    );


    //INICIALIZANDO VALIDACIONES
    function inicializarValidaciones() {
        $('#formularioEditar').validate({
            rules: {
                nombreCliente: {
                    required: true,
                    maxlength: 50
                },
                correo: {
                    required: true,
                    email: true
                },
                password1: {
                    minlength: 8
                },
                password2: {
                    equalTo: "#password1"
                }
            },
            messages: {
                nombreCliente: {
                    required: "Ingrese un nombre",
                    minlength: "Logitud del nombre debe ser mayor a 3",
                    maxlength: "Logitud del nombre no debe exceder a 50",
                },
                correo: {
                    required: "Ingrese el correo",
                    email: "Ingrese un correo valido"
                },
                password1: {
                    minlength: "Debe tener una longitud minima de 8"
                },
                password2: {
                    equalTo: "Contraseñas no coinciden"
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
        let data = {

            "id_cliente": idSeleccionado,
            "nombre": document.getElementById("nombreCliente").value,
            "correo": document.getElementById("correo").value,
        };
        if (document.getElementById("password2").value) {
            data.password = document.getElementById("password2").value;
        }
        if (document.getElementById("dui").value) {
            data.dui = document.getElementById("dui").value;
        }
        if (document.getElementById("celular").value) {
            data.celular = document.getElementById("celular").value;
        }
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "Usuario/update",
            method: "PUT",
            timeout: 0,
            data: data
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
                $("#formularioEditar").trigger("reset");
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
            //  $('#loadingActualizar').hide();
        });
    }

    function eliminar() {
        let data = {
            "id_cliente": idSeleccionado
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO

        $.ajax({
            url: URL_SERVIDOR + "Usuario/elimination",
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

    function restaurar() {
        let data = {
            "id_cliente": idSeleccionado
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "Usuario/restaurar",
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
        let dui = $("#dui");
        dui.inputmask("99999999-9"); //static mask
        dui.inputmask({ "mask": "99999999-9" }); //specifying options
        // $("#dui").inputmask("9-a{1, 3}9{1, 3}"); //mask with dynamic syntax
        let celular = $("#celular");
        celular.inputmask("(+123) 1234-5678"); //static mask
        celular.inputmask({ "mask": "(+999) 9999-9999" }); //specifying options
    }

    function inicializarFoto() {
        // ESTO ES PARA INICIALIZAR EL ELEMENTO DE SUBIDA DE UNA UNICA FOTO
        $('#foto').fileinput({
            theme: 'fas',
            language: 'es',
            required: true,
            maxFileSize: 2000,
            maxFilesNum: 10,
            showUpload: false,
            showClose: false,
            showCaption: true,
            browseLabel: '',
            removeLabel: '',
            //removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
            removeTitle: 'Cancel or reset changes',
            elErrorContainer: '#kv-avatar-errors-1',
            msgErrorClass: 'alert alert-block alert-danger',
            defaultPreviewContent: '<img src="../../img/avatar.png" alt="Your Avatar">',
            layoutTemplates: { main2: '{preview} {remove} {browse}' },
            allowedFileExtensions: ["jpg", "png", "gif"]
        });
    }

    function ActualizarFotoPerfil() {
        $('#loading').show();
        let form = new FormData();
        //ESTO ES PARA LA FOTO DE PERFIL
        let foto_perfil = document.getElementById("foto").files[0];
        form.append('foto', foto_perfil);
        form.append('tipo', 'usuario_perfil');
        form.append('identificador', idSeleccionado);

        //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
        $.ajax({
            url: URL_SERVIDOR + "Imagen/apdate",
            method: "POST",
            mimeType: "multipart/form-data",
            data: form,
            timeout: 0,
            processData: false,
            contentType: false,
        }).done(function(response) {
            //REST_Controller::HTTP_OK
            console.log(response);
            tabla.ajax.reload(null, false);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: "FOTO ACTUALIZADA",
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA 

                $("#miFormulario").trigger("reset");
                $('#modal-perfil').modal('hide');
            });
        }).fail(function(response) {
            //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
            console.log(response);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE INFORMACIÓN",
                showConfirmButton: true,
            });

        }).always(function(xhr, opts) {
            $('#loading').hide();
        });
    }

});