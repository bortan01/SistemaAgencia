$(document).ready(function() {
    let id_pregunta;
    let tabla;

    inicializarValidaciones();
    inicializarTabla();

    //BOTON MOSTRAR EL REPORTE
    $(document).on('click', '#btnRepoteActivo', function() {

        $.ajax({
            url: URL_SERVIDOR + "Producto/productosActivos",
            method: "GET"
        }).done(function(response) {
            //para la tabla
            $('#titulo').text(response.mensaje);
            let tablaReporte = document.getElementById('factura_detalle');
            response.product.forEach(event => {
                let tr = crearFila(event);
                tablaReporte.appendChild(tr);
            });
        }).fail(function(response) {

        }).always(function(xhr, opts) {
            $('#modal-cotizacion').modal('show');

        });

    }); //fin de activos

    $(document).on('click', '#btnRepoteInactivo', function() {

        $.ajax({
            url: URL_SERVIDOR + "Producto/productosInactivos",
            method: "GET"
        }).done(function(response) {
            //para la tabla
            $('#titulo').text(response.mensaje);
            let tablaReporte = document.getElementById('factura_detalle');
            response.product.forEach(event => {
                let tr = crearFila(event);
                tablaReporte.appendChild(tr);
            });
        }).fail(function(response) {

        }).always(function(xhr, opts) {
            $('#modal-cotizacion').modal('show');

        });

    });

    //*para crear la tabla
    function crearFila(event) {
        let tr = document.createElement('tr');
        tr.appendChild(crearColumna(event.nombre_producto));
        tr.appendChild(crearColumna(event.tarifa));
        tr.appendChild(crearColumna(event.unidad_medida));
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
    //FIN DE MOSTRAMOS EL REPORTE
    //BOTON DE EDITAR
    $(document).on('click', '.btn-group .btn-primary', function() {
        id_producto = $(this).attr("name");
        unidad = $(this).attr("id");

        fila = $(this).closest("tr");

        producto = fila.find('td:eq(0)').text();
        tarifa = fila.find('td:eq(1)').text();

        document.getElementById("producto").value = producto;
        document.getElementById("tarifa").value = tarifa;
        $('#id_unidad').val(unidad).trigger('change.select2');
        document.getElementById("id_producto").value = id_producto;

        $('#modificacion-producto').modal('show');
        $('#loadingActualizar').hide();

    });

    //BOTON PARA DAR DE ALTA EL PRODUCTO
    $(document).on('click', '.btn-group .btn-success', function(evento) {
        idproducto = $(this).attr("name");
        fila = $(this).closest("tr");

        const Toast = Swal.mixin();
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Se dara de alta este producto!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí!'
        }).then((result) => {
            console.log(result);
            if (result.value) {
                alta();
            }
        })
    });

    //BOTON PARA DAR DE BAJA EL PRODUCTO
    $(document).on('click', '.btn-group .btn-danger', function(evento) {
        idproducto = $(this).attr("name");
        fila = $(this).closest("tr");

        const Toast = Swal.mixin();
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Se dara de baja este producto!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí!'
        }).then((result) => {
            console.log(result);
            if (result.value) {
                baja();
            }
        })
    });
    //BOTON PARA ACTUALIZAR
    $(document).on('click', '#btnActualizarProducto', function(evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#register-form");
        form.validate();
        if (form.valid()) {
            actualizar();
        }
    });


    function inicializarTabla() {
        tabla = $("#tabla_productosMo").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "Producto/productosTabla",
                "method": "GET",
                "dataSrc": function(json) {
                    //console.log(json.preguntas);

                    if (json.product) {
                        for (let i = 0, ien = json.product.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button type="button" name="' + json.product[i].id_producto + '" id="' + json.product[i].id_unidad + '" class="btn btn-primary" data-toggle="modal"';
                            html += '         data-target="#modal-editar">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            if (json.product[i].estado_producto == 1) {

                                html += '        <button type="button" name="' + json.product[i].id_producto + '" class="btn btn-danger">';
                                html += '            <i class="fas fa-arrow-down" style="color: white"></i>';
                                html += '        </button>';
                            } else {
                                html += '        <button type="button" name="' + json.product[i].id_producto + '" class="btn btn-success">';
                                html += '            <i class="fas fa-trash" style="color: white"></i>';
                                html += '        </button>';
                            }
                            html += '    </div>';
                            html += '</td>';
                            json.product[i]["botones"] = html;

                        }
                        $('#loading').hide();
                        return json.product;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "nombre_producto" },
                { data: "tarifa" },
                { data: "unidad_medida" },
                { data: "botones" },
                { data: "estado_producto" },
            ],
            columnDefs: [
                { "className": "dt-center", "targets": "_all" },

                { targets: [4], visible: false },
            ]
        });

    }

    //CUANDO HAY CAMBIO EN EL RADIO BUTTON
    $(document).on('change', 'input[type=radio][name="radioProducto"]', function() {
        tabla.draw();
    });
    // PARA HACER FILTRAR REGISTROS EN LA TABLA DE A CUERDO CON RADIO BUTTON
    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex) {
            let opcionSeleccionada = $("input[name='radioProducto']:checked").val();
            switch (opcionSeleccionada) {
                case 'activo':
                    return (data[4] == '1');
                case 'inactivo':
                    return (data[4] == '0');
                default:
                    return true;
            }
        }
    );

    //FIN PARA LOS RADIO BUTTON
    function inicializarValidaciones() {
        $('#register-form').validate({

            rules: {
                nombre_producto: {
                    required: true,
                    minlength: 7
                },
                tarifa: {
                    required: true
                },
                unidades_medidas: {
                    required: true
                }
            },
            messages: {
                nombre_producto: {
                    required: "Digite el nombre del producto",
                    minlength: "El nombre producto debe tener una longitud minima de 7"
                },
                tarifa: {
                    required: "Digite la tarifa del producto"
                },
                unidades_medidas: {
                    required: "Seleccione una unidad de medida"
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
            "nombre_producto": document.getElementById("producto").value,
            "tarifa": document.getElementById("tarifa").value,
            "id_producto": document.getElementById("id_producto").value,
            "id_unidad_medida": document.getElementById("id_unidad").value

        };

        $.ajax({
            url: URL_SERVIDOR + "Producto/updateProducto",
            method: "POST",
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
                guardarBitacora();
                $('#modificacion-producto').modal('hide');;
                tabla.ajax.reload(null, false);
            });
        }).fail(function(response) {
            console.log(response);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Error',
                icon: 'error',
                text: "ERROR EN ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function(xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }


    function alta() {
        let data = {
            "id_producto": idproducto
        };
        $.ajax({
            url: URL_SERVIDOR + "Producto/altaProducto",
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
                text: response.mensaje,
                showConfirmButton: true,
            });

        }).always(function(xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }


    function baja() {
        let data = {
            "id_producto": idproducto
        };
        $.ajax({
            url: URL_SERVIDOR + "Producto/deleteProducto",
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
                text: response.mensaje,
                showConfirmButton: true,
            });

        }).always(function(xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }

});