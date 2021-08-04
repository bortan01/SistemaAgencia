$(document).ready(function () {
   let idSeleccionado;
   let tabla;
   inicializarValidaciones();
   inicializarTabla();


   //BOTON DE EDITAR
   $(document).on('click', '.btn-group .btn-primary', function () {
      $('#loadingActualizar').hide();
      let fila = $(this).closest("tr");
      let data = tabla.row(fila).data();
      idSeleccionado = data.idCotizar;
      $('#modal-editar').modal('show');
   });

   //BOTON PARA ACTUALIZAR
   $(document).on('click', '#btnActualizar', function (evento) {
      evento.preventDefault();//para evitar que la pagina se recargue
      let form = $("#formularioEditar");
      form.validate();
      if (form.valid()) {
         actualizar();
      }
   });

   function inicializarTabla() {
      let url = `${URL_SERVIDOR}TurPaquete/cotizacion?visto=0`;
      tabla = $("#tabla_servicios").DataTable({
         "responsive": true,
         "autoWidth": false,
         "deferRender": true,
         "columnDefs": [
            { "className": "dt-center", "targets": "_all" },
         ],
         "ajax": {
            "url": url,
            "method": "GET",
            "dataSrc": function (cotizaciones) {
               //PARA CONPROVAR QUE EL SERVICIO EXISTE

               if (cotizaciones) {
                  for (let i = 0, ien = cotizaciones.length; i < ien; i++) {
                     //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                     html = "";
                     html += '<td>';
                     html += '    <div class="btn-group">';
                     html += '        <button type="button" name="" class="btn btn-primary" data-toggle="modal"';
                     html += '            data-target="">';
                     html += '            <i class="fas fa-edit" style="color: white"></i>';
                     html += '        </button>';
                     html += '    </div>';
                     html += '</td>';
                     cotizaciones[i]["botones"] = html;


                     let fechaSalida = moment(cotizaciones[i]["fechaPeticion"]);
                     cotizaciones[i]["fechaPeticion"] = fechaSalida.locale('es').format('LL');
                  }
                  $('#loading').hide();
                  return cotizaciones;
               } else {
                  $('#loading').hide();
                  return [];
               }
            }
         },
         columns: [
            { data: "nombre" },
            { data: "correo" },
            { data: "celular" },
            { data: "fechaPeticion" },
            { data: "peticion" },
            { data: "botones" },
         ]
      });

   }
   function inicializarValidaciones() {
      $('#formularioEditar').validate({
         rules: {
            respuesta: {
               required: true,
               minlength: 10,
            }
         },
         messages: {
            respuesta: {
               required: "la respuesta es requerida",
               minlength: "Logitud del nombre debe ser mayor a 10",
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
      let hoy = new Date();
      let fechaRespuesta = `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`;

      let data = {
         "visto": 1,
         "idCotizar": idSeleccionado,
         "fechaRespuesta": fechaRespuesta,
         "respuesta": document.getElementById("respuesta").value,
      };
      ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
      $.ajax({
         url: URL_SERVIDOR + "TurPaquete/cotizacion",
         method: "PUT",
         timeout: 0,
         data: data
      }).done(function (response) {
         //REST_Controller::HTTP_OK
         $("#formularioEditar").trigger("reset");
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
            title: 'Oops...',
            icon: 'error',
            text: "ERROR EN ENVIO DE INFORMACION",
            showConfirmButton: true,
         });

      }).always(function (xhr, opts) {
         //  $('#loadingActualizar').hide();
      });
   }


});