(function() {
  var CafeTownsendApp, EmployeeController, EmployeeEditController, EmployeeManager, EventDirectives, LoginController, SessionController, SessionService;

  namespace('mindspace.angular.directive', {
    EventDirectives: EventDirectives = (function() {

      function EventDirectives() {}

      EventDirectives.onLoad = function(scope, element, attrs) {
        var expression, token,
          _this = this;
        expression = attrs['ngOnload'];
        token = setInterval(function() {
          clearInterval(token);
          scope.$apply(expression);
        });
      };

      EventDirectives.dblClick = function(scope, element, attrs) {
        element.bind("dblclick", function(event) {
          scope.$apply(attrs['ngDblclick']);
          event.stopImmediatePropagation();
          return false;
        });
      };

      EventDirectives.focus = function(scope, element, attrs) {
        var expression;
        expression = attrs['ngFocus'];
        scope.$watch(expression, (function() {
          var el;
          el = element[0];
          el.focus();
          el.select();
        }), element);
      };

      return EventDirectives;

    })()
  });

  namespace('mindspace.cafetownsend.service', {
    EmployeeManager: EmployeeManager = (function() {

      EmployeeManager.$inject = ["$http", '$q', "$log"];

      function EmployeeManager($http, $q, $log) {
        this.$http = $http;
        this.$q = $q;
        $log.log("initializing Employee services...");
        this.list = this.loadEmployees();
        this.selected = null;
        return this;
      }

      EmployeeManager.prototype.loadEmployees = function() {
        var _this = this;
        if (!this.cache) {
          this.cache = this.$http.get("assets/data/members.json").success(function(members, statusCode, headers, config) {
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

    })()
  });

  namespace('mindspace.cafetownsend.service', {
    SessionService: SessionService = (function() {

      SessionService.$inject = ["$log"];

      function SessionService($log) {
        $log.log("initializing Session services...");
        this.session = {
          userName: "<your email>",
          password: "",
          authenticated: false
        };
        return this;
      }

      SessionService.prototype.logout = function() {
        this.session.authenticated = false;
      };

      return SessionService;

    })()
  });

  namespace('mindspace.cafetownsend.controller', {
    EmployeeController: EmployeeController = (function() {

      EmployeeController.inject = ["$scope", "employeeManager", "$location"];

      function EmployeeController($scope, employeeManager, $location) {
        this.$scope = $scope;
        this.employeeManager = employeeManager;
        this.$location = $location;
        this.$scope.employees = this.employeeManager;
        this.$scope.selected = null;
        this.$scope.addNew = angular.bind(this, this.addNew);
        this.$scope.remove = angular.bind(this, this.remove);
        this.$scope.select = angular.bind(this, this.select);
        this.$scope.edit = angular.bind(this, this.edit);
        return;
      }

      EmployeeController.prototype.addNew = function() {
        this.edit(this.$scope.employees.createEmployee());
      };

      EmployeeController.prototype.remove = function(employee) {
        if (angular.isUndefined(employee)) return;
        this.$scope.employees.deleteEmployee(employee);
        this.$scope.employees.selected = this.$scope.selected = null;
        return employee;
      };

      EmployeeController.prototype.select = function(employee) {
        return this.$scope.selected = this.$scope.employees.selected = employee;
      };

      EmployeeController.prototype.edit = function(employee) {
        if (!employee) return;
        this.select(employee);
        this.$location.path("/employee/" + employee.id);
        return this.$scope.selected;
      };

      return EmployeeController;

    })()
  });

  namespace('mindspace.cafetownsend.controller', {
    EmployeeEditController: EmployeeEditController = (function() {

      EmployeeEditController.inject = ["$scope", "employeeManager", "$routeParams", "$location"];

      function EmployeeEditController($scope, employeeManager, $routeParams, $location) {
        var id, _ref;
        this.$scope = $scope;
        this.employeeManager = employeeManager;
        this.$location = $location;
        id = ($routeParams != null ? $routeParams.id : void 0) || ((_ref = this.employeeManager.selected) != null ? _ref.id : void 0);
        this.$scope.employee = this.employeeManager.findEmployee(id);
        this.$scope.isEditing = this.$scope.employee.isNew || false;
        this.$scope.save = angular.bind(this, this.save);
        this.$scope.cancel = angular.bind(this, this.cancel);
        this.$scope.remove = angular.bind(this, this.remove);
        return;
      }

      EmployeeEditController.prototype.save = function(employee) {
        this.employeeManager.saveEmployee(employee);
        this.$scope.selected = (this.employeeManager.selected = employee);
        this.$scope.selected.isNew = false;
        this.$location.path("/employee");
        return employee;
      };

      EmployeeEditController.prototype.cancel = function() {
        if (this.$scope.isEditing) {
          this.employeeManager.deleteEmployee(this.employee);
          this.employeeManager.selected = null;
          this.$scope.employee = null;
        }
        this.$location.path("/employee");
      };

      EmployeeEditController.prototype.remove = function() {
        this.employeeManager.deleteEmployee(this.employee);
        this.employeeManager.selected = null;
        this.$scope.employee = null;
        this.$location.path("/employee");
      };

      return EmployeeEditController;

    })()
  });

  namespace('mindspace.cafetownsend.controller', {
    LoginController: LoginController = (function() {

      LoginController.inject = ["$scope", "sessionService", "$location"];

      function LoginController($scope, sessionService, $location) {
        this.$scope = $scope;
        this.sessionService = sessionService;
        this.$location = $location;
        this.$scope.user = this.sessionService.session;
        this.$scope.authenticateUser = angular.bind(this, this.authenticateUser);
        return this.$scope;
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

    })()
  });

  namespace('mindspace.cafetownsend.controller', {
    SessionController: SessionController = (function() {

      SessionController.inject = ["$scope", "sessionManager", "$location", "$route"];

      function SessionController($scope, sessionService, $location, $route) {
        this.sessionService = sessionService;
        this.$location = $location;
        $scope.user = this.sessionService.session;
        $scope.logoutUser = angular.bind(this, this.logoutUser);
        $route.parent($scope);
        return $scope;
      }

      SessionController.prototype.logoutUser = function(event) {
        this.sessionService.logout();
        this.$location.path("/login");
      };

      return SessionController;

    })()
  });

  namespace('mindspace.cafetownsend', {
    CafeTownsendApp: CafeTownsendApp = (function() {

      CafeTownsendApp.$inject = ["sessionService", "$route", "$location", "$log", "$window", '$rootScope'];

      function CafeTownsendApp(sessionService, $route, $location, $log, $window, $rootScope) {
        var _this = this;
        this.sessionService = sessionService;
        this.$location = $location;
        this.$window = $window;
        $log.log("initializing CafeTownsend routes...");
        $route.when("/login", {
          template: "assets/tmpl/login.html",
          controller: mindspace.cafetownsend.controller.LoginController
        });
        $route.when("/employee", {
          template: "assets/tmpl/employees.html",
          controller: mindspace.cafetownsend.controller.EmployeeController
        });
        $route.when("/employee/:id", {
          template: "assets/tmpl/employee_edit.html",
          controller: mindspace.cafetownsend.controller.EmployeeEditController
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

      return CafeTownsendApp;

    })()
  });

}).call(this);
