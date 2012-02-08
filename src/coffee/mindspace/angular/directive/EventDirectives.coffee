#
# ******************************************************************************************************
#	 AngularJS - Directives
# ******************************************************************************************************
#
#	 Copyright (c) 2011 Mindspace, LLC.
#	 Open source under the MIT License.
#
#

namespace 'mindspace.angular.directive'

	EventDirectives:

		class EventDirectives
			
			@onLoad : (scope, element, attrs) ->
				expression = attrs['ngOnload']

				# Must wait while currentScope finishes current `apply
				token = setInterval( =>
					clearInterval( token )
					scope.$apply expression
					return
				)

				return

			@dblClick : (scope, element, attrs) ->

				element.bind "dblclick", (event) ->
					scope.$apply( attrs['ngDblclick'] )
					event.stopImmediatePropagation()			
					false
				
				return

			@focus : (scope, element, attrs) ->
				expression = attrs['ngFocus']

				scope.$watch( expression, ( ->
					el = element[0]
					
					el.focus()
					el.select()

					return

				), element )
				return
