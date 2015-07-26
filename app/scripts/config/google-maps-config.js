'use strict';
angular.module('ShortRoute')
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAwc4yn8G6yfqtY6HJ8wdHv3zWz0o5xyBs',
      isGoogleMapsForWork: false,
      china: false,
      v: '3' ,
      libraries: '',
      language: 'en',
      sensor: 'false',
    });
});
