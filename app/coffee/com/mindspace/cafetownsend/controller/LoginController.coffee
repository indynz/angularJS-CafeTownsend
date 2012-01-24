# ********************************************
# 
# LoginController
# 
# Manages the login process for the CafeTownsend application
# Using the current userName/password, authenticate the user.
# 
# ********************************************

namespace 'com.mindspace.cafetownsend.controller'

  LoginController:

    class LoginController 
      @inject : [ "sessionService", "$location" ]

      constructor : (@sessionService, @$location) ->
        return this

      # 
      # Authenticate user using specified username and password!
      # 
      authenticateUser : ->
        user = @sessionService.session
        
        if (user.userName isnt "") and (user.password is "angular")
          user.authenticated = true
          @$location.path( "/employee" )
        
        return

