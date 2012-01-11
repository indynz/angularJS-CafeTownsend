angular.directive("ng:focus", function(expression, element){
	
  return function(element) {
    this.$watch( expression, function() {
		var el = element[0];
		
	   el.focus();
	   el.select();			
			
    }, element);
  };
});