# *
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

class InitializationServices

  constructor : (@sessionService, $route, @$location, $log, @$window) ->
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
    @$on "$afterRouteChange", (current, previous) =>
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
    
    
# ********************************************
# Employees CRUD Service:  
# 
# Get list of all employees and current/selected employee
# ********************************************

class EmployeeServices
  
  constructor : (@$xhr, $log) ->
    $log.log "initializing Employee services..."

    @employees = [ ]  # @loadEmployees()  
    return this

  # Load all known employees
  loadEmployees : ->
    @$xhr "GET", "data/members.json", (statusCode, members) =>
      @employees = members      
    (@employees || []) 

  createEmployee : ->
    person = 
      id        : uuid.v1()
      firstName : ""
      lastName  : ""
      email     : ""
      startDate : "01/09/2012"
      isNew     : true
    
    @employees.push( person )
    person  

  # Simulate save functionality...
  saveEmployee : (target) ->
    target
    
  # Remove record by id (if found); return updated employees
  deleteEmployee : (target) ->
    id     = (if angular.isString(target) then target else target["id"])
    buffer = [ ]
    angular.forEach @employees, (employee, key) ->
      buffer.push employee unless employee.id is id
      employee
    (@employees = buffer)
    
  # Select employee by ID  
  findEmployee : (id) ->
    found = null
    angular.forEach @employees, (employee, key) ->
      found ||= employee  if employee.id is id
    found




# **************************************************************
# Register singleton services with Angular Dependency Injector     
# **************************************************************

angular.service "initializationServices", InitializationServices,
  $inject: [ "sessionServices", "$route", "$location", "$log", "$window" ]
  $eager: true
  
angular.service "sessionServices", SessionServices, 
  $inject : [ "$log" ]
  $eager  : true

angular.service "employeeServices", EmployeeServices, 
  $inject : [ "$xhr", "$log" ]
  $eager  : false
