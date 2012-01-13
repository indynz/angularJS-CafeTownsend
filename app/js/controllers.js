/**
* ******************************************************************************************************
*   AngularJS controllers are essentially `presentation models` used for a specific view or route within
*   the HTML5 client.
*
*   These controllers are actually factories that `add` behavior to Angular scopes and are
*   applied to a new scope each time the view is rendered; unless the scope has `reloadOnSearch == false`.
*
*   Each controller can define its own specific dependencies that will be injected during `construction`
*   As such, shared data models and routes are managed at the `services` layer.
*
*   Note: These controllers should NEVER be instantiated manually via `new <xxx>Controller()` syntax.
*         Instead, AngularJS will construct `scopes` and then `extends` those scope instances using 
*         the <xxx>Controller constructor/factory function. The `extend` effectively injects controller
*         properties and methods into the targeted scope.
*
* ******************************************************************************************************
*/


/**
 * SessionController
 *
 * Configure session and authentication information for entire app.
 */
CafeTownsend.Controllers.SessionController = function ( sessionService, $location, $route ) {
  var scope      = this;
      scope.user = sessionService.session();
  
  scope.logoutUser  = function( event ) {
    sessionService.logout();
    $location.path( "/login" );
  };

  // Configure session model (for authentication)
  
  // NOTE: this is redundant here... as already performed in services.js
  // $route.parent( scope );
}
CafeTownsend.Controllers.SessionController.$inject = [ 'sessionService', '$location', '$route' ];



/**
 * LoginController
 *
 * Manages the login process for the CafeTownsend application
 * Using the current userName/password, authenticate the user.
 */
CafeTownsend.Controllers.LoginController = function ( sessionService, $location ) {
  var scope = this;

  /**
   * Authenticate user using specified username and password!
   */
  scope.authenticateUser = function() {
    var user = sessionService.session();
    
    if ((user.userName != "") && (user.password == "angular"))
    {
      user.authenticated = true;
      $location.path('/employee');
    }
  };
}
CafeTownsend.Controllers.LoginController.$inject = [ 'sessionService', '$location' ];



/**
 * EmployeeController
 *
 * Manages the presentation model for the EmployeeList view
 * Supports CRUD operations, employee selection and routing to editor
 */
CafeTownsend.Controllers.EmployeeController = function ( session, delegate, $location ) {
  var scope = this;
    scope.employees =  delegate.loadAll();
    scope.selected  =  delegate.selected;
  
  
  
  // 1) Create a new employee and show in editor
  scope.addNew    = function () {
    scope.edit( delegate.create() );
  };
  
  // 2) Delete selected employee
  scope.remove    = function ( employee ) {
    if ( angular.isUndefined(employee) ) return;
    
    scope.employees = delegate.delete( employee );
    scope.selected  = (delegate.selected = null);
  };

  // 3) Select employee as `current`
  scope.select    = function (employee) {
    scope.selected = (delegate.selected = employee);
  };
  
  // 4) Edit specified employee in editor view
  scope.edit     = function ( employee ) {
    if ( angular.isUndefined(employee) ) return;
    
    scope.select(employee);
	$location.path( '/employee/'+employee.id );
  };
  
}
CafeTownsend.Controllers.EmployeeController.$inject = [ 'sessionService', 'employeeService', '$location' ];





/**
 * EmployeeEditController
 *
 * Manages the presentation model for the EmployeeEditor view
 * Supports Save and Cancel edit employee operations
 */
CafeTownsend.Controllers.EmployeeEditController = function ( delegate, $routeParams, $location ) {
  var scope  =  this;
  
	  if ( angular.isDefined( $routeParams.id ) ) {
	  	  // Adjust to deeplink to insure the correct employee is selected
		  
		  delegate.selected = delegate.findByID( $routeParams.id );
	  }
	  
      scope.employee  =  angular.Object.copy( delegate.selected, { } );
      scope.isEditing =  scope.employee.isNew || false;
  
  // 1) Save updated employee information & return to employee list
  scope.save    = function() {
    if ( scope.employee != null ) {
      angular.Object.copy( scope.employee, delegate.selected );
    }
    
    // Remove the `isNew` property
    if ( delegate.selected != null ) {
      delete delegate.selected.isNew;
	  
	  delegate.save( delegate.selected );
    }
    
	$location.path('/employee');
  };
  
  // 2) Cancel edits for current employee
  scope.cancel    = function() {
     if ( scope.isEditing ) 
     {
       // If cancelling a new record... be sure to 
       // auto-remove it from our list also
       delegate.delete( scope.employee.id );
       delegate.selected = null;    
       
       scope.employee     = null;
     }
    
     $location.path('/employee');
  };

  // 3) Delete current employee
  scope.remove    = function ( ) {    
    delegate.delete( scope.employee.id );

    delegate.selected = null;    
    scope.employee     = null;
    
    $location.path('/employee');
  };

}
CafeTownsend.Controllers.EmployeeEditController.$inject = [ 'employeeService', '$routeParams', '$location' ];
