$(document).ready(function() {

        $.ajax({
            type: "POST",
            url: URL_SERVIDOR+"/Comision/comision",
            async: false,
            dataType: "json",
            success: function(data) {
                
            },
            error: function(err) {
            }
        });

    });