$(document).ready(function() {
    const ID_VEHICULO = urlParams.get('vehiculo');
    const estadoReservado = 2;

    inicializarValidaciones();
    inicializarCalendario();
    let contadorTabla = 0;
    let TOTAL = 0.0;
    let COMISION = 0.0;
    let TOTALVEHICULO = 0.0;
    let contadorServicio = 0;
    let TOTAL_DIAS = 1;



    let tabla = $('#add-tablaR').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "pageLength": 3,
        "responsive": true,
        "columnDefs": [
            { "className": "dt-center", "targets": "_all" },
            { "targets": [5], "visible": false },
            { "targets": [6], "visible": false },
        ],
        columns: [
            { data: "servicio" },
            { data: "costo" },
            { data: "cantidad" },
            { data: "sub_total" },
            { data: "botones" },
            { data: "id_servicio" },
            { data: "contador" },

        ]

    });

    $(document).on('click', '#agregarTabla', function(evento) {


        evento.preventDefault();

        //verifiacando que existe un precio
        let costo = $('#costo').val();


        //alert(cantidad);
        if (!costo) {} else {

            let id = document.getElementById("comboServicio").value;
            let costo = document.getElementById("costo").value;
            let cantidad = $('#cantidad').val();
            let nombre = $('#comboServicio').select2('data')[0].text;

            agregarFila(nombre, costo, cantidad, id);


        }
    });


    function agregarFila(nombre, costo, cantidad, id) {

        if (!ExisteFila(id, cantidad, costo)) {

            let subTotal = (costo * cantidad).toFixed(2);
            let html = "";
            html += '<td>';
            html += '    <div class="btn-group">';
            html += '        <button type="button" name="" class="btn btn-danger" data-toggle="modal"';
            html += '            data-target="#modal-eliminar">';
            html += '            <i class="fas fa-trash" style="color: white"></i>';
            html += '        </button>';
            html += '    </div>';
            html += '</td>';
            tabla.row.add({
                "servicio": nombre,
                "costo": costo,
                "cantidad": cantidad,
                "sub_total": subTotal,
                "botones": html,
                "id_servicio": id,
                "contador": contadorServicio,

            }).draw(false);
            //PARA ORDENAR LA TABLA
            // tabla.order([6, 'desc']).draw();
            contadorServicio++;
        }
        modificarTotal();
        modificarTotalCliente();

    }

    function ExisteFila(id, cantidadd, costo) {
        let encontrado = false;
        tabla.rows().every(function(value, index) {
            let data = this.data();
            if (id == data.id_servicio) {
                let subTotoal = (costo * cantidadd).toFixed(2);
                data.cantidad = cantidadd;
                data.sub_total = subTotoal;
                encontrado = true;
                this.data(data).draw(false);
                modificarTotal();
            }
        });
        return encontrado;


    }

    function modificarTotal() {
        TOTAL = 0.0;
        tabla.rows().every(function(value, index) {
            let data = this.data();
            TOTAL += parseFloat(data.sub_total);
        });
        $('#totalServicios').empty();
        $('#totalServicios').text("$" + (TOTAL).toFixed(2));
    }



    ///PARA LAS VALIDACIONES AL  MOMENTO DE IMPRIMIRLAS
    function inicializarValidaciones() {
        $('#cliente-form').validate({

            rules: {
                id_cliente: {
                    required: true
                }
            },
            messages: {
                id_cliente: {
                    required: "Seleccione el cliente"
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
    //BOTON DE ELIMINAR
    $(document).on('click', '.btn-group .btn-danger', function(evento) {

        tabla.row($(this).parents('tr')).remove().draw();
        modificarTotal();

    });

    $(function() {
        $("#fecha_salida").on("change", function() {
            let inicio = moment($('#fecha_salida').data('daterangepicker').startDate._d);
            let fin = moment($('#fecha_salida').data('daterangepicker').endDate._d);
            TOTAL_DIAS = fin.diff(inicio, 'days');
            let nuevoTotal = (precioAuto * TOTAL_DIAS).toFixed(2)
            $('#totalVehiculo').text(`$${nuevoTotal}(${TOTAL_DIAS} Días)`);
            TOTALVEHICULO = (precioAuto * TOTAL_DIAS);

            modificarTotalCliente();
        });
    });

    function modificarTotalCliente() {
        //POR DIA
        $('#totalCliente').empty();
        TOTALVEHICULO = (precioAuto * TOTAL_DIAS).toFixed(2);
        $('#totalCliente').text("$" + ((parseFloat(TOTAL) + (parseFloat(TOTALVEHICULO)))).toFixed(2));
        $('#emergencia').val((parseFloat(TOTAL) + (parseFloat(TOTALVEHICULO))));
    }



    function inicializarCalendario() {
        $('#fecha_salida').daterangepicker({
            timePicker: true,
            startDate: moment().startOf('hour'),
            endDate: moment().startOf('hour').add(24, 'hour'),
            locale: {
                format: 'DD/MM/YYYY hh:mm A',
                separator: " - ",
                applyLabel: "Aplicar",
                cancelLabel: "Cancelar",
                fromLabel: "De",
                toLabel: "A",
                customRangeLabel: "Custom",
                daysOfWeek: [
                    "Dom",
                    "Lun",
                    "Mar",
                    "Mie",
                    "Jue",
                    "Vie",
                    "Sab"
                ],
                monthNames: [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ],
                "firstDay": 0
            }
        });

    }
    $("#btnGuardar").on('click', function(e) {
        e.preventDefault();
        let form = $("#register-reserva");
        form.validate();
        if (form.valid()) {

            /*let comboServicios = $("#comboServicio").select2('data');
                let arregloServicios = [];
               
                for (let index = 0; index < comboServicios.length; index++) {
                    arregloServicios.push(comboServicios[index].text);
                }
                console.log(arregloServicios);*/


            let form = new FormData();

            form.append("id_vehiculo", ID_VEHICULO);
            form.append("id_cliente", document.getElementById("comboUsuario").value);
            form.append("direccionRecogida_detalle", document.getElementById("direccionR").value);
            form.append("direccionDevolucion_detalle", document.getElementById("direccionD").value);

            // form.append("nombre_detalle", arregloServicios);

            form.append("fechaHora_detalle", document.getElementById("fecha_salida").value);
            form.append("total_detalle", document.getElementById("emergencia").value);
            form.append("activo_detalle", estadoReservado);

            let detalle_servicios = [];
            tabla.rows().every(function(value, index) {
                let data = this.data();

                let servicios = data['servicio'];
                let costo_servicios = data['costo'];
                let cantidad_servicios = data['cantidad'];

                detalle_servicios.push({
                    "servicio_adicional": servicios,
                    "costo_servicio": costo_servicios,
                    "cantidad_servicio": cantidad_servicios

                });
            });
            form.append("detalle_servicios", JSON.stringify(detalle_servicios));

            $.ajax({
                url: URL_SERVIDOR + "DetalleVehiculo/saveByAgency",
                method: "POST",
                mimeType: "multipart/form-data",
                data: form,
                timeout: 0,
                processData: false,
                contentType: false,

            }).done(function(response) {
                guardarBitacora();

                document.getElementById("register-reserva").reset();

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
});