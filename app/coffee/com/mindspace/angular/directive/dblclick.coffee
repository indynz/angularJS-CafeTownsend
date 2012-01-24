#
# ******************************************************************************************************
#   AngularJS - Directives
# ******************************************************************************************************
#
#   Copyright (c) 2011 Mindspace, LLC.
#   Open source under the MIT License.
#
#
 
angular.directive "ng:dblclick", (expression, element) ->
  (element) ->
    element.bind "dblclick", (event) =>
      @$apply expression
      event.stopImmediatePropagation()
      
      false