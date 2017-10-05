var app = angular.module("bobaApp", ['ngMap', "ui.router"])

app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("app", {
      abstract: true,
      url: '',
      templateUrl: './views/app-container.html'
    })

    .state("app.home", {
      url: "/",
      templateUrl: "./views/home.html",
      controller: "homeController"
    })

    .state("app.menu", {
      url: "/menu",
      templateUrl: "./views/menu.html",
      controller: "menuController"
    })

    .state("app.customer", {
      url: "/customer",
      templateUrl: "./views/customer.html",
      controller: "customerController"
    })

        .state("app.showCustomer", {
          url: "/customer/:id",
          templateUrl: "./views/customer.html",
          controller: "customerController"
        })

        .state("app.editCustomer", {
          url: "/customer/:id/edit",
          templateUrl: "./views/account.html",
          controller: "customerController"
        })

    .state("app.server", {
      url: "/server",
      templateUrl: "./views/server.html",
      controller: "serverController"
    })

        .state("app.showServer", {
          url: "/server/:id",
          templateUrl: "./views/server.html",
          controller: "serverController"
        })

        .state("app.editServer", {
          url: "/server/:id/edit",
          templateUrl: "./views/accountEmp.html",
          controller: "serverController"
        })

    .state("app.about", {
      url: "/about",
      templateUrl: "./views/about.html"
    })

    .state("app.cart", {
      url: "/cart",
      templateUrl: "./views/cart.html",
      controller: "cartController"
    })

    //Added by Jay for cutomer form page
    .state("app.account", {
      url: "/account",
      templateUrl: "./views/account.html",
      controller: "customerController"
    })

    // Added by Jay to new employee account page
    .state("app.accountEmp", {
      url: "/accountEmp",
      templateUrl: "./views/accountEmp.html",
      controller: "serverController"
    })

    .state("app.signin", {
      url: "/signin",
      templateUrl: "./views/signin.html",
      controller:"signinController"
    })

})