$(document).ready(function() {

    crear();

    function crear(){
       
        $.ajax({
            url: URL_SERVIDOR + "Producto/productosActivos",
            method: "GET"
        }).done(function(response) {
            //para la tabla
            $('#titulo').text(response.mensaje);
          //  $('#detalle_productos').empty();
            let tablaReporte = document.getElementById('factura_detalle');
           
            response.product.forEach(event => {
                let tr = crearFila(event);
                tablaReporte.appendChild(tr);
            });
            $('#loading').hide();
        }).fail(function(response) {

        }).always(function(xhr, opts) {
            $('#modal-cotizacion').modal('show');

        });

    }

     //*para crear la tabla
     function crearFila(event) {
        let tr = document.createElement('tr');
        tr.appendChild(crearColumna(event.nombre_producto));
        tr.appendChild(crearColumna(event.tarifa));
        tr.appendChild(crearColumna(event.unidad_medida));
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
    //**********funciones para crear las tablas fin
});