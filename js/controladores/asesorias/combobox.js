let DATA_CLIENTE;
$(document).ready(function() {

        $.ajax({
            type: "GET",
            url: URL_SERVIDOR+"Usuario/obtenerUsuario?nivel=CLIENTE",
          
            dataType: "json",
            success: function(data) {

                let $select = $('#cliente');
                $select.append('<option value="">Seleccione</option>');
        
                let myData = [];
                DATA_CLIENTE = data.usuarios;
                for (let index = 0; index < DATA_CLIENTE.length; index++) {
                    myData.push({
                        id: DATA_CLIENTE[index].id_cliente,
                        text: DATA_CLIENTE[index].nombre 
                    });
                }
                $('#cliente').select2({ data: myData });
            
            },
            error: function(err) {
            var $select = $('#cliente');
            $select.append('<option value="">Seleccione</option>');
            }
        });

    });