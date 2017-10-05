angular
  .module("bobaApp")
  .controller("signinController", function($scope, $rootScope, $state, $stateParams, serverService, customerService, userService) {

    customerService.getCustomers(function (response) {
      $scope.customers = response;
      console.log($scope.customers);
    })

    serverService.getServers(function (response) {
      $scope.servers = response;
      console.log($scope.servers);
    })
    
    $scope.login = function() {
      customerService.getCustomerUserPass($scope.userName, $scope.pass, function(customer) {
        $scope.customer = customer;
        console.log($scope.customer);
      });

      serverService.getServerUserPass($scope.userName,$scope.pass,function(server) {
        $scope.server = server;
        console.log($scope.server);
      })
  
      if ($scope.customer != undefined) {
        $state.transitionTo("app.showCustomer",{id: $scope.customer.id}, { reload: true });
        userService.setCurrentUser($scope.customer);
      } else if ($scope.server != undefined) {
        $state.transitionTo("app.showServer",{id: $scope.server.id}, { reload: true });
        userService.setCurrentUser($scope.server);
      } else {
        alert("Username or Password is incorrect! Please try again!")
      }
      
    }
    
  })