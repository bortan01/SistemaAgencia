$(document).ready(function () {

  

    let contadorTabla = 0;
    let TOTAL = 0.0;
    let COMISION = 0.0;
    let TOTALCLIENTE = 0.0;
    // let cantidad = document.getElementById("cantidad");
    let tabla;

    //PARA LAS ENCOMIENDAS

    //AGREGANDO LA INFORMACION DE UN TUR A LA TABLA
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
                    //console.log(json.preguntas);

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
        COMISION = ((parseInt($('#precio').val()))*(parseInt($('#asoriasTotales').html())));
        $('#totalIngresos').empty();
        $('#totalIngresos').text("$" + parseFloat(COMISION).toFixed(2));
         /*let m1 = document.getElementById("precio");
         let m2 = document.getElementById("asoriasTotales");

         let multi = m1.value * m2.value;
        document.getElementById("totalIngresos").innerHTML=multi;*/
    }
    

    //CAMBIOS EN EL INPUT DE PORCENTAJE
    $(document).on('keyup mouseup', '#precio', function () {
        totalAsesorias();
    });

   


    function resetMiTable() {
        //contadorTabla = 0;
       // TOTAL = 0.0;
        //COMISION = 0.0;
       // TOTALCLIENTE = 0.0;
        
       // $('#total').text("$0");
      //  $('#comision').text("$0");
      //  $('#totalCliente').text("$0");
    }
});