$(document).ready(function() {
    inicializarValidaciones();

    $("#btnGuardar").on('click', function(e) {
        e.preventDefault();
        let form = $("#register-mantenimiento");
        form.validate();
        if (form.valid()) {

            let comboMabtenimiento = $("#mantenimiento_realizado").select2('data');
            let comboPiezas = $("#piezas_cambiadas").select2('data');
            let arregloMantimiento = [];
            let arregloPiezas = [];

            for (let index = 0; index < comboMabtenimiento.length; index++) {
                arregloMantimiento.push(comboMabtenimiento[index].text);
            }
            for (let index = 0; index < comboPiezas.length; index++) {
                arregloPiezas.push(comboPiezas[index].text);
            }
            console.log(arregloMantimiento);
            console.log(arregloPiezas);

            let form = new FormData();


            form.append("id_vehiculoFK", document.getElementById("id_placa").value);
            form.append("fecha_mantenimiento", document.getElementById("fecha").value);
            form.append("lugar_mantenimiento", document.getElementById("lugar").value);
            form.append("mantenimiento_realizado", arregloMantimiento);
            form.append("piezas_cambiadas", arregloPiezas);
            form.append("comentariosIncidentes", document.getElementById("comentarios").value);
            form.append("costoMantenimiento", document.getElementById("precio").value);




            $.ajax({
                url: URL_SERVIDOR + "mantenimientoVehiculo/mantenimiento",
                method: 'POST',
                data: form,
                timeout: 0,
                processData: false,
                contentType: false,

            }).done(function(response) {
                guardarBitacora();
                document.getElementById("register-mantenimiento").reset();

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
        $('#register-mantenimiento').validate({
            rules: {
                id_placa: {
                    required: true
                },
                fecha: {
                    required: true,
                },
                lugar: {
                    required: true,
                    minlength: 10,
                },
                precio: {
                    required: true,
                    number: true
                }
            },
            messages: {
                id_placa: {
                    required: "Seleccione un vehiculo",
                },
                fecha: {
                    required: "Debe de proporcionar la fecha",

                },
                lugar: {
                    required: "el lugar es necesario",
                    minlength: "Debe de tener una longitud minima de 10",
                },
                precio: {
                    required: "Ingrese un precio",
                    number: "Debe de ser un un numero"
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