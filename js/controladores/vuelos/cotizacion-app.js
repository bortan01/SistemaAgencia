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
            url: URL_SERVIDOR+"cotizarVuelo/mostrarCotizacion?id_cotizacion=" + idCotizar,
            method: "GET"
        }).done(function(response) {
            //MANDALOS LOS VALORES AL MODAL
            for (let i = 0, ien = response.informacion.length; i < ien; i++) {

                document.getElementById("nombre").value = response.informacion[i].nombre;
                document.getElementById("celular").value = response.informacion[i].celular;
                document.getElementById("correo").value = response.informacion[i].correo;
                document.getElementById("ciudad_partida").value = response.informacion[i].ciudad_partida;
                document.getElementById("fechaPartida").value = response.informacion[i].fechaPartida;
                document.getElementById("HoraPartida").value = response.informacion[i].HoraPartida;
                document.getElementById("ciudad_llegada").value = response.informacion[i].ciudad_llegada;
                document.getElementById("fechaLlegada").value = response.informacion[i].fechaLlegada;
                document.getElementById("HoraLlegada").value = response.informacion[i].HoraLlegada;
                document.getElementById("adultos").value = response.informacion[i].adultos;
                document.getElementById("ninos").value = response.informacion[i].ninos;
                document.getElementById("bebes").value = response.informacion[i].bebes;
                document.getElementById("maletas").value = response.informacion[i].maletas;
                document.getElementById("nombre_aerolinea").value = response.informacion[i].nombre_aerolinea;
                document.getElementById("nombre_clase").value = response.informacion[i].nombre_clase;
                document.getElementById("nombre_tipoviaje").value = response.informacion[i].nombre_tipoviaje;
                document.getElementById("opc_avanzadas").value = response.informacion[i].opc_avanzadas;
                document.getElementById("descuentos").value = response.informacion[i].descuentos;
                document.getElementById("total").value = response.informacion[i].total;
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
            url: URL_SERVIDOR+"cotizarVuelo/mostrarCotizacion?id_cotizacion=" + idCotizar,
            method: "GET"
        }).done(function(response) {
            //MANDALOS LOS VALORES AL MODAL
            for (let i = 0, ien = response.informacion.length; i < ien; i++) {

                $('#nombreCliente').text(response.informacion[i].nombre);
                $('#email').text(response.informacion[i].correo);
                $('#telefono').text(response.informacion[i].celular);
                $('#docIdentidad').text(response.informacion[i].dui);


                $('#ciudadP').text(response.informacion[i].ciudad_partida);
                $('#fechaP').text(response.informacion[i].fechaPartida);
                
                $('#horaP').text(response.informacion[i].HoraPartida);

                $('#ciudadL').text(response.informacion[i].ciudad_llegada);
                $('#fechaL').text(response.informacion[i].fechaLlegada);
                $('#horaL').text(response.informacion[i].HoraLlegada);

                $('#aerolinea').text(response.informacion[i].nombre_aerolinea);
                $('#clase').text(response.informacion[i].nombre_clase);
                $('#tipoviaje').text(response.informacion[i].nombre_tipoviaje);
                $('#opc').text(response.informacion[i].opc_avanzadas);

                $('#adult').text(response.informacion[i].adultos);
                $('#nino').text(response.informacion[i].ninos);
                $('#bb').text(response.informacion[i].bebes);
                $('#malet').text(response.informacion[i].maletas);

                $('#descuent').text(response.informacion[i].descuentos);
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
                { data: "ciudad_partida" },
                { data: "ciudad_llegada" },
                { data: "botones" }
            ],
            columnDefs: [
                { "className": "dt-center", "targets": "_all" },

              
            ]
        });

        $.ajax({
            type: "GET",
            url: URL_SERVIDOR + "cotizarVuelo/mostrarCotizacion",

            dataType: "json",
            success: function(response) {


                for (let i = 0, ien = response.informacion.length; i < ien; i++) {
                    //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                    html = "";
                    html += '<td>';
                    html += '    <div class="btn-group">';
                    html += '        <button type="button" name="' + response.informacion[i].id_cotizacion + '" class="btn btn-primary" data-toggle="modal"';
                    html += '            data-target="#modal-editar">';
                    html += '            <i class="fas fa-edit" style="color: white"></i>';
                    html += '        </button>';
                    html += '        <button type="button" name="' + response.informacion[i].id_cotizacion + '" class="btn btn-secondary" data-toggle="modal"';
                    html += '            data-target="#modal-cotizacion">';
                    html += '            <i class="fas fa-eye" style="color: white"></i>';
                    html += '        </button>';
                    html += '        <button type="button" name="' + response.informacion[i].id_cotizacion + '" class="btn btn-danger" data-toggle="modal"';
                    html += '            data-target="#modal-eliminar">';
                    html += '            <i class="fas fa-trash" style="color: white"></i>';
                    html += '        </button>';
                    html += '    </div>';
                    html += '</td>';
                    response.informacion[i]["botones"] = html;

                    let nuevoDetalle = {
                        nombre: response.informacion[i].nombre,
                        ciudad_partida: response.informacion[i].ciudad_partida,
                        ciudad_llegada: response.informacion[i].ciudad_llegada,
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
            "id_cotizacion": idCotizar,
            "descuentos": document.getElementById("descuentos").value,
            "total": document.getElementById("total").value


        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "cotizarVuelo/actualizarCotizacion",
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
            "id_cotizacion": idCotizar
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO

        $.ajax({
            url: URL_SERVIDOR + "cotizarVuelo/eliminarCotizacion",
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