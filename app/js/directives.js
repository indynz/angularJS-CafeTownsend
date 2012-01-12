angular.directive("ng:focus", function(expression, element){
  
  return function(element) {
    this.$watch( expression, function() {
    var el = element[0];
    
        el.focus();
        el.select();      
      
    }, element);
  };
});


angular.directive("ng:dblclick", function(expression, element){
  return function(element){
    var self = this;
  
    element.bind('dblclick', function(event) {
      self.$apply(expression);
    
      event.stopImmediatePropagation();
      event.preventDefault();
      
      return false;
    });
  };
});
