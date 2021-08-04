
inicializarTabla();

//BOTON DE EDITAR
$(document).on('click', '.btn-group .btn-primary', function () {
   let fila = $(this).closest("tr");
   let data = tabla.row(fila).data();
   let id_cita = data.id_cita;
   window.location = `registroMigratoriaBoris.php?idCliente=${data.id_cliente}&cliente=${data.nombre}&id_cita=${id_cita}`;
});

$(document).on('click', '.btn-group .btn-secondary', function () {
   //AQUI NO SE A CUAL DIRECCIONARIAS
   let fila = $(this).closest("tr");
   let data = tabla.row(fila).data();
   let id_cita = data.id_cita;
   window.location = `editarInformacionBoris.php?idCliente=${data.id_cliente}&cliente=${data.nombre}&id_cita=${id_cita}`;
});

function inicializarTabla() {
   tabla = $("#tabla_servicios").DataTable({
      responsive: true,
      autoWidth: false,
      deferRender: true,
      columnDefs: [
         { className: "dt-center", targets: "_all" },

      ],
      ajax: {
         url: URL_SERVIDOR + "Cita/formularioMigratorioCitas",
         method: "GET",
         dataSrc: function (json) {
            //PARA CONPROVAR QUE EL SERVICIO EXISTE
            if (json.citas) {
               for (let i = 0, ien = json.citas.length; i < ien; i++) {
                  //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                  html = "";
                  html += '<td>';
                  html += '    <div class="btn-group">';
                  if(json.citas[i].asistencia=='Primera vez'){
                  html += '        <button type="button" name="' + json.citas[i].id_cliente + '" class="btn btn-primary" data-toggle="modal"';
                  html += '            data-target="">';
                  html += '            <i class="fas fa-edit" style="color: white"></i>';
                  html += '        </button>';
                  }else{
                     html += '        <button type="button" name="' + json.citas[i].id_cliente + '" class="btn btn-secondary" data-toggle="modal"';
                     html += '            data-target="">';
                     html += '            <i class="fas fa-edit" style="color: white"></i>';
                     html += '        </button>';
                  }
                  html += '    </div>';
                  html += '</td>';
                  json.citas[i]["botones"] = html;
               }
               $('#loading').hide();
               return json.citas;
            } else {
               $('#loading').hide();
               return [];
            }
         }
      },
      columns: [
         { data: "nombre" },
         { data: "botones" },

      ]
   });

}
