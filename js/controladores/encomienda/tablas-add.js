$(document).ready(function () {

    inicializarValidacionesGuardar();
    inicializarGaleria();

    telefono();

    let contadorTabla = 0;
    let TOTAL = 0.0;
    let COMISION = 0.0;
    let TOTALCLIENTE = 0.0;
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
            { "className": "dt-center", "targets": "_all" },
            { "targets": [5], "visible": false },
            { "targets": [6], "visible": false },
        ]

    });

    //PARA LAS ENCOMIENDAS

    //AGREGANDO LA INFORMACION DE UN TUR A LA TABLA
    $(document).on('click', '#agregarTabla', function (evento) {


        evento.preventDefault();
        $('#agregarTabla').attr("disabled", true);
        //verifiacando que existe un precio
        let costo = $('#costo').val();
        let cantidad = $('#cantidad').val();
        //alert(cantidad);
        if (!cantidad) {
            errors = { cantidad: "Digite la cantidad" };
            $("#encomienda-form").validate().showErrors(errors);
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
        $('#totalCliente').text("$" + (TOTAL + COMISION));
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
        let form = $("#datosOrigen-form");
        let form1 = $("#datosDestino-form");
        form1.validate();
        form.validate();
        if (form.valid()) {
            if (form1.valid()) {
                guardar();
            }

        }
    });

    function inicializarValidacionesGuardar() {
        $('#datosOrigen-form').validate({

            rules: {
                id_usuario: {
                    required: true
                },
                ciudad: {
                    required: true,
                    minlength: 7
                },
                codigo: {
                    required: true,
                    minlength: 2
                }
            },
            messages: {
                id_usuario: {
                    required: "Seleccione el cliente"
                },
                ciudad: {
                    required: "Digite la ciudad",
                    minlength: "La ciudad debe de tener una longitud minima de 7"
                },
                codigo: {
                    required: "Digite el Código postal",
                    minlength: "El Código debe de tener una longitud minima de 2"
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

        $('#datosDestino-form').validate({

            rules: {
                cliente_des: {
                    required: true,
                    minlength: 10
                },
                telefono_des: {
                    required: true,
                    minlength: 9
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
                cliente_des: {
                    required: "Digite el nombre del cliente destino",
                    minlength: "El nombre del cliente debe de tener una longitud minima de 10"
                },
                telefono_des: {
                    required: "Digite el Teléfono",
                    minlength: "El Teléfono debe de tener una longitud minima de 9"

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
        $('#loading').show();
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
            //console.log(response);
            document.getElementById("datosOrigen-form").reset();
            document.getElementById("datosDestino-form").reset();
            $('#comboUsuario').val('').trigger('change');
            $('#id_producto').val('').trigger('change');

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: "Registro Guardado",
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA 
                guardarBitacora();
                location.reload();
               // $("#encomienda-form").trigger("reset");
               // resetMiTable();
                
            });

        }).fail(function (response) {
            //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
            console.log(response);

            /*const Toast = Swal.mixin();
            Toast.fire({
                title: 'Error',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE INFORMACIÓN",
                showConfirmButton: true,
            });*/

        }).always(function (xhr, opts) {
            $('#loading').hide();
        });
    }

    function obtenerData() {
        let form = new FormData();
        let detalle_encomienda = [];
        let detalle_destino = [];
        let nombre_cliente_destino = document.getElementById("cliente_des").value;
        let telefono = document.getElementById("telefono_des").value;
        let ciudad_destino = document.getElementById("ciudad_des").value;
        let codigo_postal_destino = document.getElementById("codigo_des").value;
        let direccion_destino = document.getElementById("direccion").value;
        let alterna_destino = document.getElementById("direccion_alterna").value;

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
            "ciudad_destino": ciudad_destino,
            "codigo_postal_destino": codigo_postal_destino,
            "direccion_destino": direccion_destino,
            "alterna_destino": alterna_destino
        });

        form.append("ciudad_origen", document.getElementById("ciudad").value);
        form.append("codigo_postal_origen", document.getElementById("codigo").value);
        form.append("fecha", document.getElementById("fecha").value);
        form.append("estado", document.getElementById("estado").value);
        form.append("total_encomienda", TOTAL);
        form.append("total_comision", COMISION);
        form.append("total_cliente", (TOTAL + COMISION));
        form.append("id_usuario", document.getElementById("comboUsuario").value);
        form.append("detalle_encomienda", JSON.stringify(detalle_encomienda));
        form.append("detalle_destino", JSON.stringify(detalle_destino));


        return form;

    }

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
            maxFileSize: 2000,
            maxFilesNum: 10,
            allowedFileExtensions: ['jpg', 'png', 'gif'],
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