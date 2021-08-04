 $(function() {
     $("#id_pregunta").change(function() {
         // alert($(this).val());
         var combo = document.getElementById("id_pregunta");
         var selected = combo.options[combo.selectedIndex].text;
         // alert(selected);
         var $mostrar = $('#mostrar');
         var $botones = $('#botones');

         $('#mostrar').empty(); //VACIO LOS DIV PARA QUE NO ME LOS MONTE UNO SOBRE OTRO
         $('#botones').empty();
         $('#script').empty();


         if (selected == 'Abiertas') {
             $('#combo_rama').empty();
             $('#combo_rama').prop("disabled", false);
             $mostrar.append('<i class="fas fa-address-card bg-green"></i>' +
                 '<div class="timeline-item">' +
                 '<h3 class="timeline-header"><a href="#">Tipo de Pregunta Abiertas</a></h3>' +
                 '<div class="timeline-body" style="margin-top: -9px;">' +
                 '<form id="register-form" name="register-form" onsubmit="return false">' +
                 '<div class="row">' +


                 '<div class="col-sm-12">' +

                 '<div class="form-group">' +
                 '<label for="cars">Digite la Pregunta</label>' +
                 '<input id="input_abierta" name="pregunta" autocomplete="off" placeholder="Digite la pregunta" type="text" class="form-control">' +
                 '<input id="rama" name="id_rama" type="hidden">' +
                 '<input  value="abierta" name="opcion" type="hidden">' +
                 '</div></div><div class="col-sm-12">' +

                 '<div class="form-group">' +
                 '<label for="cars">Más de una Respuesta</label>' +
                 '<select name="mas_respuestas" id="mas_respuestas" class="form-control">' +
                 '<option disabled selected >Seleccione</option>' +
                 '<option value="Si">Si</option>' +
                 '<option value="No">No</option>' +

                 '</select></div>' +
                 '<div class="form-group">' +
                 '<label for="cars">Tipo de pregunta</label>' +
                 '<select name="tipo" id="tipo_pregunta" class="form-control">' +
                 '<option disabled selected >Seleccione</option>' +
                 '<option value="text">Texto</option>' +
                 '<option value="telefono">Teléfono</option>' +
                 '<option value="dui">DUI</option>' +
                 '<option value="pasaporte">Pasaporte</option>' +
                 '<option value="nit">NIT</option>' +
                 '<option value="date">Fecha</option>' +
                 '<option value="number">Número</option>' +

                 '</select></div>' +
                 '<div class="timeline-footer" style="text-align: right;">' +
                 '<button id="btn-preguntas"' +
                 'class="btn btn-info btn-sm" style="color: white; margin: 5px;">Guardar</button>' +
                 '<a class="btn btn-danger btn-sm" style="color: white">Cancelar</a></div>' +

                 '</div>' +

                 '</div></form></div></div>');

             $('#script').html('<script type="text/javascript" src="../../js/controladores/asesorias/insertar-pregunta-app.js">');
             $('#script').html('<script type="text/javascript" src="../../js/controladores/asesorias/combobox-ramas.js">');
         }
         if (selected == 'Cerradas') {
             $('#combo_rama').empty();
             $('#combo_rama').prop("disabled", false);
             $mostrar.append('<i class="fas fa-address-card bg-gradient-info"></i> <div class="timeline-item">' +
                 '<h3 class="timeline-header"><a href="#">Tipo de Pregunta Cerrada</a></h3>' +
                 '<div class="timeline-body" style="margin-top: -9px;">' +
                 '<form id="register-form" name="register-form" onsubmit="return false">' +
                 '<div class="row">' +
                 '<div class="col-sm-6">' +
                 '<div class="form-group"><label for="cars">Digite la Pregunta</label>' +
                 '<input id="input_cerrada" name="pregunta" autocomplete="off" placeholder="Digite la pregunta" type="text" class="form-control" style="width:100%;">' +
                 '<input id="rama" name="id_rama" type="hidden">' +
                 '<input  value="cerrada" name="opcion" type="hidden">' +
                 '</div></div>' +
                 '<div class="col-lg-3">' +
                 '<div class="form-group">' +
                 '<label>Opciones de Respueta</label>' +
                 '<select class="select2" name="opcion_respuesta[]" id="combo_cerrada" multiple="multiple" data-placeholder="Seleccione" style="width:100%;">' +
                 '<option>Si</option>' +
                 '<option>No</option>' +
                 '</select></div>' +
                 '</div>' +
                 '<div class="col-lg-3">' +
                 '<div class="form-group"><label>Agregar opciones</label>' +
                 '<input type="text" class="form-control" name="opcion_combo"' +
                 'id="opcion_combo" placeholder="Nueva opción" style="width: 190px;" autocomplete="off">' +
                 '<span class="input-group-btn">' +
                 '<button type="button" class="btn btn-success btn-add"' +
                 'name="agregarServicio" id="agregar" style="margin-top:-38px; margin-left:191px;">+</button>' +
                 '</span>' +
                 '</div>' +
                 '</div>' +


                 '</div>' +

                 '</form>' +
                 '<div class="timeline-footer" style="text-align: right;">' +
                 '<button id="btn-cerrada"' +
                 'class="btn btn-info btn-sm" style="color: white; margin: 5px;">Guardar</button>' +
                 '<a class="btn btn-danger btn-sm" style="color: white">Cancelar</a></div>' +
                 '</div></div>');

             $('.select2').select2();
             $('#script').html('<script type="text/javascript" src="../../js/controladores/asesorias/insertar-cerrada-app.js">');
             $('#script').html('<script type="text/javascript" src="../../js/controladores/asesorias/combobox-ramas.js">');
         }
         $('#script').html('<script type="text/javascript" src="../../js/controladores/asesorias/agregar-opciones.js">');

         if (selected == 'Rama') {

             $('#combo_rama').prop("disabled", true);
             $mostrar.append('<i class="fas fa-address-card bg-gradient-info"></i>' +
                 '<div class="timeline-item">' +
                 '<h3 class="timeline-header"><a href="#">Registro de una nueva rama</a></h3>' +
                 '<div class="timeline-body" style="margin-top: -9px;">' +
                 '<form id="register-form" name="register-form" onsubmit="return false">' +
                 '<div class="row">' +
                 '<div class="col-lg-12">' +
                 '<div class="form-group">' +
                 '<label for="cars">Digite la rama</label>' +
                 '<input id="input_rama" name="categoria_rama" type="text" placeholder="Digite la rama" class="form-control" style="width:100%;">' +
                 '</div>' +

                 '</div>' +
                 '<div class="col-lg-12">' +
                 '<div class="form-group">' +

                 '<div class="timeline-footer" style="text-align: right; margin-left:auto; margin-top:auto;">' +
                 '<button id="btn-rama"' +
                 'class="btn btn-info btn-sm" style="color: white; margin: 5px;">Guardar</button>' +
                 '<a class="btn btn-danger btn-sm" style="color: white">Cancelar</a></div>' +
                 '</div>' +
                 '</div>' +

                 '</div>' +
                 '</form>' +
                 '</div></div>');


             $('#script').html('<script type="text/javascript" src="../../js/controladores/asesorias/insertar-rama-app.js">');

         }

     });
 });

 function ShowRama() {
     /* Para obtener el valor */
     var cod = document.getElementById("combo_rama").value;
     //alert(cod);
     $('#rama').val(cod);


     /* Para obtener el texto */
     //var combo = document.getElementById("combo_rama");
     //var selected = combo.options[combo.selectedIndex].text;
 }