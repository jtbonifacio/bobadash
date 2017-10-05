angular
  .module("bobaApp")
  .controller("menuController", function ($scope, $rootScope, $state, $stateParams, menuService, customerService, cartService, homeService, NgMap, userService) {

    $scope.deliver = false;
    $scope.address = "";
    $scope.map = true
    $scope.menu = false;
    console.log($scope.map);

    // Set Current User

    $scope.currentUser = userService.getCurrentUser();
    console.log($scope.currentUser);

    //Get Menu

    menuService.getMenu(function (response) {
      $scope.items = response;
      console.log($scope.items);
    })

    //Get Cart
    cartService.getCart(function (response) {
      $scope.cart = response;
    })

    //Cart Functions

    $scope.addItem = function (item) {
      $scope.item = item;
      console.log($scope.item);
      cartService.addItem($scope.item);
    }

    $scope.checkout = function () {
      if ($scope.currentUser == null) {
        alert("Please sign in or create an account to continue!")
      }
      else {
        $state.go("app.cart");
      }
    }

    //Google Map Functions
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
          $scope.map = false;
          $scope.menu = true;
          $rootScope.$apply();
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