(function() {

  head.js({
    jquery: "js/lib/jquery.min.js"
  }, {
    uuid: "js/lib/uuid.js"
  }, {
    namespace: "js/lib/namespace.min.js"
  }, {
    angular: "js/lib/angular.js"
  }, {
    cafetownsend: "js/build/CafeTownsend.js"
  });

  head.ready("cafetownsend", function() {
    return angular.module('CafeTownsend', []).factory("sessionService", [
      '$log', (function($log) {
        return new com.mindspace.cafetownsend.service.SessionService($log);
      })
    ]).factory("employeeManager", [
      '$http', '$q', '$log', (function($http, $q, $log) {
        return new com.mindspace.cafetownsend.service.EmployeeManager($http, $q, $log);
      })
    ]).run(com.mindspace.cafetownsend.CafeTownsendApp);
  });

}).call(this);
