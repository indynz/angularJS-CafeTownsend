(function() {
  var FocusDirective;

  angular.directive("ng:dblclick", function(expression, element) {
    return function(element) {
      var _this = this;
      return element.bind("dblclick", function(event) {
        _this.$apply(expression);
        event.stopImmediatePropagation();
        return false;
      });
    };
  });

  angular.directive("ng:focus", function(expression, element) {
    return function(element) {
      return this.$watch(expression, (function() {
        var el;
        el = element[0];
        el.focus();
        return el.select();
      }), element);
    };
  });

  namespace('com.mindspace.angularjs.directive', {
    FocusDirective: FocusDirective = (function() {

      function FocusDirective(scope, element, attr) {
        var eventType;
        eventType = "focus";
        this.scope.$watch(attr[eventType], function(newVal, oldVal) {
          var el;
          el = element[0];
          el.focus();
          return el.select();
        });
        return this;
      }

      return FocusDirective;

    })()
  });

}).call(this);
