var EmployeeServices, InitializationServices, SessionServices;

InitializationServices = (function() {

  function InitializationServices(sessionService, $route, $location, $log, $window) {
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
    this.$on("$afterRouteChange", function(current, previous) {
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

  return InitializationServices;

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

EmployeeServices = (function() {

  function EmployeeServices($xhr, $log) {
    this.$xhr = $xhr;
    $log.log("initializing Employee services...");
    this.employees = [];
    return this;
  }

  EmployeeServices.prototype.loadEmployees = function() {
    var _this = this;
    this.$xhr("GET", "data/members.json", function(statusCode, members) {
      return _this.employees = members;
    });
    return this.employees || [];
  };

  EmployeeServices.prototype.createEmployee = function() {
    var person;
    person = {
      id: uuid.v1(),
      firstName: "",
      lastName: "",
      email: "",
      startDate: "01/09/2012",
      isNew: true
    };
    this.employees.push(person);
    return person;
  };

  EmployeeServices.prototype.saveEmployee = function(target) {
    return target;
  };

  EmployeeServices.prototype.deleteEmployee = function(target) {
    var buffer, id;
    id = (angular.isString(target) ? target : target["id"]);
    buffer = [];
    angular.forEach(this.employees, function(employee, key) {
      if (employee.id !== id) buffer.push(employee);
      return employee;
    });
    return this.employees = buffer;
  };

  EmployeeServices.prototype.findEmployee = function(id) {
    var found;
    found = null;
    angular.forEach(this.employees, function(employee, key) {
      if (employee.id === id) return found || (found = employee);
    });
    return found;
  };

  return EmployeeServices;

})();

angular.service("initializationServices", InitializationServices, {
  $inject: ["sessionServices", "$route", "$location", "$log", "$window"],
  $eager: true
});

angular.service("sessionServices", SessionServices, {
  $inject: ["$log"],
  $eager: true
});

angular.service("employeeServices", EmployeeServices, {
  $inject: ["$xhr", "$log"],
  $eager: false
});
