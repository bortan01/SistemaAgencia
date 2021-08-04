// CUANDO LA PAGINA YA ESTA LISTA
$(document).ready(function () {

    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    const ID_TUR = urlParams.get('tur');
    const costoPasaje = $('#costoPasaje');
    const Toast = Swal.mixin();
    let $cart = $('#selected-seats');
    let $counter = $('#counter');
    let $total = $('#total');
    let DATA_ASIENTOS = [];
    let ASIENTOS_SELECCIONADOS = [];
    let tablaReserva;
    let totalReserva = 0;
    let seat_charts;
    let nombre_producto;
    let requisitos = [];

    inicializarComboUsuario();
    inicialData(ID_TUR);
    inicializarTabla();

    //CUANDO HAY CAMBIOS EN EL COMBO DE ASIENTOS
    $('#comboAsiento').on('select2:select', function (e) {
        let id = e.params.data.id;
        let asiento = buscar(id);
        costoPasaje.val(asiento.pasaje);
    });
    //BOTON DE NUEVO CLIENTE
    $(document).on('click', '#btnNuevoCliente', function (evento) {
        $('#modalAgregarCliente').modal('show');
    });
    //BOTON DE GUARDAR
    $(document).on('click', '#btnguardarReserva', function (evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        //cantidad       => lo que ha puesto el usuario en el input
        //seleccionables => la cantidad de asientons que puede seleccionar por haber elegido ese tipo
        let porElegir = 0;
        ASIENTOS_SELECCIONADOS.forEach(element => {
            porElegir += parseInt(element.cantidad) * parseInt(element.seleccionables);
        });
        if (porElegir == 0) {
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: `No se ha seleccionado ningun tipo de asiento`,
                showConfirmButton: true,
            });
        } else {
            guardarReserva();
        }

    });
    //AGREGAR A LA TABLA
    $(document).on('click', '#btnAgregarAsiento', function () {
        let cantidad = $('#cantidadAsientos').val();
        if (cantidad) {
            let id = $('#comboAsiento').val();
            let asiento = buscar(id);
            if (!existeFila(asiento, cantidad)) {
                agregarFilaReservaViaje(asiento, cantidad);
            }
            modificarTotal();
        }

    });
    //BOTON DE ELIMINAR DE LA TABLA
    $(document).on('click', '.btn-group .btn-danger', function (evento) {
        let fila = $(this).closest("tr");
        let data = tablaReserva.row(fila).data();
        tablaReserva.row(fila).remove().draw();
        eliminarDeLista(data.id);
        modificarTotal();
    });

    function inicializarComboUsuario() {
        $.ajax({
            url: URL_SERVIDOR + "Usuario/obtenerUsuario?nivel=CLIENTE",
            method: "GET"
        }).done(function (response) {
            //REST_Controller::HTTP_OK

            let myData = [];
            if (response.usuarios) {
                let lista = response.usuarios;
                for (let index = 0; index < lista.length; index++) {

                    myData.push({
                        id: lista[index].id_cliente,
                        text: `${lista[index].nombre} (Dui: ${lista[index].dui})`
                    });
                }
                $('#comboUsuario').select2({ data: myData });
            } else {
                $('#comboUsuario').select2();
            }
        }).fail(function (response) {
            $('#comboUsuario').select2();

        }).always(function (xhr, opts) {
            $('#loadingReservaTur').hide();
        });

    }

    function inicialData(idTour) {
        $.ajax({
            url: `${URL_SERVIDOR}TurPaquete/showReserva?id_tours=${idTour}`,
            method: "GET"
        }).done(function (response) {
            $('#titulo').html(`Reservar Paquete (${response.nombre})`);
            nombre_producto = response.nombre;
            descripcionProducto = response.descripcion_tur;
            requisitos = response.requisitos;

            costoPasaje.val(response.precio);
            //AGREGAMOS EL COSTO BASE
            DATA_ASIENTOS.push({
                seleccionables: "1",
                id: 0,
                pasaje: response.precio,
                titulo: "Normal",
            });
            let lista = response.promociones;
            for (let index = 0; index < lista.length; index++) {
                DATA_ASIENTOS.push({
                    seleccionables: lista[index].asiento,
                    id: index + 1,
                    pasaje: lista[index].pasaje,
                    titulo: lista[index].titulo,
                });
            }
            inicialComboAsientos();

        }).fail(function (response) {
            console.log("Error");
            console.log(response);


        });
    }

    function guardarReserva() {
        $('#loadingReservaTur').hide();
        let form = getData();
        $.ajax({
            url: URL_SERVIDOR + "DetalleTour/saveByAgency",
            method: "POST",
            mimeType: "multipart/form-data",
            data: form,
            timeout: 0,
            processData: false,
            contentType: false,
        }).done(function (response) {

            guardarBitacora();

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: "Reserva Guardada Exitosamente",
                showConfirmButton: true,
            });
            reset();
        }).fail(function (response) {
            //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
            console.log(response);

            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: "ERROR EN EL ENVIO DE INFORMACIÓN",
                showConfirmButton: true,
            });

        }).always(function (xhr, opts) {
            $('#loadingReservaTur').hide();
        });



    }

    function getData() {
        let form = new FormData();
        let id_cliente = document.getElementById('comboUsuario').value;
        let chequeo = [];
        let totalPago = 0.0;
        let cantidad_asientos = 0;
        let descripcionReserva = '';

        ASIENTOS_SELECCIONADOS.forEach((element) => {
            totalPago += parseFloat(element.subTotal);
            descripcionReserva = `${descripcionReserva} ${element.cantidad} X Asiento(s) ${element.tipo}  $${element.costo} c/u, Sub Total: $${element.subTotal}\n`
            cantidad_asientos += parseInt(element.cantidad) * parseInt(element.seleccionables);
        });
        descripcionReserva = `${descripcionReserva}  Total : $${totalPago}`


        // CREAMOS EL OBJETO QUE SE OCUPARA PARA EL PRECHEQUEO
        chequeo = requisitos.map(function (requisito) {
            let temporal = {};
            temporal["estado"] = false;
            temporal["requisito"] = requisito;
            return temporal;
        });
        form.append("id_tours", ID_TUR);
        form.append("id_cliente", id_cliente);
        form.append("asientos_seleccionados", "NO_SELECCIONADO");
        form.append("label_asiento", "NO_LABEL");
        form.append("nombre_producto", nombre_producto);
        form.append("total", totalPago);
        form.append("descripcionProducto", descripcionReserva);
        form.append("cantidad_asientos", cantidad_asientos);
        form.append("chequeo", JSON.stringify(chequeo));

        return form;
    }

    function inicialComboAsientos() {
        let myData = [];
        for (let index = 0; index < DATA_ASIENTOS.length; index++) {
            myData.push({
                id: DATA_ASIENTOS[index].id,
                text: DATA_ASIENTOS[index].titulo
            });
        }
        ///LE CARGAMOS LA DATA 
        $('#comboAsiento').select2({ data: myData });
    }

    function buscar(idBuscado) {
        return DATA_ASIENTOS.find(asientos => asientos.id == idBuscado);
    }

    function inicializarTabla() {
        tablaReserva = $("#tablaAsientos").DataTable({
            responsive: true,
            autoWidth: false,
            deferRender: true,
            columns: [
                { data: "id" },
                { data: "tipo" },
                { data: "costo" },
                { data: "cantidad" },
                { data: "subTotal" },
                { data: "eliminar" },
            ],
            columnDefs: [{
                targets: [0],
                visible: false,
                searchable: false
            }]
        });

    }

    function agregarFilaReservaViaje(asiento, cantidad) {
        let subTotal = (asiento.pasaje * cantidad).toFixed(2);
        let html = "";
        html += '<td>';
        html += '    <div class="btn-group">';
        html += '        <button type="button" name="" class="btn btn-danger" data-toggle="modal"';
        html += '            data-target="#modal-eliminar">';
        html += '            <i class="fas fa-trash" style="color: white"></i>';
        html += '        </button>';
        html += '    </div>';
        html += '</td>';
        let nuevoAsiento = {
            id: asiento.id,
            tipo: asiento.titulo,
            costo: asiento.pasaje,
            cantidad: cantidad,
            subTotal: subTotal,
            eliminar: html,
            seleccionables: asiento.seleccionables
        };
        ASIENTOS_SELECCIONADOS = [...ASIENTOS_SELECCIONADOS, nuevoAsiento];
        tablaReserva.row.add(nuevoAsiento).draw(false);
        //PARA ORDENAR LA TABLA
        //tabla.order([6, 'desc']).draw();
    }

    function existeFila(asiento, cantidad) {
        let encontrado = false;
        tablaReserva.rows().every(function (value, index) {
            let data = this.data();
            if (asiento.id == data.id) {
                let subTotal = (asiento.pasaje * cantidad).toFixed(2);
                data.cantidad = cantidad;
                data.subTotal = subTotal;
                encontrado = true;
                this.data(data).draw(false);
                let asientoEncontrado = buscar(asiento.id);
                asientoEncontrado.cantidad = cantidad;
            }
        });

        return encontrado;

    }

    function modificarTotal() {
        totalReserva = 0.0;
        let porElegir = 0;
        ASIENTOS_SELECCIONADOS.forEach((element) => {
            totalReserva += parseFloat(element.subTotal);
            porElegir += parseInt(element.cantidad) * parseInt(element.seleccionables);
        });
        $('#totalPago').html('$' + (totalReserva.toFixed(2)));
        $('#asientosAReservar').html(porElegir);
    }

    function eliminarDeLista(id) {
        ASIENTOS_SELECCIONADOS = ASIENTOS_SELECCIONADOS.filter((item) => {
            return item.id !== id
        });

    }



    function recalculateTotal(sc) {
        var total = 0;

        //basically find every selected seat and sum its price
        sc.find('selected').each(function () {
            total += this.data().price;
        });

        return total;
    }

    function crearStrFila(asientos_derecho, asientos_izquierdo) {
        let strFila = "";
        //LOS ASIENTOS DEL LADO DERECHO
        for (let index = 0; index < asientos_derecho; index++) {
            strFila += "e"
        }
        //LOS ESPACIOS QUE SE VAN A COLOCAR ENTRE ASIENTOS DERECHOS E IZQUIERDOS
        strFila += "_"
        //ASIENTOS DEL LADO IZQUIERDO
        for (let index = 0; index < asientos_izquierdo; index++) {
            strFila += "e"
        }
        return strFila;

    }

    function crearFilas(strFila, asientos_derecho, asientos_izquierdo, numero_filas, filaTrasera) {
        let strTrasero = "";
        let strEspacio = "";
        let asientos_traseros;
        let miMapa = [];
        for (let index = 0; index < numero_filas; index++) {
            miMapa.push(strFila);
        }
        if (filaTrasera) {
            asientos_traseros = parseInt(asientos_derecho) + parseInt(asientos_izquierdo) + 1;
            for (let index = 0; index < asientos_traseros; index++) {
                strEspacio += "_";
                strTrasero += "e";
            }
            miMapa.push(strEspacio);
            miMapa.push(strTrasero);
        }
        return miMapa;

    }

    function bloquearAsientosInavilitados(asientosBloqueados) {
        let arreglo = asientosBloqueados.split(",");
        seat_charts.get(arreglo).status('unavailable');
    }

    function bloquearAsientosOcupados(ocupados) {
        seat_charts.get(ocupados).status('ocupado');
    }

    function reset() {
        tablaReserva.clear().draw();
        $('#totalPago').html('$0');
        $('#asientosAReservar').html('0');
        DATA_ASIENTOS = [];
        ASIENTOS_SELECCIONADOS = [];
        totalReserva = 0;
        inicialData(ID_TUR);

    }
});