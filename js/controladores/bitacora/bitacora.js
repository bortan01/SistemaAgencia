let id = localStorage.getItem('id_clienteA');
let detallito = document.getElementById('detalle').innerHTML;

let fecha = new Date();

let mes = fecha.getMonth() + 1; //obteniendo mes
let dia = fecha.getDate(); //obteniendo dia
let ano = fecha.getFullYear(); //obteniendo año

let hora = fecha.getHours(); //obteniendo hora
let minutos = fecha.getMinutes(); //obteniendo minuto
let segundos = fecha.getSeconds(); //obteniendo segundos

if (dia < 10)
    dia = '0' + dia; //agrega cero si el menor de 10
if (mes < 10)
    mes = '0' + mes //agrega cero si el menor de 10

let fechaCompleta = ano + "-" + mes + "-" + dia;
let horaCompleta = hora + ":" + minutos + ":" + segundos;


function guardarBitacora() {

    let form = new FormData();


    form.append("idusuario", id);
    form.append("fecha_bitacora", fechaCompleta);
    form.append("hora_bitacora", horaCompleta);
    form.append("detalle_bitacora", detallito);


    //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
    $.ajax({
        url: URL_SERVIDOR + "Bitacora/insertarBitacora",
        method: "POST",
        mimeType: "multipart/form-data",
        data: form,
        timeout: 0,
        processData: false,
        contentType: false,
    }).done(function(response) {


    }).fail(function(response) {
        //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
        console.log(response);
        let respuestaDecodificada = JSON.parse(response.responseText);
        let listaErrores = "";

        if (respuestaDecodificada.errores) {
            ///ARREGLO DE ERRORES 
            let erroresEnvioDatos = respuestaDecodificada.errores;
            for (mensaje in erroresEnvioDatos) {
                listaErrores += erroresEnvioDatos[mensaje] + "\n";
                //toastr.error(erroresEnvioDatos[mensaje]);
            };
        } else {
            listaErrores = respuestaDecodificada.mensaje
        }
        const Toast = Swal.mixin();
        Toast.fire({
            title: 'Oops...',
            icon: 'error',
            text: listaErrores,
            showConfirmButton: true,
        });

    })
}