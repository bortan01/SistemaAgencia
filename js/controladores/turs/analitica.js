const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let ID_TUR = urlParams.get('tur');
let totalIngresos = 0.0;

init();
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
function init() {
   $.ajax({
      url: URL_SERVIDOR + "TurPaquete/analitica?id_tours=" + ID_TUR,
      method: "GET"
   }).done(function (response) {
      // //CARGAMOS EL COSTO AL INPUT
      document.getElementById("titulo").innerHTML = response.nombre;
      document.getElementById("fecha").innerHTML = `${moment(response.start).format('l')} - ${moment(response.end).format('l')}`;
      totalIngresos = response.totalIngresos;
      inicializarTablaIngresos(response.reservas);
      crearTransporte(response.transporte, response.ocupados);
      inicializarTablaGastos(response.sitios, response.servicios, response.tatalPasajeros);
      $('#loading').hide();

      //ESTO ES PARA INICIALIZAR LA IMPRESION
   }).fail(function (response) {
      console.log(response);

   });
}
function inicializarTablaIngresos(reservas) {
   let tabla2 = document.getElementById('tReserva');
   reservas.forEach(reserva => {
      // AGREGAMOS LA DATA A LA TABLA QUE SE IMPRIMIRA
      let tr = document.createElement('tr');
      tr.appendChild(crearColumna(reserva.nombre));
      tr.appendChild(crearColumnaLabel(reserva.label_asiento, reserva.cantidad_asientos));
      tr.appendChild(crearColumna(reserva.descripcionProducto));
      tr.appendChild(crearColumna(reserva.formaPagoUtilizada));
      tr.appendChild(crearColumna(reserva.monto));
      tabla2.appendChild(tr);
   });
   let tr = document.createElement('tr');
   tr.appendChild(crearColumna("TOTAL"));
   tr.appendChild(crearColumna(""));
   tr.appendChild(crearColumna(""));
   tr.appendChild(crearColumna(""));
   tr.appendChild(crearColumna(`${totalIngresos}`));
   tabla2.appendChild(tr);

}
function crearColumna(info) {
   let td = document.createElement('td');
   let label = document.createElement('label');
   label.innerHTML = info;
   label.style.fontWeight = "normal";
   label.style.padding ='3px';
   td.appendChild(label);
   td.classList.add('textcenter');
   return td;
}
function crearColumnaLabel(info, cantidad) {
   let txt = '';
   if (info == 'NO_LABEL') {
      txt = `cantidad de asientos: ${cantidad}`;
   } else {
      txt = `cantidad de asientos: ${cantidad} (${info})`;
   }

   let td = document.createElement('td');
   let label = document.createElement('label');
   label.innerHTML = txt;
   label.style.fontWeight = "normal";
   label.style.padding ='3px';
   td.appendChild(label);
   td.classList.add('textcenter');
   return td;
}
function inicializarTablaGastos(sitios, servicios, tatalPasajeros) {
   let totalGastos = 0.0;
   let tabla2 = document.getElementById('tGasto');
   servicios.forEach(servicio => {
      let cantidad = (servicio.por_usuario == "0") ? 1 : tatalPasajeros;
      subTotal = cantidad * servicio.costo;
      totalGastos += subTotal;
      // LLENAMOS LA TABLA QUE SE IMPRIMIRA
      let tr = document.createElement('tr');
      tr.appendChild(crearColumna(servicio.nombre_servicio));
      tr.appendChild(crearColumna(servicio.costo));
      tr.appendChild(crearColumna(cantidad));
      tr.appendChild(crearColumna(subTotal));
      tabla2.appendChild(tr);

   });

   sitios.forEach(sitio => {
      let cantidad = (sitio.por_usuario == "0") ? 1 : tatalPasajeros;
      subTotal = cantidad * sitio.costo;
      totalGastos += subTotal;
        //PARA LLENAR LA TABLA QUE IMPRIMIREMOS
      let tr = document.createElement('tr');
      tr.appendChild(crearColumna(sitio.nombre_sitio));
      tr.appendChild(crearColumna(sitio.costo));
      tr.appendChild(crearColumna(cantidad));
      tr.appendChild(crearColumna(subTotal));
      tabla2.appendChild(tr);
   });
   $('#totalGastos').text(`$ ${totalGastos}`);
   $('#totalGanancias').text(`$ ${totalIngresos - totalGastos}`);


   // ESTO ES PRA LA TABLA QUE SE IMPRIMIRA
   let trGastos = document.createElement('tr');
   trGastos.appendChild(crearColumna("TOTAL DE GASTOS"));
   trGastos.appendChild(crearColumna(""));
   trGastos.appendChild(crearColumna(""));
   trGastos.appendChild(crearColumna(`${totalGastos}`));
   tabla2.appendChild(trGastos);

   let trGanancias = document.createElement('tr');
   trGanancias.appendChild(crearColumna("TOTAL DE GANANCIAS"));
   trGanancias.appendChild(crearColumna(""));
   trGanancias.appendChild(crearColumna(""));
   trGanancias.appendChild(crearColumna(`${totalIngresos - totalGastos}`));
   tabla2.appendChild(trGanancias);

}
function crearTransporte(transporte, ocupados) {
   if (transporte != null) {

      let derecho = transporte.asiento_derecho;
      let izquierdo = transporte.asiento_izquierdo;
      let numero_filas = transporte.filas;
      let deshabilitados = transporte.asientos_deshabilitados;

      let strFila = crearStrFila(derecho, izquierdo);

      let mapa = crearFilas(strFila, derecho, izquierdo, numero_filas, true);
      dibujarAsientos(mapa);
      bloquearAsientosOcupados(ocupados);
      bloquearAsientosInavilitados(deshabilitados);
   }
}
function crearStrFila(asientos_derecho, asientos_izquierdo) {
   let strFila = "";
   //LOS ASIENTOS DEL LADO DERECHO
   for (let index = 0; index < asientos_derecho; index++) {
      strFila += "e"
   }
   //LOS ESPACIOS QUE SE VAN A COLOCAR ENTRE ASIENTOS DERECHOS E IZQUIERDOS
   strFila += "_"
   //ASIENTOS DEL LADO IZQUIERDO
   for (let index = 0; index < asientos_izquierdo; index++) {
      strFila += "e"
   }
   return strFila;

}
function crearFilas(strFila, asientos_derecho, asientos_izquierdo, numero_filas, filaTrasera) {
   let strTrasero = "";
   let strEspacio = "";
   let asientos_traseros;
   let miMapa = [];
   for (let index = 0; index < numero_filas; index++) {
      miMapa.push(strFila);
   }
   if (filaTrasera) {
      asientos_traseros = parseInt(asientos_derecho) + parseInt(asientos_izquierdo) + 1;
      for (let index = 0; index < asientos_traseros; index++) {
         strEspacio += "_";
         strTrasero += "e";
      }
      miMapa.push(strEspacio);
      miMapa.push(strTrasero);
   }
   return miMapa;

}
function dibujarAsientos(miMapa) {
   let firstSeatLabel = 1;
   //inicializacmos el sc
   seat_charts = $('#seat-map').seatCharts({
      map: miMapa,
      seats: {
         f: {
            price: 100,
            classes: 'first-class', //your custom CSS class
            category: 'First Class'
         },
         e: {
            price: 40,
            classes: 'economy-class', //your custom CSS class
            category: 'Economy Class'
         }

      },
      naming: {
         top: false,
         left: false,
         getLabel: function (character, row, column) {
            return firstSeatLabel++;
         },
      },
      legend: {
         node: $('#legend'),
         items: [
            ['e', 'unavailable', 'Asientos no Disponibles'],
            ['e', 'ocupado', 'Asientos ya ocupados'],
            ['e', 'available', 'Asientos Disponibles'],
         ]
      },
      click: function () {
         return this.status();
      },
      focus: function () {

         if (this.status() == 'available') {
            return 'focused';
         } else {
            return this.style();
         }
      },
      blur: function () {
         return this.status();
      }
   });

}
function bloquearAsientosInavilitados(asientosBloqueados) {
   seat_charts.get(asientosBloqueados).status('unavailable');
}
function bloquearAsientosOcupados(ocupados) {
   seat_charts.get(ocupados).status('ocupado');
}