$(document).ready(function () {
    let id_pregunta;
    let tabla;

    inicializarValidaciones();
   // inicializarCombo()
    inicializarComboRama();
    inicializarTabla();
  
    //BOTON DE EDITAR
    $(document).on('click', '.btn-group .btn-primary', function () {
        $('#loadingActualizar').hide();
        id_pregunta = $(this).attr("name");
        id_ramas= $(this).attr("id");

        fila = $(this).closest("tr");

        pregunta = fila.find('td:eq(0)').text();
        mas_respuestas = fila.find('td:eq(1)').text();

        //PETICION AJAX PARA EL COMBO
         //COMBO DE TIPOS 
        $('#combo_cerrada').empty();
        //COMBO DE CONTACTOS
        $('#combo_cerrada').select2();
        $.ajax({
            url: URL_SERVIDOR + "Asesoria/opcionesCerradas/"+id_pregunta,
            method: "GET"
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            let myData = [];
            if (response.preguntas) {
                let lista = response.preguntas;
                for (let index = 0; index < lista.length; index++) {
                var $seleccionadas = $("<option selected></option>").val(lista[index].opciones_respuestas).text(lista[index].opciones_respuestas); 
                 $('#combo_cerrada').append($seleccionadas).trigger('change');
               //document.getElementById("combo_cerrada").value=lista[index].opciones_respuestas;
                }
                //$('#combo_cerrada').select2();
            }else{
                $('#combo_cerrada').select2();
            }
        }).fail(function (response) {
            $('#combo_cerrada').select2();

        });
        //************************

        //MANDALOS LOS VALORES AL MODAL
        document.getElementById("pregunta").value =pregunta;
        document.getElementById("id_rama").value=id_ramas;
        document.getElementById("id_pregunta").value=id_pregunta;

        $('#modal-editar').modal('show');

    });
   
    //BOTON PARA ELIMINAR
    $(document).on('click', '.btn-group .btn-danger', function (evento) {
        idpregunta = $(this).attr("name");
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
        let form = $("#register-form");
        form.validate();
          if (form.valid()) {
            actualizar();
        }
    });
   

    function inicializarTabla() {
        tabla = $("#tabla_cerrradas").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "Asesoria/cerradas",
                "method": "GET",
                "dataSrc": function (json) {
                    //console.log(json.preguntas);

                    if (json.preguntas) {
                        for (let i = 0, ien = json.preguntas.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button type="button" name="' + json.preguntas[i].id_pregunta+'" id="' + json.preguntas[i].id_rama+'" class="btn btn-primary" data-toggle="modal"';
                            html += '         data-target="#modal-editar">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button type="button" name="' + json.preguntas[i].id_pregunta+ '" class="btn btn-danger" data-toggle="modal"';
                            html += '            data-target="#modal-eliminar">';
                            html += '            <i class="fas fa-trash" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';
                            json.preguntas[i]["botones"] = html;

                        }
                        $('#loading').hide();
                        return json.preguntas;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "pregunta" },
                {data: "categoria_rama" },
                { data: "botones" },
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
    function inicializarComboRama() {
        //COMBO DE CONTACTOS
        $.ajax({
            url: URL_SERVIDOR+"Asesoria/ramita",
            method: "GET"
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            var $select = $('#id_rama');
                $.each(response.ramas, function(i, name) {
                    $select.append('<option value=' + name.id_rama + '>' + name.categoria_rama+
                        '</option>');
                });
        }).fail(function (response) {
           var $select = $('#id_rama');
            $select.append('<option disabled="" selected>Seleccione</option>');

        }).always(function (xhr, opts) {
            $('#loading').hide();
        });
    }
});

   function inicializarCombo() {
        //COMBO DE TIPOS 
        $('#combo_cerrada').select2();
        id_pregunta = $(this).attr("name");
        //COMBO DE CONTACTOS
        $.ajax({
            url: URL_SERVIDOR + "Asesoria/opcionesCerradas/8",
            method: "GET"
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            let myData = [];
            if (response.preguntas) {
                let lista = response.preguntas;
                for (let index = 0; index < lista.length; index++) {
                   var $seleccionadas = $("<option selected></option>").val(lista[index].id_pregunta).text(lista[index].opciones_respuestas); 
                 $('#combo_cerrada').append($seleccionadas).trigger('change');
                }
                $('#combo_cerrada').select2(
                    { data: myData }
                );
            }else{
                $('#combo_cerrada').select2();
            }
        }).fail(function (response) {
            $('#combo_cerrada').select2();

        }).always(function (xhr, opts) {
            $('#loading').hide();
        });
    }