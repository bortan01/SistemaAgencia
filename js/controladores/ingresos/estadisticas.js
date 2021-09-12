$(document).ready(function () {
   $('#loadingEstadisticas').hide();
   inicializarCalendario();
   let end = moment()
   let start = moment().subtract(7, 'days');
   let titleInicial = `${start.format('DD/MM/YYYY')} - ${end.format('DD/MM/YYYY')}`;

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
                  text: titleInicial,
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

   $(document).on('click', '.btn', function () {
      clearButton();
      this.classList.add("active");
      switch (this.dataset.periodo) {
         case 'semana':
            let start = moment().subtract(7, 'days');
            modificarTitle(start.format('DD/MM/YYYY'), end.format('DD/MM/YYYY'));
            actualizarData(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
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
            actualizarData(start5, moment().format('YYYY-MM-DD'));
            break;
         case 'personalizado':
            fromCalendar();
            break;
         default:
            fromCalendar();
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
      actualizarData(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
   }
   function betweenMonth(cantidad) {
      let end = moment()
      let start = moment().subtract(cantidad, 'month');
      modificarTitle(start.format('DD/MM/YYYY'), end.format('DD/MM/YYYY'));
      actualizarData(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
   }
   function actualizarData(star, end) {
      console.log(star, end)
   }
});