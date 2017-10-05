angular
  .module("bobaApp")
  .service("customerService", function ($http, $state) {

    var _customerId = 4;
    var _customers = [];

    var _customer = null;

    this.getCustomer = function () {
      return _customer;
    }

    this.setCustomer = function (c) {
      _customer = c;
    }

    this.getCustomers = function (cb) {
      if (_customers.length == 0) {
        $http.get("../db/customers.json")
          .success(function (response) {
            _customers = response;
            cb(_customers)
          })
          .error(function (error) {
            console.log(error);
          })
      }
      else {
        cb(_customers);
      }
    }

    this.getCustomerUserPass = function (user, pass, cb) {
      console.log(_customers);
      for (var i = 0; i < _customers.length; i++) {
        if (user == _customers[i].userName && pass == _customers[i].pass) {
          cb(_customers[i]);
        }
      }
    }

    this.getCustomerById = function (id, cb) {
      if (id === "" || id === undefined || id === null) {
        var customer = {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dob: "",
          addressLine: "",
          zip: "",
          city: "",
          state: "",
          ccNum: "",
          ccType: "",
          expDate: "",
          secCode: "",
          userName: "",
          pass: "",
          type: "customer"
        }

        cb(customer)
        console.log(customer);
      }
      else {
        for (var i = 0; i < _customers.length; i++) {
          if (id == _customers[i].id) {
            cb(_customers[i]);
            console.log(_customers[i]);
          }
        }
      }
    }

    this.addCustomer = function (customer) {
      customer.id = _customerId++;
      _customers.unshift(customer);
      console.log(_customers);
      $state.go("app.showCustomer", { id: _customerId - 1 });

    }

    this.updateCustomer = function (customer) {
      for (var i = 0; i < _customers.length; i++) {
        if (_customers[i].id == customer.id) {
          _customers.splice(i, 1, customer);
          $state.go("app.showCustomer", { id: customer.id })
        }
      }
    }

    this.deleteCustomer = function (customer) {
      for (var i = 0; i < _customers.length; i++) {
        if (_customers[i].id == customer.id) {
          _customers.splice(i, 1);
          $state.go("app.account");
          console.log(_customers);
        }
      }
    }

  })