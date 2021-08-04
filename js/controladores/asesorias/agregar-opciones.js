
$(document).ready(function () {
  const $select = $("#combo_cerrada");

  const opcionCambiada = () => {
    console.log("Cambio");
  };

  $select.change(opcionCambiada);
  const agregar = () => {
    const valor = $('#opcion_combo').val();
    if ($('#opcion_combo').val().length != 0) {
    var $seleccionadas = $("<option></option>").val(valor).text(valor); 
    $('#combo_cerrada').append($seleccionadas).trigger('change');
    $('#opcion_combo').val('')
  }else{
    const Toast = Swal.mixin();
            Toast.fire({
                title: 'Error',
                icon: 'error',
                text: "Campo vacio",
                showConfirmButton: true,
            });
  }
  };

  /*const mostrar = () => {
    const valor = $("#miSelect :selected").val(),
      texto = $("#miSelect :selected").text();
    alert(`Texto: ${texto}. Valor: ${valor}`);
  };*/

  $("#agregar").click(agregar);
});