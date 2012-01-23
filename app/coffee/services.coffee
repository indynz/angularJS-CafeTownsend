#
# ******************************************************************************************************
#   AngularJS - CafeTownsend
# ******************************************************************************************************
# 
#   Copyright (c) 2011 Mindspace, LLC.
#   Open source under the MIT License.
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

class CafeTownsend

  constructor : (@sessionService, $route, @$location, $log, @$window, $rootScope) ->
    $log.log( "initializing CafeTownsend routes..." )
    
    # Configure template rendering based on routes
    $route.when "/login",
      template: "data/partials/login.html"
      controller: CafeTownsend.Controllers.LoginController
    $route.when "/employee",
      template: "data/partials/employees.html"
      controller: CafeTownsend.Controllers.EmployeeController
    $route.when "/employee/:id",
      template: "data/partials/employee_edit.html"
      controller: CafeTownsend.Controllers.EmployeeEditController
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


# ********************************************
# 
#  Session Service:  
# 
#  Build the application session and provide a centralized logout feature
#  Use closure to store session data.
#  
# ********************************************

class SessionServices
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
   
# Specify expected constructor services
SessionServices.$inject   = [ "$log" ]
 
    
# ********************************************
# Employees CRUD Service:  
# 
# Get list of all employees and current/selected employee
# ********************************************

class EmployeeManager
  
  constructor : (@$http, @$q, $log) ->
    $log.log "initializing Employee services..."
    @list      = [ ]
    @selected  = null  
    @cache     = @loadEmployees()
    return this

  # Load all known employees
  loadEmployees : ->        
    if !@cache
      @cache = @$http
        .get( "data/members.json" )
        .success (members, statusCode, headers, config) => 
          @list = members
    # always return a new promise
    return @cache.then( (members) ->
      return members
    )

  createEmployee : ->
    person = 
      id        : uuid.v1()
      firstName : ""
      lastName  : ""
      email     : ""
      startDate : "01/09/2012"
      isNew     : true
    @saveEmployee(person)

  # Simulate save functionality...
  saveEmployee : (target) ->
    if target?
      target.isNew = true
      @list.push( target ) if !@findEmployee( target.id )        
    return target
    
  # Remove record by id (if found); return updated employees
  deleteEmployee : (target) ->
    id     = (if angular.isString(target) then target else target["id"])
    buffer = [ ]
    angular.forEach @list, (employee, key) ->
      buffer.push employee unless employee.id is id
      employee
    (@list = buffer)
    
  # Select employee by ID  
  findEmployee : (id) ->    
    found = null
    angular.forEach @list, (employee, key) ->
      found = employee  if employee.id is id
    return found
    
# Specify expected constructor services
EmployeeManager.$inject  = [ "$http", '$q', "$log" ]




# **************************************************************
# Register Modules & singleton services with Angular DI system     
# **************************************************************



# Declare app-level module which depends on filters, and services
angular
  .module( 'CafeTownsend', [ ] )
  .service( "sessionServices", ->
    # Register a provider for a SessionServices; requires $log
    @$get = ['$log',( ($log) ->
      new SessionServices( $log )
    )]
    return
  )
  .service( "employeeManager", ->
    # Register a provider for an EmployeeManager; requires $http & $log
    @$get = [ '$http', '$q', '$log',( ($http, $q, $log) ->
      new EmployeeManager( $http, $q, $log )
    )]
    return
  )
  .run([ "sessionServices", "$route", "$location", "$log", "$window", '$rootScope', CafeTownsend ])

