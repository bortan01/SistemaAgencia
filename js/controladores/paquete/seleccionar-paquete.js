$(document).ready(function () {
   let ID_TUR;
   let ARR_TUR = [];

   inicializarViajes();
   //BOTON DE MOSTRAR CARACTERISTICAS
   $(document).on('click', '.btn-primary', function () {
      ID_TUR = $(this).attr("name");
      let data = obtenerViaje(ID_TUR);

      if (data.galeria) {
         let galeria = data.galeria;
         let imagenGrande = document.getElementById('imagenGrande');
         imagenGrande.innerHTML = '';

         galeria.forEach((foto, index) => {

            if (index == 0) {
               let imgBig = document.createElement("img");
               imgBig.className = "product-image";
               imgBig.src = foto;
               imagenGrande.appendChild(imgBig);
               let crear = $('#' + index);
               crear.empty();
               crear.append('<img src="' + foto + '" alt="">');
               crear.show();
            } else {
               let crear = $('#' + index);
               crear.empty();
               crear.append('<img src="' + foto + '" alt="">');
               crear.show();

            }
         });
         for (let i = galeria.length; i <= 10; i++) {
            //alert('aqui estoy');
            $('#' + i).hide();
         }

      }

      $('#precio').text("Asiento Normal $" + data.precio);
      $('#titulo').text(data.nombreTours);
      $('#descripcion_tur').html(data.descripcion_tur);
      let fechaSalida = moment(data.start);
      $('#fecha').text(fechaSalida.locale('es').format('LL'));
      $('#cupos').text(data.cupos_disponibles);

      $('#incluye').empty();
      data.incluye?.forEach(element => {
         $('#incluye').append(`<p>✔️ ${element}</p>`);
      });
      $('#no-incluye').empty();
      data.no_incluye?.forEach(element => {
         $('#no-incluye').append(`<p>❌ ${element}</p>`);
      });
      $('#requisito').empty();
      data.requisitos?.forEach(element => {
         $('#requisito').append(`<p>📝 ${element}</p>`);
      });
      $('#promocion').empty();
      data.promociones?.forEach(element => {
         $('#promocion').append(`<p>💺 ${element.titulo} 💲 <strong>${element.pasaje}</strong></p>`);
      });
      $('#salida').empty();
      data.lugar_salida?.forEach(element => {
         $('#salida').append(`<p>🚌 ${element}</p>`);
      });
      $('#sitios').empty();
      $('#otros').empty();
      obtenerInformacionAdicional();
   });
   $(document).on('click', '#btnReservar', function () {
      window.location = `${URL_SISTEMA}vistas/paquetes/reserva-paquete.php?tur=${ID_TUR}`;
   });
   function inicializarViajes() {
      $.ajax({
         url: URL_SERVIDOR + "TurPaquete/show?estado=1&tipo=paquete",
         method: "GET"
      }).done(function (response) {
         let contenedor = $('#contenedorAutos');
         if (response) {
            ARR_TUR = response;
            for (let index = 0; index < ARR_TUR.length; index++) {
               let html = "";
               html += '<div class="col-xs-6 col-sm-4">';
               html += '    <div class="fall-item fall-effect">';
               html += '        <img  src="' + ARR_TUR[index].foto + '" />';
               html += '        <div class="mask">';
               html += '            <h2 id="">' + ARR_TUR[index].nombreTours + '</h2>';
               html += '            <br>';
               // html += '            <div> Fecha: ' + ARR_TUR[index].start + '</div>';
               html += '            <p> Precio $' + ARR_TUR[index].precio + '</p>';
               html += '           <button type="button" name="' + ARR_TUR[index].id_tours + '" class="btn btn-primary" data-toggle="modal"';
               html += '            data-target="#modal-editar">Detalles</button>';
               html += '        </div>';
               html += '    </div>';
               html += '    <h4 class="text-center"></h4>';
               html += '</div>';
               contenedor.append(html);
            }
         }
      }).fail(function (response) {
         console.log(response);

      });
   }
   function obtenerInformacionAdicional() {
      $.ajax({
         url: `${URL_SERVIDOR}TurPaquete/showAdicional?id_tours=${ID_TUR}`,
         method: "GET"
      }).done(function (response) {
         dibujarSiiosTuristicos(response.sitiosTuristicos);
         dibujarServicios(response.serviciosAdicionales);
      }).fail(function (response) {
         console.log(response);

      });
   }
   function dibujarServicios(serviciosAdicionales) {
      serviciosAdicionales.forEach((servicio, numeroCarrucel) => {
         let allHtml = '';
         allHtml += `<div style="display: block;" class="row">`;
         allHtml += `    <h3>${servicio.nombre_servicio}</h3>`;
         allHtml += `    <hr />`;
         allHtml += `    <article>${servicio.descripcion_servicio}</article>`;
         allHtml += `</div>`;
         allHtml += `<div class="row">`;
         allHtml += `      <div class="col-sm-8 centrado">`;
         allHtml += `         <div id="carouselServiciosIndicators-${numeroCarrucel}" class="carousel slide" data-ride="carousel">`;
         allHtml += `            <ol class="carousel-indicators">`;

         servicio.galeria.forEach((foto, index) => {
            if (index == 0) {
               allHtml += `<li data-target="#carouselServiciosIndicators-${numeroCarrucel}" data-slide-to="${index}" class="active"></li>`;

            } else {
               allHtml += `<li data-target="#carouselServiciosIndicators-${numeroCarrucel}" data-slide-to="${index}"></li>`;
            }
         });
         allHtml += `</ol>`;
         allHtml += `<div class="carousel-inner">`;

         servicio.galeria.forEach((foto, index) => {
            if (index == 0) {
               allHtml += `<div class="carousel-item active ">`;
               allHtml += `   <img class="d-block w-100 "`;
               allHtml += `      src="${foto}" alt="First slide">`;
               allHtml += `</div>`;

            } else {
               allHtml += `<div class="carousel-item">`;
               allHtml += `   <img class="d-block w-100 "`;
               allHtml += `      src="${foto}" alt="Second slide">`;
               allHtml += `</div>`;
            }
         });
         allHtml += `</div>`;
         allHtml += `<a class="carousel-control-prev" href="#carouselServiciosIndicators-${numeroCarrucel}"`;
         allHtml += `            role="button" data-slide="prev">`;
         allHtml += `            <span class="carousel-control-prev-icon" aria-hidden="true"></span>`;
         allHtml += `            <span class="sr-only">Previous</span>`;
         allHtml += `         </a>`;
         allHtml += `         <a class="carousel-control-next" href="#carouselServiciosIndicators-${numeroCarrucel}"`;
         allHtml += `            role="button" data-slide="next">`;
         allHtml += `            <span class="carousel-control-next-icon" aria-hidden="true"></span>`;
         allHtml += `            <span class="sr-only">Next</span>`;
         allHtml += `         </a>`;
         allHtml += `      </div>`;
         allHtml += `   </div>`;
         allHtml += `</div>`;

         $('#otros').append(allHtml);
      });

   }
   function dibujarSiiosTuristicos(sitiosTuristicos) {
      sitiosTuristicos.forEach((sitio, numeroCarrucel) => {
         let allHtml = '';
         allHtml += `<div style="display: block;" class="row">`;
         allHtml += `    <h3>${sitio.nombre_sitio}</h3>`;
         allHtml += `    <hr />`;
         allHtml += `    <article>${sitio.descripcion_sitio}</article>`;
         allHtml += `</div>`;
         allHtml += `<div class="row">`;
         allHtml += `      <div class="col-sm-8 centrado">`;
         allHtml += `         <div id="carouselExampleIndicators-${numeroCarrucel}" class="carousel slide" data-ride="carousel">`;
         allHtml += `            <ol class="carousel-indicators">`;

         sitio.galeria.forEach((foto, index) => {
            if (index == 0) {
               allHtml += `<li data-target="#carouselExampleIndicators-${numeroCarrucel}" data-slide-to="${index}" class="active"></li>`;

            } else {
               allHtml += `<li data-target="#carouselExampleIndicators-${numeroCarrucel}" data-slide-to="${index}"></li>`;
            }
         });
         allHtml += `</ol>`;
         allHtml += `<div class="carousel-inner">`;

         sitio.galeria.forEach((foto, index) => {
            if (index == 0) {
               allHtml += `<div class="carousel-item active ">`;
               allHtml += `   <img class="d-block w-100 "`;
               allHtml += `      src="${foto}" alt="First slide">`;
               allHtml += `</div>`;

            } else {
               allHtml += `<div class="carousel-item">`;
               allHtml += `   <img class="d-block w-100 "`;
               allHtml += `      src="${foto}" alt="Second slide">`;
               allHtml += `</div>`;
            }
         });
         allHtml += `</div>`;
         allHtml += `<a class="carousel-control-prev" href="#carouselExampleIndicators-${numeroCarrucel}"`;
         allHtml += `            role="button" data-slide="prev">`;
         allHtml += `            <span class="carousel-control-prev-icon" aria-hidden="true"></span>`;
         allHtml += `            <span class="sr-only">Previous</span>`;
         allHtml += `         </a>`;
         allHtml += `         <a class="carousel-control-next" href="#carouselExampleIndicators-${numeroCarrucel}"`;
         allHtml += `            role="button" data-slide="next">`;
         allHtml += `            <span class="carousel-control-next-icon" aria-hidden="true"></span>`;
         allHtml += `            <span class="sr-only">Next</span>`;
         allHtml += `         </a>`;
         allHtml += `      </div>`;
         allHtml += `   </div>`;
         allHtml += `</div>`;

         $('#sitios').append(allHtml);
      });

   }
   function obtenerViaje(idBuscado) {
      return ARR_TUR.find((viaje) => viaje.id_tours == idBuscado);
   }
});