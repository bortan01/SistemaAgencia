$(document).ready(function() {

    inicializarTabla();

    function inicializarTabla() {
        tablaBitacora = $("#tabla_bitacora").DataTable({
            responsive: true,
            autoWidth: false,
            deferRender: true,
            columns: [

                { data: "nombre" },
                { data: "fecha_bitacora" },
                { data: "hora_bitacora" },
                { data: "detalle_bitacora" },
                { data: "botones" }
            ],
            columnDefs: [
                { "className": "dt-center", "targets": "_all" },
                { targets: [4], visible: false },


            ]
        });

        $.ajax({
            type: "GET",
            url: URL_SERVIDOR + "bitacora/bitacora",
            dataType: "json",
            success: function(response) {


                for (let i = 0, ien = response.bitacora.length; i < ien; i++) {
                    //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                    html = "";
                    html += '<td>';
                    html += '    <div class="btn-group">';
                    html += '        <button type="button" name="' + +response.bitacora[i].idbitacora + '" class="btn btn-secondary" data-toggle="modal"';
                    html += '            data-target="#modal-bitacora">';
                    html += '            <i class="fas fa-eye" style="color: white"></i>';
                    html += '        </button>';
                    html += '    </div>';
                    html += '</td>';
                    response.bitacora[i]["botones"] = html;

                    let nuevoDetalle = {

                        nombre: response.bitacora[i].nombre,
                        fecha_bitacora: response.bitacora[i].fecha_bitacora,
                        hora_bitacora: response.bitacora[i].hora_bitacora,
                        detalle_bitacora: response.bitacora[i].detalle_bitacora,

                        botones: html,
                    };
                    tablaBitacora.row.add(nuevoDetalle).draw(false);
                }
                $('#loading').hide();
                return response.bitacora;


            },
            error: function(err) {}
        });
    }



});