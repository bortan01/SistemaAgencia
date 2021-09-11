$(document).ready(function () {
   $('#loadingEstadisticas').hide();
   inicializarCalendario();
   let ctx = document.getElementById("myChart");
   let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
         labels: ['Red', 'Blue', 'Yellow', 'Purple', 'Orange'],
         datasets: [{
            data: [12, 19, 3, 5, 2,],
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
            title: {
               display: true,
               text: 'U S D'
            }
         }
      },


   });

   $(document).on('click', '.btn', function () {
      clearButton();
      this.classList.add("active");
      let end = moment()

      switch (this.dataset.periodo) {
         case 'semana':
            let start = moment().subtract(7, 'days');
            modificarTitle(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
            break;
         case 'mes':
            let start1 = moment().subtract(1, 'month');
            modificarTitle(start1.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
            break;
         case 'trimestre':
            let start2 = moment().subtract(3, 'month');
            modificarTitle(start2.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
            break;
         case 'semestre':
            let start3 = moment().subtract(6, 'month');
            modificarTitle(start3.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
            break;
         case 'year':
            let start4 = moment().subtract(1, 'year');
            modificarTitle(start4.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
            break;
         case 'siempre':
            let start5 = '2020-01-01';
            modificarTitle(start5);
            break;
         default:
            break;
      }

      let value = [
         Math.floor(Math.random() * 20) + 1,
         Math.floor(Math.random() * 20) + 1,
         Math.floor(Math.random() * 20) + 1,
         Math.floor(Math.random() * 20) + 1,
         Math.floor(Math.random() * 20) + 1,
         Math.floor(Math.random() * 20) + 1
      ];


      myChart.data.datasets.forEach(dataset => {
         dataset.data = value;
      });
      myChart.update();
   });

   //   click en el boton aplicar del calendario
   // es para poner azul el  boton personalizado
   $(document).on('click', '.applyBtn', function () {
      document.getElementById('personalizado').classList.add('active');
   });
   function clearButton() {
      document.querySelectorAll('#contenerdorBorones button').forEach((boton) => {
         boton.classList.remove('active');
      });
      document.getElementById('personalizado').classList.remove('active');
   }
   function inicializarCalendario() {
      $('#fecha_salida').daterangepicker({
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

      myChart.options.plugins.title = {
         display: true,
         text: `${star} / ${end}`,
         fullSize: true
      };
    
   }
});