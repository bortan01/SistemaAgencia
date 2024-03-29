$(document).ready(function () {

    inicializarValidacionesGuardar();
    inicializarGaleria();

    telefono();
    $('#loadingRegistroEncomienda').hide();
    let contadorTabla = 0;
    let TOTAL = 0.0;
    let COMISION = 0.0;
    let TOTALCLIENTE = 0.0;
    let COSTO_ENVIO = 0;
    // let cantidad = document.getElementById("cantidad");
    let tabla = $('#add-tabla').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "pageLength": 3,
        "responsive": true,
        "columnDefs": [
            { "className": "text-center", "targets": "_all" },
            { "targets": [5], "visible": false },
            { "targets": [6], "visible": false },
        ]

    });

    $(document).on('click', '#agregarTabla', function (evento) {


        evento.preventDefault();
        $('#agregarTabla').attr("disabled", true);
        //verifiacando que existe un precio
        let costo = $('#costo').val();
        let cantidad = $('#cantidad').val();
        //alert(cantidad);
        if (!cantidad) {
            errors = { cantidad: "Digite la cantidad" };
            $("#encomiendass-form").validate().showErrors(errors);
        } else {

            let id = document.getElementById("id_producto").value;
            let combo = document.getElementById("id_producto");
            let nombre = combo.options[combo.selectedIndex].text;

            agregarFila(nombre, costo, cantidad, id);


        }
    });

    function agregarFila(nombre, costo, cantidad, id) {

        if (!ExisteFila(id, cantidad, costo)) {

            let subTotoal = (costo * cantidad).toFixed(2);
            let html = "";
            html += '<td>';
            html += '    <div class="btn-group">';
            html += '        <button type="button" name="" class="btn btn-danger" data-toggle="modal"';
            html += '            data-target="#modal-eliminar">';
            html += '            <i class="fas fa-trash" style="color: white"></i>';
            html += '        </button>';
            html += '    </div>';
            html += '</td>';
            tabla.row.add([nombre, costo, cantidad, subTotoal, html, id, contadorTabla]).draw(false);
            //PARA ORDENAR LA TABLA
            tabla.order([6, 'desc']).draw();
            contadorTabla++;
        }
        modificarCostoEnvio();
        modificarTotal();
        modificarComision();
        modificarTotalCliente();
    }

    function ExisteFila(id, cantidad, costo) {
        let encontrado = false;
        tabla.rows().every(function (value, index) {
            let data = this.data();
            if (id == data[5]) {
                let subTotoal = (costo * cantidad).toFixed(2);
                data[2] = cantidad;
                data[3] = subTotoal;
                encontrado = true;
                this.data(data).draw(false);
            }
        });
        return encontrado;


    }

    function modificarTotal() {
        TOTAL = 0.0;
        tabla.rows().every(function (value, index) {
            let data = this.data();
            TOTAL += parseFloat(data[3]);
        });
        $('#total').empty();
        $('#total').text("$" + TOTAL);
    }

    function modificarComision() {
        let porcentaje = (parseInt($('#porcenaje').val())) / 100;
        COMISION = porcentaje * TOTAL;
        $('#comision').empty();
        $('#comision').text("$" + parseFloat(COMISION).toFixed(2));
    }

    function modificarTotalCliente() {

        $('#totalCliente').empty();
        $('#totalCliente').text("$" + (TOTAL + COMISION + COSTO_ENVIO));
    }

    function modificarCostoEnvio() {
        // DATA_MUNICIPIOS esta difinida en el js encominda/producto.js
        let id = document.getElementById('municipio_envio').value;
        let municipio_envio = DATA_MUNICIPIOS.find(municipio_envio => municipio_envio.id_municipio === id);
        COSTO_ENVIO = parseInt(municipio_envio.costo_agregado);
        $('#envio').empty();
        $('#envio').text("$" + (municipio_envio.costo_agregado));


    }
    //BOTON DE ELIMINAR
    $(document).on('click', '.btn-group .btn-danger', function (evento) {

        tabla.row($(this).parents('tr')).remove().draw();
        modificarTotal();
        modificarComision();
        modificarTotalCliente();
    });
    //CAMBIOS EN EL INPUT DE PORCENTAJE
    $(document).on('keyup mouseup', '#porcenaje', function () {
        modificarComision();
        modificarTotalCliente();
    });

    //BOTON DE GUARDAR 
    $(document).on('click', '#btnguardar', function (evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#encomiendass-form");

        if (form.valid()) {
            guardar();
        }
    });

    function inicializarValidacionesGuardar() {
        $('#encomiendass-form').validate({

            rules: {
                comboUsuario: {
                    required: true
                },
                ciudad: {
                    required: true,
                    minlength: 7
                },
                codigo: {
                    required: true,
                    minlength: 2
                }, cliente_des: {
                    required: true,
                    minlength: 10
                },
                telefono_des: {
                    required: true
                },
                ciudad_des: {
                    required: true,
                    minlength: 7
                },
                codigo_des: {
                    required: true,
                    minlength: 2
                },
                direccion: {
                    required: true,
                    minlength: 10
                },
                direccion_alterna: {
                    required: true,
                    minlength: 10
                }
            },
            messages: {
                comboUsuario: {
                    required: "Seleccione el cliente"
                },
                ciudad: {
                    required: "Digite la ciudad",
                    minlength: "La ciudad debe de tener una longitud minima de 7"
                },
                codigo: {
                    required: "Digite el Código postal",
                    minlength: "El Código debe de tener una longitud minima de 2"
                },
                cliente_des: {
                    required: "Digite el nombre del cliente destino",
                    minlength: "El nombre del cliente debe de tener una longitud minima de 10"
                },
                telefono_des: {
                    required: "Digite el Teléfono"
                },
                ciudad_des: {
                    required: "Digite la ciudad",
                    minlength: "La ciudad debe de tener una longitud minima de 7"
                },
                codigo_des: {
                    required: "Digite el Código postal",
                    minlength: "El Código debe de tener una longitud minima de 2"
                },
                direccion: {
                    required: "Digite la dirección",
                    minlength: "La dirección debe de tener una longitud minima de 10"
                },
                direccion_alterna: {
                    required: "Digite la dirección alterna",
                    minlength: "La dirección alterna debe de tener una longitud minima de 10"
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

    function guardar() {
        $('#loadingRegistroEncomienda').show();
        let form = obtenerData();

        //ESTO ES PARA LA GALERIA 
        let galeria = document.getElementById("fotos").files;
        for (let i = 0; i < galeria.length; i++) {
            form.append('fotos[]', galeria[i]);
        }

        //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
        $.ajax({
            url: URL_SERVIDOR + "Encomienda/encomiendas",
            method: "POST",
            mimeType: "multipart/form-data",
            data: form,
            timeout: 0,
            processData: false,
            contentType: false,
        }).done(function (response) {
            $("#encomiendass-form").trigger("reset");
            $('#comboUsuario').val('').trigger('change');
            $('#id_producto').val('').trigger('change');
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: "Registro insertado con éxito",
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA 
                guardarBitacora();
                // location.reload();
                // $("#encomienda-form").trigger("reset");
                resetMiTable();
                comisionCargada();

            });

        }).fail(function (response) {
           
        }).always(function (xhr, opts) {
            $('#loadingRegistroEncomienda').hide();
        });
    }

    function obtenerData() {
        let form = new FormData();
        let detalle_encomienda = [];
        let detalle_destino = [];
        let nombre_cliente_destino = document.getElementById("cliente_des").value;
        let telefono = document.getElementById("telefono_des").value;
        let direccion_destino = document.getElementById("direccion").value;
        let alterna_destino = document.getElementById("direccion_alterna").value;
        let id_municipio = document.getElementById('municipio_envio').value;

        tabla.rows().every(function (value, index) {
            let data = this.data();

            let id_producto = data[5];
            let cantidad = data[2];
            let sub_total = data[3];

            detalle_encomienda.push({
                "id_producto": id_producto,
                "cantidad": cantidad,
                "sub_total": sub_total

            });
        });

        detalle_destino.push({
            "nombre_cliente_destini": nombre_cliente_destino,
            "telefono": telefono,
            "direccion_destino": direccion_destino,
            "alterna_destino": alterna_destino
        });


        form.append("fecha", document.getElementById("fecha").value);
        form.append("estado", document.getElementById("estado").value);
        form.append("total_encomienda", TOTAL);
        form.append("total_comision", COMISION);
        form.append("total_cliente", (TOTAL + COMISION + COSTO_ENVIO));
        form.append("id_usuario", document.getElementById("comboUsuario").value);
        form.append("id_municipio", id_municipio);
        form.append("ciudad_origen", "San Vicente");
        form.append("detalle_encomienda", JSON.stringify(detalle_encomienda));
        form.append("detalle_destino", JSON.stringify(detalle_destino));



        return form;

    }
    //ME BORRA LA COMISIÓN CUANDO LE DOY RESET AL FORMULARIO VAMOS A VER SI FUNCIONA CON ESTO SOLVERTAR EL PROBLEMA
    function comisionCargada() {
        $.ajax({
            type: "GET",
            url: URL_SERVIDOR + "Producto/productos",
            dataType: "json",
            success: function (data) {
                ///vamos a cargar la comision de la agencia
                $.each(data.comision, function (i, index) {
                    $("#porcenaje").val(index.porcentaje);

                });
            },
            error: function (err) {

            }
        });
    }

    //FIN DE COLOCAR DE NUEVO LA COMISIÓN    

    function resetMiTable() {
        contadorTabla = 0;
        TOTAL = 0.0;
        COMISION = 0.0;
        TOTALCLIENTE = 0.0;
        tabla.clear().draw();
        $('#total').text("$0");
        $('#comision').text("$0");
        $('#totalCliente').text("$0");
    }


    function inicializarGaleria() {
        // ESTO ES PARA INICIALIZAR EL ELEMENTO DE SUBIDA DE FOTOS (EN ESTE CASO UNA GALERIA )
        $('#fotos').fileinput({
            theme: 'fas',
            language: 'es',
            //uploadUrl: '#',
            showUpload: false,
            //showCaption: false,
            maxFileSize: 200000,
            maxFilesNum: 10,
            allowedFileExtensions: ['jpg', 'png', 'jpeg', 'jfif'],
            required: true,
            uploadAsync: false,
            showClose: false,
        });
    }



    //funcion para cargar el celular en el input
    function telefono() {

        $("#comboUsuario").change(function () {
            var id = document.getElementById("comboUsuario").value;

            $.ajax({
                url: URL_SERVIDOR + "Usuario/obtenerUsuario?nivel=CLIENTE&id_cliente=" + id,
                method: 'GET'

            }).done(function (response) {
                $.each(response.usuarios, function (i, index) {
                    $("#telefono").val(index.celular);

                });




            }).fail(function (response) {
                const Toast = Swal.mixin();
                Toast.fire({
                    title: 'Error',
                    icon: 'error',
                    text: response.mensaje,
                    showConfirmButton: true,
                });

            });


        });

    }

});