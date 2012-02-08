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
# Employees CRUD Service:  
# 
# Get list of all employees and current/selected employee
# ********************************************

namespace 'mindspace.cafetownsend.service'

  EmployeeManager:

    class EmployeeManager
      # Specify expected constructor services
      @$inject  : [ "$http", '$q', "$log" ]
      
      constructor : (@$http, @$q, $log) ->
        $log.log "initializing Employee services..."
        @list      = @loadEmployees()
        @selected  = null  
        return this

      # Load all known employees
      loadEmployees : ->        
        if !@cache
          @cache = @$http
            .get( "assets/data/members.json" )
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
        