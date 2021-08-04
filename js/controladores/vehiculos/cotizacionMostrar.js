$(document).ready(function() {

    let idCotizarAuto;
    let tabla;

    inicializarValidaciones();
    inicializarTabla();

    //BOTON Modificar
    $(document).on('click', '.btn-group .btn-primary', function() {

        idCotizarAuto = $(this).attr("name");

        $('#loadingActualizar').show();
        $.ajax({
            url: URL_SERVIDOR+"cotizarVehiculo/cotizar?idcotizarVehiculo=" + idCotizarAuto,
            method: "GET"
        }).done(function(response) {
            //MANDALOS LOS VALORES AL MODAL
            for (let i = 0, ien = response.cotizacion.length; i < ien; i++) {

                document.getElementById("nombre").value = response.cotizacion[i].nombre;
                document.getElementById("nombreVehiculo").value = response.cotizacion[i].modelo;
                document.getElementById("anio").value = response.cotizacion[i].anio;
                document.getElementById("direccion_recogida").value = response.cotizacion[i].direccion_recogida;
                document.getElementById("fechaRecogida").value = response.cotizacion[i].fechaRecogida;
                document.getElementById("HoraRecogida").value = response.cotizacion[i].HoraRecogida;
                document.getElementById("direccion_devolucion").value = response.cotizacion[i].direccion_devolucion;
                document.getElementById("fechaDevolucion").value = response.cotizacion[i].fechaDevolucion;
                document.getElementById("HoraDevolucion").value = response.cotizacion[i].HoraDevolucion;
                document.getElementById("caracteristicas").value = response.cotizacion[i].caracteristicas;
                document.getElementById("descuentosA").value = response.cotizacion[i].descuentosCotizacion;
                document.getElementById("totalA").value = response.cotizacion[i].totalCotizacion;
                document.getElementById("respuestaA").value = response.cotizacion[i].respuestaCotizacion;

            }

        }).fail(function(response) {

        }).always(function(xhr, opts) {
            $('#modal-editar').modal('show');
            $('#loadingActualizar').hide();
        });
    });

    //BOTON MOSTRAR 
    $(document).on('click', '.btn-group .btn-secondary', function() {

        idCotizarAuto = $(this).attr("name");

        $('#loadingActualizar').show();
        $.ajax({
            url: URL_SERVIDOR+"cotizarVehiculo/cotizar?idcotizarVehiculo=" + idCotizarAuto,
            method: "GET"
        }).done(function(response) {
            //MANDALOS LOS VALORES AL MODAL
            for (let i = 0, ien = response.cotizacion.length; i < ien; i++) {

                $('#nombreC').text(response.cotizacion[i].nombre);
                $('#emailC').text(response.cotizacion[i].correo);
                $('#telefonoC').text(response.cotizacion[i].celular);
                $('#dui-cliente').text(response.cotizacion[i].dui);

                $('#nombreVehiculoC').text(response.cotizacion[i].modelo);
                $('#anioC').text(response.cotizacion[i].anio);
                $('#caracteristicasC').text(response.cotizacion[i].caracteristicas);

                $('#direccion_recogidaC').text(response.cotizacion[i].direccion_recogida);
                $('#fechaRecogidaC').text(response.cotizacion[i].fechaRecogida);
                $('#HoraRecogidaC').text(response.cotizacion[i].HoraRecogida);

                $('#direccion_devolucionC').text(response.cotizacion[i].direccion_devolucion);
                $('#fechaDevolucionC').text(response.cotizacion[i].fechaDevolucion);
                $('#HoraDevolucionC').text(response.cotizacion[i].HoraDevolucion);

                $('#descuent').text(response.cotizacion[i].descuentosCotizacion);
                $('#tot').text(response.cotizacion[i].totalCotizacion);
            }

        }).fail(function(response) {

        }).always(function(xhr, opts) {
            $('#modal-cotizacion').modal('show');

        });
    });

    //Boton Eliminar
    $(document).on('click', '.btn-group .btn-danger', function(evento) {
        idCotizarAuto = $(this).attr("name");
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
    $(document).on('click', '#btnActualizar', function(evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#formularioEditar");
        form.validate();
        if (form.valid()) {
            actualizar();
        }
    });





    function inicializarTabla() {
        tabla = $("#tabla_cotizacionesA").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "cotizarVehiculo/cotizar",
                "method": "GET",
                "dataSrc": function(json) {
                    console.log(json.cotizacion);

                    if (json.cotizacion) {
                        for (let i = 0, ien = json.cotizacion.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button type="button" name="' + json.cotizacion[i].idcotizarVehiculo + '" class="btn btn-primary" data-toggle="modal"';
                            html += '            data-target="#modal-editar">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button type="button" name="' + json.cotizacion[i].idcotizarVehiculo + '" class="btn btn-secondary" data-toggle="modal"';
                            html += '            data-target="#modal-cotizacion">';
                            html += '            <i class="fas fa-eye" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button type="button" name="' + json.cotizacion[i].idcotizarVehiculo + '" class="btn btn-danger" data-toggle="modal"';
                            html += '            data-target="#modal-eliminar">';
                            html += '            <i class="fas fa-trash" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';
                            json.cotizacion[i]["botones"] = html;

                        }
                        $('#loading').hide();
                        return json.cotizacion;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "nombre" },
                { data: "modelo" },
                { data: "anio" },
                { data: "botones" },
            ]
        });

    }

    function inicializarValidaciones() {
        $('#miFormulario').validate({
            rules: {
                descuentos: {
                    required: true,
                    number: true
                },
                total: {
                    required: true,
                    number: true
                }

            },
            messages: {
                descuentos: {
                    required: "Ingrese solo numeros",
                },
                total: {
                    required: "Ingrese solo numeros",
                },


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

    function actualizar() {
        $('#loadingActualizar').show();
        let data = {
            "idcotizarVehiculo": idCotizarAuto,
            "descuentosCotizacion": document.getElementById("descuentosA").value,
            "totalCotizacion": document.getElementById("totalA").value,
            "respuestaCotizacion": document.getElementById("respuestaA").value

        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "cotizarVehiculo/actualizarCotizacion",
            method: "PUT",
            timeout: 0,
            data: data
        }).done(function(response) {
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
        }).fail(function(response) {
            console.log(response);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN ENVIO DE cotizacion",
                showConfirmButton: true,
            });

        }).always(function(xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }

    function eliminar() {
        let data = {
            "idcotizarVehiculo": idCotizarAuto
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO

        $.ajax({
            url: URL_SERVIDOR + "cotizarVehiculo/eliminarCotizacion",
            method: "DELETE",
            timeout: 0,
            data: data
        }).done(function(response) {
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
        }).fail(function(response) {

            console.log(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE cotizacion",
                showConfirmButton: true,
            });

        }).always(function(xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }



});