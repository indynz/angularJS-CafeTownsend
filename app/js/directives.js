/**
* ******************************************************************************************************
*   AngularJS - CafeTownsend
* ******************************************************************************************************
*
* 	Copyright (c) 2011 Mindspace, LLC.
* 	Open source under the MIT License.
*
*/
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
    var scope = this;
  
    element.bind('dblclick', function(event) {

      scope.$apply(expression);
      event.stopImmediatePropagation();
      
      return false;
	  
    });
  };
});
