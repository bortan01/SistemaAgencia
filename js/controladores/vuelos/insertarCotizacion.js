$(document).ready(function() {
    inicializarValidaciones();

    $("#btnGuardarCotizacion").on('click', function(e) {
        e.preventDefault();
        let form = $("#register-cotizarv");
        form.validate();
        if (form.valid()) {

            let comboOpciones = $("#opc_avanzadas").select2('data');
            let arregloOpciones = [];

            for (let index = 0; index < comboOpciones.length; index++) {
                arregloOpciones.push(comboOpciones[index].text);
            }

            console.log(arregloOpciones);
            let form = new FormData();

            form.append("id_cliente", document.getElementById("comboUsuario").value);
            form.append("ciudad_partida", document.getElementById("ciudad_partida").value);
            form.append("fechaPartida", document.getElementById("fechaPartida").value);
            form.append("HoraPartida", document.getElementById("timepicker").value);
            form.append("ciudad_llegada", document.getElementById("ciudad_llegada").value);
            form.append("fechaLlegada", document.getElementById("fechaLlegada").value);
            form.append("HoraLlegada", document.getElementById("timepicker2").value);
            form.append("adultos", document.getElementById("adultos").value);
            form.append("ninos", document.getElementById("ninos").value);
            form.append("bebes", document.getElementById("bebes").value);
            form.append("maletas", document.getElementById("maletas").value);
            form.append("idaerolinea", document.getElementById("idaerolinea").value);
            form.append("idclase", document.getElementById("idclase").value);
            form.append("idtipo_viaje", document.getElementById("idtipo_viaje").value);
            form.append("detallePasajero", document.getElementById("detalleBebe").value);
            form.append("opc_avanzadas", arregloOpciones);

            $.ajax({
                url: URL_SERVIDOR + "cotizarVuelo/cotizacionv",
                method: 'POST',
                data: form,
                timeout: 0,
                processData: false,
                contentType: false,

            }).done(function(response) {
                guardarBitacora();
                document.getElementById("register-cotizarv").reset();

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

        }

    });
    //PARA LAS VALIDACIONES 
    function inicializarValidaciones() {
        $('#register-cotizarv').validate({
            rules: {
                ciudad_partida: {
                    required: true,
                    minlength: 10
                },
                ciudad_llegada: {
                    required: true,
                    minlength: 10
                },
                idaerolinea: {
                    required: true
                },
                idclase: {
                    required: true
                },
                adultos: {
                    required: true,
                    number: true
                },
                ninos: {
                    required: true,
                    number: true
                },
                bebes: {
                    required: true,
                    number: true
                },
                maletas: {
                    required: true,
                    number: true
                }
            },
            messages: {
                ciudad_partida: {
                    required: "Debe de proporcionar la ciudad de partida",
                },
                ciudad_llegada: {
                    required: "Debe de proporcionar la ciudad de llegada",

                },
                idaerolinea: {
                    required: "Seleccione Aerolinea",

                },
                idclase: {
                    required: "Seleccione el tipo de clase"
                },
                adultos: {
                    required: "Ingrese solo numeros"
                },
                ninos: {
                    required: "Ingrese solo numeros"
                },
                bebes: {
                    required: "Ingrese solo numeros"
                },
                maletas: {
                    required: "Ingrese solo numeros"
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