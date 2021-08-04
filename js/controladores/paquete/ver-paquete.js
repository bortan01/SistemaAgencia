$(document).ready(function () {
   let explorer = $("#kv-explorer");
   let ListaDatos;
   let idSeleccionado;
   let tabla;
   inicializarValidaciones();
   inicializarTabla();
   inicializarComboTipo();
   inicializarComboContacto();

   //BOTON DE EDITAR
   $(document).on('click', '.btn-group .btn-primary', function () {
      let idSeleccionado = $(this).attr("name");
      window.location = `../tours/editar_tour.php?tur=${idSeleccionado}`;
   });
   //BOTON EDITAR LA FOTO
   $(document).on('click', '.btn-group .btn-warning', function () {
      $('#modal-imagenes').modal('show');

      let fila = $(this).closest("tr");
      let data = tabla.row(fila).data();

      let identificador = data.id_tours;
      let tipoGaleria = data.tipo;
      let informacionAdicional = { tipo: tipoGaleria, identificador: identificador };
      let urlFotos = [];
      let infoFotos = [];

      $.ajax({
         url: URL_SERVIDOR + "Imagen/show?tipo=" + tipoGaleria + "&identificador=" + identificador,
         method: "GET",

      }).done(function (response) {
         //REST_Controller::HTTP_OK
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
      })
   });
   //BOTON DE ANALITICAS
   $(document).on('click', '.btn-group .btn-info', function (evento) {
      evento.preventDefault();//para evitar que la pagina se recargue
      let idSeleccionado = $(this).attr("name");
      window.location = `${URL_SISTEMA}vistas/paquetes/analitica.php?tur=${idSeleccionado}`;
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
   //BOTON DE PRECHEQUEO
   $(document).on('click', '.btn-group .btn-secondary', function (evento) {
      evento.preventDefault();//para evitar que la pagina se recargue
      let idSeleccionado = $(this).attr("name");
      window.location = `../tours/chekeo.php?viaje=${idSeleccionado}`;
   });
   //CUANDO EL MODAL SE CIERRA
   $('#modal-imagenes').on('hidden.bs.modal', function (e) {
      console.log("cerrando modal")
      explorer.fileinput('destroy');
   })
   //BOTON DE COORDENADAS
   $(document).on('click', '#btn-mapa', function (evento) {
      $('#coordenadas').val("13.645382, -88.870769");
      $("#coordenadas-error").hide();
      $("#coordenadas").removeClass("is-invalid");
   });
   //BOTON DE ITINERARIO
   $(document).on('click', '.btn-group .btn-success ', function (evento) {
      let fila = $(this).closest("tr");
      let dataFilaTur = tabla.row(fila).data();

      let idViaje = dataFilaTur.id_tours;
      let fechaInicioViaje = dataFilaTur.start;
      let fechaFinViaje = dataFilaTur.end;
      let titulo = dataFilaTur.nombreTours;

      console.log(dataFilaTur);

      window.location = `../tours/itinerario.php?viaje=${idViaje}&&fechaInicioViaje=${fechaInicioViaje}&&fechaFinViaje=${fechaFinViaje}&&titulo=${titulo}`;
   });
   function inicializarTabla() {
      tabla = $("#tabla_servicios").DataTable({
         "responsive": true,
         "autoWidth": false,
         "deferRender": true,
         "order": [[3, "desc"]],
         "columnDefs": [
            { "className": "dt-center", "targets": "_all" },
            { "targets": [4], "visible": false },
            { "targets": [3], width: "30%" },

         ],
         "ajax": {
            "url": URL_SERVIDOR + "TurPaquete/show?estado=1&tipo=Allpaquete",
            "method": "GET",
            "dataSrc": function (json) {
               //PARA CONPROVAR QUE EL SERVICIO EXISTE
               if (json) {
                  for (let i = 0, ien = json.length; i < ien; i++) {
                     //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                     html = "";
                     html += '<td>';
                     html += '    <div class="btn-group">';
                     html += '        <button type="button" name="' + json[i].id_tours + '" class="btn btn-primary" data-toggle="modal"';
                     html += '            data-target="">';
                     html += '            <i class="fas fa-edit" style="color: white"></i>';
                     html += '        </button>';
                     html += '        <button type="button" name="' + json[i].id_tours + '" class="btn btn-danger" data-toggle="modal"';
                     html += '            data-target="#modal-eliminar">';
                     html += '            <i class="fas fa-trash" style="color: white"></i>';
                     html += '        </button>';
                     html += '        <button type="button" name="' + json[i].id_tours + '" class="btn btn-warning" data-toggle="modal"';
                     html += '            data-target="#modal-galeria">';
                     html += '            <i class="fas fa-image" style="color: white"></i>';
                     html += '        </button>';
                     html += '        <button type="button" name="' + json[i].id_tours + '"  class="btn btn-info" data-toggle="modal"';
                     html += '            data-target="">';
                     html += '            <i class="fa fa-signal" style="color: white"></i>';
                     html += '        </button>';
                     html += '        <button type="button" name="' + json[i].id_tours + '"  class="btn btn-secondary" data-toggle="modal"';
                     html += '            data-target="">';
                     html += '            <i class="fas fa-check-circle" style="color: white"></i>';
                     html += '        </button>';
                     html += '    </div>';
                     html += '</td>';
                     let fechaSalida = moment(json[i]["start"]);
                     // json[i]["start"]  = fechaSalida.locale('es').format('LL');
                     json[i]["fecha"] = fechaSalida.locale('es').format('LL');

                     json[i]["botones"] = html;
                  }
                  $('#loading').hide();
                  return json;


               } else {
                  $('#loading').hide();
                  return [];
               }
            }
         },
         columns: [
            { data: "nombreTours" },
            { data: "precio" },
         
            { data: "tipo" },
            { data: "botones" },
            { data: "id_tours" },
         ]
      });

   }
   function inicializarValidaciones() {
      $('#miFormulario').validate({
         rules: {
            nombre: {
               required: true,
               minlength: 3,
               maxlength: 40
            },
            costos_defecto: {
               required: true,
               number: true,
               min: 0
            },
            informacion_contacto: {
               required: true,
               minlength: 10,
            },
            descripcion_servicio: {
               required: true,
               minlength: 10,
            }
         },
         messages: {
            nombre: {
               required: "Ingrese un nombre",
               minlength: "Logitud del nombre debe ser mayor a 3",
               maxlength: "Logitud del nombre no debe exceder a 40",
            },
            costos_defecto: {
               required: "Ingrese un numero",
               number: "Ingrese un numero",
               min: "Debe de ser mayor que 0"
            },
            informacion_contacto: {
               required: "La informacion de contacto es necesaria",
               minlength: "Debe de tener una longitud minima de 10",
            },
            descripcion_servicio: {
               required: "La descripcion del servico es necesaria",
               minlength: "Debe de tener una longitud minima de 10",
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
      let myCoordnada = document.getElementById("coordenadas").value;
      myCoordnada = myCoordnada.split(', ');

      let data = {
         "id_sitio_turistico": idSeleccionado,
         "nombre_sitio": document.getElementById("nombre").value,
         "longitud": myCoordnada[1],
         "latitud": myCoordnada[0],
         "descripcion": document.getElementById("descripcion").value,
         "tipo": document.getElementById("ComboTipo").value,
         "informacion_contacto": document.getElementById("contacto_servicio").value,
         "precio_sitio": document.getElementById("precio_sitio").value,

      };
      ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
      $.ajax({
         url: URL_SERVIDOR + "SitioTuristico/update",
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
         "id_tours": idSeleccionado
      };
      ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
      console.log("aquij");
      $.ajax({
         url: URL_SERVIDOR + "TurPaquete/elimination",
         method: "DELETE",
         timeout: 0,
         data: data
      }).done(function (response) {
         //REST_Controller::HTTP_OK
         console.log(response);
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
   function inicializarComboTipo() {
      dataTipo = [
         { id: 1, text: "Montaña" },
         { id: 2, text: "Reserva Natural" },
         { id: 3, text: "Parque Nacional" },
         { id: 4, text: "Restaurante" },
         { id: 5, text: "Shows Artitisticos" },
         { id: 6, text: "Hotel" },
         { id: 7, text: "Otros" },
      ];
      $('#ComboTipo').select2(
         { data: dataTipo });

   }
   function inicializarComboContacto() {
      //COMBO DE CONTACTOS
      $.ajax({
         url: URL_SERVIDOR + "Contacto/show",
         method: "GET"
      }).done(function (response) {
         //REST_Controller::HTTP_OK
         let myData = [];
         if (response.contactos) {
            let lista = response.contactos;
            for (let index = 0; index < lista.length; index++) {
               myData.push({
                  id: lista[index].id_contacto,
                  text: lista[index].nombre_contacto
               });
            }
            $('#contacto_servicio').select2(
               { data: myData }
            );
         } else {
            $('#contacto_servicio').select2();
         }
      }).fail(function (response) {
         $('#contacto_servicio').select2();

      }).always(function (xhr, opts) {
         $('#loading').hide();
      });
   }
});