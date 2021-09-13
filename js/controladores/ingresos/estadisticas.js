$(document).ready(function () {
   // variable para la grafica
   let myChart;
   let tableTours, tablePaquetes, tableEncomiendas, tableVehiculos, tableAsesorias;

   inicializarCalendario();
   inicalizarTablas();
   init();

   $(document).on('click', '.btn', function () {
      clearButton();
      this.classList.add("active");
      switch (this.dataset.periodo) {
         case 'semana':
            betweenWeek();
            break;
         case 'mes':
            betweenMonth(1);
            break;
         case 'trimestre':
            betweenMonth(3);
            break;
         case 'semestre':
            betweenMonth(6);
            break;
         case 'year':
            betweenMonth(12);
            break;
         case 'siempre':
            let start5 = '2020-01-01';
            modificarTitle(start5);
            obtenerData(start5, moment().format('YYYY-MM-DD'));
            break;
         case 'personalizado':
            fromCalendar();
            break;
         default:
            fromCalendar();
            break;
      }
   });
   //   click en el boton aplicar del calendario
   // es para poner azul el  boton personalizado
   $(document).on('click', '.applyBtn', function () {
      document.getElementById('personalizado').classList.add('active');
   });

   function init() {
      $('#loadingEstadisticas').show();
      let end = moment()
      let start = moment().subtract(7, 'days');
      let title = `${start.format('DD/MM/YYYY')} - ${end.format('DD/MM/YYYY')}`;
      let url = `${URL_SERVIDOR}Estadisticas/ingresos?start=${start.format('YYYY-MM-DD')}&end=${end.format('YYYY-MM-DD')}`;

      $.ajax({
         url: url,
         method: "GET",
      }).done(function (response) {
         inicalizarEstadistica(response, title);
         agregarDataTables(response);
      }).fail(function (response) {
         console.log(response);
      }).always(function (xhr, opts) {
         $('#loadingEstadisticas').hide();

      });
   }
   function inicalizarEstadistica(data, title) {
      let ctx = document.getElementById("myChart");
      myChart = new Chart(ctx, {
         type: 'bar',
         data: {
            labels: ['Tours', 'Paquetes', 'Encomiendas', 'Vehículos', 'Asesorias',],
            datasets: [{
               data: [
                  data.ingresosTours,
                  data.ingresosPaquetes,
                  data.ingresoEncomiendas,
                  data.ingresoVehiculos,
                  data.ingresoAsesorias,
               ],
               borderWidth: 2,
               borderRadius: 10,
               backgroundColor: [
                  // rojo
                  'rgba(255, 99, 132, 0.2)',
                  // azul
                  'rgba(54, 162, 235, 0.2)',
                  // amarillo
                  'rgba(255, 206, 86, 0.2)',
                  // purpura
                  'rgba(153, 102, 255, 0.2)',
                  // anaranjado
                  'rgba(255, 159, 64, 0.2)'
               ],
               borderColor: [
                  // rojo
                  'rgba(255, 99, 132, 1)',
                  // azul
                  'rgba(54, 162, 235, 1)',
                  // amarillo
                  'rgba(255, 206, 86, 1)',
                  // purpura
                  'rgba(153, 102, 255, 1)',
                  // anaranjado
                  'rgba(255, 159, 64, 1)'
               ],
               borderWidth: 2
            }]
         },
         options: {
            responsive: true,
            plugins: {
               legend: {
                  display: false,
                  position: 'top',
               },
               // title: {
               //    display: true,
               //    text: 'U S D'
               // }
            },
            scales: {
               x: {
                  display: true,
                  title: {
                     display: true,
                     text: title,
                     // color: '#911',
                     font: {
                        family: 'Comic Sans MS',
                        size: 25,
                        weight: 'bold',
                        lineHeight: 1.2,
                     },
                  }
               }
            },

         },
      });
   }
   function clearButton() {
      document.querySelectorAll('#contenerdorBorones button').forEach((boton) => {
         boton.classList.remove('active');
      });
      document.getElementById('personalizado').classList.remove('active');
   }
   function inicializarCalendario() {
      $('#calendario').daterangepicker({
         locale: {
            format: 'DD/MM/YYYY',
            "separator": " - ",
            "applyLabel": "Aplicar",
            "cancelLabel": "Cancelar",
            "fromLabel": "De",
            "toLabel": "A",
            "customRangeLabel": "Custom",
            "daysOfWeek": [
               "Dom",
               "Lun",
               "Mar",
               "Mie",
               "Jue",
               "Vie",
               "Sab"
            ],
            "monthNames": [
               "Enero",
               "Febrero",
               "Marzo",
               "Abril",
               "Mayo",
               "Junio",
               "Julio",
               "Agosto",
               "Septiembre",
               "Octubre",
               "Noviembre",
               "Diciembre"
            ],
            "firstDay": 0
         }
      });
   }
   function modificarTitle(star, end) {
      if (end) {
         myChart.options.scales.x.title.text = `${star} - ${end}`;

      } else {
         myChart.options.scales.x.title.text = '∞'
      }
   }
   function fromCalendar() {
      // cuando de click en el boton de l calendario
      let startDate = moment($('#calendario').data('daterangepicker').startDate);
      let endDate = moment($('#calendario').data('daterangepicker').endDate);
      modificarTitle(startDate.format('DD/MM/YYYY'), endDate.format('DD/MM/YYYY'));
      obtenerData(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
   }
   function betweenMonth(cantidad) {
      let end = moment();
      let start = moment().subtract(cantidad, 'month');
      modificarTitle(start.format('DD/MM/YYYY'), end.format('DD/MM/YYYY'));
      obtenerData(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
   }
   function betweenWeek() {
      let end = moment()
      let start = moment().subtract(7, 'days');
      modificarTitle(start.format('DD/MM/YYYY'), end.format('DD/MM/YYYY'));
      obtenerData(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));

   }
   function obtenerData(star, end) {
      $('#loadingEstadisticas').show();
      let url = `${URL_SERVIDOR}Estadisticas/ingresos?start=${star}&end=${end}`;

      $.ajax({
         url: url,
         method: "GET",
      }).done(function (response) {
         let newData = [
            response.ingresosTours,
            response.ingresosPaquetes,
            response.ingresoEncomiendas,
            response.ingresoVehiculos,
            response.ingresoAsesorias,
         ];
         myChart.data.datasets.forEach(dataset => {
            dataset.data = newData;
         });
         myChart.update();
         agregarDataTables(response);
      }).fail(function (response) {
         console.log(response);
      }).always(function (xhr, opts) {
         $('#loadingEstadisticas').hide();

      });
   }
   function inicalizarTablas() {
      tableTours = $("#tableTours").DataTable({
         responsive: true,
         autoWidth: false,
         deferRender: true,
         columns: [
            { data: "nombreUsuario" },
            { data: "nombreTours" },
            { data: "fecha_reserva" },
            { data: "formaPagoUtilizada" },
            { data: "tipo" },
            { data: "monto" },
         ]
      });
      tablePaquetes = $("#tablePaquetes").DataTable({
         responsive: true,
         autoWidth: false,
         deferRender: true,
         columns: [
            { data: "nombreUsuario" },
            { data: "nombreTours" },
            { data: "fecha_reserva" },
            { data: "formaPagoUtilizada" },
            { data: "tipo" },
            { data: "monto" },
         ]
      });
      tableEncomiendas = $("#tableEncomiendas").DataTable({
         responsive: true,
         autoWidth: false,
         deferRender: true,
         columns: [
            { data: "nombre" },
            { data: "codigo_postal_origen" },
            { data: "fecha" },
            { data: "total_cliente" },
         ]
      });
      tableVehiculos = $("#tableVehiculos").DataTable({
         responsive: true,
         autoWidth: false,
         deferRender: true,
         columns: [
            { data: "nombre" },
            { data: "modelo" },
            { data: "placa" },
            { data: "fechaDevolucion" },
            { data: "totalDevolucion" },
         ]
      });
      tableAsesorias = $("#tableAsesorias").DataTable({
         responsive: true,
         autoWidth: false,
         deferRender: true,
         columns: [
            { data: "nombre" },
            { data: "fecha" },
            { data: "hora" },
            { data: "cobros" },
         ]
      });
   }

   function agregarDataTables(data) {
      tableAsesorias.clear().draw();
      tableEncomiendas.clear().draw();
      tablePaquetes.clear().draw();
      tableTours.clear().draw();
      tableVehiculos.clear().draw();

      data.tours.forEach(tour => {
         tableTours.row.add({
            nombreUsuario: tour.nombreUsuario,
            nombreTours: tour.nombreTours,
            fecha_reserva: tour.fecha_reserva,
            formaPagoUtilizada: tour.formaPagoUtilizada,
            tipo: tour.tipo,
            monto: tour.monto,
         }).draw(false);
      });

      data.paquetes.forEach(paquete => {
         tablePaquetes.row.add({
            nombreUsuario: paquete.nombreUsuario,
            nombreTours: paquete.nombreTours,
            fecha_reserva: paquete.fecha_reserva,
            // formaPagoUtilizada: paquete.formaPagoUtilizada,
            tipo: paquete.tipo,
            monto: paquete.monto,
         }).draw(false);
      });

      data.encomiendas.forEach(encomineda => {
         tableEncomiendas.row.add({
            nombre: encomineda.nombre,
            codigo_postal_origen: encomineda.codigo_postal_origen,
            fecha: encomineda.fecha,
            total_cliente: encomineda.total_cliente,
         }).draw(false);
      });

      data.asesorias.forEach(asesoria => {
         tableAsesorias.row.add({
            nombre: asesoria.nombre,
            fecha: asesoria.fecha,
            hora: asesoria.hora,
            cobros: asesoria.cobros,
         }).draw(false);
      });

      data.vehiculos.forEach(vehiculo => {
         tableVehiculos.row.add({
            nombre: vehiculo.nombre,
            modelo: vehiculo.modelo,
            placa: vehiculo.placa,
            fechaDevolucion: vehiculo.fechaDevolucion,
            totalDevolucion: vehiculo.totalDevolucion,
         }).draw(false);
      });
   }

});