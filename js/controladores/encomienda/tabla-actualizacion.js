$(document).ready(function () {
    let id_pregunta;
    let tabla;

    //inicializarValidaciones();
   // inicializarCombo()
   // inicializarComboRama();
    inicializarTabla();
  
    //BOTON DE EDITAR
    $(document).on('click', '.btn-group .btn-success', function () {
        $('#loadingActualizar').hide();
        id_encomienda = $(this).attr("name");
        cliente = $(this).attr("id");  
        $('#id_encomienda').val(id_encomienda);
        $('#cliente').val(cliente);
       $('#registro-actualizacion').modal('show');
       $('#loadingActualizar').hide();
    });
   
    //BOTON VER ACTUALIZACIONES
    $(document).on('click', '.btn-group .btn-primary', function () {
        $('#loadingActualizar').hide();
        id_encomienda = $(this).attr("name");

    window.location = `${URL_SISTEMA}vistas/encomiendas/verActualizacion.php?ac=`+id_encomienda;
                    
    
    });
   
    //BOTON PARA ACTUALIZAR
    $(document).on('click', '#btnEnvio', function (evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#register-form");
        //form.validate();
         // if (form.valid()) {
            guardar();
        //}
    });
   

    function inicializarTabla() {
        tabla = $("#tabla_actualizacion").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "Encomienda/encomiendaActualizar",
                "method": "GET",
                "dataSrc": function (json) {
                    //console.log(json.preguntas);

                    if (json.Encomiendas) {
                        for (let i = 0, ien = json.Encomiendas.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button type="button" name="' + json.Encomiendas[i].id_encomienda+'" id="'+json.Encomiendas[i].nombre+'" class="btn btn-success" data-toggle="modal"';
                            html += '         data-target="#registro-actualizacion">';
                            html += '            <i class="fas fa-car" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button type="button" name="' + json.Encomiendas[i].id_encomienda+ '" class="btn btn-primary" data-toggle="modal"';
                            html += '            data-target="#modal-eliminar">';
                            html += '            <i class="fas fa-eye" style="color: white"></i>';
                            html += '        </button>';
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
                { data: "direccion" },
                { data: "punto_referencia" },
                { data: "fecha" },
                { data: "botones" },
            ]
        });

    }

     function guardar() {
       let form = new FormData();
       form.append("id_encomienda",          document.getElementById("id_encomienda").value);
       form.append("fecha",                  document.getElementById("fecha").value);
       form.append("lugar",                  document.getElementById("coordenadas").value);
        form.append("descripcion",           document.getElementById("descripcion").value);
        
        $.ajax({
            url: URL_SERVIDOR + "Detalle_envio/detalleEnvios",
            method: "POST",
            mimeType: "multipart/form-data",
            data: form,
            timeout: 0,
            processData: false,
            contentType: false,
        }).done(function (response) {
            console.log(response);
            $('#registro-actualizacion').modal('toggle');

            $('#fecha').val('');
            $('#coordenadas').val('');
            $('#descripcion').val('');
            
           const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: "Registro Guardado",
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA 
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
                $('#modal-editar').modal('hide');;
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


    function eliminar() {
        let data = {
            "id_pregunta": idpregunta
        };
        $.ajax({
            url: URL_SERVIDOR + "Asesoria/deletePregunta",
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
                title: 'Error',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }
 
});

   