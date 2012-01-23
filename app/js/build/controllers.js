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
    this.$location = $location;
    this.employees = delegate;
    return this;
  }

  EmployeeController.prototype.addNew = function() {
    this.edit(this.employees.createEmployee());
  };

  EmployeeController.prototype.remove = function(employee) {
    if (angular.isUndefined(employee)) return;
    this.employees.deleteEmployee(employee);
    this.employees.selected = null;
  };

  EmployeeController.prototype.select = function(employee) {
    return this.employees.selected = employee;
  };

  EmployeeController.prototype.edit = function(employee) {
    if (!employee) return;
    this.select(employee);
    this.$location.path("/employee/" + employee.id);
    return this.selected;
  };

  return EmployeeController;

})();

EmployeeEditController = (function() {

  function EmployeeEditController(delegate, $routeParams, $location) {
    var id, _ref;
    this.delegate = delegate;
    this.$location = $location;
    id = ($routeParams != null ? $routeParams.id : void 0) || ((_ref = this.delegate.selected) != null ? _ref.id : void 0);
    this.employee = this.delegate.findEmployee(id);
    this.isEditing = this.employee.isNew || false;
    return this;
  }

  EmployeeEditController.prototype.save = function(employee) {
    this.delegate.saveEmployee(employee);
    this.selected = (this.delegate.selected = employee);
    this.selected.isNew = false;
    return this.$location.path("/employee");
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

CafeTownsend.Controllers = {};

CafeTownsend.Controllers.SessionController = SessionController;

CafeTownsend.Controllers.SessionController.$inject = ["sessionServices", "$location", "$route"];

CafeTownsend.Controllers.LoginController = LoginController;

CafeTownsend.Controllers.LoginController.$inject = ["sessionServices", "$location"];

CafeTownsend.Controllers.EmployeeController = EmployeeController;

CafeTownsend.Controllers.EmployeeController.$inject = ["employeeManager", "$location"];

CafeTownsend.Controllers.EmployeeEditController = EmployeeEditController;

CafeTownsend.Controllers.EmployeeEditController.$inject = ["employeeManager", "$routeParams", "$location"];
