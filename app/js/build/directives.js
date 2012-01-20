
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
