#
# ******************************************************************************************************
#   AngularJS - CafeTownsend
# ******************************************************************************************************
# 
# 
#   Copyright (c) 2011 Mindspace, LLC.
#   Open source under the MIT License.
# 
# ******************************************************************************************************
#

# "use strict";

head.js(

  # load files in parallel but execute them in sequence
  
  { jquery      :   "js/lib/jquery.min.js"      }
  { uuid        :   "js/lib/uuid.js"            }
  { namespace   :   "js/lib/namespace.min.js"   }
  { angular     :   "js/lib/angular.js"         }
 
  # Load entire CafeTownsend application code/engine
  # NOTE: if change path below to use CafeTownsend.min.js
  
  { cafetownsend:   "js/build/CafeTownsend.js"  }

)

head.ready( "cafetownsend", ->

  # Declare app-level module which depends on filters, and services
  angular
    .module( 'CafeTownsend', [ ] )
    .factory( "sessionService", ['$log',( ($log) ->
      # Register a provider for a SessionServices; requires $log
      new com.mindspace.cafetownsend.service.SessionService( $log )
    )])
    .factory( "employeeManager", [ '$http', '$q', '$log',( ($http, $q, $log) ->
      # Register a provider for an EmployeeManager; requires $http & $log
      new com.mindspace.cafetownsend.service.EmployeeManager( $http, $q, $log )
    )])
    .run( com.mindspace.cafetownsend.CafeTownsendApp )

)