#
# ######################################################################################################
#   AngularJS - Directives
# ######################################################################################################
#
#   Copyright (c) 2011 Mindspace, LLC.
#   Open source under the MIT License.
#
#

namespace 'com.mindspace.angularjs.directive'

	FocusDirective:

		##
		# @ngdoc directive
		# @name angular.module.ng.$compileProvider.directive.ng:focus
		#
		# @description
		# The ng:focus allows you to watch the specified expression. When
		# evaluation is `true` then the element is focused.
		#
		# @element ANY
		# @param {expression} expression {@link guide/dev_guide.expressions Expression} to evaluate upon
		# click.
		#	
		# @example  
		# 			<input  type="text"
		# 					ng:model="user.userName"
		#					ng:focus="user.userName == ''"
		# 					title="Enter your email as your username ;" />
		#
		class FocusDirective

			constructor : (scope, element, attr) ->
				eventType = "focus"

				@scope.$watch( attr[eventType], (newVal, oldVal) ->
					el = element[0]
					
					el.focus()
					el.select()	
				)
				return this
