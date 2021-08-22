    $("#botonAyudaCondicion").click(function() {
    document.getElementById("register-ayuda").reset();
    $('#pdf').empty();
    pdfcito=$('#pdf');
    pdfcito.append('<iframe src="../../pdf/Condiciones-vuelos.pdf"></iframe>');
      $("#modal-ayuda").modal();
    });


    $("#botonAyudaRegistroUsuarios").click(function() {
      document.getElementById("register-ayuda").reset();
      $('#pdf').empty();
      pdfcito=$('#pdf');
      pdfcito.append('<iframe src="../../pdf/Registro-usuarios.pdf"></iframe>');
        $("#modal-ayuda").modal();
      });
  
