angular
  .module("bobaApp")
  .service("homeService", function ($http, $state) {

    var _address = "";

    this.getAddress = function () {
      return _address;
    }

    this.setAddress = function (a) {
      _address = a;
    }

    var _time = "";

    this.getTime = function () {
      return _time;
    }

    this.setTime = function (t) {
      _time = t;
    }

    var _countdown = null;

    this.getCountdown = function () {
      return _countdown;
    }

    this.setCountdown = function (c) {
      _countdown = c;
    }

    this.getDistanceTime = function (destination, cb) {
      var service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix(
        {
          origins: ["2850 Red Hill Ave, Sana Ana, CA 92705"],
          destinations: [destination],
          travelMode: 'DRIVING',
          drivingOptions: {
            departureTime: new Date(Date.now()),
            trafficModel: 'optimistic'
          },
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: true,
          avoidTolls: true,

        }, callback);

      function callback(response, status) {
        if (status == 'OK') {
          cb(response);
        }
      }
    }

    this.getCurrent = function (cb) {
      var options = {
        enableHighAccuracy: true
      };

      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var google_map_position = new google.maps.LatLng(lat, lng);
        console.log(google_map_position);
        var google_maps_geocoder = new google.maps.Geocoder();
        google_maps_geocoder.geocode(
          { 'latLng': google_map_position },
          function (results, status) {
            if (status == google.maps.GeocoderStatus.OK && results[0]) {
              cb(results);
            }
          }
        );
      },
        function (error) {
          alert('Unable to get location: ' + error.message);
        }, options);
    }

  })