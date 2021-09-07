$('#loadingEstadisticas').hide();

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
   type: "bar",
   data: {
      datasets: [
         {
            label: "Stock de Productos",
            backgroundColor: [
               "#6bf1ab",
               "#63d69f",
               "#438c6c",
               "#42A5F5",
               "#509c7f",
               "#1f794e",
               "#34444c",
               "#90CAF9",
               "#64B5F6",
               "#2196F3",
               "#0D47A1",
            ],
            borderColor: ["black"],
            borderWidth: 1,
         },
      ],
   },
   options: {
      scales: {
         y: {
            beginAtZero: true,
         },
      },
   },
});


let articulos = [
   { descripcion: "aaa", stock: "222" },
   { descripcion: "bbb", stock: "334" },
   { descripcion: "rrr", stock: "634" },
   { descripcion: "sss", stock: "134" }
];

const mostrar = (articulos) => {
   articulos.forEach((element) => {
      myChart.data["labels"].push(element.descripcion);
      myChart.data["datasets"][0].data.push(element.stock);
      myChart.update();
   });
   console.log(myChart.data);
};
mostrar(articulos);
