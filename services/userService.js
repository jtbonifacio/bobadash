angular
  .module("bobaApp")
  .service("userService", function ($state) {

    var _currentUser = null;

    this.getCurrentUser = function () {
      return _currentUser;
    }

    this.setCurrentUser = function (user) {
      _currentUser = user;
    }

    this.logout = function () {
      _currentUser = null;
      $state.transitionTo("app.home", null, { reload: true });
    }

  })