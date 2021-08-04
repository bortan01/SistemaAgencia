//vamos a verificar si el usuario ya tomo una cita
//si ya realizo el proceso de asesoria estara registrada toda su informacion migratoria
//entonces solo se necesita modificar los datos o add si hay nuevas preguntas
$(document).ready(function () {
   const html = $('#otraCosa').clone();
  const $grupo_per = $("[name='grupo_personas']").clone();
  const $grupo_pasa = $("[name='grupo_pasaporte']").clone();

$("#comboUsuario").change(function () {
           var id = document.getElementById("comboUsuario").value;
    $.ajax({
        url: URL_SERVIDOR + "Cita/verificarExist?id_cliente="+id,
        method: 'GET'

    }).done(function(response) {


       if(response.mensaje=='Existe' && response.existe.color=='#007bff'){

       let fecha=response.existe.fecha;
       let nueva= fecha.split('-');

         const Toast = Swal.mixin();
        Swal.fire({
            title: '¡EL cliente ya tiene una cita agendada!',
            text: "Fecha de su cita: "+nueva[2]+'-'+nueva[1]+'-'+nueva[0],
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok!'
        }).then((result) => {
            console.log(result);
            if (result.value) {
                 $("#modal_registro").modal('toggle');
                 $('#comboUsuario').val('').trigger('change');//limpia el combo
            }
        });

         document.getElementById("btnAgregar").disabled = true; 

       }else{
         //por si se queda trabado el disabled lo habilitamos
            document.getElementById("btnAgregar").disabled = false;
       }
   


    }).fail(function(response) {
        console.log(response);
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
            text: listaErrores,
            showConfirmButton: true,
        });

         });


             });

function AgregarItems(arreglo, label, $original, $grupo) {
      for (let index = 0; index < arreglo.length; index++) {
         if (index == 0) {
            $original.find('input').val(arreglo[index]);
            //verificamos si no hay mas elementos 
         } else {
            let $copia = $grupo.clone();
            $copia.find('button').toggleClass('btn-success btn-add btn-danger btn-remove').html('–');
            $copia.find('input').val(arreglo[index]);
            $copia.insertAfter(label);
         }

          document.getElementById("btn-asistiran").disabled = false;
         document.getElementById("btn-pasaportes").disabled = false;
      }
   }

   function reset() {
    $("#cosa").empty();
    $("#cosa").html(html);
}

});
