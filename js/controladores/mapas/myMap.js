// CUANDO LA PAGINA YA ESTA LISTA
$(document).ready(function () {
    initMap();
    $(document).on('click', '#btn-mapa', function (evento) {
        $('#coordenadas').val("13.643448351332022 -88.78414715642167");
        $("#coordenadas-error").hide();
        $("#coordenadas").removeClass("is-invalid");
        $('#modal-mapa').modal('show');

    });
    function initMap() {
        let latitud = 13.643448351332022;
        let longitud = -88.78414715642167;
        let coordenadas = {
            lng: longitud,
            lat: latitud
        };
        generarMapa(coordenadas);
    }
    function generarMapa(coordenadas) {
        let mapa = new google.maps.Map(document.getElementById("mapa"),
            {
                zoom: 12,
                center: new google.maps.LatLng(coordenadas.lat, coordenadas.lng)
            });
        let marcador = new google.maps.Marker({
            map: mapa,
            draggable: true,
            position: new google.maps.LatLng(coordenadas.lat, coordenadas.lng)
        });
        marcador.addListener("dragend", function (event) {
            document.getElementById("coordenadas").value = `${this.position.lat()} ${this.position.lng()}`;
            //console.log(this);
        });
        //PARA GOOGLE PLACES
        // let input = document.getElementById("lugares");
        // const search =new google.maps.places.Autocomplete(input);
        //  search.bindTo("bounds", mapa);
    }
});