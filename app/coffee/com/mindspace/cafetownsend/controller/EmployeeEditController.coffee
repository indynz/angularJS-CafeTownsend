# ********************************************
# 
# EmployeeEditController
# 
# Manages the presentation model for the EmployeeEditor view
# Supports Save and Cancel edit employee operations
# 
# ********************************************

namespace 'com.mindspace.cafetownsend.controller'

  EmployeeEditController:


    class EmployeeEditController 
      @inject : [ "employeeManager", "$routeParams", "$location" ]
      
      constructor : (@employeeManager, $routeParams, @$location) ->  
        id          = $routeParams?.id || @employeeManager.selected?.id
        @employee   = @employeeManager.findEmployee( id )
        @isEditing  = @employee.isNew or false
        return this

      # 1) Save updated employee information & return to employee list
      save : (employee) ->
        @employeeManager.saveEmployee( employee )
        @selected = ( @employeeManager.selected = employee )
        @selected.isNew = false
        @$location.path( "/employee" )

      # 2) Cancel edits for current employee
      cancel : ->
        if @isEditing
          @employeeManager.deleteEmployee( @employee ) 
          @employeeManager.selected  = null
          @employee           = null
        @$location.path( "/employee" )
        return

      # 3) Delete current employee
      remove : ->
        @employeeManager.deleteEmployee( @employee )
        @employeeManager.selected  = null
        @employee           = null
        @$location.path( "/employee" )
        return
      