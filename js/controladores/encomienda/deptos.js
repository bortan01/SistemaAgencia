let DATA_DEPTOS;
let DATA_MUNICIPIOS;
$(document).ready(function() {
        //********para el combo de los departamentos

         $.ajax({
            type: "GET",
            url: URL_SERVIDOR+"Empresa/deptos",
            dataType: "json",
            success: function(data) {

                let myData = [];
                DATA_DEPTOS = data.deptos;
                for (let index = 0; index < DATA_DEPTOS.length; index++) {
                    myData.push({
                        id: DATA_DEPTOS[index].id_departamentos,
                        text: DATA_DEPTOS[index].nombre_deptos 
                    });
                }
                $('#depto').select2({ data: myData });

            },
            error: function(err) {
                var $select = $('#depto');
              /* const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text:'No hay Ramas para mostrar',
                showConfirmButton: true,
            });*/
            }
        });

        //*************para cargar los municipios

        $(function () {
        $("#depto").change(function () {
           var id = document.getElementById("depto").value;
           //alert(id);
           $('#id_municipios').empty();
           $.ajax({
            type: "GET",
            url: URL_SERVIDOR+"Empresa/municipios?id_deptos="+id,
            async: false,
            dataType: "json",
            success: function(data) {
                let myData = [];
                DATA_MUNICIPIOS = data.municipios;
                for (let index = 0; index < DATA_MUNICIPIOS.length; index++) {
                    myData.push({
                        id: DATA_MUNICIPIOS[index].id_municipios,
                        text: DATA_MUNICIPIOS[index].nombre_municipios 
                    });
                }
                $('#id_municipios').select2({ data: myData });
            },
            error: function(err) {
                var $select = $('#id_municipios');
                 $select.append('<option value="">Seleccione</option>');
              /* const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text:'No hay Ramas para mostrar',
                showConfirmButton: true,
            });*/
            }
             });


             });
        });

    });