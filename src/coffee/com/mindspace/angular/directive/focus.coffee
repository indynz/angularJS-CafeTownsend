#
# ******************************************************************************************************
#   AngularJS - Directives
# ******************************************************************************************************
#
#   Copyright (c) 2011 Mindspace, LLC.
#   Open source under the MIT License.
#
#
 
angular.directive "ng:focus", (expression, element) ->
  (element) ->
    @$watch expression, (->
      el = element[0]
      
      el.focus()
      el.select()
    ), element