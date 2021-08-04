$(document).ready(function () {
   let tabla;
   const valores = window.location.search;
   const urlParams = new URLSearchParams(valores);
   let ID_TOUR = urlParams.get('viaje');
   let ID_DETALLE;
   inicializarTabla();

   //BOTON EDITAR LA CHEQUEO
   $(document).on('click', '.btn-group .btn-success, .btn-group .btn-secondary', function () {
      $('#modal-chekeo').modal('show');
      let fila = $(this).closest("tr");
      let data = tabla.row(fila).data();
      ID_DETALLE = data.id_detalle;
      console.log(data);

      let cajaRequisitos = document.getElementById("cajaRequisitos");
      data.chequeo.forEach(req => {
         cajaRequisitos.appendChild(createDiv(req));
      });
   });
   //CUANDO EL MODAL SE CIERRA
   $('#modal-chekeo').on('hidden.bs.modal', function (e) {
      document.getElementById('cajaRequisitos').innerHTML = "";
   })
   // BOTON DE ACUALIZAR
   $(document).on('click', '#btnActualizar', function (evento) {
      evento.preventDefault();
      let chequeo = [];
      let prechequeo = $("input[name='prechequeo[]']").map(function () { return $(this).val(); }).get();
      prechequeo.forEach(element => {
         let obj = {};
         obj["estado"] = document.getElementById(element).checked;
         obj["requisito"] = element;
         chequeo.push(obj);
      });
      actualizarChequeo(chequeo);


   });
   function createDiv(data) {
      let div = document.createElement('div');
      div.className = "custom-control custom-checkbox";
      div.append(createInput(data.requisito, data.estado));
      div.append(createLabel(data.requisito));
      return div;
   }
   function createInput(requisito, estado) {
      let input = document.createElement('input');
      input.className = 'custom-control-input';
      input.type = 'checkbox';
      input.id = requisito;
      input.value = requisito;
      input.checked = estado;
      input.name = 'prechequeo[]'
      return input;
   }
   function createLabel(requisito) {
      let label = document.createElement('label');
      label.className = ('custom-control-label');
      label.type = 'checkbox';
      label.innerHTML = requisito;
      label.htmlFor = requisito;
      return label;
   }
   function inicializarTabla() {
      tabla = $("#tabla_servicios").DataTable({
         responsive: true,
         autoWidth: false,
         deferRender: true,
         // order: [[4, "desc"]],
         columnDefs: [
            // { "className": "dt-center", "targets": "_all" },
            // { "targets": [5], "visible": false },
            { "targets": [3], width: "30%" },

         ],
         ajax: {
            url: URL_SERVIDOR + "TurPaquete/analitica?id_tours=" + ID_TOUR,
            method: "GET",
            dataSrc: function (json) {
               //PARA CONPROVAR QUE EL SERVICIO EXISTE
               if (json) {
                  $('#loading').hide();
                  json.reservas.forEach(reserva => {
                     reserva.boton = crearBoton(reserva.chequeo);
                     reserva.label_asiento = crearLabel(reserva.label_asiento, reserva.cantidad_asientos);
                  });
                  return json.reservas;
               } else {
                  $('#loading').hide();
                  return [];
               }
            }
         },
         columns: [
            { data: "boton" },
            { data: "nombre" },
            { data: "label_asiento" },
            { data: "descripcionProducto" },
            { data: "tipo" },
         ]
      });

   }
   function actualizarChequeo(chequeo) {

      let form = new FormData();
      form.append("id_detalle", ID_DETALLE);
      form.append("chequeo", JSON.stringify(chequeo));
      //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
      $.ajax({
         url: URL_SERVIDOR + "DetalleTour/updateChequeo",
         method: "POST",
         mimeType: "multipart/form-data",
         data: form,
         timeout: 0,
         processData: false,
         contentType: false,
      }).done(function (response) {
         let respuestaDecodificada = JSON.parse(response);
         $('#modal-chekeo').modal('hide');
         const Toast = Swal.mixin();
         Toast.fire({
            title: 'Exito...',
            icon: 'success',
            text: "Registro Actualizado",
            showConfirmButton: true,
         });
         tabla.ajax.reload(null, false);
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
      });
   }
   function crearBoton(chequeo) {
      let isCompletyCheck = true;
      html = "";
      html += '<td>';
      html += '    <div class="btn-group">';

      chequeo.forEach(requisito => {
         //  si alguno de los elementos esta en false sera un boton griss
         if (!requisito.estado) { isCompletyCheck = false; }
      });
      if (isCompletyCheck) {
         // si esta checado completamente sera de color verde 
         html += '        <button type="button" name="" class="btn btn-success" data-toggle="modal"';
      } else {
         // si no esta checado completamente sera de color gris
         html += '        <button type="button" name="" class="btn btn-secondary" data-toggle="modal"';
      }
      html += '            data-target="">';
      html += '            <i class="fas fa-check-circle" style="color: white"></i>';
      html += '        </button>';
      html += '    </div>';
      html += '</td>';
      return html;
   }
   function crearLabel(label, cantidad) {
      if (label == 'NO_LABEL') {
         return `cantidad de asientos: ${cantidad}`;
      } else {
         return `cantidad de asientos: ${cantidad} (${label})`;
      }
   }
});