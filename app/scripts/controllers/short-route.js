'use strict';
angular.module('ShortRoute')
.controller('shortRouteCtrl', function($scope, uiGmapGoogleMapApi){

  uiGmapGoogleMapApi.then(function(maps) {
    console.log(maps);
    $scope.map = {
      center: { latitude: 39.8282, longitude: -98.5795 },
      zoom: 4
    };
  });
});
