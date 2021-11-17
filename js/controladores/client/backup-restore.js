$(document).ready(function () {
    inicializarGaleria();

    //BOTON EDITAR DOCUMENTOS
    $(document).on('click', '#btn-backup', function (evento) {
        location.href = `${URL_SERVIDOR}Empresa/backup`
    });

    function inicializarGaleria() {
        $('#kv-explorer').fileinput({
            theme: 'fas',
            language: 'es',
            // uploadUrl: URL_SERVIDOR + 'Imagen/save',
            overwriteInitial: false,
             maxFileSize: 200000,
            maxFilesNum: 1,
            allowedFileExtensions: ['sql'],
            preferIconicPreview : true,
            previewFileIconSettings: { // configure your icon file extensions
                'sql': '<i class="fas fa-database text-red"></i>',        
            },
            previewFileExtSettings: { 
                'sql': function(ext) {
                    return ext.match(/(sql)$/i);
                }
            }
        });

    }
});