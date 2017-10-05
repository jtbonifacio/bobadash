angular
  .module("bobaApp")
  .controller("cartController", function($scope, $state, cartService, userService) {

    $scope.currentUser = userService.getCurrentUser();
    console.log($scope.currentUser);
    if($scope.currentUser == null) {
      $scope.heading = "Check Out As Guest"
    }
    
    cartService.getCart(function (response) {
      $scope.cart = response;
    })

    cartService.subtotal(function(response) {
      $scope.total = response;
    })

    $scope.deleteItem = function(item) {
      cartService.deleteItem(item);
      $scope.total -= item.price;
    }

    $scope.submitOrder = function() {
      $scope.cart = [];
      console.log($scope.cart);
      alert("Your order has been submitted. We will see within 30 minutes!!!")
      $state.go("app.home");
    }
    
  })