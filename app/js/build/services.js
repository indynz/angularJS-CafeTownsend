var CafeTownsend, EmployeeManager, SessionServices;

CafeTownsend = (function() {

  function CafeTownsend(sessionService, $route, $location, $log, $window, $rootScope) {
    var _this = this;
    this.sessionService = sessionService;
    this.$location = $location;
    this.$window = $window;
    $log.log("initializing CafeTownsend routes...");
    $route.when("/login", {
      template: "data/partials/login.html",
      controller: CafeTownsend.Controllers.LoginController
    });
    $route.when("/employee", {
      template: "data/partials/employees.html",
      controller: CafeTownsend.Controllers.EmployeeController
    });
    $route.when("/employee/:id", {
      template: "data/partials/employee_edit.html",
      controller: CafeTownsend.Controllers.EmployeeEditController
    });
    $route.otherwise({
      redirectTo: "/employee"
    });
    $rootScope.$on("$afterRouteChange", function(current, previous) {
      var authenticated, user, view;
      user = _this.sessionService.session;
      authenticated = user && user.authenticated;
      view = (authenticated ? _this.$location.path() : "");
      if (view.indexOf("/employee") > -1) {
        _this.$window.scrollTo(0, 0);
      } else {
        _this.$location.path((authenticated ? "/employee" : "/login"));
      }
      return true;
    });
    return this;
  }

  return CafeTownsend;

})();

SessionServices = (function() {

  function SessionServices($log) {
    $log.log("initializing Session services...");
    this.session = {
      userName: "<your email>",
      password: "",
      authenticated: false
    };
    return this;
  }

  SessionServices.prototype.logout = function() {
    this.session.authenticated = false;
  };

  return SessionServices;

})();

SessionServices.$inject = ["$log"];

EmployeeManager = (function() {

  function EmployeeManager($http, $q, $log) {
    this.$http = $http;
    this.$q = $q;
    $log.log("initializing Employee services...");
    this.list = [];
    this.selected = null;
    this.cache = this.loadEmployees();
    return this;
  }

  EmployeeManager.prototype.loadEmployees = function() {
    var _this = this;
    if (!this.cache) {
      this.cache = this.$http.get("data/members.json").success(function(members, statusCode, headers, config) {
        return _this.list = members;
      });
    }
    return this.cache.then(function(members) {
      return members;
    });
  };

  EmployeeManager.prototype.createEmployee = function() {
    var person;
    person = {
      id: uuid.v1(),
      firstName: "",
      lastName: "",
      email: "",
      startDate: "01/09/2012",
      isNew: true
    };
    return this.saveEmployee(person);
  };

  EmployeeManager.prototype.saveEmployee = function(target) {
    if (target != null) {
      target.isNew = true;
      if (!this.findEmployee(target.id)) this.list.push(target);
    }
    return target;
  };

  EmployeeManager.prototype.deleteEmployee = function(target) {
    var buffer, id;
    id = (angular.isString(target) ? target : target["id"]);
    buffer = [];
    angular.forEach(this.list, function(employee, key) {
      if (employee.id !== id) buffer.push(employee);
      return employee;
    });
    return this.list = buffer;
  };

  EmployeeManager.prototype.findEmployee = function(id) {
    var found;
    found = null;
    angular.forEach(this.list, function(employee, key) {
      if (employee.id === id) return found = employee;
    });
    return found;
  };

  return EmployeeManager;

})();

EmployeeManager.$inject = ["$http", '$q', "$log"];

angular.module('CafeTownsend', []).service("sessionServices", function() {
  this.$get = [
    '$log', (function($log) {
      return new SessionServices($log);
    })
  ];
}).service("employeeManager", function() {
  this.$get = [
    '$http', '$q', '$log', (function($http, $q, $log) {
      return new EmployeeManager($http, $q, $log);
    })
  ];
}).run(["sessionServices", "$route", "$location", "$log", "$window", '$rootScope', CafeTownsend]);
