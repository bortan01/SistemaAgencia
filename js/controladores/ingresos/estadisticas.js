$(document).ready(function () {

   $('#loadingEstadisticas').hide();

   let ctx = document.getElementById("myChart");
   let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
         datasets: [{
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 2,
            borderRadius: 10,
            backgroundColor: [
               // rojo
               'rgba(255, 99, 132, 0.2)',
               // azul
               'rgba(54, 162, 235, 0.2)',
               // amarillo
               'rgba(255, 206, 86, 0.2)',
               // verde
               'rgba(75, 192, 192, 0.2)',
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
               // verde
               'rgba(75, 192, 192, 1)',
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
               display :false,
               position: 'top',
            },
            title: {
               display: true,
               text: 'U S D'
            }
         }
      },
      

   });

   const actions = [
      {
        name: 'Randomize',
        handler(chart) {
          chart.data.datasets.forEach(dataset => {
            dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
          });
          chart.update();
        }
      },
      {
        name: 'Add Dataset',
        handler(chart) {
          const data = chart.data;
          const dsColor = Utils.namedColor(chart.data.datasets.length);
          const newDataset = {
            label: 'Dataset ' + (data.datasets.length + 1),
            backgroundColor: Utils.transparentize(dsColor, 0.5),
            borderColor: dsColor,
            borderWidth: 1,
            data: Utils.numbers({count: data.labels.length, min: -100, max: 100}),
          };
          chart.data.datasets.push(newDataset);
          chart.update();
        }
      },
      {
        name: 'Add Data',
        handler(chart) {
          const data = chart.data;
          if (data.datasets.length > 0) {
            data.labels = Utils.months({count: data.labels.length + 1});
    
            for (var index = 0; index < data.datasets.length; ++index) {
              data.datasets[index].data.push(Utils.rand(-100, 100));
            }
    
            chart.update();
          }
        }
      },
      {
        name: 'Remove Dataset',
        handler(chart) {
          chart.data.datasets.pop();
          chart.update();
        }
      },
      {
        name: 'Remove Data',
        handler(chart) {
          chart.data.labels.splice(-1, 1); // remove the label first
    
          chart.data.datasets.forEach(dataset => {
            dataset.data.pop();
          });
    
          chart.update();
        }
      }
    ];

   // let articulos = [
   //    { descripcion: "aaa", stock: "222" },
   //    { descripcion: "bbb", stock: "334" },
   //    { descripcion: "rrr", stock: "634" },
   //    { descripcion: "sss", stock: "134" }
   // ];

   // const mostrar = (articulos) => {
   //    articulos.forEach((element) => {
   //       myChart.data["labels"].push(element.descripcion);
   //       myChart.data["datasets"][0].data.push(element.stock);
   //       myChart.update();
   //    });
   //    console.log(myChart.data);
   // };
   // mostrar(articulos);
});