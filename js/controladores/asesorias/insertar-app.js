$(document).ready(function () {

    inicializarValidaciones();

    //BOTON PARA AGREGAR
    $(document).on('click', '#btnAgregar', function (evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#register-form");
        form.validate();
        if (form.valid()) {
            add();
        }
    });


    function inicializarValidaciones() {

        $('#register-form').validate({
            rules: {
                id_cliente: {
                    required: true
                }
            },
            messages: {
                id_cliente: {
                    required: "Seleccione el Cliente"
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


    function add() {

        let form = obtenerInfo();
        $.ajax({
            url: URL_SERVIDOR + "Cita/citas",
            method: 'POST',
            mimeType: "multipart/form-data",
            data: form,
            timeout: 0,
            processData: false,
            contentType: false,

        }).done(function (response) {

            $("#modal_registro").modal('toggle');
            $('#calendar').fullCalendar('refetchEvents');
            $("#register-form").trigger("reset");
            $('#comboUsuario').val('').trigger('change');//limpia el combo
            // toastr.success(response.mensaje)//me gusta
            //console.log(response);
            // document.getElementById("register-form").reset();
            // $("#recargar").load("#recargar");//recargar solo un div y no toda la pagina
            //REST_Controller::HTTP_OK
            //let respuestaDecodificada = JSON.parse(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: 'Registro insertado con exito',
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA 
                guardarBitacora();
                //location.reload(); 
            });
        }).fail(function (response) {
            console.log(response);
            //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
            let respuestaDecodificada = JSON.parse(response.responseText);
            let listaErrores = "";

            if (respuestaDecodificada.errores) {
                ///ARREGLO DE ERRORES 
                let erroresEnvioDatos = respuestaDecodificada.errores;
                for (mensaje in erroresEnvioDatos) {
                    listaErrores += erroresEnvioDatos[mensaje] + "\n";
                     //toastr.error(erroresEnvioDatos[mensaje]);
                };
            } else {
                listaErrores = respuestaDecodificada.mensaje
            }
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Error',
                icon: 'error',
                text:listaErrores,
                showConfirmButton: true,
            });

        });

    }

    function obtenerInfo() {
        let form = new FormData();

           form.append("fecha", document.getElementById("txtFecha").value);
            form.append("usuario", document.getElementById("usuario").value);
            form.append("id_cliente", document.getElementById("comboUsuario").value);
            form.append("start", document.getElementById("timepicker").value);
            form.append("title", document.getElementById("txtTitulo").value);
            
      
        return form;
    }

});
