inicializarCalendario();
inicializarValidaciones();
inicializarComboTuristico();
inicializarComboServicio();
inicializarGaleria();

let DATA_TUR;
let DATA_SERVICIO;
let contadorTabla = 0.0;
let totalGastos = 0.0;
let totalIngresos = 0.0;
let ganancias = 0.0;
let cantidad = document.getElementById("cantidad");
const htmlOtrasOpciones = $('#otras_opciones').clone();
const htmlPromociones = $('#promocione_especiales').clone();


let tabla = $('#TablaCostos').DataTable({
    "responsive": true,
    "paging": true,
    "lengthChange": false,
    "searching": false,
    "ordering": true,
    "info": true,
    "autoWidth": false,
    "pageLength": 3,

    "columnDefs": [
        { "className": "dt-center", "targets": "_all" },
        { "targets": [6], "visible": false },
        { "targets": [7], "visible": false },
        { "targets": [8], "visible": false },
    ]
});
//CUANDO HAY CAMBIOS EN EL COMBO TUR
$('#ComboTur').on('select2:select', function (e) {

    let DATA_SELECCIONADA;
    let id = e.params.data.id;
    DATA_SELECCIONADA = DATA_SITIO.find(myTur => myTur.id_sitio_turistico === id);
    ///ENCONTRO EL TUR
    if (DATA_SELECCIONADA) {
        document.getElementById("precio_sitio").value = DATA_SELECCIONADA.precio_sitio;
        document.getElementById("nameContactoTur").innerHTML = `<b>Nombre de Contacto:</b> ${DATA_SELECCIONADA.contactoN}`;
        document.getElementById("namePreviewTur").innerHTML = DATA_SELECCIONADA.contactoN;
        document.getElementById("mailContactoTur").innerHTML = DATA_SELECCIONADA.correo;
        document.getElementById("phoneContactoTur").innerHTML = DATA_SELECCIONADA.telefono;
        document.getElementById("imgContactoTur").src = DATA_SELECCIONADA.url;;;
    }
});
//CUANDO HAY CAMBIOS EN EL COMBO SERVICIO
$('#ComboServicio').on('select2:select', function (e) {
    let DATA_SELECCIONADA;
    let id = e.params.data.id;
    DATA_SELECCIONADA = DATA_SERVICIO.find(myServicio => myServicio.id_servicios === id);
    ///ENCONTRO EL TUR
    if (DATA_SELECCIONADA) {
        document.getElementById("precio_servicio").value = DATA_SELECCIONADA.costos_defecto;
        document.getElementById("nameContactoServicio").innerHTML = `<b>Nombre de Contacto:</b> ${DATA_SELECCIONADA.nombre_contacto}`;
        document.getElementById("namePreviewServicio").innerHTML = DATA_SELECCIONADA.nombre_contacto;
        document.getElementById("mailContactoServicio").innerHTML = DATA_SELECCIONADA.correo;
        document.getElementById("phoneContactoServicio").innerHTML = DATA_SELECCIONADA.telefono;
        document.getElementById("imgContactoServicio").src = DATA_SELECCIONADA.url;;;
    }
});
//AGREGANDO LA INFORMACION DE UN TUR A LA TABLA
$(document).on('click', '#btnAgregarTur', function (evento) {
    evento.preventDefault();
    //verifiacando que existe un precio
    let precio_sitio = $('#precio_sitio').val();
    if (!precio_sitio) {
        errors = { precio_sitio: "Digite precio" };
        $("#miFormulario").validate().showErrors(errors);
    } else {
        let PorPasajero = $("input[name='radioTur']:checked").val();
        let mytur = $('#ComboTur').select2('data');
        let nombre = mytur[0].text;
        let id = mytur[0].id;
        contadorTabla++;
        ///si ha seleccionado el radio Button seleccionando que el costo sera por pasajerro
        //obteneros la cantidad de pasajero, de lo contrio la cantidad sera 1
        let cantidad = PorPasajero == "si" ? $("#cantidad").val() : 1;
        let precio = $("#precio_sitio").val();
        let tipo = "tur";
        if (!ExisteFila(id, cantidad, precio, tipo, PorPasajero)) {
            agregarFila(nombre, precio, cantidad, PorPasajero, tipo, id);
        }
        modificarIngresos();
        modificarTabla();
        modificarGanancias();
    }
});
//AGREGANDO LA INFORMACION DE UN SITIO TURISTICO A LA TABLA
$(document).on('click', '#btnAgregarSitio', function (evento) {
    evento.preventDefault();
    //verifiacando que existe un precio
    let precio_servicio = $('#precio_servicio').val();
    if (!precio_servicio) {
        errors = { precio_servicio: "Digite precio" };
        $("#miFormulario").validate().showErrors(errors);
    } else {
        let PorPasajero = $("input[name='servicioCheck']:checked").val();
        let myServicio = $('#ComboServicio').select2('data');
        let nombre = myServicio[0].text;
        let id = myServicio[0].id;
        contadorTabla++;
        ///si ha seleccionado el radio Button seleccionando que el costo sera por pasajerro
        //obteneros la cantidad de pasajero, de lo contrio la cantidad sera 1
        let cantidad = PorPasajero == "si" ? $("#cantidad").val() : 1;
        let precio = $("#precio_servicio").val();
        let tipo = "servicio"
        if (!ExisteFila(id, cantidad, precio, tipo, PorPasajero)) {
            agregarFila(nombre, precio, cantidad, PorPasajero, tipo, id);
        }
        modificarIngresos();
        modificarTabla();
        modificarGanancias();
    }
});
//CUANDO HAY CAMBIOS EN EL INPUT DE NUMERO DE PASAJEROS
$(document).on('keyup mouseup', '#cantidad', function () {
    modificarTabla();
    modificarIngresos();
    modificarGanancias();
});
//CUANDO HAY CAMBIOS EN EL INPUT DE NUMERO DE COSTO DE PASAJE
$(document).on('keyup mouseup', '#CostoPasaje', function () {
    modificarIngresos();
    modificarGanancias();
});
//BOTON DE ELIMINAR
$(document).on('click', '.btn-group .btn-danger', function (evento) {
    let fila = tabla.row($(this).parents('tr')).data();
    totalGastos -= parseFloat(fila[4]);
    $('#totalGastos').text("$" + totalGastos);
    modificarGanancias();
    tabla.row($(this).parents('tr')).remove().draw();


});
//BOTON DE GUARDAR 
$(document).on('click', '#btnguardar', function (evento) {
    evento.preventDefault(); //para evitar que la pagina se recargue
    let form = $("#miFormulario");
    form.validate();
    if (form.valid()) {
        guardar();
    } else {
        const Toast = Swal.mixin();
        Toast.fire({
            title: 'Exito...',
            icon: 'error',
            text: "Complete los campos",
            showConfirmButton: true,
        });
    }
});
//BOTON + AGREGAR UN NUEVO SERVICIO 
$(document).on('click', '#newServicio', function (evento) {
    $('#modal-agregarServicio').modal('show');
});
//BOTON + AGREGAR UN NUEVO SITIO 
$(document).on('click', '#newSitio', function (evento) {
    console.log("sitosdfad f");
    $('#modal-agregarSitio').modal('show');
});
//BOTON DE AGREGAR INPUT
$(document).on('click', '.btn-add', addFormGroup);
//BOTON DE ELIMINAR INPUT
$(document).on('click', '.btn-remove', removeFormGroup);
//BOTON DE AGREGAR FILA
$(document).on('click', '.btn-addRow', addRow);
//BOTON DE ELIMINAR FILA
$(document).on('click', '.btn-removeRow', removeRow);


function inicializarComboTuristico() {
    //COMBO DE TIPOS 
    $('#ComboTur').select2();
    //COMBO DE CONTACTOS
    $.ajax({
        url: URL_SERVIDOR + "SitioTuristico/show",
        method: "GET"
    }).done(function (response) {
        //REST_Controller::HTTP_OK
        let myData = [];
        if (response.sitios) {
            DATA_SITIO = response.sitios;
            for (let index = 0; index < DATA_SITIO.length; index++) {
                myData.push({
                    id: DATA_SITIO[index].id_sitio_turistico,
                    text: `${DATA_SITIO[index].nombre_sitio} (${DATA_SITIO[index].tipo_sitio})`
                });
            }
            ///LE CARGAMOS LA DATA 
            $('#ComboTur').select2({ data: myData });
            //CARGAMOS EL COSTO AL INPUT
            document.getElementById("precio_sitio").value = DATA_SITIO[0].precio_sitio;
            document.getElementById("nameContactoTur").innerHTML = `<b>Nombre de Contacto:</b> ${DATA_SITIO[0].contactoN}`;
            document.getElementById("namePreviewTur").innerHTML = DATA_SITIO[0].contactoN;
            document.getElementById("mailContactoTur").innerHTML = DATA_SITIO[0].correo;
            document.getElementById("phoneContactoTur").innerHTML = DATA_SITIO[0].telefono;
            document.getElementById("imgContactoTur").src = DATA_SITIO[0].url
        } else {
            $('#ComboTur').select2();
        }
    }).fail(function (response) {
        $('#ComboTur').select2();

    }).always(function (xhr, opts) {
        // $('#loading').hide();
    });
}

function inicializarComboServicio() {
    //COMBO DE TIPOS 
    $('#ComboSitio').select2();
    //COMBO DE CONTACTOS
    $.ajax({
        url: URL_SERVIDOR + "ServiciosAdicionales/obtenerServicio",
        method: "GET"
    }).done(function (response) {
        //REST_Controller::HTTP_OK
        let myData = [];
        if (response.servicio) {
            DATA_SERVICIO = response.servicio;
            for (let index = 0; index < DATA_SERVICIO.length; index++) {
                if (DATA_SERVICIO[index].tipo_servicio === "Transporte") {
                    myData.push({
                        id: DATA_SERVICIO[index].id_servicios,
                        text: `${DATA_SERVICIO[index].nombre_servicio} (${DATA_SERVICIO[index].tipo_servicio}, ${DATA_SERVICIO[index].asientos_dispobibles} Asientos)`
                    });
                } else {

                    myData.push({
                        id: DATA_SERVICIO[index].id_servicios,
                        text: `${DATA_SERVICIO[index].nombre_servicio} (${DATA_SERVICIO[index].tipo_servicio})`
                    });
                }

            }
            ///LE CARGAMOS LA DATA 
            $('#ComboServicio').select2({ data: myData });
            //CARGAMOS EL COSTO AL INPUT
            document.getElementById("precio_servicio").value = DATA_SERVICIO[0].costos_defecto;
            document.getElementById("nameContactoServicio").innerHTML = `<b>Nombre de Contacto:</b> ${DATA_SERVICIO[0].nombre_contacto}`;
            document.getElementById("namePreviewServicio").innerHTML = DATA_SERVICIO[0].nombre_contacto;
            document.getElementById("mailContactoServicio").innerHTML = DATA_SERVICIO[0].correo;
            document.getElementById("phoneContactoServicio").innerHTML = DATA_SERVICIO[0].telefono;
            document.getElementById("imgContactoServicio").src = DATA_SERVICIO[0].url;

        } else {
            $('#ComboServicio').select2();
        }
    }).fail(function (response) {
        $('#ComboServicio').select2();

    }).always(function (xhr, opts) {
        $('#loading').hide();
    });
}

function agregarFila(nombre, precio, cantidad, PorPasajero, tipo, id) {
    let subTotoal = (precio * cantidad).toFixed(2);
    let html = "";
    html += '<td>';
    html += '    <div class="btn-group">';
    html += '        <button type="button" name="" class="btn btn-danger" data-toggle="modal"';
    html += '            data-target="#modal-eliminar">';
    html += '            <i class="fas fa-trash" style="color: white"></i>';
    html += '        </button>';
    html += '    </div>';
    html += '</td>';
    tabla.row.add([nombre, precio, cantidad, PorPasajero, subTotoal, html, tipo, id, contadorTabla]).draw(false);
    //PARA ORDENAR LA TABLA
    tabla.order([8, 'desc']).draw();
    subTotoal = (parseFloat(subTotoal));
    totalGastos += subTotoal
    $('#totalGastos').text("$" + totalGastos);

}

function modificarTabla() {
    totalGastos = 0;
    tabla.rows().every(function (value, index) {
        let data = this.data();
        let porPasajero = data[3];
        if (porPasajero == "si") {
            data[2] = cantidad.value; //le asignamos un nuevoo valor a la columna cantidad
            data[4] = (data[1] * data[2]).toFixed(2); // modificamos el sub total
        }
        totalGastos += parseFloat(data[4]);
        this.data(data).draw(false);
    });
    $('#totalGastos').text("$" + totalGastos);
}

function modificarIngresos() {
    totalIngresos = parseFloat($("#cantidad").val() * $("#CostoPasaje").val());
    $('#totalIngresos').text("$" + totalIngresos);
}

function modificarGanancias() {
    ganancias = parseFloat(totalIngresos - totalGastos);
    if (ganancias > 0) {
        $("#labelGanancias").removeClass("text-warning");
        $("#labelGanancias").addClass("text-success");

        $("#ganancias").removeClass("text-warning");
        $("#ganancias").addClass("text-success");
    } else {
        $("#labelGanancias").addClass("text-warning");
        $("#labelGanancias").removeClass("text-success");

        $("#ganancias").addClass("text-warning");
        $("#ganancias").removeClass("text-success");
    }
    $('#ganancias').text("$" + ganancias.toFixed(2));
}

function inicializarGaleria() {
    // ESTO ES PARA INICIALIZAR EL ELEMENTO DE SUBIDA DE FOTOS (EN ESTE CASO UNA GALERIA )
    $('#fotos').fileinput({
        theme: 'fas',
        language: 'es',
        //uploadUrl: '#',
        showUpload: false,
        //showCaption: false,
        maxFileSize: 2000,
        maxFilesNum: 10,
        allowedFileExtensions: ['jpg', 'png', 'gif'],
        required: true,
        uploadAsync: false,
        showClose: false,
    });
}



function inicializarValidaciones() {
    $('#miFormulario').validate({
        rules: {
            nombreTours: {
                required: true,
                minlength: 3,
                maxlength: 150
            },
            fecha_salida: {
                required: true,
            },
            cantidad: {
                required: true,
                digits: true,
                min: 1
            },
            CostoPasaje: {
                required: true,
                number: true,
                min: 0
            },
            precio_sitio: {
                required: true,
                number: true,
                min: 0
            },
            precio_servicio: {
                required: true,
                number: true,
                min: 0
            },
            descripcion_tur: {
                required: true,
                minlength: 5
            },
            "requisitos[]": {
                required: true,
                minlength: 5,

            },
            "no_incluye[]": {
                required: true,
                minlength: 5
            },
            "incluye[]": {
                required: true,
                minlength: 5
            },
            "lugar_salida[]": {
                required: true,
                minlength: 3
            },

        },
        messages: {
            nombreTours: {
                required: "Digite titulo",
                minlength: "Longitud debe ser mayor a 3",
                maxlength: "Longitud debe ser menor a 150"
            },
            fecha_salida: {
                required: "Es necesaria la fecha de salida",
            },
            cantidad: {
                required: "Digite el numero de pasajeros",
                digits: "Solo numeros enteros",
                min: "Debe de ser mayor a 0"
            },
            CostoPasaje: {
                required: "Digite costo del pasaje",
                number: "Solo numero",
                min: "Debe ser mayor o igual a 0"
            },
            precio_sitio: {
                required: "Digite precio",
                number: "Solo numero",
                min: "Debe ser mayor o igual a 0"
            },
            precio_servicio: {
                required: "Digite precio",
                number: "Solo numero",
                min: "Debe ser mayor o igual a 0"
            },
            descripcion_tur: {
                required: "Este campo es requierido",
                minlength: "debe de tener una longitud mayor a 4 "
            },
            "lugar_salida[]": {
                required: "Digite el luegar de salida",
                minlength: "Longitud debe ser mayor a 3",
            },
            "incluye[]": {
                required: "Este campo es requierido",
                minlength: "debe de tener una longitud mayor a 4 "
            },
            "no_incluye[]": {
                required: "Este campo es requierido",
                minlength: "debe de tener una longitud mayor a 4 "
            },

            "requisitos[]": {
                required: "Este campo es requierido",
                minlength: "debe de tener una longitud mayor a 4 "
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

function resetMiTable() {
    contadorTabla = 0;
    totalGastos = 0;
    totalIngresos = 0;
    ganancias = 0;
    tabla.clear().draw();
    $('#totalIngresos').text("$0");
    $('#ganancias').text("$0");
    $('#totalGastos').text("$0");
}

function restaurarContactos() {

    document.getElementById("precio_sitio").value = DATA_SITIO[0].precio_sitio;
    document.getElementById("nameContactoTur").innerHTML = `<b>Nombre de Contacto:</b> ${DATA_SITIO[0].contactoN}`;
    document.getElementById("namePreviewTur").innerHTML = DATA_SITIO[0].contactoN;
    document.getElementById("mailContactoTur").innerHTML = DATA_SITIO[0].correo;
    document.getElementById("phoneContactoTur").innerHTML = DATA_SITIO[0].telefono;
    document.getElementById("imgContactoTur").src = DATA_SITIO[0].url

    document.getElementById("precio_servicio").value = DATA_SERVICIO[0].costos_defecto;
    document.getElementById("nameContactoServicio").innerHTML = `<b>Nombre de Contacto:</b> ${DATA_SERVICIO[0].nombre_contacto}`;
    document.getElementById("namePreviewServicio").innerHTML = DATA_SERVICIO[0].nombre_contacto;
    document.getElementById("mailContactoServicio").innerHTML = DATA_SERVICIO[0].correo;
    document.getElementById("phoneContactoServicio").innerHTML = DATA_SERVICIO[0].telefono;
    document.getElementById("imgContactoServicio").src = DATA_SERVICIO[0].url;
}

function addFormGroup(event) {
    event.preventDefault();
    let $formGroup = $(this).closest('.form-group');
    let $formGroupClone = $formGroup.clone();

    if (!$formGroupClone.find('input').val() == "") {
        $formGroupClone.find('input').val('');
        $(this).toggleClass('btn-success btn-add btn-danger btn-remove').html('–');
        $formGroupClone.insertAfter($formGroup);
    }
};

function removeFormGroup(event) {
    event.preventDefault();
    let $formGroup = $(this).closest('.form-group');
    $formGroup.remove();
};

function addRow(event) {
    event.preventDefault();
    let $formGroup = $(this).closest('.row');
    let $formGroupClone = $formGroup.clone();

    if (!$formGroupClone.find('input').val() == "") {
        $formGroupClone.find('input').val('');
        $(this).toggleClass('btn-success btn-addRow btn-danger btn-removeRow').html('–');
        $formGroupClone.insertAfter($formGroup);
    }
};

function removeRow(event) {
    event.preventDefault();
    let $formGroup = $(this).closest('.row');
    $formGroup.remove();
};

function restOtrasOpciones() {

    $("#contenedor_opcions").empty();
    $("#contenedor_opcions").html(htmlOtrasOpciones);
}

function resetPromociones() {
    $("#contenedorPromociones").empty();
    $("#contenedorPromociones").html(htmlPromociones);
}

function ExisteFila(id, cantidad, costo, tipo, PorPasajero) {
    let encontrado = false;
    tabla.rows().every(function (value, index) {
        let data = this.data();
        if (id == data[7] && tipo == data[6]) {
            let subTotoal = (costo * cantidad).toFixed(2);
            data[2] = cantidad;
            data[3] = PorPasajero;
            data[4] = subTotoal;
            encontrado = true;
            this.data(data).draw(false);
        }
    });

    return encontrado;
}