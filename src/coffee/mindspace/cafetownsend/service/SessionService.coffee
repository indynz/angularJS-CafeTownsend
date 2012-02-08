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
# 
#  Session Service:  
# 
#  Build the application session and provide a centralized logout feature
#  Use closure to store session data.
#  
# ********************************************

namespace 'mindspace.cafetownsend.service'

  SessionService:

    class SessionService
      # Specify expected constructor services
      @$inject  : [ "$log" ]

      constructor : ( $log ) ->
        $log.log( "initializing Session services..." )
        @session = 
          userName      : "<your email>"
          password      : ""
          authenticated : false      
        return this

      logout : ->
        @session.authenticated = false
        return
     