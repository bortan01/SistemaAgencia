$(document).ready(function () {
    let explorer = $("#kv-explorer");
    let id_pregunta;
    let tabla;
    let tabla_reporte;

    //inicializarValidaciones();
   // inicializarCombo()
   // inicializarComboRama();
    inicializarTabla();

     //BOTON MOSTRAR EL REPORTE
    $(document).on('click', '.btn-group .btn-secondary', function() {

        id = $(this).attr("name");
        $('#loadingActualizar').show();
        $.ajax({
            url: URL_SERVIDOR + "Encomienda/encomiendaModificar?id_encomienda=" + id,
            method: "GET"
        }).done(function(response) {
               
            //MANDALOS LOS VALORES AL MODAL
            
             for (let i = 0, ien = response.Encomiendas.length; i < ien; i++) {
                $('#nombreC').text(response.Encomiendas[i].nombre);
                $('#telefonoC').text(response.Encomiendas[i].celular);
                $('#ciudadC').text(response.Encomiendas[i].ciudad_origen);
                $('#codigoC').text(response.Encomiendas[i].codigo_postal_origen);
                $('#totalEncomienda').text(response.Encomiendas[i].total_encomienda);  
                $('#tot').text(response.Encomiendas[i].total_cliente);
            }
            for (let j = 0, jen = response.Detalles_destino.length; j < jen; j++) {

                $('#nombreD').text(response.Detalles_destino[j].nombre_cliente_destini);
                $('#telefonoD').text(response.Detalles_destino[j].telefono);
                $('#ciudadD').text(response.Detalles_destino[j].ciudad_destino);
                $('#codigoD').text(response.Detalles_destino[j].codigo_postal_destino);
                $('#direccionD').text(response.Detalles_destino[j].direccion_destino);
                $('#alternaD').text(response.Detalles_destino[j].alterna_destino);    
            }
            //para la tabla
            let tablaReporte = document.getElementById('factura_detalle');
                response.detalle.forEach(event => {
            let tr = crearFila(event);
            tablaReporte.appendChild(tr);
        });
        }).fail(function(response) {

        }).always(function(xhr, opts) {
            $('#modal-cotizacion').modal('show');

        });

    });

       //CUANDO EL MODAL SE CIERRA
   $('#modal-imagenesEncomienda').on('hidden.bs.modal', function (e) {
    console.log("cerrando modal")
    explorer.fileinput('destroy');
   });

    //*para crear la tabla
    function crearFila(event) {
    let tr = document.createElement('tr');
    tr.appendChild(crearColumna(event.nombre_producto));
    tr.appendChild(crearColumna(event.tarifa));
    tr.appendChild(crearColumna(event.cantidad));
     tr.appendChild(crearColumna(event.sub_total));
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
$(document).on('click', '.btn-group .btn-primary', function () {
        $('#loadingActualizar').hide();
        id_encomienda = $(this).attr("name");

    window.location = `${URL_SISTEMA}vistas/encomiendas/modificarEncomienda.php?en=`+id_encomienda;
                    
    
});
   //BOTON EDITAR LA FOTO
   $(document).on('click', '.btn-group .btn-warning', function() {
    $('#modal-imagenesEncomienda').modal('show');
    let identificador = $(this).attr("name");
    let nombreTabla = 'encomienda';
    let informacionAdicional = { tipo: nombreTabla, identificador: identificador };
    let urlFotos = [];
    let infoFotos = [];

    $.ajax({
        url: URL_SERVIDOR + "Imagen/show?tipo=" + nombreTabla + "&identificador=" + identificador,
        method: "GET",

    }).done(function(response) {
        //REST_Controller::HTTP_OK
        console.log(URL_SERVIDOR + "Imagen/show?tipo=" + nombreTabla + "&identificador=" + identificador);
        response.forEach(element => {
            let informacion = {
                url: URL_SERVIDOR + "Imagen/delete",
                key: element.id_foto
            };
            infoFotos.push(informacion);
            urlFotos.push(element.foto_path);
        });
        explorer.fileinput({
            theme: 'fas',
            language: 'es',
            uploadUrl: URL_SERVIDOR + '/Imagen/save',
            uploadExtraData: informacionAdicional,
            overwriteInitial: false,
            initialPreviewAsData: true,
            initialPreview: urlFotos,
            initialPreviewConfig: infoFotos,
            required: true,
            maxFileSize: 2000,
            maxFilesNum: 10,
            allowedFileExtensions: ["jpg", "png", "gif"]

        });
    });
});
    //BOTON PARA DAR DE ALTA A LA ENCOMIENDA
    $(document).on('click', '.btn-group .btn-success', function (evento) {
        id = $(this).attr("name");
        fila = $(this).closest("tr");

        const Toast = Swal.mixin();
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Se dara de alta la encomienda!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí!'
        }).then((result) => {
            console.log(result);
            if (result.value) {
                altaEnco();
            }
        })
    });
   

    //BOTON PARA DAR DE BAJA A LA ENCOMIENDA
    $(document).on('click', '.btn-group .btn-danger', function (evento) {
        id = $(this).attr("name");
        fila = $(this).closest("tr");

        const Toast = Swal.mixin();
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Se dara debaja a esta encomienda!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí!'
        }).then((result) => {
            console.log(result);
            if (result.value) {
                eliminarEnco();
            }
        })
    });
    //BOTON PARA ACTUALIZAR
    $(document).on('click', '#btnActualizar', function (evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#register-form");
        form.validate();
          if (form.valid()) {
            actualizar();
        }
    });
  
// vamos a inicializar la tabla

//*********************fin*****

  //CUANDO HAY CAMBIO EN EL RADIO BUTTON
   $(document).on('change', 'input[type=radio][name="radioEncomienda"]', function () {
      tabla.draw();
   });
   // PARA HACER FILTRAR REGISTROS EN LA TABLA DE A CUERDO CON RADIO BUTTON
   $.fn.dataTable.ext.search.push(
      function (settings, data, dataIndex) {
         let opcionSeleccionada = $("input[name='radioEncomienda']:checked").val();
         switch (opcionSeleccionada) {
            case 'activo':
               return (data[5] == 'Enviado');
            case 'inactivo':
               return (data[5] == 'Inactivo');
            default:
               return true;
         }
      }
   );


    function inicializarTabla() {
        tabla = $("#tabla_encomienda").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "Encomienda/encomienda",
                "method": "GET",
                "dataSrc": function (json) {
                    //console.log(json.preguntas);

                    if (json.Encomiendas) {
                        for (let i = 0, ien = json.Encomiendas.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button type="button" name="' + json.Encomiendas[i].id_encomienda+'" class="btn btn-primary" data-toggle="modal"';
                            html += '         data-target="#modal-editar">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button type="button" name="' + json.Encomiendas[i].id_encomienda + '" class="btn btn-secondary" data-toggle="modal"';
                            html += '            data-target="#reporte_encomienda">';
                            html += '            <i class="fas fa-eye" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button type="button" name="' + json.Encomiendas[i].id_encomienda + '" class="btn btn-warning" data-toggle="modal"';
                            html += '            data-target="#modal-galeria">';
                            html += '            <i class="fas fa-image" style="color: white"></i>';
                            html += '        </button>';
                            if(json.Encomiendas[i].estado=='Enviado'){
                            html += '        <button type="button" name="' + json.Encomiendas[i].id_encomienda+ '" class="btn btn-danger" data-toggle="modal"';
                            html += '            data-target="#modal-eliminar">';
                            html += '            <i class="fas fa-trash" style="color: white"></i>';
                            html += '        </button>';
                            }else{
                            html += '        <button type="button" name="' + json.Encomiendas[i].id_encomienda+ '" class="btn btn-success">';
                            html += '            <i class="fas fa-trash" style="color: white"></i>';
                            html += '        </button>';
                            }
                            html += '    </div>';
                            html += '</td>';
                            json.Encomiendas[i]["botones"] = html;

                        }
                        $('#loading').hide();
                        return json.Encomiendas;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "nombre" },
                { data: "ciudad_origen" },
                { data: "codigo_postal_origen" },
                { data: "fecha" },
                { data: "botones" },
                { data: "estado" },
            ],
             columnDefs: [
            { "className": "dt-center", "targets": "_all" },
           
            { targets: [5], visible: false },
         ]
        });

    }
    function inicializarValidaciones() {
        $('#register-form').validate({

            rules: {
                id_rama:{
                    required: true
                },
                pregunta: {
                    minlength: 10
                },
                "opcion_respuesta[]": {
                   required: true
                }
            },
            messages: {
                id_rama:{
                    required:"Seleccione una rama"
                },
                 pregunta:{
                    minlength: "Lapregunta debe de tener una longitud minima de 10"
                },
                "opcion_respuesta[]": {
                    required: "Seleccione las opciones de respuestas, puede agregar más, pulse el botón agregar más"
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
        $.ajax({
            url: URL_SERVIDOR + "Asesoria/updateCerrada",
            method: "POST",
            timeout: 0,
            data:$('#register-form').serialize()
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                $('#modal-editar').modal('hide');
                tabla.ajax.reload(null, false);
            });
        }).fail(function (response) {
            console.log(response);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Error',
                icon: 'error',
                text: "ERROR EN ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }


    function eliminarEnco() {
        let data = {
            "id_encomienda": id
        };
        $.ajax({
            url: URL_SERVIDOR + "Encomienda/deleteEncomienda",
            method: "DELETE",
            timeout: 0,
            data: data
        }).done(function (response) {
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
        }).fail(function (response) {

            console.log(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }

     function altaEnco() {
        let data = {
            "id_encomienda": id
        };
        $.ajax({
            url: URL_SERVIDOR + "Encomienda/altaEnco",
            method: "DELETE",
            timeout: 0,
            data: data
        }).done(function (response) {
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
        }).fail(function (response) {

            console.log(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }
 
});

   