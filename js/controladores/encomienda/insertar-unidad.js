$(document).ready(function (){

    inicializarValidaciones();
  
    //BOTON PARA AGREGAR
    $(document).on('click', '#btn-unidad', function (evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#unidad-form");  
        form.validate();
         if (form.valid()) {
            add_unidad();
        }  
        
    });

  function inicializarValidaciones() {

        $('#unidad-form').validate({

            rules: {
               
                unidad_medida:{
                    required: true,
                    minlength: 5
                }
            },
            messages: {
                
                unidad_medida:{
                    required:"Digite la unidad de medida",
                    minlength:"El nombre producto debe tener una longitud minima de 7"
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
    
function add_unidad() {

        $.ajax({
            url: URL_SERVIDOR+"Producto/unidad",
            method: 'POST',
            data: $("#unidad-form").serialize()

        }).done(function (response) {
        document.getElementById("unidad-form").reset();
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                $('#id_unidad').empty();
                ///**********VOLVEMOS A CARGAR EL COMBOBOX
                let DATA_UNIDAD;

        $(document).ready(function() {

        $.ajax({
        type: "GET",
        url: URL_SERVIDOR + "Producto/unidades",
        async: false,
        dataType: "json",
        success: function(data) {
            let $select = $('#id_unidad');
                $select.append('<option value="">Seleccione</option>');
            let myData = [];
            DATA_UNIDAD = data.unidad;
            for (let index = 0; index < DATA_UNIDAD.length; index++) {
                myData.push({
                    id: DATA_UNIDAD[index].id_unidad,
                    text: DATA_UNIDAD[index].unidad_medida
                });
            }

            ///LE CARGAMOS LA DATA 
            $('#id_unidad').select2({ data: myData });
        },

        error: function(err) {
            //si da un error ya que quede la alerta
            $('#id_unidad').select2({});
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Error',
                icon: 'error',
                text: 'No hay Usuarios para mostrar',
                showConfirmButton: true,
            });
        }
    });
});
                ////////********************

                $('#add-unidad').modal('hide');//CERRAMOS EL MODAL
            });
        }).fail(function (response) {
            //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
            let respuestaDecodificada = JSON.parse(response.responseText);
            let listaErrores = "";

            if (respuestaDecodificada.errores) {
                ///ARREGLO DE ERRORES 
                let erroresEnvioDatos = respuestaDecodificada.errores;
                for (mensaje in erroresEnvioDatos) {
                    listaErrores += erroresEnvioDatos[mensaje] + "\n";
                     //toastr.error(erroresEnvioDatos[mensaje]);
                };
            } else {
                listaErrores = respuestaDecodificada.mensaje
            }
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text: listaErrores,
                showConfirmButton: true,
            });

        });


    }
   
});