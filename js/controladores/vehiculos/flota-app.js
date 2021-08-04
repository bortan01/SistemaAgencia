$(document).ready(function() {
    let explorer = $("#kv-explorer");
    let idVehiculo;
    let FLOTA = [];


    inicializarFlota();

    //BOTON DE MOSTRAR CARACTERISTICAS
    $(document).on('click', '.btn-primary', function() {

        idVehiculo = $(this).attr("name");
        let data = obtenerVehiculo(idVehiculo);
        console.log(data);

        $('#mode1').text(data.modelo);
        $('#marca').text(data.marca);
        $('#precio').text(data.precio_diario);
        $('#categoria').text(data.nombre_categoria);
        $('#detalles').text(data.detalles);
        $('#descripcion').text(data.descripcion);
        $('#puerta').text(data.puertas);
        $('#pasajero').text(data.pasajeros);
        $('#kilometraje').text(data.kilometraje);
        $('#combustible').text(data.tipoCombustible);
        $('#transmision').text(data.transmision);
        $('#placa').text(data.placa);
        $('#anio').text(data.anio);
        $('#opcA').text(data.opc_avanzadas);
        // let imagenGrande = $("#imagenGrande");
        // let imagenesPequenas = $("#imagenesPequenas");
        //  imagenGrande.empty();
        // imagenesPequenas.empty();
        console.log("esntrando en la funcion");
        if (data.galeria) {
            let galeria = data.galeria;
            let imagenGrande = document.getElementById('imagenGrande');
            imagenGrande.innerHTML = '';
            for (let index = 0; index < galeria.length; index++) {
                if (index == 0) {
                    let imgBig = document.createElement("img");
                    imgBig.className = "product-image";
                    imgBig.src = galeria[index];
                    imagenGrande.appendChild(imgBig);
                    let crear = $('#' + index);
                    crear.empty();
                    crear.append('<img src="' + galeria[index] + '" alt="">');
                    crear.show();
                } else {
                    let crear = $('#' + index);
                    crear.empty();
                    crear.append('<img src="' + galeria[index] + '" alt="">');
                    crear.show();

                }
            }
            for (let i = galeria.length; i <= 10; i++) {
                //alert('aqui estoy');
                $('#' + i).hide();
            }
            $('#detalles').empty();
            $('#detalles').text(data.detalles);

            $('#descripcion').empty();
            $('#descripcion').text(data.descripcion);

            $('#opcA').empty();
            data.opc_avanzadas?.forEach(element => {
                $('#opcA').append(`<p>⚙️${element}</p>`);
            });
        }

    });


    function inicializarFlota() {
        $.ajax({
            url: URL_SERVIDOR + "vehiculo/vehiculos",
            method: "GET"
        }).done(function(response) {
            let contenedor = $('#contenedorAutos');
            if (response.autos) {
                FLOTA = response.autos;
                for (let index = 0; index < FLOTA.length; index++) {
                    let html = "";
                    html += '<div class="col-xs-6 col-sm-4">';
                    html += '    <div class="fall-item fall-effect">';
                    html += '        <img  src="' + FLOTA[index].foto + '" />';
                    html += '        <div class="mask">';
                    html += '            <h2 id="">' + FLOTA[index].modelo + '</h2>';
                    html += '            <br>';
                    html += '            <div> Categoria: ' + FLOTA[index].nombre_categoria + '</div>';
                    html += '            <div> Año: ' + FLOTA[index].anio + '</div>';
                    html += '            <p> Precio Diario: $' + FLOTA[index].precio_diario + '</p>';
                    html += '           <button type="button" name="' + FLOTA[index].idvehiculo + '" class="btn btn-primary" data-toggle="modal"';
                    html += '            data-target="#modal-editar">Detalles</button>';
                    html += '        </div>';
                    html += '    </div>';
                    html += '    <h4 class="text-center"></h4>';
                    html += '</div>';

                    contenedor.append(html);
                }
            }
        }).fail(function(response) {
            console.log(response);

        });
    }

    function obtenerVehiculo(idBuscado) {
        return FLOTA.find((vehiculo) => vehiculo.idvehiculo == idBuscado);
    }



    function name(params) {
        document.getElementById("addToDo").addEventListener("keyup", function todoList() {
            var item = document.getElementById("addToDo").value;
            var text = document.createTextNode(item);
            var newItem = document.createElement("li");
            var span = document.createElement("span");
            var itag = document.createElement("i");
            itag.className = "fa fa-trash";
            span.appendChild(itag);
            newItem.appendChild(span);
            newItem.appendChild(text);

            if (event.keyCode === 13) { //keycode de tecla enter
                document.querySelector("ul").appendChild(newItem);
            }
        });
    }
    $(document).on('click', '#btnReservar', function() {
        window.location = `${URL_SISTEMA}vistas/vehiculos/reservaVehiculo.php?vehiculo=${idVehiculo}`;
    });

});