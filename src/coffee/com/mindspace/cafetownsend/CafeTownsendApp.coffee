#
# ******************************************************************************************************
#   AngularJS - CafeTownsend
# ******************************************************************************************************
# 
#   AngularJS services are objects responsible for common web tasks (typically data services) and
#   are managed by the AngularJS dependency injection system. These services are singletons and are 
#   typically injected via parameters to `Controller` constructor functions.
# 
#   Services are excellent candidates for 
#   
#   -  RPC functionality, 
#   -  Data management of data to be shared across Controllers.
#   -  Programmatically configur relationships between routes (partials or templates) & Controllers
# 
#   Note: these services are instantiated as singletons and auto-registered with the AngularJS 
#         injection system via `angular.service( ... )`
# 
# 
#   Copyright (c) 2011 Mindspace, LLC.
#   Open source under the MIT License.
# 
# ******************************************************************************************************
# 

# "use strict"
# requires( "uuid.js", "angular.js", "controllers.js" )


# ********************************************
#  CafeTownsend initialization service
# 
#  App service which is responsible for the main configuration of the app.
#  Here routes are configured and session authentication is checked for all route changes.
#  
#  http:#docs.angularjs.org/#!angular.service
# 
# ********************************************

namespace 'com.mindspace.cafetownsend'

  CafeTownsendApp:

    class CafeTownsendApp
      # Specify expected constructor services
      @$inject  : [ "sessionService", "$route", "$location", "$log", "$window", '$rootScope' ]

      constructor : (@sessionService, $route, @$location, $log, @$window, $rootScope) ->
        $log.log( "initializing CafeTownsend routes..." )
        
        # Configure template rendering based on routes
        $route.when "/login",
          template: "assets/tmpl/login.html"
          controller: com.mindspace.cafetownsend.controller.LoginController
        $route.when "/employee",
          template: "assets/tmpl/employees.html"
          controller: com.mindspace.cafetownsend.controller.EmployeeController
        $route.when "/employee/:id",
          template: "assets/tmpl/employee_edit.html"
          controller: com.mindspace.cafetownsend.controller.EmployeeEditController
        $route.otherwise( redirectTo: "/employee" )
        
        # Now listen for `#afterRouteChange` events
        $rootScope.$on "$afterRouteChange", (current, previous) =>
          user          = @sessionService.session
          authenticated = (user and user.authenticated)
          
          # Must login before other views are available.
          view          = (if authenticated then @$location.path() else "")
          
          if view.indexOf("/employee") > -1
            @$window.scrollTo 0, 0
          else
            @$location.path (if authenticated then "/employee" else "/login") 
          return true

        return this