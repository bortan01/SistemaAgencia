$(document).ready(function () {

    validaciones();
     //BOTON MOSTRAR EL REPORTE
    $(document).on('click','#btnRepote', function() {

        $.ajax({
            url: URL_SERVIDOR + "Asesoria/reporteMigratorio",
            method: "GET"
        }).done(function(response) {
            //MANDALOS LOS VALORES AL MODAL
            $('#crear_tablas').empty();
            seleccion = $('#crear_tablas');
            for (let i = 0, ien = response.ramas.ramas.length; i < ien; i++) {
                seleccion.append('<span class="h3">'+response.ramas.ramas[i].categoria_rama+'</span>'+
                                                '<table id="factura_detalle">'+
                                                    '<thead>'+
                                                           '<tr>'+
                                                            '<th class="textcenter">Pregunta</th>'+
                                                            '<th class="textcenter">Respuesta</th>'+
                                                            '</tr>'+                                                         
                                                    '</thead>'+
                                                    '<tbody id="detalle_productos'+response.ramas.ramas[i].num_rama+'"'+
                                                       
                                                    '</tbody>'+

                                                '</table>');
                for (let j = 0, jen = response.preguntas.length; j< jen ; j++) {
                    tr = $('#detalle_productos'+response.ramas.ramas[i].num_rama);
                    if (response.preguntas[j].num_rama == response.ramas.ramas[i].num_rama ) {
                        tr.append(' <tr>'+
                                '<td class="textcenter">'+
                                '<label name="nombreVehiculoC" id="nombreVehiculoC"'+
                                 'style="font-weight: normal;">'+response.preguntas[j].pregunta+'</label>'+
                                 '</td>'+
                                '<td class="textcenter">'+
                                '<label name="anioC" id="anioC"'+
                                 'style="font-weight: normal;"></label>'+
                                 '</td>'+
                                '</tr>');
                    }
                 
                   }
               
            }
           
        }).fail(function(response) {

        }).always(function(xhr, opts) {
            $('#modal-cotizacion').modal('show');

        });
    });
//FIN DE MOSTRAMOS EL REPORTE




 $(document).on('click', '#btnFormulario', function (evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#migratorio-form");
        form.validate();
        if (form.valid()) {
            insertarFormulario();
        }else{
            toastr.error('Verifique los campos de selección');
        }
    });






function insertarFormulario(){
      $.ajax({
            url: URL_SERVIDOR+"FormularioMigratorio/formulario",
            method: 'POST',
            data: $("#migratorio-form").serialize()

        }).done(function (response) {
         document.getElementById("migratorio-form").reset();
         //para no recargar la pagina
         $('#citas_dias').empty();
         $('#script').html('<script type="text/javascript" src="../../js/controladores/asesorias/combo_formulario.js">');
          

          //$("#recargar").load(" #recargar");//recargar solo un div y no toda la pagina
            //REST_Controller::HTTP_OK
            //let respuestaDecodificada = JSON.parse(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA 
                //location.reload(); NO QUIERO QUE RECARGUE ME ACTUALIZA SOLA
            });
        }).fail(function (response) {
            //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
           /* let respuestaDecodificada = JSON.parse(response.responseText);
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
            });*/

        })
}

function validaciones(){


$(document).ready(function () {
    $.validator.setDefaults({
        ignore:[],
    });

    $('#migratorio-form').validate({
       rules: {
               
            },
            messages: {
             
                    required: "Seleccione"
            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                //element.closest('.form-group').append(error);
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('is-invalid');

            }
    });

    // must be called after validate()
    $('select.respuesta').each(function () {
        $(this).rules('add', {
            required: true
        });
    });

});
    /*$.validator.setDefaults({
        ignore:[],
    });
     $('#migratorio-form').validate({
            rules: {
               
            },
            messages: {
             
                    required: "Seleccione"
            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                //element.closest('.form-group').append(error);
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('is-invalid');

            }
        });*/
}

});