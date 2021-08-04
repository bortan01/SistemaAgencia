$(document).ready(function () {
    let explorer = $("#kv-explorer");
    let idAlquiler;
    let id_vehiculo;
    let tabla;

    let ciento = 100;
    let TotalSinInteres = 0;

    inicializarValidaciones();
    inicializarTabla();

    //BOTON DE EDITAR
    $(document).on('click', '.btn-group .btn-primary', function () {

        idAlquiler = $(this).attr("name");
        id_vehiculo = $(this).attr("id");

        $('#loadingActualizar').show();
        $.ajax({
            url: URL_SERVIDOR + "DetalleVehiculo/obtenerDetalleVehiculo?id_detalle=" + idAlquiler,
            method: "GET"
        }).done(function (response) {
            //MANDALOS LOS VALORES AL MODAL
            for (let i = 0, ien = response.detalleVehiculo.length; i < ien; i++) {


                document.getElementById("idDetalle").value = response.detalleVehiculo[i].id_detalle;
                document.getElementById("cliente").value = response.detalleVehiculo[i].nombre;
                document.getElementById("placa").value = response.detalleVehiculo[i].placa;
                document.getElementById("anio").value = response.detalleVehiculo[i].anio;
                document.getElementById("modelo").value = response.detalleVehiculo[i].modelo;
                document.getElementById("kilometraje").value = response.detalleVehiculo[i].kilometraje;
                document.getElementById("total").value = response.detalleVehiculo[i].total_detalle;
                document.getElementById("recogida").value = response.detalleVehiculo[i].direccionRecogida_detalle;
                document.getElementById("devolucion").value = response.detalleVehiculo[i].direccionDevolucion_detalle;
                document.getElementById("fechaHora").value = response.detalleVehiculo[i].fechaHora_detalle;
                document.getElementById("servicios").value = response.detalleVehiculo[i].servicio_adicional;
            }
            for (let i = 0, ien = response.detalle_servicio.length; i < ien; i++) {

                document.getElementById("servicios").value = response.detalle_servicio[i].servicio_adicional;

            }
        }).fail(function (response) {

        }).always(function (xhr, opts) {
            $('#modal-editar').modal('show');
            $('#loadingActualizar').hide();
        });
    });

    //BOTON MOSTRAR 
    $(document).on('click', '.btn-group .btn-secondary', function () {

        idAlquiler = $(this).attr("name");
        id_vehiculo = $(this).attr("id");

        $('#loadingActualizar').show();
        $.ajax({
            url: URL_SERVIDOR + "DetalleVehiculo/obtenerDetalleVehiculo?id_detalle=" + idAlquiler,
            method: "GET"
        }).done(function (response) {
            //MANDALOS LOS VALORES AL MODAL
            for (let i = 0, ien = response.detalleVehiculo.length; i < ien; i++) {

                $('#nombreC').text(response.detalleVehiculo[i].nombre);
                $('#emailC').text(response.detalleVehiculo[i].correo);
                $('#telefonoC').text(response.detalleVehiculo[i].celular);
                $('#dui-cliente').text(response.detalleVehiculo[i].dui);

                $('#placaAuto').text(response.detalleVehiculo[i].placa);
                $('#nombreVehiculo').text(response.detalleVehiculo[i].modelo);
                $('#anioA').text(response.detalleVehiculo[i].anio);
                $('#kilometrajeA').text(response.detalleVehiculo[i].kilometraje);

                $('#direccion_recogidaC').text(response.detalleVehiculo[i].direccionRecogida_detalle);
                $('#direccion_devolucionC').text(response.detalleVehiculo[i].direccionDevolucion_detalle);


                $('#fecha-hora').text(response.detalleVehiculo[i].fechaHora_detalle);
                $('#tot').text(response.detalleVehiculo[i].total_detalle);
            }

            //para la tabla
            $('#detalle_productosServicios').empty();
            let tablaReporte = document.getElementById('detalle_productosServicios');
            response.detalle_servicio.forEach(event => {
                let tr = crearFila(event);
                tablaReporte.appendChild(tr);
            });
           /* for (let j = 0, jen = response.detalle_servicio.length; j < jen; j++) {

                $('#servicioA').text(response.detalle_servicio[j].servicio_adicional);
                $('#precioA').text(response.detalle_servicio[j].costo_servicio);
                $('#cantidadA').text(response.detalle_servicio[j].cantidad_servicio);


            }*/

        }).fail(function (response) {

        }).always(function (xhr, opts) {
            $('#modal-cotizacion').modal('show');

        });
    });

     //*para crear la tabla
     function crearFila(event) {
        let tr = document.createElement('tr');
        tr.appendChild(crearColumna(event.cantidad_servicio)); 
        tr.appendChild(crearColumna(event.servicio_adicional));
        tr.appendChild(crearColumna(event.costo_servicio));
       
        return tr;
    }
    function crearColumna(info) {
        let td = document.createElement('td');
        let label = document.createElement('label');
        label.innerHTML = info;
        label.style.fontWeight = "normal";
        td.appendChild(label);
        td.classList.add('textcenter');
        return td;
    }
        //**********funciones para crear las tablas fin

    //BOTON PARA ELIMINAR
    $(document).on('click', '.btn-group .btn-danger', function (evento) {
        idAlquiler = $(this).attr("name");
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
    //CUANDO EL MODAL SE CIERRA
    $('#modal-imagenes').on('hidden.bs.modal', function (e) {
        console.log("cerrando modal")
        explorer.fileinput('destroy');
    })

    function inicializarTabla() {
        tabla = $("#tabla_alquilados").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "DetalleVehiculo/obtenerDetalleVehiculo",
                "method": "GET",
                "dataSrc": function (json) {
                    console.log(json.detalleVehiculo);

                    if (json.detalleVehiculo) {
                        for (let i = 0, ien = json.detalleVehiculo.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button type="button" name="' + json.detalleVehiculo[i].id_detalle + '" id="' + json.detalleVehiculo[i].id_vehiculo + '" class="btn btn-primary" data-toggle="modal"';
                            html += '            data-target="#modal-editar">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button type="button" name="' + json.detalleVehiculo[i].id_detalle + '" id="' + json.detalleVehiculo[i].id_vehiculo + '" class="btn btn-secondary" data-toggle="modal"';
                            html += '            data-target="#modal-cotizacion">';
                            html += '            <i class="fas fa-eye" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';
                            json.detalleVehiculo[i]["botones"] = html;

                        }
                        $('#loading').hide();
                        return json.detalleVehiculo;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "id_detalle" },
                { data: "nombre" },
                { data: "modelo" },
                { data: "total_detalle" },
                { data: "fechaHora_detalle" },
                { data: "botones" }
            ]
        });

    }

    function inicializarValidaciones() {
        $('#miFormulario').validate({
            rules: {
                kilometraje: {
                    required: true,
                    minlength: 5,
                }
            },
            messages: {
                kilometraje: {
                    required: "Ingrese un numero",
                    number: "Ingrese un numero",
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
        $('#loadingActualizar').show();
        let data = {
            "id_detalle": idAlquiler,
            "kilometraje": document.getElementById("kilometraje").value,
            "fechaDevolucion": document.getElementById("fechaDe").value,
            "horaDevolucion": document.getElementById("timepicker").value,
            "porcentajeMora": document.getElementById("porcentaje").value,
            "totalDevolucion": document.getElementById("pagar").value,
            "idvehiculo": id_vehiculo
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "DetalleVehiculo/actualizarDetalle",
            method: "PUT",
            timeout: 0,
            data: data
        }).done(function (response) {
            console.log(response);
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
                text: "ERROR EN ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }



    $(document).on('keyup mouseup', '#porcentaje', function () {

        let interes = parseFloat(document.getElementById('porcentaje').value);
        let TotalSinInteres = parseFloat(document.getElementById('total').value);
        let calculo = parseFloat(interes * TotalSinInteres) / ciento;
        let TotalconInteres = TotalSinInteres + calculo;
        document.getElementById('pagar').value = TotalconInteres;

    });
});