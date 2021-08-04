$(document).ready(function() {
    let explorer = $("#kv-explorer");
    let idMantenimiento;
    let tabla;


    inicializarValidaciones();
    inicializarTabla();

    //BOTON DE EDITAR
    $(document).on('click', '.btn-group .btn-primary', function() {

        idMantenimiento = $(this).attr("name");

        $('#loadingActualizar').show();
        $.ajax({
            url: URL_SERVIDOR+"mantenimientoVehiculo/mantenimiento?id_mantenimiento=" + idMantenimiento,
            method: "GET"
        }).done(function(response) {
            //MANDALOS LOS VALORES AL MODAL
            for (let i = 0, ien = response.mantenimiento.length; i < ien; i++) {

                document.getElementById("fecha").value = response.mantenimiento[i].fecha_mantenimiento;
                document.getElementById("lugar").value = response.mantenimiento[i].lugar_mantenimiento;
                document.getElementById("vehiculo").value = response.mantenimiento[i].modelo;
                document.getElementById("anio").value = response.mantenimiento[i].anio;
                document.getElementById("placa").value = response.mantenimiento[i].placa;
                document.getElementById("mantenimientos").value = response.mantenimiento[i].mantenimiento_realizado;
                document.getElementById("piezas_cambiadasM").value = response.mantenimiento[i].piezas_cambiadas;
            }




        }).fail(function(response) {

        }).always(function(xhr, opts) {
            $('#modal-editar').modal('show');
            $('#loadingActualizar').hide();
        });
    });

//BOTON MOSTRAR 
$(document).on('click', '.btn-group .btn-secondary', function() {

    idMantenimiento = $(this).attr("name");

    $('#loadingActualizar').show();
    $.ajax({
        url: URL_SERVIDOR+"mantenimientoVehiculo/mantenimiento?id_mantenimiento=" + idMantenimiento,
           method: "GET"
    }).done(function(response) {
        //MANDALOS LOS VALORES AL MODAL
        for (let i = 0, ien = response.mantenimiento.length; i < ien; i++) {

            $('#placaMantenimiento').text(response.mantenimiento[i].placa);
            $('#anioMantenimiento').text(response.mantenimiento[i].anio);
            $('#marcaMantenimiento').text(response.mantenimiento[i].marca);
            $('#modeloMantenimiento').text(response.mantenimiento[i].modelo);
           
            $('#fechaMantenimiento').text(response.mantenimiento[i].fecha_mantenimiento);
            $('#lugarMantenimiento').text(response.mantenimiento[i].lugar_mantenimiento);

            $('#mantenimientosRealizados').text(response.mantenimiento[i].mantenimiento_realizado);
            $('#piezasMantenimiento').text(response.mantenimiento[i].piezas_cambiadas);
            
            $('#tot').text(response.mantenimiento[i].costoMantenimiento);
            
        }

    }).fail(function(response) {

    }).always(function(xhr, opts) {
        $('#modal-reporte').modal('show');

    });
});
    //BOTON PARA ELIMINAR
    $(document).on('click', '.btn-group .btn-danger', function(evento) {
        idMantenimiento = $(this).attr("name");
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
        let form = $("#miFormulario");
        form.validate();
        if (form.valid()) {
            actualizar();
        }
    });
    //CUANDO EL MODAL SE CIERRA
    $('#modal-imagenes').on('hidden.bs.modal', function(e) {
        console.log("cerrando modal")
        explorer.fileinput('destroy');
    })

    function inicializarTabla() {
        tabla = $("#tabla_mantenimientos").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "mantenimientoVehiculo/mantenimiento",
                "method": "GET",
                "dataSrc": function(json) {
                    console.log(json.mantenimiento);

                    if (json.mantenimiento) {
                        for (let i = 0, ien = json.mantenimiento.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button type="button" name="' + json.mantenimiento[i].id_mantenimiento + '" class="btn btn-primary" data-toggle="modal"';
                            html += '            data-target="#modal-editar">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button type="button" name="' + json.mantenimiento[i].id_mantenimiento + '" class="btn btn-secondary" data-toggle="modal"';
                            html += '            data-target="#modal-reporte">';
                            html += '            <i class="fas fa-eye" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button type="button" name="' + json.mantenimiento[i].id_mantenimiento + '" class="btn btn-danger" data-toggle="modal"';
                            html += '            data-target="#modal-eliminar">';
                            html += '            <i class="fas fa-trash" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';

                            let fechaSalida =  moment(json.mantenimiento[i]["start"] );
                            
                            json.mantenimiento[i]["start"]  = fechaSalida.locale('es').format('L');
       
                            json.mantenimiento[i]["botones"] = html;

                        }
                        $('#loading').hide();
                        return json.mantenimiento;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "fecha_mantenimiento" },
                { data: "modelo" },
                { data: "anio" },
                { data: "lugar_mantenimiento" },
                { data: "costoMantenimiento" },
                { data: "botones" }
            ]
        });

    }

    function inicializarValidaciones() {
        $('#miFormulario').validate({
            rules: {
                lugar_mantenimiento: {
                    required: true,
                    minlength: 3,
                    maxlength: 40
                },
                mantenimiento_realizado: {
                    required: true,
                    minlength: 3,
                    maxlength: 40
                },
                piezas_cambiadas: {
                    required: true,
                    minlength: 3,
                    maxlength: 40
                }
                
            },
            messages: {
                lugar_mantenimiento: {
                    required: "Ingrese lugar",
                    minlength: "Logitud del nombre debe ser mayor a 3",
                    maxlength: "Logitud del nombre no debe exceder a 40",
                },
                mantenimiento_realizado: {
                    required: "Ingrese mantenimientos",
                    minlength: "Logitud del nombre debe ser mayor a 3",
                    maxlength: "Logitud del nombre no debe exceder a 40",
                },
                piezas_cambiadas: {
                    required: "Ingrese piezas cambiadas",
                    minlength: "Logitud del nombre debe ser mayor a 3",
                    maxlength: "Logitud del nombre no debe exceder a 40",
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

    function actualizar() {
        $('#loadingActualizar').show();
        let data = {
            "id_mantenimiento": idMantenimiento,
            "fecha": document.getElementById("fecha").value,
            "lugar_mantenimiento": document.getElementById("lugar").value,
            "piezas_cambiadas": document.getElementById("piezas_cambiadasM").value,
            "mantenimiento_realizado": document.getElementById("mantenimientos").value

        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "mantenimientoVehiculo/actualizarMantenimiento",
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
            "id_mantenimiento": idMantenimiento
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO

        $.ajax({
            url: URL_SERVIDOR + "mantenimientoVehiculo/eliminarMantenimiento",
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