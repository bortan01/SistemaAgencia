const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let ID_CITA = urlParams.get('idCita');
let ID_CLIENTE = urlParams.get('idCliente');
let cliente = urlParams.get('cliente');
let listRamas = [];

llamarRamas();


// BOTON DE IMPRIMIR
document.getElementById("doPrint").onclick = function () {
   printElement(document.getElementById("printDiv"));
}
function printElement(elem) {
   let domClone = elem.cloneNode(true);
   let $printSection = document.createElement("div");
   $printSection.id = "printSection";
   document.body.appendChild($printSection);
   $printSection.innerHTML = "";
   $printSection.appendChild(domClone);
   window.print();
}
function inicializarTabla(preguntas) {
   let tabla2 = document.getElementById('tReserva');
   preguntas.forEach(reserva => {
      // AGREGAMOS LA DATA A LA TABLA QUE SE IMPRIMIRA
      let tr = document.createElement('tr');
      tr.appendChild(crearPregunta(reserva.nombre));
      tabla2.appendChild(tr);
   });
}
function crearPregunta(info) {
   let td = document.createElement('td');
   let label = document.createElement('label');
   label.innerHTML = info;
   label.style.fontWeight = "bold";
   label.style.padding = '3px';
   td.appendChild(label);
   td.classList.add('textcenter');
   return td;
}
function crearRespuesta(info) {
   let td = document.createElement('td');
   let label = document.createElement('label');
   label.innerHTML = info;
   label.style.fontWeight = "normal";
   label.style.padding = '3px';
   td.appendChild(label);
   td.classList.add('textcenter');
   return td;
}

////////////////////////////////////////////////////////////////////////////////////////


function llamarRamas() {
   $.ajax({
      type: "GET",
      url: URL_SERVIDOR + "Asesoria/ramita",
      dataType: "json",
      success: function (data) {
         listRamas = data.ramas;
         llamarPreguntita()

      },
      error: function (err) {
         const Toast = Swal.mixin();
         Toast.fire({
            title: 'Error',
            icon: 'error',
            text: 'No hay Ramas para mostrar',
            showConfirmButton: true,
         });
      }
   });
}

function llamarPreguntita() {
   $.ajax({
      type: "GET",
      url: `${URL_SERVIDOR}Asesoria/respuestas?id_cliente=${ID_CLIENTE}`,
      dataType: "json",
      success: function (response) {
         crearTabla(response.preguntas);
      },
      error: function (err) {
         const Toast = Swal.mixin();
         Toast.fire({
            title: 'Error',
            icon: 'error',
            text: 'No hay preguntas registradas..!',
            showConfirmButton: true,
         });
      }
   });

}
function crearTabla(listapreguntas) {
   let tableReporte = document.getElementById('tReserva');
   listRamas.forEach(ramas => {
      // creamos las categorias por ramas
      let tr = document.createElement('tr');
      tr.appendChild(crearLabelRama(ramas.categoria_rama));
      tableReporte.appendChild(tr);
      let preguntasByRama = listapreguntas.filter(pregunta => pregunta.id_rama == ramas.id_rama);
      console.log(preguntasByRama);
      // se crean las preguntas
      preguntasByRama.forEach(p => {
         let tr = document.createElement('tr');
         tr.appendChild(crearLabelPregunta(p.pregunta));
         tableReporte.appendChild(tr);
         // se valida si es una respuesta multiple
         if (p.mas_respuestas == 'Si') {
            p.respuesta.forEach(res => {
               let tr = document.createElement('tr');
               tr.appendChild(crearLabelRespuesta(res));
               tableReporte.appendChild(tr);
            });
         } else {
            let tr = document.createElement('tr');
            tr.appendChild(crearLabelRespuesta(p.respuesta));
            tableReporte.appendChild(tr);
         }
      });


   });

   function crearLabelRama(nombreRama) {
      let td = document.createElement('td');
      td.style.background = '#058167';
      let label = document.createElement('label');
      label.innerHTML = `Categoría: ${nombreRama}`;
      label.style.color = '#fff';
      label.style.fontWeight = "bold";
      label.style.padding = '3px';
      td.appendChild(label);
      td.classList.add('textcenter');
      return td;
   }
   function crearLabelPregunta(nombreRama) {
      let td = document.createElement('td');
      let label = document.createElement('label');
      label.innerHTML = nombreRama;
      label.style.fontWeight = "bold";
      label.style.padding = '3px';
      td.appendChild(label);
      td.classList.add('textcenter');
      return td;
   }
   function crearLabelRespuesta(nombreRama) {
      let td = document.createElement('td');
      let label = document.createElement('label');
      label.innerHTML = nombreRama;
      label.style.fontWeight = "normal";
      label.style.padding = '3px';
      td.appendChild(label);
      td.classList.add('textcenter');
      return td;
   }
}

