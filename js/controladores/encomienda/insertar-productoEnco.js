$(document).ready(function (){

    inicializarValidaciones();
    inicializarValidacionesComision();
  //guardar la comision
 /* $('.decimales').on('input', function () {
  this.value = this.value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');
  });*/
   $('#btn-guardaComision').click(function(evento){
       
         let form = $("#comision-form");

        form.validate();
        
        if (form.valid()) {
               add_comision();    
            
        }         
   });
    //BOTON PARA AGREGAR
    $(document).on('click', '#btn-producto', function (evento) {
        evento.preventDefault(); //para evitar que la pagina se recargue
        let form = $("#register-form");
        let form1 = $("#unidadre-form");

        form.validate();
        if (form.valid()) {
            if (form1.valid()) {
               add_producto(); 
            }
                 
            
        }  
        
    });
function inicializarValidacionesComision() {
        $('#comision-form').validate({

            rules: {
                comision:{
                    required: true
                }
            },
            messages: {
                comision:{
                    required:"Digite la Comisión"
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

 function inicializarValidaciones() {
        $('#register-form').validate({

            rules: {
                nombre_producto:{
                    required: true,
                    minlength: 7
                },
                tarifa: {
                    required: true
                }
            },
            messages: {
                nombre_producto:{
                    required:"Digite el nombre del producto",
                    minlength:"El nombre producto debe tener una longitud minima de 7"
                },
                 tarifa:{
                    required:"Digite la tarifa del producto"
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

        $('#unidadre-form').validate({

            rules: {
                id_unidad: {
                    required: true
                }
            },
            messages: {
               
                 id_unidad:{
                    required:"Seleccione la Unidad"
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

function llenarCombo(){

    $.ajax({
            type: "GET",
            url: URL_SERVIDOR+"Producto/productos",
            dataType: "json",
            success: function(data) {

                var $select = $('#id_producto');
                 $select.append('<option value="">Seleccione</option>');
                $.each(data.product, function(i,index) {
                    $select.append('<option value=' +index.id_producto+ '>' +index.nombre_producto+
                        '</option>');
                });

                 $.each(data.comision, function(i,ind) {
                    $('#porcenaje').val(ind.porcentaje);
                });
                
                   },
            error: function(err) {
                $select.append('<option value="">Seleccione</option>');
                var $select = $('#id_producto');
              /* const Toast = Swal.mixin();
            Toast.fire({
                title: 'Oops...',
                icon: 'error',
                text:'No hay Ramas para mostrar',
                showConfirmButton: true,
            });*/
            }
        });

}
function add_comision() {
        let data = {
         "porcentaje": document.getElementById("comisionActu").value
         }; 

        $.ajax({
            url: URL_SERVIDOR+"Comision/comisionUpdate",
            method: 'POST',
            data: data

        }).done(function (response) {
        document.getElementById("comision-form").reset();
        $('#id_producto').empty();
        llenarCombo();
         $('#add-comision').modal('hide');
        
        //$('#id_producto').load('#id_producto');
         //$('#formulario').empty();//VACIO LOS DIV PARA QUE NO ME LOS MONTE UNO SOBRE OTRO
          //$('#botones').empty();
          

          //$("#recargar").load(" #recargar");//recargar solo un div y no toda la pagina
            //REST_Controller::HTTP_OK
            //let respuestaDecodificada = JSON.parse(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                //TODO BIEN Y RECARGAMOS LA PAGINA 
                //location.reload(); NO QUIERO QUE RECARGUE ME ACTUALIZA SOLA
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
                title: 'Error',
                icon: 'error',
                text: response.responseText,
                showConfirmButton: true,
            });

        });


    }

    
function add_producto() {
        let data = {
         "nombre_producto":          document.getElementById("producto").value,
         "tarifa":                   document.getElementById("tarifa").value,
         "id_unidad":   document.getElementById("id_unidad").value
         }; 

        $.ajax({
            url: URL_SERVIDOR+"Producto/producto",
            method: 'POST',
            data: data

        }).done(function (response) {
        document.getElementById("register-form").reset();
        $('#id_producto').empty();
        llenarCombo();
         $('#add-producto').modal('hide');
        
        //$('#id_producto').load('#id_producto');
         //$('#formulario').empty();//VACIO LOS DIV PARA QUE NO ME LOS MONTE UNO SOBRE OTRO
          //$('#botones').empty();
          

          //$("#recargar").load(" #recargar");//recargar solo un div y no toda la pagina
            //REST_Controller::HTTP_OK
            //let respuestaDecodificada = JSON.parse(response);
            const Toast = Swal.mixin();
            Toast.fire({
                title: 'Exito...',
                icon: 'success',
                text: response.mensaje,
                showConfirmButton: true,
            }).then((result) => {
                guardarBitacora();
                //location.reload(); NO QUIERO QUE RECARGUE ME ACTUALIZA SOLA
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
                title: 'Error',
                icon: 'error',
                text: response.responseText,
                showConfirmButton: true,
            });

        });


    }
   
});