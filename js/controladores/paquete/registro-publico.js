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
    }).done(function(response) {
        guardarBitacora();
        console.log(response);
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
            restaurarContactos();
            resetMiTable();
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
    }).fail(function(response) {
        //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
        console.log(response);

        const Toast = Swal.mixin();
        Toast.fire({
            title: 'Oops...',
            icon: 'error',
            text: "ERROR EN EL ENVIO DE INFORMACIÓN",
            showConfirmButton: true,
        });

    }).always(function(xhr, opts) {
        $('#loading').hide();
    });
}

function obtenerData() {
    let form = new FormData();
    let serviciosAdicionales = [];
    let sistiosTuristicos = [];
    let promocion = [];

    //ESTO ES PARA L A GALERIA 
    let galeria = document.getElementById("fotos").files;
    for (let i = 0; i < galeria.length; i++) {
        form.append('fotos[]', galeria[i]);
    }
    tabla.rows().every(function(value, index) {
        let data = this.data();
        let title = data[0];
        let costo = data[1];
        let por_pasajero = data[3];
        let tipo = data[6];
        let id = data[7];
        if (tipo == "servicio") {
            serviciosAdicionales.push({
                "id_servicios": id,
                "costo": costo,
                "por_usuario": por_pasajero == 'si',
                "nuemo_veces": "1"
            });
        } else {
            sistiosTuristicos.push({
                "id_sitio_turistico": id,
                "title": title,
                "costo": costo,
                "por_usuario": por_pasajero == 'si',
                "backgroundColor": "#28a745",
                "borderColor": "#28a745",
                "textColor": "#fff"
            });
        }
    });
    let tipoPaquete = $("input[name='radioTipoPaquete']:checked").val();

    let salida = $("input[name='lugar_salida[]']").map(function() { return $(this).val(); }).get();
    // ELIMINAMOS CAMBOS VACIOS
    salida = salida.filter(value => value != '');

    let incluye = $("input[name='incluye[]']").map(function() { return $(this).val(); }).get();
    // ELIMINAMOS CAMBOS VACIOS
    incluye = incluye.filter(value => value != '');

    let no_incluye = $("input[name='no_incluye[]']").map(function() { return $(this).val(); }).get();
    // ELIMINAMOS CAMBOS VACIOS
    no_incluye = no_incluye.filter(value => value != '');

    let requisitos = $("input[name='requisitos[]']").map(function() { return $(this).val(); }).get();
    // ELIMINAMOS CAMBOS VACIOS
    requisitos = requisitos.filter(value => value != '');

    let pasajes = $("input[name='pasajes[]']").map(function() { return $(this).val(); }).get();
    let asientos = $("input[name='asientos[]']").map(function() { return $(this).val(); }).get();
    let titulos = $("input[name='titulos[]']").map(function() { return $(this).val(); }).get();

    for (let index = 0; index < titulos.length; index++) {
        if (titulos[index] != "" && asientos[index] != "" && pasajes[index] != "") {
            promocion.push({ 'titulo': titulos[index], 'asiento': asientos[index], "pasaje": pasajes[index] });
        }

    }
    let valor = document.getElementById("fecha_salida").value;
    let fecha = valor.split(" - ");
    let start = fecha[0]
    let end = fecha[1]

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
    form.append("cupos_disponibles", cantidadByTransporte);
    form.append("tipo", tipoPaquete);
    form.append("start", start);
    form.append("end", end);
    form.append("estado", 1);
    form.append("aprobado", 1);
    return form;

}