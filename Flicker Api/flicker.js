//This function places the google map on the div. 
$(document).ready(function() {
        $('#search').click(function(event) {
                var boxinfo = $('#box').val();
                $.getJSON(
                        "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1c9f777eb7446f34a7261dc1a54be4b2&tags=" +
                        boxinfo +
                        "&has_geo=1&extras=geo&format=json&jsoncallback=?",
                        test);
        });
        $('#clear').click(function() {
                setAllMap(null);
        });

        function setAllMap(map) {
                for (var i = 0; i < markers.length; i++) {
                        markers[i].setMap(map);
                }
        }
        var map;
        var markers = [];
        var infoWindow;

        function test(data) {
                console.log("GOT HERE");
                $('#picture').empty();
                $.each(data.photos.photo, function(i, item) {
                        var originalId = item.id;
                        var originalServer = item.server;
                        var originalFarm = item.farm;
                        var originalSecret = item.secret;
                        var lat = item.latitude;
                        var long = item.longitude;
                        var currentPicLink = "http://farm" +
                                originalFarm +
                                ".staticflickr.com/" +
                                originalServer + "/" +
                                originalId + "_" +
                                originalSecret + ".jpg";
                        var currentImg =
                                "<p><img class='appendImg' + src='" +
                                currentPicLink +
                                "'/> Lat: " + lat +
                                " Long: " + long + "</p>";
                        $('#picture').append(currentImg);
                        var pop_up_contect =
                                "<div><img src = " +
                                currentPicLink + "></div>"
                        var marker = new google.maps.Marker({
                                map: map,
                                position: new google
                                        .maps
                                        .LatLng(
                                                lat,
                                                long
                                        ),
                                title: 'Hello'
                        }); //end of the marker object
                        markers.push(marker);
                        google.maps.event.addListener(
                                marker, 'click',
                                function() {
                                        if (
                                                infoWindow
                                        ) {
                                                infoWindow
                                                        .close();
                                                infoWindow
                                                        .setContent(
                                                                ""
                                                        );
                                        }
                                        infoWindow =
                                                new google
                                                .maps
                                                .InfoWindow({
                                                        content: pop_up_contect
                                                });
                                        infoWindow.open(
                                                map,
                                                marker
                                        );
                                });
                });
        }

        function initialize() {
                var mapOptions = {
                        zoom: 2,
                        center: {
                                lat: 0,
                                lng: 0
                        }
                }
                map = new google.maps.Map(document.getElementById(
                        'map-canvas'), mapOptions);
        }
        google.maps.event.addDomListener(window, 'load', initialize);
        $("#box").keyup(function(event) {
                if (event.keyCode == 13) {
                        $("#search").click();
                }
        });
});