

/*operaciones dinamicas para que funcione mejor*/

    $(function () {
        $("#asistencia").change(function () {
            // alert($(this).val());
            if ($(this).val() === "1") {
                $("#btn-asistiran").prop("disabled",true);
                $("#asistiran").prop("disabled", true);
                $("#pasaporte_personas").prop("disabled",true);
                $("#btn-pasaportes").prop("disabled", true);
            }
            if ($(this).val() === "0") {
                $("#btn-asistiran").prop("disabled",false);
                $("#asistiran").prop("disabled", false);
                $("#pasaporte_personas").prop("disabled", false);
                $("#btn-pasaportes").prop("disabled", false);  
            }
        });
    });

    $(function () {
        $("#asistencia2").change(function () {
            // alert($(this).val());
            if ($(this).val() === "1") {
                $("#btn-asistiran2").prop("disabled",true);
                $("#asistiran2").prop("disabled", true);
                $("#pasaporte_personas2").prop("disabled", true);
                $("#btn-pasaportes2").prop("disabled", true);
            }
            if ($(this).val() === "0") {
                $("#btn-asistiran2").prop("disabled",false);
                $("#asistiran2").prop("disabled", false);
                $("#pasaporte_personas2").prop("disabled", false);
                $("#btn-pasaportes2").prop("disabled", false);     
            }
        });
    });

    $(function () {
        $("#add").change(function () {
            // alert($(this).val());
            if ($(this).val() === "1") {
                $("#btn-asistiran").prop("disabled",true);
                $("#asistiran").prop("disabled", true);
            }
            if ($(this).val() === "0") {
                $("#btn-asistiran").prop("disabled",false);
                $("#asistiran").prop("disabled", false);    
            }
        });
    });
function ShowSelected()
{
/* Para obtener el valor */
//var cod = document.getElementById("cliente").value;
//alert(cod);
 
/* Para obtener el texto */
var combo = document.getElementById("comboUsuario");
var selected = combo.options[combo.selectedIndex].text;
$('#usuario').val(selected);
}
