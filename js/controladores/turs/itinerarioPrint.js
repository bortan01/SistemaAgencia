const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
const ID = urlParams.get("id");
const TITULO = urlParams.get("titulo");
cargarData();

// CARGAMOS LA DATA 
function cargarData() {
    $.ajax({
        url: URL_SERVIDOR+"Itinerario/itinerarioForApp?id_tours=" + ID,
        method: "GET",
    }).done(function (response) {
        //REST_Controller::HTTP_OK
        $('#loading').hide();
        document.getElementById('nombre').innerHTML = TITULO
        let tabla = document.getElementById('detalle_productos');
        response.evento.forEach(event => {
            let tr = crearFila(event);
            tabla.appendChild(tr);
        });
    }).fail(function (response) {
        $('#loading').hide();
    });
}

function crearFila(event) {
    let tr = document.createElement('tr');
    tr.appendChild(crearColumna(event.title));
    tr.appendChild(crearColumnaFecha(event.start));
    tr.appendChild(crearColumnaFecha(event.end));
    return tr;
}
function crearColumna(info) {
    let td = document.createElement('td');
    let label = document.createElement('label');
    label.innerHTML = info;
    label.style.fontWeight = "normal";
    td.appendChild(label);
    td.classList.add('textcenter');
    return td;
}
function crearColumnaFecha(info) {

    let td = document.createElement('td');
    let label = document.createElement('label');
    if (info == null) {
        label.innerHTML = "";
    } else {
        let fecha = new Date(info);
        label.innerHTML = formatAMPM(fecha);
    }

    label.style.fontWeight = "normal";
    td.appendChild(label);
    td.classList.add('textcenter');
    return td;
}
function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return date.toLocaleDateString() + "  " + strTime;
}
document.getElementById("doPrint").onclick = function() {
    printElement(document.getElementById("printDiv"));
}

function printElement(elem) {
    var domClone = elem.cloneNode(true);

    var $printSection = document.getElementById("printSection");

    if (!$printSection) {
        var $printSection = document.createElement("div");
        $printSection.id = "printSection";
        document.body.appendChild($printSection);
    }

    $printSection.innerHTML = "";
    $printSection.appendChild(domClone);
    window.print();
}