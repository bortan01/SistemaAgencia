//$(document).ready(function() {
let DATA_SERVICIO;
let precioAuto;
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
const ID_VEHICULO = urlParams.get('vehiculo');

$.ajax({
    type: "GET",
    url: URL_SERVIDOR + "serviciosVehiculo/servicios",
    data: { id: ID_VEHICULO },
    dataType: "json",
    success: function (response) {
        let myData = [];
        DATA_SERVICIO = response.Servicios;
        for (let index = 0; index < DATA_SERVICIO.length; index++) {
            if (index == 0) {
                $('#costo').val(DATA_SERVICIO[0].precio);
            }

            myData.push({
                id: DATA_SERVICIO[index].idservicios_opc,
                text: DATA_SERVICIO[index].nombre_servicio
            });
        }
        ///LE CARGAMOS LA DATA 
        $('#comboServicio').select2({ data: myData });

        if (response.vehiculo) {
            precioAuto = response.vehiculo.precio_diario;
            $('#totalVehiculo').text('$' + precioAuto + '(1 Día)');
            $('#totalCliente').text("$" + precioAuto );
        }

    },
    error: function (err) {
        //si da un error ya que quede la alerta
        $('#comboServicio').select2({});
        const Toast = Swal.mixin();
        Toast.fire({
            title: 'Oops...',
            icon: 'error',
            text: 'No hay Servicios Opcionales para mostrar',
            showConfirmButton: true,
        });
    }
});


$('#comboServicio').on('select2:select', function (e) {
    let id = e.params.data.id;
    let seleccion = DATA_SERVICIO.find(servicio => servicio.idservicios_opc === id);
    ///ENCONTRO EL SERVICIO
    if (seleccion) {
        $('#costo').val(seleccion.precio);
    }
});

//});