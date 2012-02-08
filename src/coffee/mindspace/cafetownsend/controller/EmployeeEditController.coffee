# ********************************************
# 
# EmployeeEditController
# 
# Manages the presentation model for the EmployeeEditor view
# Supports Save and Cancel edit employee operations
# 
# ********************************************

namespace 'mindspace.cafetownsend.controller'

  EmployeeEditController:


    class EmployeeEditController 
      @inject : [ "$scope", "employeeManager", "$routeParams", "$location" ]
      
      constructor : (@$scope, @employeeManager, $routeParams, @$location) ->  
        id                 = $routeParams?.id || @employeeManager.selected?.id

        @$scope.employee   = @employeeManager.findEmployee( id )
        @$scope.isEditing  = @$scope.employee.isNew or false
        
        @$scope.save   = angular.bind( this, @save   )
        @$scope.cancel = angular.bind( this, @cancel )
        @$scope.remove = angular.bind( this, @remove )

        return

      # 1) Save updated employee information & return to employee list
      save : (employee) ->
        @employeeManager.saveEmployee( employee )

        @$scope.selected = ( @employeeManager.selected = employee )
        @$scope.selected.isNew = false
        
        @$location.path( "/employee" )
        return employee

      # 2) Cancel edits for current employee
      cancel : ->
        if @$scope.isEditing
          @employeeManager.deleteEmployee( @employee ) 
          @employeeManager.selected  = null
          @$scope.employee           = null

        @$location.path( "/employee" )
        return

      # 3) Delete current employee
      remove : ->
        @employeeManager.deleteEmployee( @employee )
        @employeeManager.selected  = null
        
        @$scope.employee           = null

        @$location.path( "/employee" )
        return
      