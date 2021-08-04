// CUANDO LA PAGINA YA ESTA LISTA
$(document).ready(function () {


    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    let ID = urlParams.get('ac');
    let tabla;

    mostrarDatos();
    inicializarTabla();

    function mostrarDatos() {

        $.ajax({
            url: URL_SERVIDOR + 'Encomienda/encomiendaActualizar?id_encomienda=' + ID,
            method: "GET"
        }).done(function (response) {
            $.each(response.Encomiendas, function (i, index) {
                $('#cliente').val(index.nombre);
                $('#fecha').val(index.fecha);
                $('#estado').val(index.estado);
               
            });

        }).fail(function (response) {
          //  console.log(response);

        });

    }

    function inicializarTabla() {
        tabla = $("#tabla_ver").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "Detalle_envio/detalleEnvio?id_encomienda=" + ID,
                "method": "GET",
                "dataSrc": function (json) {
                    //console.log(json.preguntas);

                    if (json.detalles) {
                        $('#loading').hide();
                        return json.detalles;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "fecha" },
                { data: "hora" },
                { data: "lugar" },
                { data: "descripcion" },
            ]
        });

    }

});