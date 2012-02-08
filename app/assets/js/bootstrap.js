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
    cafetownsend: "assets/js/CafeTownsend.js"
  });

  head.ready("cafetownsend", function() {
    var makeEventDirective;
    makeEventDirective = (function(fnName) {
      return (function() {
        return mindspace.angular.directive.EventDirectives[fnName];
      });
    });
    return angular.module('CafeTownsend', []).directive('ngDblclick', makeEventDirective("dblClick")).directive('ngFocus', makeEventDirective("focus")).factory("sessionService", [
      '$log', function($log) {
        return new mindspace.cafetownsend.service.SessionService($log);
      }
    ]).factory("employeeManager", [
      '$http', '$q', '$log', function($http, $q, $log) {
        return new mindspace.cafetownsend.service.EmployeeManager($http, $q, $log);
      }
    ]).run(mindspace.cafetownsend.CafeTownsendApp);
  });

}).call(this);
