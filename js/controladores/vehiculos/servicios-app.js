$(document).ready(function () {

    let idServicio;
    let tabla;

    inicializarValidaciones();
    inicializarTabla();
    $('#loadingActualizarServicio').hide();


    //BOTON MOSTRAR 
    $(document).on('click', '.btn-group .btn-primary', function () {

        idServicio = $(this).attr("name");

        $('#loadingActualizar').show();
        $.ajax({
            url: URL_SERVIDOR + "serviciosVehiculo/mostrarServicios?idservicios_opc=" + idServicio,
            method: "GET"
        }).done(function (response) {
            //MANDALOS LOS VALORES AL MODAL
            for (let i = 0, ien = response.Servicios.length; i < ien; i++) {

                document.getElementById("nombre_servicio").value = response.Servicios[i].nombre_servicio;
                document.getElementById("descripcion").value = response.Servicios[i].descripcion;
                document.getElementById("precio").value = response.Servicios[i].precio;
            }

        }).fail(function (response) {

        }).always(function (xhr, opts) {
            $('#modal-editar').modal('show');
            $('#loadingActualizar').hide();
        });
    });


    //Boton Eliminar
    $(document).on('click', '.btn-group .btn-danger', function (evento) {
        idServicio = $(this).attr("name");
        fila = $(this).closest("tr");

        const Toast = Swal.mixin();
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Se Eliminará este registro!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        }).then((result) => {
            console.log(result);
            if (result.value) {
                eliminar();
            }
        })
    });
    //BOTON PARA ACTUALIZAR
    $(document).on('click', '#btnActualizar', function (evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#miFormulario");
        form.validate();
        if (form.valid()) {
            actualizar();
        }
    });


    function inicializarTabla() {
        tabla = $("#tabla_servicios").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "serviciosVehiculo/mostrarServicios",
                "method": "GET",
                "dataSrc": function (json) {
                    console.log(json.Servicios);

                    if (json.Servicios) {
                        for (let i = 0, ien = json.Servicios.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button title="Editar" type="button" name="' + json.Servicios[i].idservicios_opc + '" class="btn btn-primary" data-toggle="modal"';
                            html += '            data-target="#modal-editar">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button title="Eliminar" type="button" name="' + json.Servicios[i].idservicios_opc + '" class="btn btn-danger" data-toggle="modal"';
                            html += '            data-target="#modal-eliminar">';
                            html += '            <i class="fas fa-trash" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';
                            json.Servicios[i]["botones"] = html;

                        }
                        $('#loading').hide();
                        return json.Servicios;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "nombre_servicio" },
                { data: "descripcion" },
                { data: "precio" },
                { data: "botones" },
            ]
        });

    }

    function inicializarValidaciones() {
        $('#miFormulario').validate({
            rules: {
                nombre_servicio: {
                    required: true,
                    minlength: 3,
                    maxlength: 40
                },
                descripcion: {
                    required: true,
                    minlength: 3,
                    maxlength: 200
                },
                precio: {
                    required: true,
                    number: true,
                    min: 1
                }
            },
            messages: {
                nombre_servicio: {
                    required: "Ingrese el nombre del Servicio",
                    minlength: "Logitud del nombre debe ser mayor a 3",
                    maxlength: "Logitud del nombre no debe exceder a 40",
                },
                descripcion: {
                    required: "Ingrese en que consiste el Servicio",
                    minlength: "Logitud del nombre debe ser mayor a 3",
                    maxlength: "Logitud del nombre no debe exceder a 200",
                },
                precio: {
                    required: "Ingrese un número",
                    number: "Ingrese un número",
                    min: "Debe de ser mayor que 0"
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
        $('#loadingActualizarServicio').show();
        let data = {
            "idservicios_opc": idServicio,
            "nombre_servicio": document.getElementById("nombre_servicio").value,
            "descripcion": document.getElementById("descripcion").value,
            "precio": document.getElementById("precio").value

        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "serviciosVehiculo/actualizarServicios",
            method: "PUT",
            timeout: 0,
            data: data
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                $('#modal-editar').modal('hide');;
                tabla.ajax.reload(null, false);
            });
        }).fail(function (response) {
            console.log(response);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "FALTA COMPLETAR INFORMACIÓN",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loadingActualizarServicio').hide();
        });
    }

    function eliminar() {
        let data = {
            "idservicios_opc": idServicio
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO

        $.ajax({
            url: URL_SERVIDOR + "serviciosVehiculo/eliminarServicios",
            method: "DELETE",
            timeout: 0,
            data: data
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                tabla.ajax.reload(null, false);
            });
        }).fail(function (response) {

            console.log(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }



});