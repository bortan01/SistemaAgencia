$(document).ready(function () {
   let tabla;
   inicializarTabla();

   //BOTON DE ANALITICAS
   $(document).on('click', '.btn-group .btn-secondary', function (evento) {
      evento.preventDefault();//para evitar que la pagina se recargue
      let fila = $(this).closest("tr");
      let data = tabla.row(fila).data();
      if (data.tipo == "Tour Internacional" || data.tipo == "Tour Nacional") {
         window.location = `analitica.php?tur=${data.id_tours}`;
      } else if (data.tipo == 'Paquete Privado') {
         window.location = `${URL_SISTEMA}vistas/paquetes/analitica_privada.php?tur=${data.id_tours}`;
      } else {
         window.location = `${URL_SISTEMA}vistas/paquetes/analitica.php?tur=${data.id_tours}`;
      }

   });
   //BOTON DE NOTIFICACION
   $(document).on('click', '.btn-group .btn-info', function (evento) {
      evento.preventDefault();//para evitar que la pagina se recargue
      let fila = $(this).closest("tr");
      let info = tabla.row(fila).data();

      $.ajax({
         url: URL_SERVIDOR + "Notification/estadoNotificacion",
         method: "PUT",
         data: { id_reserva: info.id_reserva }
      }).done(function (response) {
         //REST_Controller::HTTP_OK
         tabla.ajax.reload(null, false);
         const Toast = Swal.mixin();
         Toast.fire({
            title: 'Exito...',
            icon: 'success',
            text: "Notificación marcada como vista",
            showConfirmButton: true,
         })
      }).fail(function (response) {
         console.log(response);



      });


   });
   function inicializarTabla() {
      tabla = $("#tabla_servicios").DataTable({
         "responsive": true,
         "autoWidth": false,
         "deferRender": true,
         "order": [[4, "desc"]],
         "columnDefs": [
            { "className": "dt-center", "targets": "_all" },
            // { "targets": [5], "visible": false },
            { "targets": [4], width: "30%" },

         ],
         "ajax": {
            "url": URL_SERVIDOR + "Notification/showUltimasReservas",
            "method": "GET",
            "dataSrc": function (json) {
               //PARA CONPROVAR QUE EL SERVICIO EXISTE
               if (json) {
                  for (let i = 0, ien = json.length; i < ien; i++) {
                     //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                     acciones = "";
                     acciones += '<td>';
                     acciones += '    <div class="btn-group">';
                     acciones += '        <button title="Reporte" type="button" name=""  class="btn btn-secondary" data-toggle="modal"';
                     acciones += '            data-target="">';
                     acciones += '            <i class="fa fa-eye" style="color: white"></i>';
                     acciones += '        </button>';
                     acciones += '        <button title="Marcar como visto" type="button" name=""  class="btn btn-info" data-toggle="modal"';
                     acciones += '            data-target="">';
                     acciones += '            <i class="fas fa-check-circle" style="color: white"></i>';
                     acciones += '        </button>';
                     acciones += '    </div>';
                     acciones += '</td>';

                     // let fechaSalida = moment(json[i]["start"]);
                     // json[i]["start"]  = fechaSalida.locale('es').format('LL');
                     // json[i]["fecha"] = fechaSalida.locale('es').format('LL');

                     json[i]["acciones"] = acciones;
                     json[i]["cantidad_asientos"] = `cantidad de asientos ${json[i]["cantidad_asientos"]}`;
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
            { data: "nombre" },
            { data: "nombreTours" },
            { data: "tipo" },
            { data: "cantidad_asientos" },
            { data: "descripcionProducto" },
            { data: "monto" },
            { data: "acciones" },
         ]
      });

   }
});