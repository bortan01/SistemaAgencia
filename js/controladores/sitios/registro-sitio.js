// CUANDO LA PAGINA YA ESTA LISTA
$(document).ready(function() {
    let dataTipo;

    inicializarComboContactoSitios();
    inicializarComboTipoSitios();
    inicializarValidacionesSitios();
    inicializarGaleriaSitios();

    //BOTON ABRIR MODAL DE CONTACTO
    $(document).on('click', '#btn-nuevoContactoSitio', function(evento) {
        $('#modal-agregarContactoSitio').modal('show');
    });
    //BOTON PARA AGREGAR UN NUEVO TIPO 
    $(document).on('click', '#btnAgregarTipoSitio', function(evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#formularioAgregarTipoSitio");
        form.validate();
        if (form.valid()) {
            guardarTipoSitio();
        }
    });
    //BOTON DE NUEVO TIPO
    $(document).on('click', '#btn-nuevoTipoSitio', function(evento) {
        $('#modal-agregarTipoSitio').modal('show');
    });
    //BOTON DE GUARDAR
    $(document).on('click', '#btnguardarSitio', function(evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#miFormularioSitio");

        form.validate();
        if (form.valid()) {
            guardarSitio();
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

    function inicializarComboTipoSitios() {
        $.ajax({
            url: URL_SERVIDOR + "TipoSitio/show",
            method: "GET"
        }).done(function(response) {
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
                $('#ComboTipoSitio').select2({ data: myData });
            } else {
                $('#ComboTipoSitio').select2();
            }
        }).fail(function(response) {
            $('#ComboTipoSitio').select2();

        }).always(function(xhr, opts) {
            $('#loadingSitio').hide();
        });

    }

    function inicializarGaleriaSitios() {
        // ESTO ES PARA INICIALIZAR EL ELEMENTO DE SUBIDA DE FOTOS (EN ESTE CASO UNA GALERIA )
        $('#fotosSitios').fileinput({
            theme: 'fas',
            language: 'es',
            //uploadUrl: '#',
            showUpload: false,
            //showCaption: false,
            maxFileSize: 2000,
            maxFilesNum: 10,
            allowedFileExtensions: ['jpg', 'png', 'gif', 'pdf'],
            required: true,
            uploadAsync: false,
            showClose: false,
        });
    }

    function inicializarComboContactoSitios() {
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
                $('#contacto_sitio').select2({ data: myData });
            } else {
                $('#contacto_sitio').select2();
            }
        }).fail(function(response) {
            $('#contacto_sitio').select2();

        }).always(function(xhr, opts) {
            // $('#loading').hide();
        });
    }

    function inicializarValidacionesSitios() {
        $('#miFormularioSitio').validate({
            rules: {
                nombreSitio: {
                    required: true,
                    minlength: 3,
                    maxlength: 40
                },
                descripcion: {
                    required: true,
                    minlength: 10,
                },
                fotosSitios: {
                    required: true
                },
                precioSitio: {
                    required: true,
                    min: 0
                }
            },
            messages: {
                nombreSitio: {
                    required: "Ingrese un nombre",
                    minlength: "Logitud del nombre debe ser mayor a 3",
                    maxlength: "Logitud del nombre no debe exceder a 40",
                },
                descripcion: {
                    required: "La descripcion es necesaria",
                    minlength: "Debe de tener una longitud minima de 10",
                },
                fotosSitios: {
                    required: "Suba por lo menos 1 foto"
                },
                nombreSitio: {
                    required: "El precio es necesario",
                    min: "Debe de ser mayor que 0"
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

    function guardarSitio() {
        $('#loadingSitio').show();
        let form = getDAta();
        //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
        $.ajax({
            url: URL_SERVIDOR + "SitioTuristico/save",
            method: "POST",
            mimeType: "multipart/form-data",
            data: form,
            timeout: 0,
            processData: false,
            contentType: false,
        }).done(function(response) {
            //REST_Controller::HTTP_OK
            guardarBitacora();
            actualizarComboSitio();
            const Toast = Swal.mixin();
            $('#modal-agregarSitio').modal('hide');
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: 'Sitio Guardado Exitosamente',
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA 

                $("#miFormularioSitio").trigger("reset");
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
            $('#loadingSitio').hide();
        });
    }

    function getDAta() {
        let form = new FormData();


        //ESTO ES PARA L A GALERIA 
        let galeria = document.getElementById("fotosSitios").files;
        for (let i = 0; i < galeria.length; i++) {
            form.append('fotos[]', galeria[i]);
        }
        form.append("nombre_sitio", document.getElementById("nombreSitio").value);
        form.append("precio_sitio", document.getElementById("precioSitio").value);
        form.append("descripcion_sitio", document.getElementById("descripcionSitio").value);
        form.append("id_tipo_sitio", document.getElementById("ComboTipoSitio").value);
        form.append("informacion_contacto", document.getElementById("contacto_sitio").value);
        form.append("nombreSitio", document.getElementById("nombreSitio").value);
        return form;
    }
    //ACTUALIZAMOS EL COMBO QUE SE ENCUENTRA EN PUBLICAR PAQUETE
    function actualizarComboSitio() {
        if (typeof DATA_SITIO !== 'undefined') {
            console.log("actualizamos el combo sitio");
            inicializarComboTuristico();
        }
    }

    function guardarTipoSitio() {
        $('#loadingSitio').show();
        let myData = {
            tipo_sitio: document.getElementById("nombreTipo").value
        }
        $.ajax({
            url: URL_SERVIDOR + "TipoSitio/save",
            method: "POST",
            data: myData,
            timeout: 0,

        }).done(function(response) {
            //REST_Controller::HTTP_OK
            let respuestaDecodificada = response;
            //AGREGAMOS RESPUESTA AL COMBO
            let texto = respuestaDecodificada.tipo.tipo_sitio;
            let id = respuestaDecodificada.id;
            let newOption = new Option(texto, id, false, false);
            $('#ComboTipoSitio').append(newOption).trigger('change');
            //mandamos un mensaje al usuario
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: respuestaDecodificada.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA 
                $("#formularioAgregarTipoSitio").trigger("reset");
                $('#modal-agregarTipoSitio').modal('hide');
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
            $("#formularioAgregarTipoSitio").trigger("reset");
            $('#modal-agregarTipoSitio').modal('hide');
            $('#loadingSitio').hide();
        });
    }


});