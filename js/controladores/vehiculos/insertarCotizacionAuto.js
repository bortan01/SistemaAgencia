$(document).ready(function() {
    inicializarValidaciones();
    $("#btnGuardarCotizacionV").on('click', function(e) {


        e.preventDefault();
        let myData = {

            "id_usuario": document.getElementById("comboUsuario").value,
            "modelo": document.getElementById("id_modelo").value,
            "anio": document.getElementById("anio").value,
            "caracteristicas": document.getElementById("caracteristicas").value,
            "direccion_recogida": document.getElementById("direccion_recogida").value,
            "fechaRecogida": document.getElementById("fechaRecogida").value,
            "HoraRecogida": document.getElementById("timepicker").value,
            "direccion_devolucion": document.getElementById("direccion_devolucion").value,
            "fechaDevolucion": document.getElementById("fechaDevolucion").value,
            "HoraDevolucion": document.getElementById("timepicker2").value
        }

        $.ajax({
            url: URL_SERVIDOR + "cotizarVehiculo/cotizar",
            method: 'POST',
            data: myData

        }).done(function(response) {
            guardarBitacora();
            document.getElementById("register-cotizarVehiculo").reset();
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA 
                location.reload();
            });

        }).fail(function(response) {
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
                title: 'Oops...',
                icon: 'error',
                text: listaErrores,
                showConfirmButton: true,
            });

        })


    });

    function inicializarValidaciones() {
        $('#register-cotizarVehiculo').validate({
            rules: {
                id_cliente: {
                    required: true
                },
                modelo: {
                    required: true
                },
                anio: {
                    required: true,
                    minlength: 4
                },
                caracteristicas: {
                    required: true,
                    minlength: 10
                },
                direccion_recogida: {
                    required: true,
                    minlength: 10
                },
                fechaRecogida: {
                    required: true
                },
                HoraRecogida: {
                    required: true
                },
                direccion_devolucion: {
                    required: true,
                    minlength: 10
                },
                fechaDevolucion: {
                    required: true
                },
                HoraDevolucion: {
                    required: true
                }
            },
            messages: {
                id_cliente: {
                    required: "Seleccione Cliente"
                },
                modelo: {
                    required: "Seleccione el Modelo"
                },
                anio: {
                    required: "Debe de proporcionar el Año"
                },
                caracteristicas: {
                    required: "Describa las caracteristicas del Vehículo que necesita"
                },
                direccion_recogida: {
                    required: "Debe proporcionar la Dirección en la cual recogera el vehículo"
                },
                fechaRecogida: {
                    required: "Seleccione Fecha de Recogida"
                },
                HoraRecogida: {
                    required: "Seleccione Hora de Recogida"
                },
                direccion_devolucion: {
                    required: "Debe proporcionar la Dirección en la cual devolvera el vehículo"
                },
                fechaDevolucion: {
                    required: "Seleccione Fecha de Devolución"
                },
                HoraDevolucion: {
                    required: "Seleccione Hora de Devolución"
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