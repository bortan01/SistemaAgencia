$(document).ready(function () {
   inicializarGaleria();
   //BOTON EDITAR DOCUMENTOS
   function inicializarGaleria() {


      let identificador = localStorage.getItem('id_clienteA');
      let nombreTabla = 'usuario_documentos';
      let informacionAdicional = { tipo: nombreTabla, identificador: identificador };
      let urlFotos = [];
      let infoFotos = [];
      $.ajax({
         url: URL_SERVIDOR + "Imagen/show?tipo=" + nombreTabla + "&identificador=" + identificador,
         method: "GET",

      }).done(function (response) {
         $('#loading').hide();
         //REST_Controller::HTTP_OK
         response.forEach(element => {
            let informacion = {
               url: URL_SERVIDOR + "Imagen/delete",
               key: element.id_foto
            };
            infoFotos.push(informacion);
            urlFotos.push(element.foto_path);
         });
         $('#kv-explorer').fileinput({
            theme: 'fas',
            language: 'es',
            uploadUrl: URL_SERVIDOR + 'Imagen/save',
            uploadExtraData: informacionAdicional,
            overwriteInitial: false,
            initialPreviewAsData: true,
            initialPreview: urlFotos,
            initialPreviewConfig: infoFotos,
            maxFileSize: 200000,
            maxFilesNum: 10,
            allowedFileExtensions: ['jpg', 'png', 'jpeg', 'jfif']
         });
      });

   }
});