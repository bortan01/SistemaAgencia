$(document).ready(function () {
    $('#loadingCliente').hide();
    init();
    inicializarValidaciones();
    inicializarMascara();
    inicializarFoto();
    //BOTON PARA ACTUALIZAR
    $(document).on('click', '#btnActualizar', function (evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#miFormularioCliente");
        form.validate();
        if (form.valid()) {
            actualizar();
        }
    });
    //BOTON EDITAR FOTO PERFIL 
    $(document).on('click', 'a[name ="camara"]', function () {
        ///abrimos el modal
        $('#modal-perfil').modal('show');

    });
    //BOTON DEL MODAL PARA ACTUALIZA LA FOTO DE PERFIL
    $(document).on('click', '#actualizarFotoPerfil', function (evento) {
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
    function init() {
        document.getElementById("currentPhoto").src = localStorage.getItem('fotoA');
        $('#nombreCliente').val(localStorage.getItem('nombreA'));
        $('#correo').val(localStorage.getItem('correoA'));
        $('#celular ').val(localStorage.getItem('celularA'));
        $('#dui').val(localStorage.getItem('duiA'));
    }
    //INICIALIZANDO VALIDACIONES
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
        $('#loadingCliente').show();
        let data = {

            "id_cliente": localStorage.getItem('id_cliente'),
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
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            console.log(response);

            localStorage.setItem('nombre', response.usuario.nombre);
            localStorage.setItem('correo', response.usuario.correo);
            localStorage.setItem('celular', response.usuario.celular);
            localStorage.setItem('dui', response.usuario.dui);
            init();
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
                text: "ERROR EN ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loadingCliente').hide();
        });
    }
    function inicializarMascara() {
        let dui = $("#dui");
        dui.inputmask("99999999-9"); //static mask
        dui.inputmask({ "mask": "99999999-9" }); //specifying options
        // $("#dui").inputmask("9-a{1, 3}9{1, 3}"); //mask with dynamic syntax
        let celular = $("#celular");
        // celular.inputmask("(+123) 1234-5678"); //static mask
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
            defaultPreviewContent: `<img style="width: 186px;" src="${localStorage.getItem('fotoA')}" alt="Your Avatar">`,
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
        form.append('identificador', localStorage.getItem('id_cliente'));

        //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
        $.ajax({
            url: URL_SERVIDOR + "Imagen/savePhotoPerfil",
            method: "POST",
            mimeType: "multipart/form-data",
            data: form,
            timeout: 0,
            processData: false,
            contentType: false,
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            console.log(response);
            let data = JSON.parse(response);
            localStorage.setItem('foto', data.path);
            document.getElementById("currentPhoto").src = data.path;
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
        }).fail(function (response) {
            //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
            console.log(response);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE INFORMACIÓN",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loading').hide();
        });
    }
});