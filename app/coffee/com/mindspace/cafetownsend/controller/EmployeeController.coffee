# ********************************************
# 
# EmployeeController
# 
# Manages the presentation model for the EmployeeList view
# Supports CRUD operations, employee selection and routing to editor
# 
# ********************************************

namespace 'com.mindspace.cafetownsend.controller'

  EmployeeController:


    class EmployeeController 
      @inject : [ "employeeManager", "$location" ]

      constructor : ( employeeManager, @$location ) ->
        @employees = employeeManager
        return this
      
      # 1) Create a new employee and show in editor
      addNew : ->
        @edit( @employees.createEmployee() )
        return

      # 2) Delete selected employee
      remove  : (employee) ->
        return if angular.isUndefined( employee )
        @employees.deleteEmployee( employee )
        @employees.selected = null
        return

      # 3) Select employee as `current`
      select : (employee) ->
        (@employees.selected = employee)

      # 4) Edit specified employee in editor view
      edit : (employee) ->
        return if !employee
        @select( employee )
        @$location.path( "/employee/" + employee.id )
        @selected
