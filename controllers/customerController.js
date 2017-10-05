angular
  .module("bobaApp")
  .controller("customerController", function ($scope, $rootScope, $state, $stateParams, customerService, homeService, userService) {

    $scope.errorCount = false;
    $scope.countdown = false;
    $scope.expired = false;
    $scope.orderMessage = false;

    $scope.currentUser = userService.getCurrentUser();
    console.log($scope.currentUser);

    customerService.getCustomers(function (response) {
      $scope.customers = response;
      console.log($scope.customers);

      if ($stateParams.id == "" || $stateParams.id == undefined || $stateParams.id == null) {
        $scope.submitButton = true;
        $scope.saveButton = false;
        $scope.heading = "Create An Account";
        customerService.getCustomerById($stateParams.id,
          function (customer) {
            $scope.customer = customer;
            console.log($scope.customer);
          })
      }
      else {
        $scope.submitButton = false;
        $scope.saveButton = true;
        $scope.heading = "Update Your Account";
        customerService.getCustomerById($stateParams.id,
          function (customer) {
            $scope.customer = customer;
            console.log($scope.customer);
          })
      }
    })

    //Add customer
    $scope.submitAccount = function () {
      console.log($scope.customer);
      customerService.addCustomer($scope.customer);
      userService.setCurrentUser($scope.customer);
      $state.transitionTo("app.showCustomer", { id: $scope.customer.id }, { reload: true });
    }

    //Save Profile

    $scope.saveAccount = function () {
      customerService.updateCustomer($scope.customer);
    }

    //Delete Profile
    $scope.deleteAccount = function () {
      customerService.deleteCustomer($scope.customer);
      alert("Your account has been deleted!");
      userService.logout();
    }

    //

    //Countdown Timer
    console.log(homeService.getCountdown());

    if (homeService.getCountdown() == null || homeService.getCountdown() == false) {
      $scope.errorCount = true;
    }

    else {
      $scope.time = 0;
      $scope.time = homeService.getTime();
      $scope.time *= 60000;

      var countDownTime = new Date().getTime() + $scope.time;
      console.log(countDownTime);
      var x = setInterval(function () {
        var now = new Date().getTime();
        var interval = countDownTime - now;
        var minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((interval % (1000 * 60)) / 1000);

        $scope.minutes = minutes;
        $scope.seconds = seconds;

        $scope.countdown = true;
        $scope.orderMessage = true;
        $rootScope.$apply();

        //End countdown at zero
        if (interval < 0) {
          clearInterval(x);
          $scope.countdown = false;
          $scope.orderMessage = false;
          $scope.expired = true;
          $rootScope.$apply();
        }

      }, 1000);
    }

  })