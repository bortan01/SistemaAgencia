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
               text: 'Chart.js Bar Chart'
            }
         }
      }

   });


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