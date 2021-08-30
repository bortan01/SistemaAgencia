$(document).ready(function() {
    let explorer = $("#kv-explorer");
    let idPromocion;
    let tabla;

   inicializarValidaciones();
    inicializarTabla();
    $('#loadingActualizarPromociones').hide();
    //BOTON Modificar
    $(document).on('click', '.btn-group .btn-primary', function() {

        idPromocion = $(this).attr("name");

        $('#loadingActualizar').show();
        $.ajax({
            url: URL_SERVIDOR+"promocionVuelo/promocion?idpromocion_vuelo=" + idPromocion,
            method: "GET"
        }).done(function(response) {
            //MANDALOS LOS VALORES AL MODAL
            for (let i = 0, ien = response.promociones.length; i < ien; i++) {

                document.getElementById("promocion").value = response.promociones[i].nombre_promocion;
                document.getElementById("destino").value = response.promociones[i].pais_promocion;
                document.getElementById("salida").value = response.promociones[i].lugarSalida_promocion;
                document.getElementById("precio").value = response.promociones[i].precio_promocion;
                document.getElementById("fecha").value = response.promociones[i].fechaDisponible_promocion;
                document.getElementById("descripcion").value = response.promociones[i].descripcion_promocion;
                document.getElementById("aerolineaPromocion").value = response.promociones[i].nombre_aerolinea;
                document.getElementById("clase").value = response.promociones[i].nombre_clase;
             
            }

        }).fail(function(response) {

        }).always(function(xhr, opts) {
            $('#modal-editar').modal('show');
            $('#loadingActualizar').hide();
        });
    });

    
//BOTON EDITAR LA FOTO
$(document).on('click', '.btn-group .btn-warning', function () {
    $('#modal-imagenes').modal('show');
    let identificador = $(this).attr("name");
    let nombreTabla = 'promocion_vuelo';
    let informacionAdicional = { tipo: nombreTabla, identificador: identificador };
    let urlFotos = [];
    let infoFotos = [];

    $.ajax({
        url: URL_SERVIDOR + "Imagen/show?tipo=" + nombreTabla + "&identificador=" + identificador,
        method: "GET",

    }).done(function (response) {
        //REST_Controller::HTTP_OK
        console.log(URL_SERVIDOR + "Imagen/show?tipo=" + nombreTabla + "&identificador=" + identificador);
        response.forEach(element => {
            let informacion = {
                url: URL_SERVIDOR + "Imagen/delete",
                key: element.id_foto
            };
            infoFotos.push(informacion);
            urlFotos.push(element.foto_path);
        });
        explorer.fileinput({
            theme: 'fas',
            language: 'es',
            uploadUrl: URL_SERVIDOR + 'Imagen/save',
            uploadExtraData: informacionAdicional,
            overwriteInitial: false,
            initialPreviewAsData: true,
            initialPreview: urlFotos,
            initialPreviewConfig: infoFotos,
            required: true,
            maxFileSize: 2000,
            maxFilesNum: 10,
            allowedFileExtensions: ["jpg", "png", "gif"]

        });
    });
});
    //Boton Eliminar
    $(document).on('click', '.btn-group .btn-danger', function(evento) {
        idCotizar = $(this).attr("name");
        fila = $(this).closest("tr");

        const Toast = Swal.mixin();
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Se Eliminará este registro!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        }).then((result) => {
            console.log(result);
            if (result.value) {
                eliminar();
            }
        })
    });
    //BOTON PARA ACTUALIZAR
    $(document).on('click', '#btnActualizar', function(evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#promocionesEditar");
        form.validate();
        if (form.valid()) {
            actualizar();
        }
    });


  //CUANDO EL MODAL SE CIERRA
  $('#modal-imagenes').on('hidden.bs.modal', function (e) {
    console.log("cerrando modal")
    explorer.fileinput('destroy');
})


    function inicializarTabla() {
        tabla = $("#tabla_promociones").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "promocionVuelo/promocion",
                "method": "GET",
                "dataSrc": function(json) {
                    console.log(json.promociones);

                    if (json.promociones) {
                        for (let i = 0, ien = json.promociones.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button title="Editar" type="button" name="' + json.promociones[i].idpromocion_vuelo + '" class="btn btn-primary" data-toggle="modal"';
                            html += '            data-target="#modal-editar">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button title="Galería" type="button" name="' + json.promociones[i].idpromocion_vuelo + '" class="btn btn-warning" data-toggle="modal"';
                            html += '            data-target="#modal-imagenes">';
                            html += '            <i class="fas fa-image" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button title="Eliminar" type="button" name="' + json.promociones[i].idpromocion_vuelo + '" class="btn btn-danger" data-toggle="modal"';
                            html += '            data-target="#modal-eliminar">';
                            html += '            <i class="fas fa-trash" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';
                            json.promociones[i]["botones"] = html;

                        }
                        $('#loading').hide();
                        return json.promociones;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "nombre_promocion" },
                { data: "pais_promocion" },
                { data: "lugarSalida_promocion" },
                { data: "fechaDisponible_promocion" },
                { data: "botones" },
            ]
        });

    }

    function inicializarValidaciones() {
        $('#promocionesEditar').validate({
            rules: {
                precio_promocion: {
                    required: true,
                    number: true
                },
                lugarSalida_promocion: {
                    required: true,
                    number: true
                }

            },
            messages: {
                precio_promocion: {
                    required: "Ingrese solo numeros",
                },
                lugarSalida_promocion: {
                    required: true,
                    minlength: 3,
                    maxlength: 2000
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
        $('#loadingActualizarPromociones').show();
        let data = {
            "idpromocion_vuelo": idPromocion,
            "precio_promocion": document.getElementById("precio").value,
            "lugarSalida_promocion": document.getElementById("salida").value,
            "descripcion_promocion": document.getElementById("descripcion").value


        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "promocionVuelo/actualizarPromocion",
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
                text: "ERROR EN ENVIO DE promociones",
                showConfirmButton: true,
            });

        }).always(function(xhr, opts) {
            $('#loadingActualizarPromociones').hide();

        });
    }

    function eliminar() {
        let data = {
            "idpromocion_vuelo": idPromocion
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO

        $.ajax({
            url: URL_SERVIDOR + "promocionVuelo/eliminarPromocion",
            method: "DELETE",
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
                tabla.ajax.reload(null, false);
            });
        }).fail(function(response) {

            console.log(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE promociones",
                showConfirmButton: true,
            });

        }).always(function(xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }



});