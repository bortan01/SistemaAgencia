const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let ID_TUR = urlParams.get('tur');

let fechasalida;
const $grupoLugar = $("[name='grupo_lugar']").clone();
const $grupo_incluye = $("[name='grupo_incluye']").clone();
const $grupo_noIncluye = $("[name='grupo_noIncluye']").clone();
const $grupo_requisitos = $("[name='grupo_requisitos']").clone();
const $grupo_promociones = $('#promocione_especiales').clone();
setDatos();

function setDatos() {
   $.ajax({
      url: URL_SERVIDOR + "TurPaquete/showEdit?id_tours=" + ID_TUR,
      method: "GET"
   }).done(function (response) {
      // //CARGAMOS EL COSTO AL INPUT
      console.log(response);
      document.getElementById("nombreTours").value = response.nombre;
      document.getElementById("descripcion_tur").value = response.descripcion_tur;
      document.getElementById("CostoPasaje").value = response.precio;
      document.getElementById("cantidad").value = response.cupos;
      inicializarCalendario(response.start, response.end);


      AgregarItems(response.lugar_salidas, $('#labelLugar'), $("[name='grupo_lugar']"), $grupoLugar);
      AgregarItems(response.incluye, $('#labelIncluye'), $("[name='grupo_incluye']"), $grupo_incluye);
      AgregarItems(response.no_incluye, $('#labelNoIncluye'), $("[name='grupo_noIncluye']"), $grupo_noIncluye);
      AgregarItems(response.requisitos, $('#labelRequisito'), $("[name='grupo_requisitos']"), $grupo_requisitos);
      AgregarItemPromociones(response.promociones, $('#labelPromociones'), $('#promocione_especiales'), $grupo_promociones);
      AgregarFilaServicio(response.servicios, response.cupos);
      AgregarFilaSitios(response.turs, response.cupos);

   }).fail(function (response) {
      console.log(response);

   });
}
function AgregarItems(arreglo, label, $original, $grupo) {
   for (let index = 0; index < arreglo.length; index++) {
      if (index == 0) {
         $original.find('input').val(arreglo[index]);
         //verificamos si no hay mas elementos 
      } else {
         let $copia = $grupo.clone();
         $copia.find('button').toggleClass('btn-success btn-add btn-danger btn-remove').html('–');
         $copia.find('input').val(arreglo[index]);
         $copia.insertAfter(label);
      }
   }
}
function AgregarItemPromociones(arreglo, label, $original, $grupo) {
   for (let index = 0; index < arreglo.length; index++) {

      if (index == 0) {
         $original.find('[name ="titulos[]"]').val(arreglo[index].titulo);
         $original.find('[name ="asientos[]"]').val(arreglo[index].asiento);
         $original.find('[name ="pasajes[]"]').val(arreglo[index].pasaje);
      } else {

         let $copia = $grupo.clone();
         $copia.find('button').toggleClass('btn-success btn-addRow btn-danger btn-removeRow').html('–');
         $copia.find('[name ="titulos[]"]').val(arreglo[index].titulo);
         $copia.find('[name ="asientos[]"]').val(arreglo[index].asiento);
         $copia.find('[name ="pasajes[]"]').val(arreglo[index].pasaje);
         $copia.insertAfter(label);
      }

   }
}
function AgregarFilaServicio(arreglo, cantidad) {
   arreglo.forEach(element => {
      let porPasajero = 'si';
      if (element.por_usuario == '0') {
         porPasajero = 'no';
         cantidad = 1;
      }
      agregarFila(element.nombre_servicio, element.costo, cantidad, porPasajero, 'servicio', element.id_servicios);

   });
   modificarIngresos();
   modificarGanancias();
}
function AgregarFilaSitios(arreglo, cantidad) {
   arreglo.forEach(element => {
      let porPasajero = 'si';
      if (element.por_usuario == '0') {
         porPasajero = 'no';
         cantidad = 1;
      }
      agregarFila(element.nombre_sitio, element.costo, cantidad, porPasajero, 'tur', element.id_sitio_turistico);

   });
   modificarIngresos();
   modificarGanancias();
}




function inicializarCalendario(start, end) {
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
      },
      startDate: moment(start),
      endDate: moment(end)
   });

}
//EN REALIDAD ES EL ACTUALIZAR
function guardar() {
   $('#loading').show();
   let form = obtenerData();

   //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
   $.ajax({
      url: URL_SERVIDOR + "TurPaquete/update",
      method: "POST",
      mimeType: "multipart/form-data",
      data: form,
      timeout: 0,
      processData: false,
      contentType: false,
   }).done(function (response) {
      console.log(response);
      let respuestaDecodificada = JSON.parse(response);
      const Toast = Swal.mixin();
      Toast.fire({
         title: 'Exito...',
         icon: 'success',
         text: "Viaje Actualizado Exitosamente",
         showConfirmButton: true,
      }).then((result) => {
         //TODO BIEN Y RECARGAMOS LA PAGINA              
         Toast.fire({
            title: '¿Desea Editar el itinerario ahora?',
            text: "Puedes Editarlo más tarde si quieres",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Quiero editarlo ahora!',
            cancelButtonText: "No, en otro momento",

         }).then((result) => {
            if (result.value) {
               window.location = `${URL_SISTEMA}vistas/tours/itinerario.php?tur=${respuestaDecodificada.viaje.id_tours}`;
            }
         });

      });
   }).fail(function (response) {
      //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
      console.log(response);

      const Toast = Swal.mixin();
      Toast.fire({
         title: 'Oops...',
         icon: 'error',
         text: "ERROR EN EL ENVIO DE INFORMACIÓN",
         showConfirmButton: true,
      });

   }).always(function (xhr, opts) {
      $('#loading').hide();
   });
}

function obtenerData() {
   let form = new FormData();
   let serviciosAdicionales = [];
   let sistiosTuristicos = [];
   let promocion = [];

   tabla.rows().every(function (value, index) {
      let data = this.data();
      let title = data[0];
      let costo = data[1];
      let tipo = data[6];
      let id = data[7];
      if (tipo == "servicio") {
         serviciosAdicionales.push({
            "id_servicios": id,
            "costo": costo,
            "por_usuario": true,
            "nuemo_veces": "1"
         });
      } else {
         sistiosTuristicos.push({
            "id_sitio_turistico": id,
            "title": title,
            "costo": costo,
            "por_usuario": true,
            "backgroundColor": "#28a745",
            "borderColor": "#28a745",
            "textColor": "#fff"
         });
      }
   });

   let salida = $("input[name='lugar_salida[]']").map(function () { return $(this).val(); }).get();
   let incluye = $("input[name='incluye[]']").map(function () { return $(this).val(); }).get();
   let no_incluye = $("input[name='no_incluye[]']").map(function () { return $(this).val(); }).get();
   let requisitos = $("input[name='requisitos[]']").map(function () { return $(this).val(); }).get();

   let pasajes = $("input[name='pasajes[]']").map(function () { return $(this).val(); }).get();
   let asientos = $("input[name='asientos[]']").map(function () { return $(this).val(); }).get();
   let titulos = $("input[name='titulos[]']").map(function () { return $(this).val(); }).get();

   for (let index = 0; index < titulos.length; index++) {
      if (titulos[index] != "" && asientos[index] != "" && pasajes[index] != "") {
         promocion.push({ 'titulo': titulos[index], 'asiento': asientos[index], "pasaje": pasajes[index] });
      }

   }
   let valor = document.getElementById("fecha_salida").value;
   let fecha = valor.split(" - ");
   let start = fecha[0]
   let end = fecha[1]

   form.append("id_tours", ID_TUR);
   form.append("sitios", JSON.stringify(sistiosTuristicos));
   form.append("servicios", JSON.stringify(serviciosAdicionales));
   form.append("promociones", JSON.stringify(promocion));
   form.append("no_incluye", JSON.stringify(no_incluye));
   form.append("requisitos", JSON.stringify(requisitos));
   form.append("incluye", JSON.stringify(incluye));
   form.append("lugar_salida", JSON.stringify(salida));
   form.append("nombreTours", document.getElementById("nombreTours").value);
   form.append("precio", document.getElementById("CostoPasaje").value);
   form.append("descripcion_tur", document.getElementById("descripcion_tur").value);
   form.append("cupos_disponibles", document.getElementById("cantidad").value);
   form.append("start", start);
   form.append("end", end);
   form.append("estado", 1);
   form.append("aprobado", 1);
   form.append("tipo", "TUR");

   return form;

}