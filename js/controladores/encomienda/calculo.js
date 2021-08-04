$(document).ready(function () {


    inicializarValidaciones();
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
         "columnDefs":[
        {"className":"dt-center","targets":"_all"},
        {"targets":[5], "visible":false},
        {"targets":[6], "visible":false},
        ]

    });

    //para el reporte tabla
    let tabla2 = $('#factura_detalle').DataTable({
        "paging": false,
        "lengthChange": false,
        "searching": false,
        "ordering": false,
        "info": false,
        "autoWidth": false,
        "pageLength": false,
        "responsive": true,
         "columnDefs":[
        {"className":"dt-center","targets":"_all"},
        {"targets":[4], "visible":false},
        ]

    });

     //AGREGANDO LA INFORMACION DE UN TUR A LA TABLA
    function agregarFila2(nombre, costo, cantidad, id) {

        
         if (!ExisteFila2(id,cantidad, costo)) {
            let subTotoal = (costo * cantidad).toFixed(2);
            tabla2.row.add([nombre, costo, cantidad, subTotoal,id]).draw(false);
            //PARA ORDENAR LA TABLA
            tabla.order([4, 'desc']).draw();
         }
        modificarTotal();
        modificarComision();
        modificarTotalCliente();
    }
    //para el reporte tabla

    //VAMOS A CREAR EL REPORTE
      $(document).on('click', '#btnRepoteCalculo', function() {
        //alert('#nombreC');
           let combo = document.getElementById("comboUsuario");
           let selected = combo.options[combo.selectedIndex].text;
           let cel = $("#telefono").val();
           let ciudad = $("#ciudad").val();
           let codigo = $("#codigo").val();
           
                $('#nombreC').text(selected);
                $('#telefonoC').text(cel);
                $('#ciudadC').text(ciudad);
                $('#codigoC').text(codigo);
        //cliente destino datos
         let cliente_des = $("#cliente_des").val();
         let cel_des = $("#telefono_des").val();
         let ciudad_des = $("#ciudad_des").val();
         let codigo_des = $("#codigo_des").val();
         let direccion = $("#direccion").val();
         let alterna = $("#direccion_alterna").val();
                $('#nombreD').text(cliente_des);
                $('#telefonoD').text(cel_des);
                $('#ciudadD').text(ciudad_des);
                $('#codigoD').text(codigo_des);
                $('#direccionD').text(direccion);
                $('#alternaD').text(alterna);
               
            

    });

    //FIN DEL REPORTE

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
            agregarFila2(nombre, costo, cantidad, id);


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
    //para modificacion del reporte
    function ExisteFila2(id,cantidad, costo) {
        let encontrado = false;
        tabla2.rows().every(function (value, index) {
            let data = this.data();
            if (id == data[4]) {
                let subTotoal = (costo * cantidad).toFixed(2);
                data[2] = cantidad;
                data[3] = subTotoal;
                encontrado = true;
                this.data(data).draw(false);
            }
        });
        return encontrado;


    }
    //fin de la modificacion de reporte
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
        tabla2.rows().every(function (value, index) {
            let data = this.data();
            TOTAL += parseFloat(data[3]);
        });
        $('#total').empty();
        $('#total').text("$" + TOTAL);

         $('#totalEncomienda').empty();
        $('#totalEncomienda').text("$" + TOTAL);
    }
    function modificarComision() {
        let porcentaje = (parseInt($('#porcenaje').val())) / 100;
        COMISION = porcentaje * TOTAL;
        $('#comision').empty();
        $('#comision').text("$" + COMISION);
    }
    function modificarTotalCliente() {

        $('#totalCliente').empty();
        $('#totalCliente').text("$" + (TOTAL + COMISION));
        //para el reporte
        $('#tot').empty();
        $('#tot').text("$" + (TOTAL + COMISION));
    }

    //BOTON DE IMPRIMIR
    $(document).on('click', '#btnImprimir', function (evento) {
        evento.preventDefault();//para evitar que la pagina se recargue
       let form = $("#cliente-form");
       let form1 = $("#encomienda-form");
        form1.validate();
        form.validate();
        if (form.valid()) {
            if (form1.valid()) {
                 //aqui podemos poner el método guardar por si llegariamos a guardar las
                 //las cotizaciones
            }
        
       } 
    });
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

        $('#encomienda-form').validate({

            rules: {
                direccion: {
                    required:true,
                    minlength: 10
                },
                punto_referencia: {
                    required:true,
                    minlength: 10
                },
                fecha: {
                   required: true
                }
            },
            messages: {
                direccion:{
                    required:"Digite la dirección",
                    minlength: "La dirección debe de tener una longitud minima de 10"
                },
                punto_referencia:{
                    required:"Digite el punto de referencia",
                    minlength: "El punto referencia debe de tener una longitud minima de 10"
                },
                fecha: {
                    required: "Digite la fecha"
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

    function telefono() {

        $("#comboUsuario").change(function() {
            var id = document.getElementById("comboUsuario").value;

            $.ajax({
                url: URL_SERVIDOR + "Usuario/obtenerUsuario?nivel=CLIENTE&id_cliente=" + id,
                method: 'GET'

            }).done(function(response) {
                $.each(response.usuarios, function(i, index) {
                    $("#telefono").val(index.celular);

                });




            }).fail(function(response) {
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