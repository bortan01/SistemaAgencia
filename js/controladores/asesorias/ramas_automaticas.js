$(document).ready(function() {

        $.ajax({
            type: "POST",
            url: URL_SERVIDOR+"Asesoria/ramaAutomatica",
            async: false,
            dataType: "json",
            success: function(data) {
                
            },
            error: function(err) {
            }
        });

    });