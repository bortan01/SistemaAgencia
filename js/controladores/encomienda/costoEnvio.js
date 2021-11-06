$(document).ready(function () {
    let explorer = $("#kv-explorer");
    let idSeleccionado;
    let tabla;
    inicializarValidaciones();
    inicializarTabla();
    inicializarComboTipo();

    //BOTON DE EDITAR
    $(document).on('click', '.btn-group .btn-primary', function () {
        $('#loadingActualizar').hide();
        let fila = $(this).closest("tr");
        let data = tabla.row(fila).data();
        idSeleccionado = data.id_municipio;


        document.getElementById("nombre").value = `${data.nombre_municipio} (${data.departamento})`;
        document.getElementById("costo_agregado").value = data.costo_agregado;
        $('#ComboTipo').trigger('change');
        $('#contacto_servicio').trigger('change');
        $('#modal-editar').modal('show');
    });
    //BOTON EDITAR LA FOTO
    $(document).on('click', '.btn-group .btn-warning', function () {
        $('#modal-imagenes').modal('show');
        let identificador = $(this).attr("name");
        let nombreTabla = 'sitio_turistico';
        let informacionAdicional = { tipo: nombreTabla, identificador: identificador };
        let urlFotos = [];
        let infoFotos = [];
        $.ajax({
            url: URL_SERVIDOR + "Imagen/show?tipo=" + nombreTabla + "&identificador=" + identificador,
            method: "GET",

        }).done(function (response) {
            //REST_Controller::HTTP_OK
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
                // POR CADA FOTO SE LLAMARA A ESTE SERVICIO
                uploadUrl: URL_SERVIDOR + 'Imagen/save',
                uploadExtraData: informacionAdicional,
                overwriteInitial: false,
                initialPreviewAsData: true,
                // initialPreviewFileType : 'pdf',
                allowedFileExtensions: ["jpg", "png", "gif", "pdf"],
                initialPreview: urlFotos,
                initialPreviewConfig: infoFotos,
                required: true,
                maxFileSize: 10000,
                maxFilesNum: 10,

            });
        });
    });
    //BOTON PARA ELIMINAR
    $(document).on('click', '.btn-group .btn-danger', function (evento) {
        idSeleccionado = $(this).attr("name");


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
            if (result.value) {
                eliminar();
            }
        });
    });
    //BOTON PARA ACTUALIZAR
    $(document).on('click', '#btnActualizar', function (evento) {
        evento.preventDefault();//para evitar que la pagina se recargue
        let form = $("#formularioEditar");
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
        tabla = $("#tabla_servicios").DataTable({
            "responsive": true,
            "autoWidth": false,
            "deferRender": true,
            "ajax": {
                "url": URL_SERVIDOR + "Encomienda/municipioEnvio",
                "method": "GET",
                "dataSrc": function (json) {
                    //PARA CONPROVAR QUE EL SERVICIO EXISTE
                    if (json.municipio_envio) {
                        for (let i = 0, ien = json.municipio_envio.length; i < ien; i++) {
                            //CREAMOS UNA NUEVA PROPIEDAD LLAMADA BOTONES
                            let html = "";
                            html += '<td>';
                            html += '    <div class="btn-group">';
                            html += '        <button title="Editar" type="button" name="" class="btn btn-primary" data-toggle="modal"';
                            html += '            data-target="">';
                            html += '            <i class="fas fa-edit" style="color: white"></i>';
                            html += '        </button>';
                            html += '    </div>';
                            html += '</td>';
                            json.municipio_envio[i]["botones"] = html;
                        }
                        $('#loading').hide();
                        return json.municipio_envio;
                    } else {
                        $('#loading').hide();
                        return [];
                    }
                }
            },
            columns: [
                { data: "departamento" },
                { data: "nombre_municipio" },
                { data: "costo_agregado" },
                { data: "botones" },

            ]
        });

    }
    function inicializarValidaciones() {
        $('#formularioEditar').validate({
            rules: {
                costo_agregado: {
                    required: true,
                    number: true,
                    min: 0
                }
            },
            messages: {
                costo_agregado: {
                    required: "Ingrese un número",
                    number: "Ingrese un número",
                    min: "Debe de ser mayor que 0"
                }
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
        $('#loadingActualizar').show();
        let data = {
            "id_municipio": idSeleccionado,
            "costo_agregado": document.getElementById("costo_agregado").value,
        };
        
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO
        $.ajax({
            url: URL_SERVIDOR + "Encomienda/municipioEnvio",
            method: "PUT",
            timeout: 0,
            data: data
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            $('#modal-editar').modal('hide');;
            tabla.ajax.reload(null, false);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            });
        }).fail(function (response) {
            console.log(response);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
        });
    }
    function eliminar() {
        let data = {
            "id_sitio_turistico": idSeleccionado
        };
        ///OCUPAR ESTA CONFIGURACION CUANDO SOLO SEA TEXTO

        $.ajax({
            url: URL_SERVIDOR + "SitioTuristico/elimination",
            method: "DELETE",
            timeout: 0,
            data: data
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            tabla.ajax.reload(null, false);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            });
        }).fail(function (response) {

            console.log(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE INFORMACION",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loadingActualizar').hide();
        });
    }
    function inicializarComboTipo() {
        $.ajax({
            url: URL_SERVIDOR + "TipoSitio/show",
            method: "GET"
        }).done(function (response) {
            //REST_Controller::HTTP_OK
            let myData = [];
            if (response.tipo) {
                let lista = response.tipo;
                for (let index = 0; index < lista.length; index++) {
                    myData.push({
                        id: lista[index].id_tipo_sitio,
                        text: lista[index].tipo_sitio
                    });
                }
                $('#ComboTipo').select2(
                    { data: myData }
                );
            } else {
                $('#ComboTipo').select2();
            }
        }).fail(function (response) {
            $('#ComboTipo').select2();

        }).always(function (xhr, opts) {
            $('#loading').hide();
        });

    }

});