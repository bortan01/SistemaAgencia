$(document).ready(function () {

inicializarValidaciones();
verInfo();

function verInfo(){
    //para recibir el parametro del url
     const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    let id_cita = urlParams.get('form');

    $("#id_cita").val(id_cita);

    //mostrar informacion
         $.ajax({
            type: "GET",
            url: URL_SERVIDOR+"FormularioMigratorio/formulariosLlenos/"+id_cita,
            success: function(data) {

                
                for (let i = 0, ien = data.formulario.length; i < ien; i++) {
                   // alert('paso');
                   if(data.formulario[i].opcion=='cerrada'){
                     var $select = $('#'+data.formulario[i].num_rama);
                    $select.append('<input type="hidden" name="id_pregunta[]" value="'+data.formulario[i].id_pregunta+'" class="form-control">'+
                                    '<label style="width: 868px;margin-left: 98px; margin-top:4px;">¿'+data.formulario[i].pregunta+'?</label>'+
                                     '<select class="form-control respuesta" name="respuesta[]" id="combo'+data.formulario[i].id_pregunta+'" style="width: 868px;margin-left: 98px; margin-top:2px;">'+
                                        '<option disabled>¿'+data.formulario[i].pregunta+'?</option>'+
                                     '</select>&nbsp&nbsp');

                    //COMO YA CREE EL COMBO SELECCIONO EL ID Y CARGO EL COMBO
                    var $combo = $('#combo'+data.formulario[i].id_pregunta);
                     $combo.select();

                     //alert(data.preguntas[i].id_pregunta);
                     for (let j = 0, jen = data.opciones.length; j < jen; j++) {
                        //SOLO VA HA LLENAR EL COMBO CUANDO EL ID DE LA PREGUNTA SEA = AL ID 
                        //DE LA PREGUNTA DE LAS OPCIONES RESPUESTAS
                        if (data.formulario[i].id_pregunta==data.opciones[j].id_pregunta) {
                           
                         $combo.append('<option value=' +data.opciones[j].opciones_respuestas+ '>'+data.opciones[j].opciones_respuestas+
                        '</option>'); 
                          document.getElementById("combo"+data.formulario[i].id_pregunta).value=data.formulario[i].respuesta;

                        }    
                     }
                   

                   }else{
                    if (data.formulario[i].mas_respuestas=='Si') {
                       // alert('entre');
                        $select = $('#'+data.formulario[i].num_rama);
                        $select.append('<label style="width: 400px;margin-left: 98px; margin-top:4px;">¿'+data.formulario[i].pregunta+'?</label>'+
                            '<div class="form-group multiple-form-group input-group">'+
                                '<select name="id_pregunta_mas[]" style="height: 0px;width: 0px;visibility: hidden;">'+
                                        '<option selected>'+data.formulario[i].id_pregunta+'</option>'+
                                     '</select>'+  
                              '<input type="text" name="respuesta_mas[]" value="'+data.formulario[i].respuesta+'" id="asistiran" class="form-control" placeholder="¿'+data.formulario[i].pregunta+'?"'+
                              'style="width: 368px;margin-left: 98px; margin-top:6px;">'+
                              '<span class="input-group-btn">'+
                              '<button type="button" class="btn btn-success btn-add" id="btn-asistiran" style="margin-top:2px;margin-right:55px;">+</button>'+
                             '</span>'+
                             '</div>&nbsp&nbsp');

                    }else{
                    var $select = $('#'+data.formulario[i].num_rama);
                    $select.append('<label style="width: 400px;margin-left: 98px; margin-top:4px;">¿'+data.formulario[i].pregunta+'?</label>'+
                        '<input type="hidden" name="id_pregunta1[]" value="'+data.formulario[i].id_pregunta+'" class="form-control">'+
                                   '<input type="text" name="respuesta1[]" value="'+data.formulario[i].respuesta+'" class="form-control"'+
                                   'placeholder="¿'+data.formulario[i].pregunta+'?"'+
                                    'style="width: 868px;margin-left: 98px; margin-top:6px;">&nbsp&nbsp');
                    }
                   }
                }

            },
            error: function(err) {
                const Toast = Swal.mixin();
            Toast.fire({
                title: 'Error',
                icon: 'error',
                text:'No hay preguntas registradas..!',
                showConfirmButton: true,
            });
            }
        });

        ///ESTA PARTE ES PARA EL USUARIO PARA MOSTRARLOS
    $.ajax({
        url: URL_SERVIDOR + "FormularioMigratorio/usuarioFormularios?id_cita="+id_cita,
        method: 'GET'

    }).done(function(response) {

         $.each(response.usuario, function(i, index) {
                 $("#usuario").val(index.nombre);   
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
            title: 'Error',
            icon: 'error',
            text: listaErrores,
            showConfirmButton: true,
        });

         });

        //FIN DE MOSTRAR USUARIO
    
 }

  //BOTON PARA ACTUALIZAR
    $(document).on('click', '#btnActualizar', function (evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
       // let form = $("#editar");
       // form.validate();
        //if (form.valid()) {
            actualizar();
        //}
    });
    function inicializarValidaciones() {
        $('#editar').validate({
            rules: {
                id_rama: {
                    required: true,
                    number:true
                },
                pregunta: {
                    required: true,
                    minlength: 10,
                    maxlength: 40
                },
                mas_respuestas: {
                    required: true,
                    minlength: 2,
                }
            },
            messages: {
                id_rama: {
                    required: "Seleccione la rama de la pregunta",
                },
                pregunta: {
                    required: "Ingrese la pregunta",
                    minlength: "Debe de tener una longitud minima de 10",
                    maxlength: "Debe de tener una longitud maxima de 40"
                },
                mas_respuestas: {
                    required: "Seleccione si va a contener mas respuestas",
                   
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
        
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
             url: URL_SERVIDOR+"FormularioMigratorio/updateFormulario",
            method: 'POST',
            data: $("#editar-form").serialize()
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                 location.reload();
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