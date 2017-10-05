angular
  .module('bobaApp')
  .controller("homeController", function ($scope, $state, $stateParams, homeService, customerService, userService, NgMap, $rootScope) {
    $scope.deliver = false;
    $scope.address = "";

    $scope.currentUser = userService.getCurrentUser();
    console.log($scope.currentUser);

    $scope.getInfo = function () {
      homeService.getDistanceTime($scope.address, function (response) {
        console.log(response);
        homeService.setAddress($scope.address);
        console.log(homeService.getAddress());
        var origin = response.originAddresses[0];
        var destination = response.destinationAddresses[0];

        var results = response.rows[0].elements[0];

        var distance = results.distance.text
        var numDistance = parseFloat(distance.split(" ")[0]);
        console.log("Distance: ", numDistance, " miles");
        var duration = results.duration.text;
        var numDuration = parseFloat(duration.split(" ")[0]);
        homeService.setTime(numDuration);
        console.log(homeService.getTime());
        console.log("Duration: ", numDuration, " mins");

        if (numDistance >= 6) {
          console.log("false");
          console.log($scope.deliver)
          $scope.deliver = true;
          console.log($scope.deliver)
          homeService.setCountdown(false);
          console.log(homeService.getCountdown());
          $rootScope.$apply();
        }
        else {
          homeService.setCountdown(true);
          console.log("true");
          $state.go("menu")
        }
      });
    }

    $scope.currentLocation = function () {
      homeService.getCurrent(function (results) {
        console.log(results);
        $scope.address = results[0].formatted_address;

        $rootScope.$apply();
        console.log($scope.address);
      });
    };

  })