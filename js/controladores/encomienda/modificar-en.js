// CUANDO LA PAGINA YA ESTA LISTA
$(document).ready(function () {

    let contadorTabla = 0;
    let TOTAL = 0.0;
    let COMISION = 0.0;
    let TOTALCLIENTE = 0.0;

    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    let ID_ENCOMIENDA = urlParams.get('en');
    let tabla;

    inicializarGaleria();
    inicializarFoto();
    inicializarValidaciones();
    mostrarDatos();
    inicializarTabla();

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
            let nombre_producto = combo.options[combo.selectedIndex].text;
            agregarFila(nombre_producto, costo, cantidad, id);


        }
    });


    function mostrarDatos() {
        $.ajax({
            url: URL_SERVIDOR + 'Encomienda/encomiendaModificar?id_encomienda=' + ID_ENCOMIENDA,
            method: "GET"
        }).done(function (response) {
            $.each(response.Encomiendas, function (i, index) {
                $('#nombre_cliente').val(index.nombre);
                $('#cliente').val(index.id_usuario);
                $('#telefono').val(index.celular);
                $('#ciudad').val(index.ciudad_origen);
                $('#codigo').val(index.codigo_postal_origen);
                $('#fecha').val(index.fecha);
                $('#total').text(index.total_encomienda);
                $('#comision').text(index.total_comision);
                $('#totalCliente').text(index.total_cliente);
                $('#id_encomienda').val(ID_ENCOMIENDA);
                TOTAL= index.total_encomienda;
                COMISION = index.total_comision;
                TOTALCLIENTE = index.total_cliente;
            });

            //.each para los datos destino

            $.each(response.Detalles_destino, function (i,pivote) {
                $('#cliente_des').val(pivote.nombre_cliente_destini);
                $('#telefono_des').val(pivote.telefono);
                $('#ciudad_des').val(pivote.ciudad_destino);
                $('#codigo_des').val(pivote.codigo_postal_destino);
                $('#direccion').val(pivote.direccion_destino);
                $('#direccion_alterna').val(pivote.alterna_destino);
            });


        }).fail(function (response) {
            console.log(response);

        });

    }

    function inicializarTabla() {
        tabla = $("#add-tabla").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "columnDefs":[
            {"className":"dt-center","targets":"_all"},
            {"targets":[5], "visible":false},
            {"targets":[6], "visible":false},
            ],
            "ajax": {
                "url": URL_SERVIDOR + "Detalle_Encomienda/detalles?id_encomienda=" + ID_ENCOMIENDA,
                "method": "GET",
                "dataSrc": function (json) {
                    //console.log(json.preguntas);

                    if (json.detalles) {
                        for (let i = 0, ien = json.detalles.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button type="button" name="' + json.detalles[i].id_encomienda + '" class="btn btn-danger" data-toggle="modal"';
                            html += '            data-target="#modal-eliminar">';
                            html += '            <i class="fas fa-trash" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';
                            json.detalles[i]["botones"] = html;

                            json.detalles[i]["contador"] = contadorTabla;
                            contadorTabla ++;



                        }
                        $('#loading').hide();
                        return json.detalles;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "nombre_producto" },
                { data: "tarifa" },
                { data: "cantidad" },
                { data: "sub_total" },
                { data: "botones" },
                { data: "id_producto" },
                { data: "contador" },
            ]
        });

    }
    function agregarFila(nombre_producto, costo, cantidad, id) {
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
            tabla.row.add(
                {
                    "nombre_producto": nombre_producto,
                    "tarifa": costo,
                    "cantidad": cantidad,
                    "sub_total": subTotoal,
                    "botones": html,
                    "id_producto": id,
                    "contador": "33"

                }).draw(false);
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
         
            if (id == data.id_producto) {
                let subTotoal = (costo * cantidad).toFixed(2);
                data.cantidad = cantidad;
                data.sub_total = subTotoal;
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
            //console.log(data);
            TOTAL += parseFloat(data.sub_total);
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

    //BOTON DE ACTUALIZAR 
    $(document).on('click', '#btnActualizar', function (evento) {
        evento.preventDefault();//para evitar que la pagina se recargue
       // let form = $("#miFormulario");
       // form.validate();
        //if (form.valid()) {
            modificar();
       /* } else {
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'error',
                text: "Complete los campos",
                showConfirmButton: true,
            });
        }*/
    });

     function inicializarValidaciones() {

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

    function modificar() {
        $('#loading').show();
        let form = obtenerData();

        //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
        $.ajax({
            url: URL_SERVIDOR + "Encomienda/updateEncomienda",
            method: "POST",
            mimeType: "multipart/form-data",
            data: form,
            timeout: 0,
            processData: false,
            contentType: false,
        }).done(function (response) {
            console.log(response);
            
           const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: "Registro Actualizado correctamente",
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA
                guardarBitacora();
                 window.location = `${URL_SISTEMA}vistas/encomiendas/verEncomienda.php`;
               
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
        let detalle_destino=[];
        let nombre_cliente_destino  = document.getElementById("cliente_des").value;
        let telefono                = document.getElementById("telefono_des").value;
        let ciudad_destino          = document.getElementById("ciudad_des").value;
        let codigo_postal_destino   = document.getElementById("codigo_des").value;
        let direccion_destino       = document.getElementById("direccion").value;
        let alterna_destino         = document.getElementById("direccion_alterna").value;
        
        tabla.rows().every(function (value, index) {
            let data = this.data();
           
            let id_producto = data.id_producto;
            let cantidad = data.cantidad;
            let sub_total = data.sub_total;
           
                 
                detalle_encomienda.push({
                    "id_producto": id_producto,
                    "cantidad": cantidad,
                    "sub_total": sub_total
                });
            
        });

        detalle_destino.push({
                    "nombre_cliente_destini":nombre_cliente_destino,
                    "telefono": telefono,
                    "ciudad_destino": ciudad_destino,
                    "codigo_postal_destino": codigo_postal_destino,
                    "direccion_destino": direccion_destino,
                    "alterna_destino": alterna_destino
        });

        form.append("ciudad_origen",          document.getElementById("ciudad").value);
        form.append("codigo_postal_origen",   document.getElementById("codigo").value);
        form.append("fecha",                  document.getElementById("fecha").value);
         form.append("id_encomienda",         ID_ENCOMIENDA);
        form.append("total_encomienda",       TOTAL);
        form.append("total_comision",         COMISION);
        form.append("total_cliente",          (TOTAL+COMISION));
        form.append("id_usuario",             document.getElementById("cliente").value);
        form.append("detalle_encomienda",     JSON.stringify(detalle_encomienda));
        form.append("detalle_destino",        JSON.stringify(detalle_destino));
       

        return form;

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

    function inicializarFoto() {
        // ESTO ES PARA INICIALIZAR EL ELEMENTO DE SUBIDA DE UNA UNICA FOTO
        $('#foto').fileinput({
            theme: 'fas',
            language: 'es',
            required: true,
            maxFileSize: 2000,
            maxFilesNum: 10,
            showUpload: false,
            showClose: false,
            showCaption: true,
            browseLabel: '',
            removeLabel: '',
            //removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
            removeTitle: 'Cancel or reset changes',
            elErrorContainer: '#kv-avatar-errors-1',
            msgErrorClass: 'alert alert-block alert-danger',
            defaultPreviewContent: '<img src="../../img/avatar.png" alt="Your Avatar">',
            layoutTemplates: { main2: '{preview} {remove} {browse}' },
            allowedFileExtensions: ["jpg", "png", "gif"]
        });
    }


});