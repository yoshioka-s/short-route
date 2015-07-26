  'use strict';
angular.module('ShortRoute')
.controller('shortRouteCtrl', function($scope, uiGmapGoogleMapApi, getIntersections){

  uiGmapGoogleMapApi.then(function(maps) {
    function calcRoute() {
      var directionsDisplay = new maps.DirectionsRenderer();
      var directionsService = new maps.DirectionsService();
      var map;

      function initialize() {
        directionsDisplay = new maps.DirectionsRenderer();
        var chicago = new maps.LatLng(41.850033, -87.6500523);
        var mapOptions = {
          zoom:7,
          center: chicago,
          disableDefaultUI: true,
          zoomControl: true,
           zoomControlOptions: {
             style: maps.ZoomControlStyle.SMALL
           }
        };
        map = new maps.Map(document.getElementById('map-canvas'), mapOptions);
        directionsDisplay.setMap(map);
      }

      initialize();

      $scope.getlink = getIntersections.getlink;
      var start = '611 Mission St #2 San Francisco, CA 94105';
      var end = '28470 Triton St, Hayward, CA, United States';
      var marker = new maps.Marker({
        position: start,
        map: map,
        title: 'current location'
      });
      var request = {
        origin:start,
        destination:end,
        travelMode: maps.TravelMode.DRIVING,
        unitSystem: maps.UnitSystem.IMPERIAL
      };
      directionsService.route(request, function(result, status) {
        if (status !== maps.DirectionsStatus.OK) {
          console.log('status: ', status);
          return;
        }
        directionsDisplay.setDirections(result);
        console.log('result :', result);
        // var intersections = $scope.getlink(result.routes[0].overview_path[0].A,result.routes[0].overview_path[0].F);
        $scope.getlink(result.routes[0].overview_path[0].A,result.routes[0].overview_path[0].F, function (resp) {

          var nearestIntersection = getLatLngFromXML(resp.data, maps);
          var newMarker = new maps.Marker({
            position: nearestIntersection,
            map: map,
            title: 'nearest intersection'
          });
          // get the route from the nearest intersection
          request.origin = nearestIntersection;
          directionsService.route(request, function (result, status) {
            if (status !== maps.DirectionsStatus.OK) {
              console.log('status: ', status);
              return;
            }
            console.log(result);
            directionsDisplay.setDirections(result);
          });
        });
      });
    }
    $scope.calcRoute = calcRoute;
  });

  // make LatLng obj from xml
  function getLatLngFromXML(xml, maps) {
    console.log(xml);
    var latBegin = xml.indexOf('<lat>');
    var latEnd = xml.indexOf('</lat>');
    var lat = xml.substring(latBegin + 5, latEnd);
    var lngBegin = xml.indexOf('<lng>');
    var lngEnd = xml.indexOf('</lng>');
    var lng = xml.substring(lngBegin + 5, lngEnd);
    console.log('lat: ', lat);
    console.log('lng: ', lng);
    return new maps.LatLng(lat, lng);
  }
})

.factory('getIntersections', function ($http) {
  // Your code hereconsole.log('in services links getlink resp:', resp);
  // Url = 'api.geonames.org/findNearestIntersection?';

  var getlink = function(lat, lng, callback){
    console.log('url: ', 'http://api.geonames.org/findNearestIntersection?lat='+lat+'&lng='+lng+'&username=yinghunglai');
    return $http({
      method: 'GET',
      url: 'http://api.geonames.org/findNearestIntersection?lat='+lat+'&lng='+lng+'&username=yinghunglai'
    }).then(function(resp){
      console.log('in services links getlink resp.data:', resp);
      callback(resp);
      return resp;
    });
  };
  return {
    getlink: getlink
  };
});


    // google.maps.event.addDomListener(window, 'load', initialize);
