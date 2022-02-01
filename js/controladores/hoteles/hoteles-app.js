$(document).ready(function () {
    let explorer = $("#kv-explorer");
    let idHotelito;
    let tabla;

    inicializarValidaciones();
    inicializarTabla();
    $('#loadingActualizarPromociones').hide();
    //BOTON Modificar
    $(document).on('click', '.btn-group .btn-primary', function () {

        idHotelito = $(this).attr("name");

        $('#loadingActualizar').show();
        $.ajax({
            url: URL_SERVIDOR + "hotel/hotel?idhotel=" + idHotelito,
            method: "GET"
        }).done(function (response) {
            //MANDALOS LOS VALORES AL MODAL
            for (let i = 0, ien = response.hoteles.length; i < ien; i++) {

                document.getElementById("hotelito").value = response.hoteles[i].nombreHotel;
                document.getElementById("pais").value = response.hoteles[i].nombrePais;
                document.getElementById("precio").value = response.hoteles[i].precioNoche;
                document.getElementById("descripcion").value = response.hoteles[i].descripcionHotel;
                
            }

        }).fail(function (response) {

        }).always(function (xhr, opts) {
            $('#modal-editar').modal('show');
            $('#loadingActualizar').hide();
        });
    });


    //BOTON EDITAR LA FOTO
    $(document).on('click', '.btn-group .btn-warning', function () {
        $('#modal-imagenes').modal('show');
        let identificador = $(this).attr("name");
        let nombreTabla = 'hoteles';
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
                maxFileSize: 200000,
                maxFilesNum: 10,
                allowedFileExtensions: ['jpg', 'png', 'jpeg', 'jfif']

            });
        });
    });
    //Boton Eliminar
    $(document).on('click', '.btn-group .btn-danger', function (evento) {
        idHotelito = $(this).attr("name");
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
    $(document).on('click', '#btnActualizar', function (evento) {
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
                "url": URL_SERVIDOR + "hotel/hotel",
                "method": "GET",
                "dataSrc": function (json) {
                    console.log(json.hoteles);

                    if (json.hoteles) {
                        for (let i = 0, ien = json.hoteles.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button title="Editar" type="button" name="' + json.hoteles[i].idhotel + '" class="btn btn-primary" data-toggle="modal"';
                            html += '            data-target="#modal-editar">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button title="Galería" type="button" name="' + json.hoteles[i].idhotel + '" class="btn btn-warning" data-toggle="modal"';
                            html += '            data-target="#modal-imagenes">';
                            html += '            <i class="fas fa-image" style="color: white"></i>';
                            html += '        </button>';
                            html += '        <button title="Eliminar" type="button" name="' + json.hoteles[i].idhotel + '" class="btn btn-danger" data-toggle="modal"';
                            html += '            data-target="#modal-eliminar">';
                            html += '            <i class="fas fa-trash" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';
                            json.hoteles[i]["botones"] = html;

                        }
                        $('#loading').hide();
                        return json.hoteles;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "nombreHotel" },
                { data: "nombrePais" },
                { data: "precioNoche" },
                { data: "botones" },
            ]
        });

    }

    function inicializarValidaciones() {
        $('#promocionesEditar').validate({
            rules: {
                precioNoche: {
                    required: true,
                    number: true
                },
                nombreHotel: {
                    required: true,
                    number: true
                }

            },
            messages: {
                precioNoche: {
                    required: "Ingrese solo numeros",
                },
                nombreHotel: {
                    required: true,
                    minlength: 3,
                    maxlength: 2000
                },


            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-group').append(error);
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('is-invalid');

            }
        });

    }

    function actualizar() {
        $('#loadingActualizarPromociones').show();
        let data = {
            "idhotel": idHotelito,
            "precioNoche": document.getElementById("precio").value,
            "nombreHotel": document.getElementById("hotelito").value,
            "nombrePais": document.getElementById("pais").value,
            "descripcionHotel": document.getElementById("descripcion").value


        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "hotel/actualizarHotel",
            method: "PUT",
            timeout: 0,
            data: data
        }).done(function (response) {
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
        }).fail(function (response) {
            console.log(response);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN ENVIO DE HOTELES",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loadingActualizarPromociones').hide();

        });
    }

    function eliminar() {
        let data = {
            "idhotel": idHotelito
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO

        $.ajax({
            url: URL_SERVIDOR + "hotel/eliminarHotel",
            method: "DELETE",
            timeout: 0,
            data: data
        }).done(function (response) {
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
        }).fail(function (response) {

            console.log(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE promociones",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }



});