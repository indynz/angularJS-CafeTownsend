#
# ******************************************************************************************************
#   AngularJS - CafeTownsend
# ******************************************************************************************************
#
#   AngularJS controllers are essentially `presentation models` used for a specific view or route within
#   the HTML5 client.
#
#   These controllers are actually factories that `add` behavior to Angular scopes and are
#   applied to a new scope each time the view is rendered; unless the scope has `reloadOnSearch == false`.
#
#   Each controller can define its own specific dependencies that will be injected during `construction`
#   As such, shared data models and routes are managed at the `services` layer.
#
#   Note: These controllers should NEVER be instantiated manually via `new <xxx>Controller()` syntax.
#         Instead, AngularJS will construct `scopes` and then `extends` those scope instances using 
#         the <xxx>Controller constructor/factory function. The `extend` effectively injects controller
#         properties and methods into the targeted this.
#
#
#   Copyright (c) 2011 Mindspace, LLC.
#   Open source under the MIT License.
#
# ******************************************************************************************************
#

# "use strict"

# ********************************************
# 
# SessionController
# 
# Configure session and authentication information for entire app.
# 
# ********************************************

class SessionController
  
  constructor:  ( @sessionService, @$location, $route ) ->  
    @user = @sessionService.session

    # Configure session model (for authentication) as root/parent scope for scopes created on route change.
    $route.parent( this )
    return this

  logoutUser : (event) ->
    @sessionService.logout()
    @$location.path( "/login" )
    return


# ********************************************
# 
# LoginController
# 
# Manages the login process for the CafeTownsend application
# Using the current userName/password, authenticate the user.
# 
# ********************************************

class LoginController 
  
  constructor : (@sessionService, @$location) ->
    return this

  # 
  # Authenticate user using specified username and password!
  # 
  authenticateUser : ->
    user = @sessionService.session
    
    if (user.userName isnt "") and (user.password is "angular")
      user.authenticated = true
      @$location.path( "/employee" )
    
    return


# ********************************************
# 
# EmployeeController
# 
# Manages the presentation model for the EmployeeList view
# Supports CRUD operations, employee selection and routing to editor
# 
# ********************************************

class EmployeeController 
  
  constructor : ( delegate, @$location ) ->
    @employees = delegate
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


# ********************************************
# 
# EmployeeEditController
# 
# Manages the presentation model for the EmployeeEditor view
# Supports Save and Cancel edit employee operations
# 
# ********************************************

class EmployeeEditController 
  
  constructor : (@delegate, $routeParams, @$location) ->  
    id          = $routeParams?.id || @delegate.selected?.id
    @employee   = @delegate.findEmployee( id )
    @isEditing  = @employee.isNew or false
    return this

  # 1) Save updated employee information & return to employee list
  save : (employee) ->
    @delegate.saveEmployee( employee )
    @selected = ( @delegate.selected = employee )
    @selected.isNew = false
    @$location.path( "/employee" )

  # 2) Cancel edits for current employee
  cancel : ->
    if @isEditing
      @delegate.deleteEmployee( @employee ) 
      @delegate.selected  = null
      @employee           = null
    @$location.path( "/employee" )
    return

  # 3) Delete current employee
  remove : ->
    @delegate.deleteEmployee( @employee )
    @delegate.selected  = null
    @employee           = null
    @$location.path( "/employee" )
    return
  
    

# ******************************************************
# Register Controllers with Angular Dependency Injector 
# ******************************************************

CafeTownsend.Controllers = { }

CafeTownsend.Controllers.SessionController              = SessionController
CafeTownsend.Controllers.SessionController.$inject      = [ "sessionServices", "$location", "$route" ]

CafeTownsend.Controllers.LoginController                = LoginController
CafeTownsend.Controllers.LoginController.$inject        = [ "sessionServices", "$location" ]

CafeTownsend.Controllers.EmployeeController             = EmployeeController
CafeTownsend.Controllers.EmployeeController.$inject     = [ "employeeManager", "$location" ]

CafeTownsend.Controllers.EmployeeEditController         = EmployeeEditController
CafeTownsend.Controllers.EmployeeEditController.$inject = [ "employeeManager", "$routeParams", "$location" ]
