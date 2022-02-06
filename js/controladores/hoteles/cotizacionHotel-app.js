$(document).ready(function() {

    let idCotizar;
    let tabla;

    inicializarValidaciones();
    inicializarTabla();

    //BOTON Modificar
    $(document).on('click', '.btn-group .btn-primary', function() {

        idCotizar = $(this).attr("name");

        $('#loadingActualizar').show();
        $.ajax({
            url: URL_SERVIDOR+"cotizarHotel/mostrarCotizacion?idcotizacion_hotel=" + idCotizar,
            method: "GET"
        }).done(function(response) {
            //MANDALOS LOS VALORES AL MODAL
            for (let i = 0, ien = response.informacion.length; i < ien; i++) {

                document.getElementById("nombre").value = response.informacion[i].nombre;
                document.getElementById("celular").value = response.informacion[i].celular;
                document.getElementById("correo").value = response.informacion[i].correo;
                document.getElementById("hotelito").value = response.informacion[i].nombreHotel;

                document.getElementById("costo").value = response.informacion[i].precioNoche;
                document.getElementById("fechita").value = response.informacion[i].fechaEntradaSalida;
                document.getElementById("servicios").value = response.informacion[i].servicios_adicionales;
               
                document.getElementById("descripcion_habitacion").value = response.informacion[i].detalleHabitaciones;


                document.getElementById("precioTotal").value = response.informacion[i].total;
                document.getElementById("respuestaV").value = response.informacion[i].respuesta;
            }

        }).fail(function(response) {

        }).always(function(xhr, opts) {
            $('#modal-editar').modal('show');
            $('#loadingActualizar').hide();
        });
    });

    //BOTON MOSTRAR 
    $(document).on('click', '.btn-group .btn-secondary', function() {

        idCotizar = $(this).attr("name");

        $('#loadingActualizar').show();
        $.ajax({
            url: URL_SERVIDOR+"cotizarHotel/mostrarCotizacion?idcotizacion_hotel=" + idCotizar,
            method: "GET"
        }).done(function(response) {
            //MANDALOS LOS VALORES AL MODAL
            for (let i = 0, ien = response.informacion.length; i < ien; i++) {

                $('#nombreCliente').text(response.informacion[i].nombre);
                $('#email').text(response.informacion[i].correo);
                $('#telefono').text(response.informacion[i].celular);
                $('#docIdentidad').text(response.informacion[i].dui);

                $('#pais').text(response.informacion[i].nombrePais);
                $('#hotel').text(response.informacion[i].nombreHotel);
                $('#precioN').text(response.informacion[i].precioNoche);
                

                $('#fecha').text(response.informacion[i].fechaEntradaSalida);

               
                $('#serviciosA').text(response.informacion[i].servicios_adicionales);

                $('#detalles').text(response.informacion[i].detalleHabitaciones);
               
                $('#tot').text(response.informacion[i].total);


            }

        }).fail(function(response) {

        }).always(function(xhr, opts) {
            $('#modal-cotizacion').modal('show');

        });
    });

    //Boton Eliminar
    $(document).on('click', '.btn-group .btn-danger', function(evento) {
        idCotizar = $(this).attr("name");
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
        tablaCotizaciones = $("#tabla_cotizaciones").DataTable({
            responsive: true,
            autoWidth: false,
            deferRender: true,
            columns: [
                { data: "nombre" },
                { data: "nombreHotel" },
                { data: "fechaEntradaSalida" },
                { data: "botones" }
            ],
            columnDefs: [
                { "className": "dt-center", "targets": "_all" },
            ]
        });

        $.ajax({
            type: "GET",
            url: URL_SERVIDOR + "CotizarHotel/mostrarCotizacion",

            dataType: "json",
            success: function(response) {
                for (let i = 0, ien = response.informacion.length; i < ien; i++) {
                    //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                    html = "";
                    html += '<td>';
                    html += '    <div class="btn-group">';
                    html += '        <button title="Editar" type="button" name="' + response.informacion[i].idcotizacion_hotel + '" class="btn btn-primary" data-toggle="modal"';
                    html += '            data-target="#modal-editar">';
                    html += '            <i class="fas fa-edit" style="color: white"></i>';
                    html += '        </button>';
                    html += '        <button title="Reporte" type="button" name="' + response.informacion[i].idcotizacion_hotel + '" class="btn btn-secondary" data-toggle="modal"';
                    html += '            data-target="#modal-cotizacion">';
                    html += '            <i class="fas fa-eye" style="color: white"></i>';
                    html += '        </button>';
                    html += '        <button title="Eliminar" type="button" name="' + response.informacion[i].idcotizacion_hotel + '" class="btn btn-danger" data-toggle="modal"';
                    html += '            data-target="#modal-eliminar">';
                    html += '            <i class="fas fa-trash" style="color: white"></i>';
                    html += '        </button>';
                    html += '    </div>';
                    html += '</td>';
                    response.informacion[i]["botones"] = html;

                    let nuevoDetalle = {
                        nombre: response.informacion[i].nombre,
                        nombreHotel: response.informacion[i].nombreHotel,
                        fechaEntradaSalida: response.informacion[i].fechaEntradaSalida,
                        botones: html,
                    };
                    tablaCotizaciones.row.add(nuevoDetalle).draw(false);
                }
                $('#loading').hide();
                return response.informacion;


            },
            error: function(err) {}
        });
    }

    function inicializarValidaciones() {
        $('#miFormulario').validate({
            rules: {
               total: {
                    required: true,
                    number: true
                }
            },
            messages: {
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
            "idcotizacion_hotel": idCotizar,
            "total": document.getElementById("precioTotal").value,
            "respuesta": document.getElementById("respuestaV").value
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "cotizarHotel/actualizarCotizacion",
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
                text: "ERROR EN ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function(xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }

    function eliminar() {
        let data = {
            "idcotizacion_hotel": idCotizar
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO

        $.ajax({
            url: URL_SERVIDOR + "CotizarHotel/eliminarCotizacion",
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
                text: "ERROR EN EL ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function(xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }



});