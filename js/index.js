$(document).ready(function () {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDOcKQm3C_3-qSI8f4bBcDqTGy94TmJP-A&callback=initialize";
    document.body.appendChild(script);
});


function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
   // map.setTilt(45);

    // Multiple Markers
    var markers = [
        ['F5 ITC NYC', 40.758062, -73.97159490000001, 'hotel'],
        ['The Benjamin', 40.756667, -73.972299, 'hotel'],
        ['Fitzpatrick Manhattan', 40.760554, -73.969097, 'hotel'],
        ['The Iroquois', 40.755879, -73.981937, 'hotel'],
        ['Intercontinental Hotel', 40.755740, -73.973493, 'hotel'],
        ['Bobby Vans', 40.759345, -73.970960, 'restaurant'],
        ['The Four Seasons Restaurant', 40.756473, -73.975289, 'restaurant'],
        ['24 Hour Fitness', 40.758232, -73.969704, 'fitness'],
        ['The Racquet and Tennis Club', 40.758849, -73.973073, 'fitness']
    ];

    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h4>F5 International Technology Center</h4>' +
        '<p>125 E 50th Street</p><p>New York, NY 10022</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h4>The Benjamin</h4>' +
        '<p>560 Lexington Avenue</p><p>New York, NY 10022</p><p><a href="http://www.thebenjamin.com/">www.thebenjamin.com</a></p>' + '</div>'],
        ['<div class="info_content">' +
        '<h4>Fitzpatrick Manhattan</h4>' +
        '<p>687 Lexington Avenue</p><p>New York, NY 10022</p><p><a href="http://www.fitzpatrickhotels.com/fitzpatrick-manhattan/">http://www.fitzpatrickhotels.com/</a></p>' + '</div>'],
        ['<div class="info_content">' +
        '<h4>The Iroquois</h4>' +
        '<p>49 West 44th Street</p><p>New York, NY 10036</p><p><a href="http://http://www.iroquoisny.com/">www.iroquoisny.com/</a></p>' + '</div>'],
        ['<div class="info_content">' +
        '<h4>Intercontinental Hotel</h4>' +
        '<p>111 East 48th Street</p><p>New York, NY 10017</p><p><a href="http://intercontinentalnybarclay.com/">intercontinentalnybarclay.com</a></p>' + '</div>'],
        ['<div class="info_content">' +
        '<h4>The Four Seasons Restaurant</h4>' +
        '<p>280 Park Avenue</p><p>New York, NY 10017</p><p><a href="http://www.fourseasonsrestaurant.com/">www.fourseasonsrestaurant.com/</a></p>' + '</div>'],
        ['<div class="info_content">' +
        '<h4>Bobby Van’s</h4>' +
        '<p>131 East 54th Street</p><p>New York, NY 10022</p><p><a href="http://www.bobbyvans.com/">www.bobbyvans.com/</a></p>' + '</div>'],
        ['<div class="info_content">' +
        '<h4>24 Hour Fitness</h4>' +
        '<p>address Street</p><p>New York, NY 10017</p><p><a href="http://url.com/">url.com</a></p>' + '</div>'],
        ['<div class="info_content">' +
        '<h4>The Racquet and Tennis Club</h4>' +
        '<p>address</p><p>New York, NY 10017</p><p><a href="http://url.com/">url.com</a></p>' + '</div>']
    ];

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(),
        marker, i;
    
    var gmarkers1 = [];

    // Loop through our array of markers & place each one on the map  
    for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            category: markers[i][3]
        });
        gmarkers1[i] = marker;

        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });
    

filterMarkers = function(category)
{
    console.log('function called');
    
   for (i = 0; i < gmarkers1.length; i++) {
      marker = gmarkers1[i];

      // If is same category or category not picked
      if(marker.category == category || category.length == 0)
      {
          marker.setVisible(true);
      }
      // Categories don't match 
      else
      {          
          marker.setVisible(false);
      }
    }  
}

}