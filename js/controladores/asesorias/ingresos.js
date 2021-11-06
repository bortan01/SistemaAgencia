$(document).ready(function () {
    let contadorTabla = 0;
    let TOTAL = 0.0;
    let COMISION = 0.0;
    let TOTALCLIENTE = 0.0;
    let tabla;
   
    $(document).on('click', '#procesar', function (evento) {
            fechaInicio =document.getElementById("fechaInicio").value;
            fechaFin = document.getElementById("fechaFin").value;

        tabla = $("#tabla-ingresos").DataTable({
            "responsive": true,
            "destroy":true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "Cita/ingresos?fechaInicio="+fechaInicio+"&fechaFin="+fechaFin,
                "method": "GET",
                "dataSrc": function (json) {
                    if (json.ingresos) {
                       
                        $('#loading').hide();
                        $('#asoriasTotales').text(json.cuantos);
                        return json.ingresos;
                    } else {
                         alert('No hay datos');
                        $('#loading').hide();

                        return json.ingresos;
                    }
                }
            },
            columns: [
                { data: "nombre" },
                { data: "fecha" },
                {data: "hora" },
            ]
           
        });//fin tabla

        tabla.clear().draw();
    });
 

    function totalAsesorias() {

        let precio=0;
        let contar=0;
        let COMISION=0;
        COMISION = ((parseFloat($('#precio').val()))*(parseInt($('#asoriasTotales').html())));
        $('#totalIngresos').empty();
        $('#totalIngresos').text("$" + parseFloat(COMISION).toFixed(2));
        
    }
    

    //CAMBIOS EN EL INPUT DE PORCENTAJE
    $(document).on('keyup mouseup', '#precio', function () {
        totalAsesorias();
    });
    function resetMiTable() {
      
    }
});