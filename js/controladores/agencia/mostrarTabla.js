$(document).ready(function() {

    let idInfoGeneral;
    let tabla;
    inicializarMascara();

    inicializarValidaciones();
    inicializarTabla();

    //BOTON Modificar
    $(document).on('click', '.btn-group .btn-primary', function() {

        idInfoGeneral = $(this).attr("name");

        $('#loadingActualizar').show();
        $.ajax({
            url: URL_SERVIDOR + "general/general?idgeneral=" + idInfoGeneral,
            method: "GET"
        }).done(function(response) {
            //MANDALOS LOS VALORES AL MODAL
            for (let i = 0, ien = response.datos_generales.length; i < ien; i++) {

                document.getElementById("nombre_a").value = response.datos_generales[i].nombre_agencia;
                document.getElementById("direccion_a").value = response.datos_generales[i].direccion_agencia;
                document.getElementById("telefono_a").value = response.datos_generales[i].telefono_agencia;
                document.getElementById("email_a").value = response.datos_generales[i].email_agencia;

            }

        }).fail(function(response) {

        }).always(function(xhr, opts) {
            $('#modal-editar').modal('show');
            $('#loadingActualizar').hide();
        });
    });


    //BOTON PARA ACTUALIZAR
    $(document).on('click', '#btnActualizar', function(evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#miFormulario");
        form.validate();
        if (form.valid()) {
            actualizar();
        }
    });

    function inicializarTabla() {
        tabla = $("#tabla_infoAgencia").DataTable({
            "responsive": true,
            "autoWidth": false,

            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "general/general",
                "method": "GET",
                "dataSrc": function(json) {
                    console.log(json.datos_generales);

                    if (json.datos_generales) {
                        for (let i = 0, ien = json.datos_generales.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button type="button" name="' + json.datos_generales[i].idgeneral + '" class="btn btn-primary" data-toggle="modal"';
                            html += '            data-target="#modal-editar">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';
                            json.datos_generales[i]["botones"] = html;

                        }
                        $('#loading').hide();
                        return json.datos_generales;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "nombre_agencia" },
                { data: "telefono_agencia" },
                { data: "botones" },
            ]
        });

    }

    function inicializarValidaciones() {
        $('#miFormulario').validate({
            rules: {
                nombre_agencia: {
                    required: true,
                    minlength: 3,
                    maxlength: 100

                },
                direccion_agencia: {
                    required: true,
                    minlength: 3,
                    maxlength: 500
                },
                telefono_agencia: {
                    required: true,
                    minlength: 3,
                    maxlength: 14
                },
                email_agencia: {
                    required: true,
                    minlength: 3,
                    maxlength: 100
                }
            },
            messages: {
                nombre_agencia: {
                    required: "Ingrese nombre de la agencia",
                },
                direccion_agencia: {
                    required: "Ingrese la dirección de la agencia",
                },
                telefono_agencia: {
                    required: "Ingrese telefono de la agencia",
                },
                email_agencia: {
                    required: "Ingrese email de la agencia",
                },


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

    function actualizar() {
        $('#loadingActualizar').show();
        let data = {
            "idgeneral": idInfoGeneral,
            "nombre_agencia": document.getElementById("nombre_a").value,
            "direccion_agencia": document.getElementById("direccion_a").value,
            "telefono_agencia": document.getElementById("telefono_a").value,
            "email_agencia": document.getElementById("email_a").value

        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "general/actualizarGeneral",
            method: "PUT",
            timeout: 0,
            data: data
        }).done(function(response) {
            //REST_Controller::HTTP_OK
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                $('#modal-editar').modal('hide');;
                tabla.ajax.reload(null, false);
            });
        }).fail(function(response) {
            console.log(response);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN ENVIO DE INFORMACIÓN GENERAL",
                showConfirmButton: true,
            });

        }).always(function(xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }


    function inicializarMascara() {
        let telef = $('#telefono_a');
        telef.inputmask("(+123) 1234-5678");
        telef.inputmask({ "mask": "(+999) 9999-9999" });
    }

});