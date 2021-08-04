$(document).ready(function () {
   let explorer = $("#kv-explorer");
   let idSeleccionado;
   let tabla;
   let formularioEditar;
   inicializarValidaciones();
   inicializarTabla();
   inicializarMascara();
   inicializarFoto();

   //BOTON DE EDITAR
   $(document).on('click', '.btn-group .btn-primary', function () {
      $('#loadingActualizar').hide();
      $('#modal-editar').modal('show');
      let fila = $(this).closest("tr");
      let data = tabla.row(fila).data();
      $('#correoContacto').val(data.correo);
      $('#telefonoContacto').val(data.telefono);
      $('#nombreContacto').val(data.nombre_contacto);
      idSeleccionado = data.id_contacto;

   });
   //BOTON EDITAR FOTO PERFIL 
   $(document).on('click', 'a[name ="camara"]', function () {
      //inicializamos nuevamente el input de foto
      inicializarFoto();
      ///abrimos el modal
      $('#modal-perfil').modal('show');
      //recuperamos la informacion
      let fila = $(this).closest("tr");
      let data = tabla.row(fila).data();
      ///le enviamos la imagen del cliente al avatar
      let $avatar = $('.file-default-preview');
      $avatar.html(`<img src="${data.foto}" style="width: 186px;">`);
      ///le damos el valor al id seleccionado
      idSeleccionado = data.id_contacto;
   });
   //BOTON PARA ELIMINAR
   $(document).on('click', '.btn-group .btn-danger', function (evento) {
      idSeleccionado = $(this).attr("name");

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
         if (result.value) {
            eliminar();
         }
      });
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
   //BOTON DEL MODAL PARA ACTUALIZA LA FOTO DE PERFIL
   $(document).on('click', '#actualizarFotoPerfil', function (evento) {
      evento.preventDefault();//para evitar que la pagina se recargue
      //PARA SABER SI SE HA SELECCIONADO UNA FOTO 
      if (document.getElementById("foto").files[0]) {
         ActualizarFotoPerfil();
      } else {
         const Toast = Swal.mixin();
         Toast.fire({
            title: 'Exito...',
            icon: 'error',
            text: "Seleccione una Imagen",
            showConfirmButton: true,
         });
      }
   });
   //CUANDO EL MODAL DE EDITAR
   $('#modal-editar').on('hidden.bs.modal', function (e) {
      formularioEditar.resetForm();
   });
   //CUANDO EL MODAL DE LA FOTOGRAFIA 
   $('#modal-perfil').on('hidden.bs.modal', function (e) {
      $("#foto").fileinput('destroy');
      $("#formulario_perfil").trigger("reset");




   })

   //INICIALIZANDO LA TABLA
   function inicializarTabla() {
      tabla = $("#tabla_cliente").DataTable({
         "responsive": true,
         "autoWidth": false,
         "deferRender": true,
         "columnDefs": [
            // { "className": "dt-center", "targets": "_all" },
            { "targets": [0], width: "18%" },
            { "targets": [2], width: "4%" },
            { "targets": [5], visible: false },

         ],
         "ajax": {
            "url": URL_SERVIDOR + "Contacto/show",
            "method": "GET",
            "dataSrc": function (json) {
               //PARA CONPROVAR QUE EL SERVICIO EXISTE
               if (json.contactos) {
                  for (let i = 0, ien = json.contactos.length; i < ien; i++) {
                     //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                     html = "";
                     html += '<td>';
                     html += '    <div class="btn-group">';
                     html += '        <button type="button" name="' + json.contactos[i].id_contacto + '" class="btn btn-primary" data-toggle="modal"';
                     html += '            data-target="">';
                     html += '            <i class="fas fa-edit" style="color: white"></i>';
                     html += '        </button>';
                     html += '        <button type="button" name="' + json.contactos[i].id_contacto + '" class="btn btn-danger" data-toggle="modal"';
                     html += '            data-target="#modal-eliminar">';
                     html += '            <i class="fas fa-trash" style="color: white"></i>';
                     html += '        </button>';
                     html += '    </div>';
                     html += '</td>';
                     json.contactos[i]["botones"] = html;

                     let html2 = "";
                     html2 += '      <div class="hovereffect">   ';
                     html2 += '         <img class="img-responsive rounded"';
                     html2 += `            src="${json.contactos[i].foto}" `;
                     html2 += '            alt="" >';
                     html2 += '            <div class="my-overlay">';
                     html2 += '               <p>';
                     html2 += '                  <a name="camara" href="#">';
                     html2 += '                     <i class="fas fa-camera" style="color: white;"></i>';
                     html2 += '                  </a>';
                     html2 += '               </p>';
                     html2 += '            </div>';
                     html2 += '      </div>';
                     json.contactos[i]["image"] = html2;
                  }
                  $('#loading').hide();
                  return json.contactos;
               } else {
                  $('#loading').hide();
                  return [];
               }
            }
         },
         columns: [

            { data: "image" },
            { data: "nombre_contacto" },
            { data: "correo" },
            { data: "telefono" },
            { data: "botones" },
            { data: "foto" },

         ]
      });

   }
   //INICIALIZANDO VALIDACIONES
   function inicializarValidaciones() {
      formularioEditar = $('#formularioEditar').validate({
         rules: {
            correoContacto: {
               email: true
            },
            nombreContacto: {
               required: true,
               minlength: 3,
            }
         },
         messages: {
            correoContacto: {
               email: "Ingrese un correo electrónico válido"
            },
            nombreContacto: {
               required: "Es necesario un nombre",
               minlength: "Debe de tener una longitud minima de 3"
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
      let data = {

         "correo": document.getElementById("correoContacto").value,
         "telefono": document.getElementById("telefonoContacto").value,
         "id_contacto": idSeleccionado,
         "nombre_contacto": document.getElementById("nombreContacto").value,
      };
      ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
      $.ajax({
         url: URL_SERVIDOR + "Contacto/update",
         method: "PUT",
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
            $("#formularioEditar").trigger("reset");
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
   function eliminar() {
      let data = {
         "id_contacto": idSeleccionado
      };
      ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO

      $.ajax({
         url: URL_SERVIDOR + "Contacto/elimination",
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
   function inicializarMascara() {
      let dui = $("#dui");
      dui.inputmask("99999999-9");  //static mask
      dui.inputmask({ "mask": "99999999-9" }); //specifying options
      // $("#dui").inputmask("9-a{1, 3}9{1, 3}"); //mask with dynamic syntax
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
   function ActualizarFotoPerfil() {
      $('#loading').show();
      let form = new FormData();
      //ESTO ES PARA LA FOTO DE PERFIL
      let foto_perfil = document.getElementById("foto").files[0];
      form.append('foto', foto_perfil);
      form.append('tipo', 'contacto');
      form.append('identificador', idSeleccionado);

      //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
      $.ajax({
         url: URL_SERVIDOR + "Imagen/apdate",
         method: "POST",
         mimeType: "multipart/form-data",
         data: form,
         timeout: 0,
         processData: false,
         contentType: false,
      }).done(function (response) {
         //REST_Controller::HTTP_OK
         
         tabla.ajax.reload(null, false);
         const Toast = Swal.mixin();
         Toast.fire({
            title: 'Exito...',
            icon: 'success',
            text: "FOTO ACTUALIZADA",
            showConfirmButton: true,
         }).then((result) => {
            //TODO BIEN Y RECARGAMOS LA PAGINA 

            $("#miFormulario").trigger("reset");
            $('#modal-perfil').modal('hide');
         });
      }).fail(function (response) {
         //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
         console.log(response);

         const Toast = Swal.mixin();
         Toast.fire({
            title: 'Oops...',
            icon: 'error',
            text: "ERROR EN EL ENVIO DE INFORMACIÓN",
            showConfirmButton: true,
         });

      }).always(function (xhr, opts) {
         $('#loading').hide();
      });
   }

});