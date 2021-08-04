// CUANDO LA PAGINA YA ESTA LISTA
$(document).ready(function() {
    $('#configuracionAsientos').hide();
    $('#dibujoAsientos').hide();
    inicializarGaleriaServicio();

    inicializarValidacionesServicio();
    inicializarComboContactoServicio();
    inicializarComboTipoServicio();

    //BOTON DE GUARDAR
    $(document).on('click', '#btnguardarServicio', function(evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#miFormularioServicio");
        form.validate();
        if (form.valid()) {
            guardarServicio();
        }
    });
    //BOTON PARA AGREGAR UN NUEVO TIPO 
    $(document).on('click', '#btnAgregarTipoServicio', function(evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#formularioAgregarTipoServicio");
        form.validate();
        if (form.valid()) {
            guardarTipoServicio();
        }
    });
    //BOTON DE + CONTACTO
    $(document).on('click', '#nuevoContactoServicio', function(evento) {
        $('#modal-agregarContactoSitio').modal('show');
    });
    //BOTON DE NUEVO TIPO
    $(document).on('click', '#btn-nuevoTipoServicio', function(evento) {
        $('#modal-agregarTipoServicio').modal('show');
    });
    //CAMBIO EN EL COMBO TIPO PARA MOSTRAR EL DIBUJO DEL TRANSPORTE
    $('#tipo_servicio').on('select2:select', function(e) {
        let data = e.params.data;
        if (data.text === "Transporte") {
            $('#configuracionAsientos').show();
            $('#dibujoAsientos').show();

        } else {
            $('#configuracionAsientos').hide();
            $('#dibujoAsientos').hide();
        }

    });

    function guardarServicio() {
        $('#loadingServicio').show();
        //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
        let form = getData();
        $.ajax({
            url: URL_SERVIDOR + "ServiciosAdicionales/save",
            method: "POST",
            mimeType: "multipart/form-data",
            data: form,
            timeout: 0,
            processData: false,
            contentType: false,
        }).done(function(response) {
            //REST_Controller::HTTP_OK
            actualizarCombo();
            guardarBitacora();

            //CERRAMOS EL MODAL
            $('#modal-agregarServicio').modal('hide');
            //RESTAURAMOS LOS CAMPOS
            $('#configuracionAsientos').hide();
            $('#dibujoAsientos').hide();
            $("#miFormularioServicio").trigger("reset");
            miMapa = [];
            numero_filas = 2;
            crearStrFila();
            borrarTodo();
            crearFilas();
            dibujarAsientos();
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: "Servicio Guardado Exitosamente",
                showConfirmButton: true,
            });
            $('#loadingServicio').hide();
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

        });
    }

    function getData() {
        let form = new FormData();
        //ESTO ES PARA L A GALERIA 
        let galeria = document.getElementById("fotosServicio").files;
        for (let i = 0; i < galeria.length; i++) {
            form.append('fotos[]', galeria[i]);
        }
        form.append("id_tipo_servicio", document.getElementById("tipo_servicio").value);
        form.append("nombre_servicio", document.getElementById("nombreServicio").value);
        form.append("costos_defecto", document.getElementById("costos_defectoServicio").value);
        form.append("descripcion_servicio", document.getElementById("descripcion_servicio").value);
        form.append("id_contacto", document.getElementById("contacto_servicio").value);

        let tipoServicio = $('#tipo_servicio').select2("data");
        let fila_trasera = $('#checkTrasero').prop('checked');

        if (tipoServicio[0].text === "Transporte") {
            let asientos_disponibles = numero_filas * (asientos_derecho + asientos_izquierdo);
            if (fila_trasera) {
                asientos_disponibles += asientos_derecho + asientos_izquierdo + 1;
            }
            asientos_disponibles -= sc.find('e.selected').seatIds.length;

            form.append("asientos_deshabilitados", sc.find('e.selected').seatIds);
            form.append("filas", $('#numero_filas').val());
            form.append("asiento_derecho", $('#asientos_derecho').val());
            form.append("asiento_izquierdo", $('#asientos_izquierdo').val());
            form.append("fila_trasera", fila_trasera);
            form.append("asientos_dispobibles", asientos_disponibles);
        }
        return form;
    }
    //ACTUALIZAMOS EL COMBO QUE SE ENCUENTRA EN PUBLICAR PAQUETE
    function actualizarCombo() {
        if (typeof DATA_SERVICIO !== 'undefined') {
            inicializarComboServicio();
        }
    }

    function guardarTipoServicio() {
        $('#loadingServicio').show();
        let myData = {
            tipo_servicio: document.getElementById("nombreTipoServicio").value
        }
        $.ajax({
            url: URL_SERVIDOR + "TipoServicio/save",
            method: "POST",
            data: myData,
            timeout: 0,

        }).done(function(response) {
            //REST_Controller::HTTP_OK
            let respuestaDecodificada = response;
            //AGREGAMOS RESPUESTA AL COMBO
            let texto = respuestaDecodificada.tipo.tipo_servicio;
            let id = respuestaDecodificada.id;
            let newOption = new Option(texto, id, false, false);
            $('#tipo_servicio').append(newOption).trigger('change');
            //mandamos un mensaje al usuario
            const Toast = Swal.mixin();
            guardarBitacora();

            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: respuestaDecodificada.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA 
                $("#formularioAgregarTipoServicio").trigger("reset");
                $('#modal-agregarTipoServicio').modal('hide');
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
            $("#formularioAgregarTipoServicio").trigger("reset");
            $('#modal-agregarTipoServicio').modal('hide');
            $('#loadingServicio').hide();
        });
    }

    function inicializarGaleriaServicio() {
        // ESTO ES PARA INICIALIZAR EL ELEMENTO DE SUBIDA DE FOTOS (EN ESTE CASO UNA GALERIA )
        $('#fotosServicio').fileinput({
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

    function inicializarComboContactoServicio() {
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

    function inicializarComboTipoServicio() {

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
            $('#loadingServicio').hide();
        });
    }

    function inicializarValidacionesServicio() {
        $('#miFormularioServicio').validate({
            rules: {
                nombreServicio: {
                    required: true,
                    minlength: 3,
                    maxlength: 40
                },
                costos_defectoServicio: {
                    required: true,
                    number: true,
                    min: 0
                },
                descripcion_servicio: {
                    required: true,
                    minlength: 10,
                },
                fotosServicio: {
                    required: true
                }
            },
            messages: {
                nombreServicio: {
                    required: "Ingrese un nombre",
                    minlength: "Logitud del nombre debe ser mayor a 3",
                    maxlength: "Logitud del nombre no debe exceder a 40",
                },
                costos_defectoServicio: {
                    required: "Ingrese un numero",
                    number: "Ingrese un numero",
                    min: "Debe de ser mayor que 0"
                },
                descripcion_servicioServicio: {
                    required: "La descripcion del servico es necesaria",
                    minlength: "Debe de tener una longitud minima de 10",
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
        $('#formularioAgregarTipoServicio').validate({
            rules: {
                nombreTipoServicio: {
                    required: true,
                    minlength: 3,
                }
            },
            messages: {
                nombreTipoServicio: {
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
});