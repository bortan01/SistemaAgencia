// CUANDO LA PAGINA YA ESTA LISTA
$(document).ready(function () {
    inicializarGaleria();
    inicializarValidaciones();
    $('#loadingPromocion').hide();
    
    //BOTON DE GUARDAR
    $(document).on('click', '#btnguardar', function (evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#miFormulario");
        form.validate();
        if (form.valid()) {
            guardar();
        }
    });


    function guardar() {
        $('#loadingPromocion').show();
        let form = new FormData();

        //ESTO ES PARA L A GALERIA 
        let galeria = document.getElementById("fotos").files;
        for (let i = 0; i < galeria.length; i++) {
            form.append('fotos[]', galeria[i]);
        }

        let comboOpciones = $("#opc_avanzadas").select2('data');
            let arregloOpciones = [];

            for (let index = 0; index < comboOpciones.length; index++) {
                arregloOpciones.push(comboOpciones[index].text);
            }

            console.log(arregloOpciones);
        
        form.append("nombreHotel", document.getElementById("nombre").value);
        form.append("nombrePais", document.getElementById("pais").value);
        form.append("precioNoche", document.getElementById("precio").value);
        form.append("descripcionHotel", document.getElementById("descripcion").value);
        form.append("opc_avanzadas", arregloOpciones);
     

        //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
        $.ajax({
            url: URL_SERVIDOR + "hotel/hotel",
            method: "POST",
            mimeType: "multipart/form-data",
            data: form,
            timeout: 0,
            processData: false,
            contentType: false,
        }).done(function (response) {
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
                $("#miFormulario").trigger("reset");
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
            $('#loadingPromocion').hide();
        });

    }


    function inicializarGaleria() {
        // ESTO ES PARA INICIALIZAR EL ELEMENTO DE SUBIDA DE FOTOS (EN ESTE CASO UNA GALERIA )
        $('#fotos').fileinput({
            theme: 'fas',
            language: 'es',
            //uploadUrl: '#',
            showUpload: false,
            //showCaption: false,
            maxFileSize: 200000,
            maxFilesNum: 1,
            allowedFileExtensions: ['jpg', 'png', 'jpeg', 'jfif'],
            required: true,
            uploadAsync: false,
            showClose: false,
        });
    }

    function inicializarValidaciones() {
        $('#miFormulario').validate({
            rules: {
                nombreHotel: {
                    required: true,
                    maxlength: 500
                },
                nombrePais: {
                    required: true,
                    maxlength: 500
                },
                precioHotel: {
                    required: true,

                }
            
            },
            messages: {
                nombreHotel: {
                    required: "Ingrese nombre del hotel",
                    minlength: "Logitud del nombre debe ser mayor a 3",
                    maxlength: "Logitud del nombre no debe exceder a 500",
                },
                nombrePais: {
                    required: "Ingrese un país",
                    minlength: "Logitud del país debe ser mayor a 3",
                    maxlength: "Logitud del país no debe exceder a 500",
                },
               
                precioHotel: {
                    required: "Ingrese precio por persona",

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
});