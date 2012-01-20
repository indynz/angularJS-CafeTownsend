var EmployeeController, EmployeeEditController, LoginController, SessionController;

SessionController = (function() {

  function SessionController(sessionService, $location, $route) {
    this.sessionService = sessionService;
    this.$location = $location;
    this.user = this.sessionService.session;
    $route.parent(this);
    return this;
  }

  SessionController.prototype.logoutUser = function(event) {
    this.sessionService.logout();
    this.$location.path("/login");
  };

  return SessionController;

})();

LoginController = (function() {

  function LoginController(sessionService, $location) {
    this.sessionService = sessionService;
    this.$location = $location;
    return this;
  }

  LoginController.prototype.authenticateUser = function() {
    var user;
    user = this.sessionService.session;
    if ((user.userName !== "") && (user.password === "angular")) {
      user.authenticated = true;
      this.$location.path("/employee");
    }
  };

  return LoginController;

})();

EmployeeController = (function() {

  function EmployeeController(delegate, $location) {
    this.delegate = delegate;
    this.$location = $location;
    this.employees = this.delegate.loadEmployees();
    this.selected = this.delegate.selected;
    return this;
  }

  EmployeeController.prototype.addNew = function() {
    this.edit(this.delegate.createEmployee());
  };

  EmployeeController.prototype.remove = function(employee) {
    if (angular.isUndefined(employee)) return;
    this.employees = this.delegate.deleteEmployee(employee);
    this.selected = (this.delegate.selected = null);
    return employee;
  };

  EmployeeController.prototype.select = function(employee) {
    this.selected = (this.delegate.selected = employee);
    return this.selected;
  };

  EmployeeController.prototype.edit = function(employee) {
    if (angular.isUndefined(employee)) return;
    this.select(employee);
    this.$location.path("/employee/" + employee.id);
    return this.selected;
  };

  return EmployeeController;

})();

EmployeeEditController = (function() {

  function EmployeeEditController(delegate, $routeParams, $location) {
    this.delegate = delegate;
    this.$location = $location;
    if (angular.isDefined($routeParams.id)) {
      this.delegate.selected = this.delegate.findEmployee($routeParams.id);
    }
    this.employee = angular.Object.copy(this.delegate.selected, {});
    this.isEditing = this.employee.isNew || false;
    return this;
  }

  EmployeeEditController.prototype.save = function() {
    angular.Object.copy(this.employee, this.employee != null ? this.delegate.selected : void 0);
    if (this.selected != null) delete this.delegate.selected.isNew;
    this.delegate.saveEmployee(this.delegate.selected);
    this.$location.path("/employee");
    return this.selected;
  };

  EmployeeEditController.prototype.cancel = function() {
    if (this.isEditing) {
      this.delegate.deleteEmployee(this.employee);
      this.delegate.selected = null;
      this.employee = null;
    }
    this.$location.path("/employee");
  };

  EmployeeEditController.prototype.remove = function() {
    this.delegate.deleteEmployee(this.employee);
    this.delegate.selected = null;
    this.employee = null;
    this.$location.path("/employee");
  };

  return EmployeeEditController;

})();

CafeTownsend.Controllers.SessionController = SessionController;

CafeTownsend.Controllers.SessionController.$inject = ["sessionServices", "$location", "$route"];

CafeTownsend.Controllers.LoginController = LoginController;

CafeTownsend.Controllers.LoginController.$inject = ["sessionServices", "$location"];

CafeTownsend.Controllers.EmployeeController = EmployeeController;

CafeTownsend.Controllers.EmployeeController.$inject = ["employeeServices", "$location"];

CafeTownsend.Controllers.EmployeeEditController = EmployeeEditController;

CafeTownsend.Controllers.EmployeeEditController.$inject = ["employeeServices", "$routeParams", "$location"];
