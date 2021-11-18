$(document).ready(function () {
    inicializarGaleria();

    //BOTON EDITAR DOCUMENTOS
    $(document).on('click', '#btn-backup', function (evento) {
        this.disabled = true;
        location.href = `${URL_SERVIDOR}Empresa/backup`
        this.disabled = false;

    });
    function inicializarGaleria() {
        $('#sqlFile').fileinput({
            theme: 'fas',
            language: 'es',
            uploadUrl: URL_SERVIDOR + 'Empresa/restore',
            overwriteInitial: false,
            maxFileSize: 200000,
            maxFilesNum: 1,
            allowedFileExtensions: ['sql'],
            preferIconicPreview: true,
            previewFileIconSettings: { // configure your icon file extensions
                'sql': '<i class="fas fa-database text-red"></i>',
            },
            previewFileExtSettings: {
                'sql': function (ext) {
                    return ext.match(/(sql)$/i);
                }
            }
        });

    }
});