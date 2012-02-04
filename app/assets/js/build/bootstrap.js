(function() {

  head.js({
    jquery: "assets/js/lib/jquery.min.js"
  }, {
    uuid: "assets/js/lib/uuid.js"
  }, {
    namespace: "assets/js/lib/namespace.min.js"
  }, {
    angular: "assets/js/lib/angular/angular.js"
  }, {
    directives: "assets/js/build/directives.js"
  }, {
    cafetownsend: "assets/js/build/CafeTownsend.js"
  });

  head.ready("cafetownsend", function() {
    return angular.module('CafeTownsend', []).factory("sessionService", [
      '$log', function($log) {
        return new com.mindspace.cafetownsend.service.SessionService($log);
      }
    ]).factory("employeeManager", [
      '$http', '$q', '$log', function($http, $q, $log) {
        return new com.mindspace.cafetownsend.service.EmployeeManager($http, $q, $log);
      }
    ]).run(com.mindspace.cafetownsend.CafeTownsendApp);
  });

}).call(this);
