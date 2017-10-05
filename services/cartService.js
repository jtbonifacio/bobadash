angular
  .module("bobaApp")
  .service("cartService", function ($http, $state) {
    var _cart = [];
    var total = 0;

    this.getCart = function (cb) {
      cb(_cart);
      console.log(_cart);
    }

    this.addItem = function (item) {
      _cart.unshift(item);
      console.log(_cart);
    }

    this.deleteItem = function (item) {
      console.log(item);
      for (var i = 0; i < _cart.length; i++) {
        if (_cart[i].id == item.id) {
          _cart.splice(i, 1);
        }
      }
      console.log(_cart);
    }

    this.subtotal = function (cb) {
      for (var i = 0; i < _cart.length; i++) {
        total += _cart[i].price;
        cb(total);
        console.log(total);
      }
    }

  })