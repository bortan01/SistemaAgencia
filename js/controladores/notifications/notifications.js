function obtenerNotificaciones() {

   $.ajax({
      url: URL_SERVIDOR + "Notification/show",
      method: "GET"
   }).done(function (response) {
      $("#headerNotificatinos").html(response.Allnotifications)
      $("#currentNotifications").html(`${response.Allnotifications} Notificacion(es)`)
      $("#notificationPaquete").html(`${response.cotizacionesPaquetes} Cotizacion(es) de paquete(s)`)
      $("#notificationVehiculo").html(`${response.notificationsVehiculo} Cotizacion(es) de vehículo(s)`)
      $("#notificationVuelo").html(`${response.notificationsVuelo} Cotizacion(es) de vuelo(s)`)
      $("#notificationTours").html(`${response.ultimasReservas} reserva(s) de tour(s)`)

   }).fail(function (response) {
      console.log(response);

   });

}

$(document).on('click', '#notificationPaquete', function(evento) {
   window.location = `${URL_SISTEMA}vistas/paquetes/solicitudesCotizacion.php`;
});

$(document).on('click', '#notificationVehiculo', function(evento) {
   window.location = `${URL_SISTEMA}vistas/vehiculos/mostrarCotizacionAutos.php`;
});

$(document).on('click', '#notificationVuelo', function(evento) {
   window.location = `${URL_SISTEMA}vistas/vuelos/mostrarCotizaciones.php`;
});

$(document).on('click', '#notificationTours', function(evento) {
   window.location = `${URL_SISTEMA}vistas/tours/ultimas_reservas.php`;
});

obtenerNotificaciones();


