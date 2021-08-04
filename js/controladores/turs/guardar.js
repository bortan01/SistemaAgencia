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

function guardar() {
   $('#loading').show();
   let form = obtenerData();
   //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
   $.ajax({
      url: URL_SERVIDOR + "TurPaquete/save",
      method: "POST",
      mimeType: "multipart/form-data",
      data: form,
      timeout: 0,
      processData: false,
      contentType: false,
   }).done(function (response) {
      let respuestaDecodificada = JSON.parse(response);
      const Toast = Swal.mixin();
      Toast.fire({
         title: 'Exito...',
         icon: 'success',
         text: "Viaje Guardado Exitosamente",
         showConfirmButton: true,
      }).then((result) => {
         //TODO BIEN Y RECARGAMOS LA PAGINA 
         $("#miFormulario").trigger("reset");
         restOtrasOpciones();
         resetPromociones();
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
               let idViaje = respuestaDecodificada.id;
               let fechaInicioViaje = respuestaDecodificada.turPaquete.start;
               let fechaFinViaje = respuestaDecodificada.turPaquete.end;
               let titulo = respuestaDecodificada.turPaquete.nombreTours;
               window.location = `${URL_SISTEMA}vistas/tours/itinerario.php?viaje=${idViaje}&&fechaInicioViaje=${fechaInicioViaje}&&fechaFinViaje=${fechaFinViaje}&titulo=${titulo}`;
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
   let promocion = [];


   //ESTO ES PARA L A GALERIA 
   let galeria = document.getElementById("fotos").files;
   for (let i = 0; i < galeria.length; i++) {
      form.append('fotos[]', galeria[i]);
   }
   let salida = $("input[name='lugar_salida[]']").map(function () { return $(this).val(); }).get();
   let incluye = $("input[name='incluye[]']").map(function () { return $(this).val(); }).get();
   let no_incluye = $("input[name='no_incluye[]']").map(function () { return $(this).val(); }).get();
   let requisitos = $("input[name='requisitos[]']").map(function () { return $(this).val(); }).get();


   let pasajes = $("input[name='pasajes[]']").map(function () { return $(this).val(); }).get();
   let asientos = $("input[name='asientos[]']").map(function () { return $(this).val(); }).get();
   let titulos = $("input[name='titulos[]']").map(function () { return $(this).val(); }).get();
   let tipoTour = $("input[name='radioTipoTour']:checked").val();

   // AGREGAMOS LAS PROMOCIONES ESPECIALES
   for (let index = 0; index < titulos.length; index++) {
      if (titulos[index] != "" && asientos[index] != "" && pasajes[index] != "") {
         promocion.push({ 'titulo': titulos[index], 'asiento': asientos[index], "pasaje": pasajes[index] });
      }

   }
   // OBTENEMOS LAS FECHAS
   let valor = document.getElementById("fecha_salida").value;
   let fecha = valor.split(" - ");
   let start = fecha[0]
   let end = fecha[1]


   // CREAMOS EL  FORM
   form.append("nombreTours", document.getElementById("nombreTours").value);
   form.append("promociones", JSON.stringify(promocion));
   form.append("no_incluye", JSON.stringify(no_incluye));
   form.append("requisitos", JSON.stringify(requisitos));
   form.append("incluye", JSON.stringify(incluye));
   form.append("lugar_salida", JSON.stringify(salida));
   form.append("precio", document.getElementById("CostoPasaje").value);
   form.append("descripcion_tur", document.getElementById("descripcion_tur").value);
   form.append("cupos_disponibles", document.getElementById("cantidad").value);
   form.append("start", start);
   form.append("end", end);
   form.append("tipo", tipoTour);
   form.append("estado", 1);
   form.append("aprobado", 1);

   return form;

}

function restOtrasOpciones() {

   $("#contenedor_opcions").empty();
   $("#contenedor_opcions").html(htmlOtrasOpciones);
}

function resetPromociones() {
   $("#contenedorPromociones").empty();
   $("#contenedorPromociones").html(htmlPromociones);
}