inicializarValidaciones();
inicializarMascara();

$("#btnAgregar").on('click', function(e) {
    e.preventDefault();

    let myData = {
        "nombre_alianza": document.getElementById("nombreAlianza").value,
        "sitioWeb_alianza": document.getElementById("sitio").value,
        "telefonoContacto_alianza": document.getElementById("telef").value
    }

    $.ajax({
        url: URL_SERVIDOR + "alianzas/alianzas",
        method: 'POST',
        data: myData

    }).done(function(response) {

        $("#modal-alianza").modal('toggle');

        document.getElementById("registro-alianza").reset();

        const Toast = Swal.mixin();
        Toast.fire({
            title: 'Exito...',
            icon: 'success',
            text: response.mensaje,
            showConfirmButton: true,
        }).then((result) => {
            //TODO BIEN Y RECARGAMOS LA PAGINA 
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
    let telef = $('#telef');
    telef.inputmask("(+123) 1234-5678");
    telef.inputmask({ "mask": "(+999) 9999-9999" });
}

function inicializarValidaciones() {
    $('#registro-alianza').validate({
        rules: {
            nombre_alianza: {
                required: true,
                maxlength: 50
            },
            sitioWeb_alianza: {
                required: true,
                email: true
            }

           
        },
        messages: {
            nombre_alianza: {
                required: "Ingrese nombre de Alianza",
                minlength: "Logitud del nombre debe ser mayor a 3",
                maxlength: "Logitud del nombre no debe exceder a 50",
            },
            sitioWeb_alianza: {
                required: "Ingrese la url del sitio web",
                email: "Ingrese un correo valido"
            }

        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('is-invalid');

        }
    });

}