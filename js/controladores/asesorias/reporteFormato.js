
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
      url: `${URL_SERVIDOR}Asesoria/reporteMigratorio`,
      dataType: "json",
      success: function (response) {
         crearRamas(response.preguntas);
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
function crearRamas(listapreguntas) {
   let tableReporte = document.getElementById('tReserva');
   listRamas.forEach(ramas => {
      // creamos las categorias por ramas
      let tr = document.createElement('tr');
      tr.appendChild(crearLabelRama(ramas.categoria_rama));
      tableReporte.appendChild(tr);
      let preguntasByRama = listapreguntas.filter(pregunta => pregunta.id_rama == ramas.id_rama);
      crearPreguntas(preguntasByRama, tableReporte);
   });

   function crearPreguntas(listPreguntas, tabla) {
      // se crean las preguntas
      listPreguntas.forEach(p => {
         let tr = document.createElement('tr');
         tr.appendChild(crearLabelPregunta(p.pregunta));
         tabla.appendChild(tr);
         crearRespuestas(p, tabla);
      });
   }

   function crearRespuestas(data, tabla) {
      // se valida si es una respuesta multiple
      let tipo = data.tipo;
      if (data.mas_respuestas == 'Si') {
      
            let tr = document.createElement('tr');
            tr.appendChild(crearLabelRespuesta());
            tabla.appendChild(tr);
      
      } else {
         let tr = document.createElement('tr');
         tr.appendChild(crearLabelRespuesta());
         tabla.appendChild(tr);
      }
      $('#loading').hide();
   }

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
   function crearLabelRespuesta() {
      let td = document.createElement('td');
      let label = document.createElement('label');
      label.innerHTML = ' ';
      label.style.fontWeight = "normal";
      label.style.padding = '3px';
      td.appendChild(label);
      td.classList.add('textcenter');
      return td;
   }
}

