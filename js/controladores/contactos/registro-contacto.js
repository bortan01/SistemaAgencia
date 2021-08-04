$('#loadingContacto').hide();
inicializarValidacionesSitios();
inicializarFotoContactoSitio();
inicializarMascara();

//BOTON PARA AGREGAR UN NUEVO   CONTACTO 
$(document).on('click', '#btnAgregarContactoSitio', function(evento) {
    evento.preventDefault(); //para evitar que la pagina se recargue
    let form = $("#formularioAgregarContacto");
    form.validate();
    if (form.valid()) {
        guardarContactoSitios();
    }
});

function inicializarFotoContactoSitio() {
    // ESTO ES PARA INICIALIZAR EL ELEMENTO DE SUBIDA DE UNA UNICA FOTO
    $('#fotoContactoSitio').fileinput({
        theme: 'fas',
        language: 'es',
        // required: true,
        maxFileSize: 20000,
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
        allowedFileExtensions: ["jpg", "png", "gif", 'pdf']
    });
}

function inicializarValidacionesSitios() {

    $('#formularioAgregarContacto').validate({
        rules: {
            correoContactoSitio: {
                email: true
            },
            nombreContactoSitio: {
                required: true,
                minlength: 3,
            },
            telefonoContactoSitio: {
                minlength: 16
            }
        },
        messages: {
            correoContactoSitio: {
                email: "Ingrese un correo electrónico válido"
            },
            nombreContactoSitio: {
                required: "Es necesario un nombre",
                minlength: "Debe de tener una longitud minima de 3"
            },
            telefonoContactoSitio: {
                minlength: "Complete el teléfono"
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

    $('#formularioAgregarTipoSitio').validate({
        rules: {
            nombreTipo: {
                required: true,
                minlength: 3,
            }
        },
        messages: {
            nombreTipo: {
                required: "Es necesario un nombre",
                minlength: "Debe de tener una longitud minima de 3"
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

function guardarContactoSitios() {
    $('#loadingSitio').show();
    let form = new FormData();

    let foto_perfil = document.getElementById("fotoContactoSitio").files[0];
    form.append('foto', foto_perfil);
    form.append("nombre_contacto", document.getElementById("nombreContactoSitio").value);
    form.append("telefono", document.getElementById("telefonoContactoSitio").value);
    form.append("correo", document.getElementById("correoContactoSitio").value);
    form.append("id_contacto", document.getElementById("contacto_servicio"));
    //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
    $.ajax({
        url: URL_SERVIDOR + "Contacto/save",
        method: "POST",
        mimeType: "multipart/form-data",
        data: form,
        timeout: 0,
        processData: false,
        contentType: false,
    }).done(function(response) {
        //REST_Controller::HTTP_OK
        // console.log(response);
        let respuestaDecodificada = JSON.parse(response);
        //AGREGAMOS RESPUESTA AL COMBO
        let texto = respuestaDecodificada.contacto.nombre_contacto;
        let id = respuestaDecodificada.id;
        let newOption = new Option(texto, id, false, false);
        let demas = $('#contacto_servicio').append(newOption).trigger('change');
        console.log(demas);
        guardarBitacora();

        $('#contacto_sitio').append(newOption).trigger('change');
        $('#modal-agregarContactoSitio').modal('hide');
        //mandamos un mensaje al usuario
        const Toast = Swal.mixin();
        Toast.fire({
            title: 'Exito...',
            icon: 'success',
            text: respuestaDecodificada.mensaje,
            showConfirmButton: true,
        }).then((result) => {
            //TODO BIEN Y RECARGAMOS LA PAGINA 
            $("#formularioAgregarContacto").trigger("reset");
        });
    }).fail(function(response) {
        //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
        console.log(response);
        let listaErrores = "ERROR EN EL ENVIO DE INFORMACION";
        const Toast = Swal.mixin();
        Toast.fire({
            title: 'Oops...',
            icon: 'error',
            text: listaErrores,
            showConfirmButton: true,
        });

    }).always(function(xhr, opts) {
        $("#formularioAgregarContacto").trigger("reset");
        $('#loadingSitio').hide();
    });
}

function inicializarMascara() {
    let telefono = $('#telefonoContactoSitio');
    // $("#dui").inputmask("9-a{1,3}9{1,3}"); //mask with dynamic syntax
    telefono.inputmask("(+123) 1234-5678"); //static mask
    telefono.inputmask({ "mask": "(+999) 9999-9999" }); //specifying options
}