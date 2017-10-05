angular
  .module("bobaApp")
  .service("menuService", function ($http, $state) {

    var _menu = [];

    var map = true;

    this.getShow = function () {
      return map;
    }

    this.setShow = function (ma) {
      map = ma;
      console.log(map);
    }

    this.getMenu = function (cb) {
      if (_menu.length == 0) {
        $http.get("../db/menu.json")
          .success(function (response) {
            _menu = response;
            cb(_menu)
          })
          .error(function (error) {
            console.log(error);
          })
      }
      else {
        cb(_menu);
      }
    }

  })

