# ********************************************
# 
# EmployeeController
# 
# Manages the presentation model for the EmployeeList view
# Supports CRUD operations, employee selection and routing to editor
# 
# ********************************************

namespace 'mindspace.cafetownsend.controller'

  EmployeeController:


    class EmployeeController 
      @inject : [ "$scope", "employeeManager", "$location" ]

      constructor : ( @$scope, @employeeManager, @$location ) ->
        @$scope.employees = @employeeManager
        @$scope.selected = null

        @$scope.addNew = angular.bind( this, @addNew )
        @$scope.remove = angular.bind( this, @remove )
        @$scope.select = angular.bind( this, @select )
        @$scope.edit   = angular.bind( this, @edit   )
        
        return 
      
      # 1) Create a new employee and show in editor
      addNew : ->
        @edit( @$scope.employees.createEmployee() )
        return

      # 2) Delete selected employee
      remove  : (employee) ->
        return if angular.isUndefined( employee )
        
        @$scope.employees.deleteEmployee( employee )
        @$scope.employees.selected = @$scope.selected = null

        return employee

      # 3) Select employee as `current`
      select : (employee) ->
        (@$scope.selected = @$scope.employees.selected = employee)


      # 4) Edit specified employee in editor view
      edit : (employee) ->
        return if !employee
        @select( employee )
        
        @$location.path( "/employee/" + employee.id )
        return @$scope.selected
