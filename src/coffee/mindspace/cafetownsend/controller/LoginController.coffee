# ********************************************
# 
# LoginController
# 
# Manages the login process for the CafeTownsend application
# Using the current userName/password, authenticate the user.
# 
# ********************************************

namespace 'mindspace.cafetownsend.controller'

	LoginController:

		class LoginController 
			@inject : [ "$scope", "sessionService", "$location" ]

			constructor : (@$scope, @sessionService, @$location) ->
				@$scope.user             = @sessionService.session
				@$scope.authenticateUser = angular.bind(this, @authenticateUser)
				return @$scope

			# 
			# Authenticate user using specified username and password!
			# 
			authenticateUser : ->
				user = @sessionService.session
				if (user.userName isnt "") and (user.password is "angular")
					user.authenticated = true
					@$location.path( "/employee" )
				return