let DATA_PRODUCTOS;
let DATA_MUNICIPIOS;
$(document).ready(function () {
    //*******************para los productos**************-
    $.ajax({
        type: "GET",
        url: URL_SERVIDOR + "Producto/productos",
        dataType: "json",
        success: function (data) {
            let $ok = $('#id_producto');
            $ok.append('<option value="">Seleccione</option>');


            let myData = [];
            let listMunicipio = [];
            DATA_PRODUCTOS = data.product;
            DATA_MUNICIPIOS = data.municipios;
            for (let index = 0; index < DATA_PRODUCTOS.length; index++) {
                myData.push({
                    id: DATA_PRODUCTOS[index].id_producto,
                    text: DATA_PRODUCTOS[index].nombre_producto
                });
            }

            for (let index = 0; index < DATA_MUNICIPIOS.length; index++) {
                listMunicipio.push({
                    id: DATA_MUNICIPIOS[index].id_municipio,
                    text: `${DATA_MUNICIPIOS[index].nombre_municipio} (${DATA_MUNICIPIOS[index].departamento}), Costo de envio: $${DATA_MUNICIPIOS[index].costo_agregado}`
                });
            }

            $('#id_producto').select2({ data: myData });
            $('#municipio_envio').select2({ data: listMunicipio });
            ///vamos a cargar la comision de la agencia
            $.each(data.comision, function (i, index) {
                $("#porcenaje").val(index.porcentaje);

            });
        },
        error: function (err) {
            let $ok = $('#id_producto');
            $ok.append('<option value="">Seleccione</option>');
            /* const Toast = Swal.mixin();
          Toast.fire({
              title: 'Oops...',
              icon: 'error',
              text:'No hay Ramas para mostrar',
              showConfirmButton: true,
          });*/
        }
    });
    //**************************vamos a cargar el costo
    $(function () {
        $("#id_producto").change(function () {
            var indicador = document.getElementById("id_producto").value;
            //alert(indicador);
            $.ajax({
                type: "GET",
                url: URL_SERVIDOR + "Tarifa/tarifas?id_producto=" + indicador,
                dataType: "json",
                success: function (data) {

                    let select = $('#mostrar');
                    select.empty();
                    $.each(data.tarifas, function (i, index) {
                        $('#costo').val(index.tarifa);

                        select.append('<label for="cars">Ingrese la Cantidad(' + index.unidad_medida + ')</label>' +
                            '<input name="cantidad" id="cantidad" type="number" min=1  class="form-control" placeholder="' + index.unidad_medida + '">');



                    });
                },
                error: function (err) {
                    /* const Toast = Swal.mixin();
                  Toast.fire({
                      title: 'Error',
                      icon: 'error',
                      text:'No hay Ramas para mostrar',
                      showConfirmButton: true,
                  });*/
                }
            });


        });
    });

});