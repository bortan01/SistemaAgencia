// CUANDO LA PAGINA YA ESTA LISTA
$(document).ready(function() {
    let dataTipo;
    inicializarValidaciones();
    inicializarGaleria();
    inicializarFoto();
    inicializarMascara();
    $('#loadingCliente').hide();

    $('#tipo_usuario').select2();

    //BOTON DE GUARDAR
    $(document).on('click', '#btnguardarCliente', function(evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#miFormularioCliente");
        form.validate();
        if (form.valid()) {
            guardarCliente();
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

    function inicializarGaleria() {
        // ESTO ES PARA INICIALIZAR EL ELEMENTO DE SUBIDA DE FOTOS (EN ESTE CASO UNA GALERIA )
        $('#fotosDocumentos').fileinput({
            theme: 'fas',
            language: 'es',
            //uploadUrl: '#',
            showUpload: false,
            //showCaption: false,
            maxFileSize: 2000,
            maxFilesNum: 10,
            allowedFileExtensions: ['jpg', 'png', 'gif'],
            required: true,
            uploadAsync: false,
            showClose: false,
        });
    }

    function inicializarFoto() {
        // ESTO ES PARA INICIALIZAR EL ELEMENTO DE SUBIDA DE UNA UNICA FOTO
        $('#fotoCliente').fileinput({
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

    function inicializarValidaciones() {
        $('#miFormularioCliente').validate({
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
                    required: true,
                    minlength: 8
                },
                password2: {
                    required: true,
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
                    required: "Ingrese la contraseña",
                    minlength: "Debe tener una longitud minima de 8"
                },
                password2: {
                    required: "Repita la contraseña",
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

    function guardarCliente() {
        $('#loadingCliente').show();
        let form = new FormData();
        let nivel = typeof $('#tipo_usuario').val() == 'undefined' ? 'CLIENTE' : $('#tipo_usuario').val();
        //ESTO ES PARA LA FOTO DE PERFIL
        let foto_perfil = document.getElementById("fotoCliente").files[0];
        form.append('foto', foto_perfil);

        //ESTO ES PARA L A GALERIA EN EL CASO VAYA A SUBIR SUS 
        let galeria = document.getElementById("fotosDocumentos").files;
        for (let i = 0; i < galeria.length; i++) {
            form.append('fotos[]', galeria[i]);
        }
        form.append("nombre", document.getElementById("nombreCliente").value);
        form.append("correo", document.getElementById("correo").value);
        form.append("password", document.getElementById("password2").value);
        form.append("dui", document.getElementById("dui").value);
        form.append("celular", document.getElementById("celular").value);
        form.append("nivel", nivel);
        //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
        $.ajax({
            url: URL_SERVIDOR + "Usuario/registroUser",
            method: "POST",
            mimeType: "multipart/form-data",
            data: form,
            timeout: 0,
            processData: false,
            contentType: false,
        }).done(function(response) {
            //REST_Controller::HTTP_OK
            let respuestaDecodificada = JSON.parse(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: respuestaDecodificada.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA
                guardarBitacora();
                $("#miFormularioCliente").trigger("reset");
                $("#comboUsuario").empty();
                //************prueba*************
                let DATA_USUARIO;

                $(document).ready(function() {

                    $.ajax({
                        type: "GET",
                        url: URL_SERVIDOR + "usuario/obtenerUsuario?nivel=CLIENTE",
                        async: false,
                        dataType: "json",
                        success: function(data) {
                            let $select = $('#comboUsuario');
                            $select.append('<option value="">Seleccione</option>');
                            let myData = [];
                            DATA_USUARIO = data.usuarios;
                            for (let index = 0; index < DATA_USUARIO.length; index++) {
                                myData.push({
                                    id: DATA_USUARIO[index].id_cliente,
                                    text: DATA_USUARIO[index].nombre
                                });
                            }

                            ///LE CARGAMOS LA DATA 
                            $('#comboUsuario').select2({ data: myData });
                        },

                        error: function(err) {
                            //si da un error ya que quede la alerta
                            $('#comboUsuario').select2({});
                            const Toast = Swal.mixin();
                            Toast.fire({
                                title: 'Oops...',
                                icon: 'error',
                                text: 'No hay Usuarios para mostrar',
                                showConfirmButton: true,
                            });
                        }
                    });
                });
                //**************fin prueba*********
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
            $('#loadingCliente').hide();
        });
    }

    function inicializarMascara() {
        let dui = $("#dui");
        let celular = $('#celular');
        dui.inputmask("99999999-9"); //static mask
        dui.inputmask({ "mask": "99999999-9" }); //specifying options
        // $("#dui").inputmask("9-a{1,3}9{1,3}"); //mask with dynamic syntax
        celular.inputmask("(+123) 1234-5678"); //static mask
        celular.inputmask({ "mask": "(+999) 9999-9999" }); //specifying options
    }

});