let DATA_CATEGORIA;
$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: URL_SERVIDOR + "categoriasAutos/categorias",
        async: false,
        dataType: "json",
        success: function(data) {

            let myData = [];
            DATA_CATEGORIA = data.categorias;
            for (let index = 0; index < DATA_CATEGORIA.length; index++) {
                myData.push({
                    id: DATA_CATEGORIA[index].idcategoria,
                    text: DATA_CATEGORIA[index].nombre_categoria 
                });
            }
            $('#id_categoria').select2({ data: myData });
        },
        error: function(err) {
            //si da un error ya que quede la alerta
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: 'No hay Categorias para mostrar',
                showConfirmButton: true,
            });
        }
    });

});