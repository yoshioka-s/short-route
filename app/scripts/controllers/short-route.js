'use strict';
angular.module('ShortRoute')
.controller('shortRouteCtrl', function($scope, uiGmapGoogleMapApi, getIntersections){

  uiGmapGoogleMapApi.then(function(maps) {
    var directionsDisplay = new google.maps.DirectionsRenderer();
    $scope.calcRoute = calcRoute;
    function calcRoute() {
      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();
      var map;

      function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var chicago = new google.maps.LatLng(41.850033, -87.6500523);
        var mapOptions = {
          zoom:7,
          center: chicago,
          disableDefaultUI: true,
          zoomControl: true,
           zoomControlOptions: {
             style: google.maps.ZoomControlStyle.SMALL
           }
        }
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        directionsDisplay.setMap(map);
      }

        initialize();
        
        $scope.getlink = getIntersections.getlink;
        var start = '611 Mission St #2 San Francisco, CA 94105';
        var end = '28470 Triton St, Hayward, CA, United States';
        var request = {
          origin:start,
          destination:end,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL
        };
        var directionsService = new maps.DirectionsService();
        directionsService.route(request, function(result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
            console.log('result :', result);
            var intersections = $scope.getlink(result.routes[0].overview_path[0].A,result.routes[0].overview_path[0].F);

          }
        });
      }
  });
})

.factory('getIntersections', function ($http) {
  // Your code hereconsole.log('in services links getlink resp:', resp);
  // Url = 'api.geonames.org/findNearestIntersection?';

  var getlink = function(lat, lng){
    console.log('url: ', 'http://api.geonames.org/findNearestIntersection?lat='+lat+'&lng='+lng+'&username=yinghunglai')
    return $http({
      method: 'GET',
      url: 'http://api.geonames.org/findNearestIntersection?lat='+lat+'&lng='+lng+'&username=yinghunglai'
    }).then(function(resp){
      console.log('in services links getlink resp.data:', resp);
      return resp;
    })
  }
  return {
    getlink: getlink
  }
})


    // google.maps.event.addDomListener(window, 'load', initialize);