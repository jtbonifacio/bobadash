angular
  .module("bobaApp")
  .service("serverService", function ($http, $state) {
    var _serverId = 2;
    var _servers = [];

    var _server = null;

    this.getServer = function () {
      return _server;
    }

    this.setServer = function (s) {
      _server = s;
    }

    this.getServers = function (cb) {
      if (_servers.length == 0) {
        $http.get("../db/servers.json")
          .success(function (response) {
            _servers = response;
            cb(_servers);
          })
          .error(function (error) {
            console.log(error);
          })
      }
      else {
        cb(_servers);
      }
    }

    this.getServerUserPass = function (user, pass, cb) {
      console.log(_servers);
      for (var i = 0; i < _servers.length; i++) {
        if (user == _servers[i].userName && pass == _servers[i].pass) {
          cb(_servers[i]);
        }
      }
    }

    this.getServerById = function (id, cb) {
      if (id == "" || id == undefined || id == null) {

        var server = {
          firstName: "",
          lastName: "",
          dob: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
          transportation: "",
          driversLicense: "",
          licensePlate: "",
          availability: "",
          userName: "",
          pass: "",
          type: "customer"
        }

        cb(server);
      }
      else {
        for (var i = 0; i < _servers.length; i++) {
          if (id == _servers[i].id) {
            cb(_servers[i]);
          }
        }
      }
    }

    this.addServer = function (server) {
      server.id = _serverId++;
      _servers.unshift(server);
      $state.go("app.showServer", { id: _serverId - 1 })
    }

    this.updateServer = function (server) {
      for (var i = 0; i < _servers.length; i++) {
        if (_servers[i].id == server.id) {
          _servers.splice(i, 1, server);
          $state.go("app.showServer", { id: server.id })
        }
      }
    }

    this.deleteServer = function (server) {
      for (var i = 0; i < _servers.length; i++) {
        if (_servers[i].id == server.id) {
          _servers.splice(i, 1);
          $state.go("app.accountEmp");
        }
      }
    }

  })