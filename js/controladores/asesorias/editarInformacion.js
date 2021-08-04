$(document).ready(function () {

   const valores = window.location.search;
   const urlParams = new URLSearchParams(valores);
   let ID_CITA = urlParams.get('idCita');
   let ID_CLIENTE = urlParams.get('idCliente');
   let cliente = urlParams.get('cliente');
   $('#titulo').html(`Registro de Información Migratoria - ${cliente}`);

   validaciones();
   llamarRamas();

   // BOTON DE AGREGAR
   $(document).on('click', '.btn-add', function (event) {
      event.preventDefault();

      // obtenemos el div con clase caja multiple mas cercano al boton
      let $cajaMultiple = $(this).closest('.caja-multiple');
      // obtenemos el input
      let $input = $(this).closest('.grupo').find('input');
      $(this).toggleClass('btn-success btn-add btn-danger btn-remove').html('–');
      // obtenemos la data del input
      let data = $input.data();
      // agregamos un input generado a la caja multiple
      $cajaMultiple.append(crearOtherMultiple(data));
      let inputSinMascara = $cajaMultiple.find('input').last();
      // agregamos la mascara a nuestro input
      agregarMascara(inputSinMascara, data.tipo);

   });
   // BOTON DE ELIMINAR
   $(document).on('click', '.btn-remove', function (event) {
      event.preventDefault();
      let $grupo = $(this).closest('.grupo');
      $grupo.remove();
   });
   //BOTON MOSTRAR EL REPORTE
   $(document).on('click', '#btnRepote', function () {

      $.ajax({
         url: URL_SERVIDOR + "Asesoria/reporteMigratorio",
         method: "GET"
      }).done(function (response) {
         //MANDALOS LOS VALORES AL MODAL
         $('#crear_tablas').empty();
         seleccion = $('#crear_tablas');
         for (let i = 0, ien = response.ramas.ramas.length; i < ien; i++) {
            seleccion.append('<span class="h3">' + response.ramas.ramas[i].categoria_rama + '</span>' +
               '<table id="factura_detalle">' +
               '<thead>' +
               '<tr>' +
               '<th class="textcenter">Pregunta</th>' +
               '<th class="textcenter">Respuesta</th>' +
               '</tr>' +
               '</thead>' +
               '<tbody id="detalle_productos' + response.ramas.ramas[i].num_rama + '"' +

               '</tbody>' +

               '</table>');
            for (let j = 0, jen = response.preguntas.length; j < jen; j++) {

               tr = $('#detalle_productos' + response.ramas.ramas[i].num_rama);
               if (response.preguntas[j].num_rama == response.ramas.ramas[i].num_rama) {
                  tr.append(' <tr>' +
                     '<td class="textcenter">' +
                     '<label name="nombreVehiculoC" id="nombreVehiculoC"' +
                     'style="font-weight: normal;">' + response.preguntas[j].pregunta + '</label>' +
                     '</td>' +
                     '<td class="textcenter">' +
                     '<label name="anioC" id="anioC"' +
                     'style="font-weight: normal;"></label>' +
                     '</td>' +
                     '</tr>');
               }

            }

         }

      }).fail(function (response) {

      }).always(function (xhr, opts) {
         $('#modal-cotizacion').modal('show');

      });
   });
   //BOTON DE GUARDAR
   $(document).on('click', '#btnFormulario', function (evento) {
      evento.preventDefault(); //para evitar que la pagina se recargue
      let form = $("#migratorio-form");
      form.validate();
      if (form.valid()) {


         let tabSeleccionado = $('.tab-pane .active').attr('id');
         if (tabSeleccionado == 'custom-tabs-one-galeria') {
            // si es el tab de la galeria 
            guardarPasaportes();
         } else {
            // si es un tab de preguntas
            actualizar();
         }
      } else {
         toastr.error('Verifique los campos de selección');
      }
   });
   function llamarRamas() {
      $.ajax({
         type: "GET",
         url: URL_SERVIDOR + "Asesoria/ramita",
         dataType: "json",
         success: function (data) {

            let $select = $('#custom-tabs-one-tab');
            let $nuevo = $('#custom-tabs-one-tabContent');
            $.each(data.ramas, function (i, name) {
               if (name.num_rama == 1) {
                  // alert('rama 1')
                  $select.append(' <li class="nav-item"><a class="nav-link active"' +
                     'id="custom-tabs-one-home-' + name.num_rama + '" data-toggle="pill"' +
                     'href="#custom-tabs-one-' + name.num_rama + '" role="tab" aria-controls="custom-tabs-one-home"' +
                     'aria-selected="true">' + name.categoria_rama + '</a></li>');
                  $nuevo.append('<div class="tab-pane fade show active" id="custom-tabs-one-' + name.num_rama + '" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">' +
                     '<div class="" id="' + name.num_rama + '"></div></div>');
               } else {
                  //alert(name.num_rama+"rama");
                  $select.append(' <li class="nav-item"><a class="nav-link"' +
                     'id="custom-tabs-one-home-' + name.num_rama + '" data-toggle="pill"' +
                     'href="#custom-tabs-one-' + name.num_rama + '" role="tab" aria-controls="custom-tabs-one-home"' +
                     'aria-selected="true">' + name.categoria_rama + '</a></li>');
                  $nuevo.append('<div class="tab-pane fade" id="custom-tabs-one-' + name.num_rama + '" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">' +
                     '<div class="" id="' + name.num_rama + '"></div></div>');
               }

            });
            llamarPreguntita($select, $nuevo);
         },
         error: function (err) {
            const Toast = Swal.mixin();
            Toast.fire({
               title: 'Error',
               icon: 'error',
               text: 'No hay Ramas para mostrar',
               showConfirmButton: true,
            });
         }
      });
   }
   function actualizar() {

      $.ajax({
         url: URL_SERVIDOR + "FormularioMigratorio/update",
         method: "POST",
         mimeType: "multipart/form-data",
         data: obtenerData(),
         timeout: 0,
         processData: false,
         contentType: false,
      }).done(function (response) {
         const Toast = Swal.mixin();
         Toast.fire({
            title: 'Exito...',
            icon: 'success',
            text: 'Registro Guardado Exitosamente',
            showConfirmButton: true,
         });
      }).fail(function (response) {
         //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
         const Toast = Swal.mixin();
         Toast.fire({
            title: 'Exito...',
            icon: 'success',
            text: 'Error en el envio de información',
            showConfirmButton: true,
         });

      });
   }
   function guardarPasaportes() {
      let form = new FormData();
      form.append("tipo", 'pasaportes');
      form.append("identificador", ID_CLIENTE);
      let galeria = document.getElementById("pasaportes").files;
      for (let i = 0; i < galeria.length; i++) {
         form.append('fotos[]', galeria[i]);
      }
      $.ajax({
         url: URL_SERVIDOR + "Imagen/saveGaleria",
         method: "POST",
         mimeType: "multipart/form-data",
         data: form,
         timeout: 0,
         processData: false,
         contentType: false,
      }).done(function (response) {
         const Toast = Swal.mixin();
         Toast.fire({
            title: 'Exito...',
            icon: 'success',
            text: 'Registro Guardado Exitosamente',
            showConfirmButton: true,
         })
      }).fail(function (response) {
         //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
         const Toast = Swal.mixin();
         Toast.fire({
            title: 'Exito...',
            icon: 'success',
            text: 'Error en el envio de información',
            showConfirmButton: true,
         })

      });
   }
   function validaciones() {


      $(document).ready(function () {
         $.validator.setDefaults({
            ignore: [],
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
   function llamarPreguntita($selectTop, $nuevoTop) {
      $.ajax({
         type: "GET",
         url: `${URL_SERVIDOR}Asesoria/respuestas?id_cliente=${ID_CLIENTE}`,
         dataType: "json",
         success: function (data) {
            console.log(data)
            var contador = 0;
            let cont = 0;

            for (let i = 0, ien = data.preguntas.length; i < ien; i++) {
               // alert('paso');
               if (data.preguntas[i].opcion == 'cerrada') {
                  var $select = $('#' + data.preguntas[i].num_rama);
                  $select.append(crearPreguntaCerrada(data.preguntas[i], data.opciones));
                  contador++;
               } else {
                  if (data.preguntas[i].mas_respuestas == 'Si') {
                     // se selecciona la rama
                     let $select = $('#' + data.preguntas[i].num_rama);
                     // agregamos el input a la vista
                     $select.append(crearPreguntaMultiple(data.preguntas[i]));
                     // obtenemos el input para agregarle la mascara
                     let contendorInpus = $select.find('.caja-multiple');
                     // agregamos la mascara al input
                     agregarMascaraMultiple(contendorInpus, data.preguntas[i].tipo, data.preguntas[i].respuesta);
                     modificarColorDeBotones(contendorInpus);
                  } else {
                     // se selecciona la rama
                     let $select = $('#' + data.preguntas[i].num_rama);
                     // agregamos el input a la vista
                     $select.append(crearPreguntaSimple(data.preguntas[i]));
                     // obtenemos el input para agregarle la mascara
                     let inputSinMascara = $select.find('input').last();
                     // agregamos la mascara al input
                     agregarMascara(inputSinMascara, data.preguntas[i].tipo);
                  }
               }
            }
            crearTabGaleria($selectTop, $nuevoTop, data.pasaportes);

         },
         error: function (err) {
            const Toast = Swal.mixin();
            Toast.fire({
               title: 'Error',
               icon: 'error',
               text: 'No hay preguntas registradas..!',
               showConfirmButton: true,
            });
         }
      });
   }
   function crearLabel(txt) {
      let label = document.createElement('label');
      label.innerHTML = txt;
      label.style.fontWeight = "normal";
      label.style.padding = '3px';
      label.style.fontWeight = 'bold';
      return label;
   }
   function crearBoton() {
      let span = document.createElement("span");
      span.classList.add('input-group-btn');

      let button = document.createElement("button");
      button.classList.add('btn');
      button.classList.add('btn-success');
      button.classList.add('btn-add');
      button.setAttribute("type", "button");
      button.style.marginTop = '19px';
      button.style.width = '5%';
      let t = document.createTextNode("+");
      button.appendChild(t);
      span.append(button);
      return span;
   }
   function crearOtherBoton() {
      let span = document.createElement("span");
      span.classList.add('input-group-btn');

      let button = document.createElement("button");
      button.classList.add('btn');
      button.classList.add('btn-success');
      button.classList.add('btn-add');
      button.setAttribute("type", "button");
      button.style.width = '5%';
      button.style.marginTop = '10px';
      let t = document.createTextNode("+");
      button.appendChild(t);
      span.append(button);
      return span;
   }
   function crearPreguntaSimple(data) {
      let grupo = document.createElement('div');
      let label = crearLabel(`¿${data.pregunta}?`);
      let input = crearInput(data, 'preguntaSimple[]');
      input.classList.add('input-simple');
      input.style.width = '100%';
      input.style.marginTop = '20px';
      grupo.append(label);
      grupo.append(input);
      return grupo;
   }
   function crearInput(data, name) {
      let input = document.createElement("INPUT");
      input.setAttribute("type", obtenerTipoInput(data.tipo));
      input.setAttribute("name", name);
      if (typeof (data.respuesta) == 'undefined') {
         input.setAttribute("value", '');
      } else {
         input.setAttribute("value", data.respuesta);
      }
      input.setAttribute("placeholder", `¿${data.pregunta}?`);
      input.dataset.id_pregunta = data.id_pregunta;
      input.dataset.pregunta = data.pregunta;
      input.dataset.tipo = data.tipo;
      input.dataset.id_formulario = data.id_formulario;
      input.classList.add('form-control');
      input.style.textAlign = 'center';
      return input
   }
   function crearPreguntaCerrada(data, listOption) {
      let label = crearLabel(`¿${data.pregunta}?`);
      let select = document.createElement("select");
      select.setAttribute("name", `respuestas[]`);
      select.setAttribute("placeholder", `¿${data.pregunta}?`);
      select.dataset.id_pregunta = data.id_pregunta;
      select.dataset.pregunta = data.pregunta;
      select.dataset.tipo = data.tipo;
      select.dataset.id_formulario = data.id_formulario;
      select.style.width = '100%';
      select.style.width = '100%';
      select.style.textAlign = 'center';
      select.style.paddingLeft = '50%';
      select.classList.add('form-control');
      select.classList.add('respuesta');

      listOption.forEach(opt => {

         if (data.id_pregunta == opt.id_pregunta) {
            let option = document.createElement("OPTION");
            option.setAttribute("value", opt.opciones_respuestas);
            if (data.respuesta == opt.opciones_respuestas) {
               option.setAttribute("selected", true);

            }

            let t = document.createTextNode(opt.opciones_respuestas);
            option.appendChild(t);
            select.appendChild(option);
         }
      });

      let grupo = document.createElement('div');
      grupo.append(label);
      grupo.append(select);

      return grupo;
   }
   function crearPreguntaMultiple(data) {
      let label = crearLabel(`¿${data.pregunta}?`);
      let contenedor = document.createElement('div');
      contenedor.classList.add("caja-multiple");
      contenedor.dataset.id_pregunta = data.id_pregunta;
      contenedor.dataset.id_formulario = data.id_formulario;
      contenedor.append(label);

      for (let index = 0; index < data.respuesta.length; index++) {
         let boton = crearBoton();
         let input = crearInput(data, 'preguntaMultiple[]');
         input.style.width = '95%';
         input.style.marginTop = '20px';
         input.classList.add('form-control');
         input.classList.add('input-multiple');

         let grupo = document.createElement('div');
         grupo.classList.add("grupo");
         grupo.append(input);
         grupo.append(boton);
         contenedor.append(grupo);

      }

      return contenedor;
   }
   function crearOtherMultiple(data) {
      let boton = crearOtherBoton();
      let input = crearInput(data, 'preguntaMultiple[]');
      input.style.width = '95%';
      input.style.marginTop = '10px';
      input.classList.add('form-control');
      input.classList.add('input-multiple');

      let grupo = document.createElement('div');
      grupo.classList.add("grupo");
      grupo.append(input);
      grupo.append(boton);

      return grupo;
   }
   function agregarMascara(input, tipo) {
      switch (tipo) {
         case 'telefono':
            input.inputmask("(+123) 1234-5678"); //static mask
            input.inputmask({ "mask": "(+999) 9999-9999" }); //specifying options
            break;
         case 'dui':
            input.inputmask("99999999-9"); //static mask
            input.inputmask({ "mask": "99999999-9" }); //specifying options
            break;
         case 'pasaporte':
            input.inputmask("A99999999"); //static mask
            input.inputmask({ "mask": "A99999999" }); //specifying options
            break;
         case 'nit':
            input.inputmask("1013-110795-101-0"); //static mask
            input.inputmask({ "mask": "9999-999999-999-9" }); //specifying options
            break;
         default:
            break;
      }
   }
   function agregarMascaraMultiple(contenedor, tipo, respuestas) {
      contenedor.find('INPUT').map(function (index) {
         let input = $(this);
         switch (tipo) {
            case 'telefono':
               input.inputmask("(+123) 1234-5678"); //static    mask
               input.inputmask({ "mask": "(+999) 9999-9999" }); //specifying options
               input.val(respuestas[index]);
               break;
            case 'dui':
               input.inputmask("99999999-9"); //static mask
               input.inputmask({ "mask": "99999999-9" }); //specifying options
               input.val(respuestas[index]);
               break;
            case 'pasaporte':
               input.inputmask("A99999999"); //static mask
               input.inputmask({ "mask": "A99999999" }); //specifying options
               input.val(respuestas[index]);
               break;
            case 'nit':
               input.inputmask("1013-110795-101-0"); //static mask
               input.inputmask({ "mask": "9999-999999-999-9" }); //specifying options
               input.val(respuestas[index]);
               break;
            default:
               input.val(respuestas[index]);
               break;
         }
      });

   }
   function modificarColorDeBotones(contendorInput) {
      //ponemos rojos todos los botones 
      contendorInput.find('button').map(function (index) {
         $(this).toggleClass('btn-success btn-add btn-danger btn-remove').html('–');
      });
      let ultimo = contendorInput.find('button').last();
      ultimo.toggleClass('btn-danger btn-remove btn-success btn-add').html('+');

   }
   function obtenerTipoInput(tipo) {
      switch (tipo) {
         case 'date':
            return 'date'
         case 'email':
            return 'email'
         case 'number':
            return 'number'
         default:
            return 'text';
      }
   }
   function obtenerData() {
      let form = new FormData();
      let AllQuestion = [];
      AllQuestion = [];
      let mult = obtenerRespuestaMultples();
      AllQuestion.push(...mult);
      // obtenemos los inputs simples
      let $preguntaSimples = $('.tab-pane .active').find('.input-simple');
      let siimple = filtrar($preguntaSimples);
      AllQuestion.push(...siimple);
      // Para obtener las pregutnas cerradas
      let $preguntaCerrada = $('.tab-pane .active').find('select');
      let cerrada = filtrar($preguntaCerrada);
      AllQuestion.push(...cerrada);

      // verificamos que todas las preguntas ya hallan sido contestadas
      // puede ser que agregen nuevas preguntas 
      // o que este tab no se lleno la primera vez
      let newQuestion = AllQuestion.filter(question => question.id_formulario == 'undefined');
      let oldQuestion = AllQuestion.filter(question => question.id_formulario != 'undefined');
      // eliminamos la  propiedad id_formulario para demostrar que es una nueva pregunta
      newQuestion = newQuestion.map(question => {
         delete question.id_formulario;
         return question
      });
      form.append('newQuestion', JSON.stringify(newQuestion));
      form.append('oldQuestion', JSON.stringify(oldQuestion));
      return form;
   }
   function obtenerRespuestaMultples() {
      // obtenemos todos los div con la clase caja multiples visibles en el div
      let $preguntaMultiple = $('.tab-pane .active').find('.caja-multiple');
      // estos son los inputs multiples
      let mult = $preguntaMultiple.map(function () {
         // en el div .caja-multiples tenemos almacenado el id pregunta, lo recuperamos
         let id_pregunta = $(this).data().id_pregunta;
         let id_formulario = $(this).data().id_formulario;
         // obtenemos todos los input del elemento que estamos recorriendo con el map
         let inputs = $(this).find('input');
         // de esos inputs los recorremos para obtener todas las respuestas de esa pregutna
         let respuestasMultiples = inputs.map(function () {
            // solo devolvemos el valor
            return $(this).val();
            // el get espara que lo devuelva en forma de arreglo normal
         }).get();
         let objetoRestaMultiple = {
            id_formulario: id_formulario,
            id_pregunta: id_pregunta,
            id_cliente: ID_CLIENTE,
            respuesta: JSON.stringify(respuestasMultiples),
         };
         return objetoRestaMultiple;
      }).get();


      return mult;
   }
   function filtrar($listaElementos) {
      return $listaElementos.map(function () {
         return {
            id_formulario: $(this).data().id_formulario,
            id_pregunta: $(this).data().id_pregunta,
            id_cliente: ID_CLIENTE,
            respuesta: $(this).val()
         };
      }).get();
   }
   function crearTabGaleria($select, $nuevo, pasaportes) {
      let urlFotos = [];
      let infoFotos = [];
      $select.append(`
      <li class="nav-item">
          <a class="nav-link" id="custom-tabs-one-home-galeria " data-toggle="pill" 
              href="#custom-tabs-one-galeria" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">
              Documentos
          </a>
      </li>       
      `);
      $nuevo.append(`
      <div class="tab-pane fade" id="custom-tabs-one-galeria" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
          <div id="galeria">
              <div class="row">
                  <div class="col-sm-12">
                      <label>Subir imágenes de Pasaportes</label>
                      <div class="file-loading">
                          <input type="file" multiple name="pasaportes[]"  id="pasaportes">
                      </div>
                  </div>
              </div>
          </div>
      </div>`);
      // ACA
      pasaportes.forEach(element => {
         let informacion = {
            url: URL_SERVIDOR + "Imagen/delete",
            key: element.id_foto
         };
         infoFotos.push(informacion);
         urlFotos.push(element.foto_path);
      });


      $('#pasaportes').fileinput({
         theme: 'fas',
         language: 'es',
         overwriteInitial: false,
         showUpload: false,
         initialPreviewAsData: true,
         allowedFileExtensions: ["jpg", "png", "gif", "pdf"],
         initialPreview: urlFotos,
         initialPreviewConfig: infoFotos,
         required: true,
         maxFileSize: 10000,
         maxFilesNum: 10,
      });

   }
});