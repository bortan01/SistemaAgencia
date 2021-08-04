inicializarMascara();

//FUNCION CLICK
$("#btnAerolinea").on('click', function(e) {


    e.preventDefault();
    let myData = {
        "idalianza": document.getElementById("id_alianza").value,
        "nombre_aerolinea": document.getElementById("nombreAerolinea").value,
        "sitioWeb": document.getElementById("sitioW").value,
        "telefonoContacto": document.getElementById("tel").value
    }

    $.ajax({
        url: URL_SERVIDOR + "aerolinea/aerolinea",
        method: 'POST',
        data: myData

    }).done(function(response) {

        $("#modal-aerolinea").modal('toggle');
        document.getElementById("register-aerolinea").reset();

        //inicio recargar combo
        $('#idaerolinea').empty();
        let DATA_AEROLINEA;
        $.ajax({
            type: "GET",
            url: URL_SERVIDOR + "aerolinea/aerolinea",
            dataType: "json",
            success: function(data) {
                let myData = [];
                DATA_AEROLINEA = data.aerolineas;
                for (let index = 0; index < DATA_AEROLINEA.length; index++) {
                    myData.push({
                        id: DATA_AEROLINEA[index].idaerolinea,
                        text: DATA_AEROLINEA[index].nombre_aerolinea
                    });
                }
                $('#idaerolinea').select2({ data: myData });
            },
            error: function(err) {
                //si da un error ya que quede la alerta
                const Toast = Swal.mixin();
                Toast.fire({
                    title: 'Oops...',
                    icon: 'error',
                    text: 'No hay Aerolineas para mostrar',
                    showConfirmButton: true,
                });
            }
        });
        // document.getElementById("register-aerolinea").reset();
        //fin recargar combo
        const Toast = Swal.mixin();
        Toast.fire({
            title: 'Exito...',
            icon: 'success',
            text: response.mensaje,
            showConfirmButton: true,
        }).then((result) => {

            location.reload();
        });
    }).fail(function(response) {
        //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
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


});


function inicializarMascara() {
    let telef = $('#tel');
    telef.inputmask("(+123) 1234-5678");
    telef.inputmask({ "mask": "(+999) 9999-9999" });
}