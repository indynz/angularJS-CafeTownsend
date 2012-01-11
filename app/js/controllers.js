/**
* ******************************************************************************************************
* 	AngularJS controllers are essentially `presentation models` used for a specific view or route within
*   the HTML5 client.
*
* 	These controllers are actually factories that `add` behavior to Angular scopes and are
*   applied to a new scope each time the view is rendered; unless the scope has `reloadOnSearch == false`.
*
* 	Each controller can define its own specific dependencies that will be injected during `construction`
*   As such, shared data models and routes are managed at the `services` layer.
*
*   Note: these controllers should NEVER be instantiated manually via new <xxx>Controller() syntax.
*         Instead, AngularJS will construct scopes which are then `extend` those scope instances using 
*         the <xxx>Controller constructor/factory function. 
*
* ******************************************************************************************************
*/


/**
 * SessionController
 *
 * Configure session and authentication information for entire app.
 */
CafeTownsend.Controllers.SessionController = function ( sessionService, $location, $route ) {
	var self 		= this;
	    self.user 	= sessionService.session();
	
	self.logout	= function(event) {
		sessionService.logout();
		$location.path( "/login" );
	};

	// Configure session model (for authentication)
	// NOTE: redundant here... as already performed in services.js
	
	$route.parent( self );
}
CafeTownsend.Controllers.SessionController.$inject = [ 'sessionService', '$location', '$route' ];



/**
 * LoginController
 *
 * Manages the login process for the CafeTownsend application
 * Using the current userName/password, authenticate the user.
 */
CafeTownsend.Controllers.LoginController = function ( sessionService, $location ) {
	var self = this;

	/**
	 * Authenticate user using specified username and password!
	 */
	self.authenticateUser = function() {
		var user = sessionService.session();
		
		if ((user.userName != "") && (user.password == "angular"))
		{
			user.authenticated = true;
			$location.path('/employees');
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
CafeTownsend.Controllers.EmployeeController = function ( delegate, $location ) {
	var self = this;
	
	self.employees =  delegate.loadAll();
	self.selected  =  delegate.selected;
	
	// 1) Create a new employee and show in editor
	self.addNew    = function () {
		self.edit( delegate.createNew() );
	};
	
	// 2) Remove selected employee
	self.remove    = function ( employee ) {
		self.employees = delegate.remove( employee.id );
		self.selected  = (delegate.selected = null);
	};

	// 3) Select employee as `current`
	self.select    = function (employee) {
		self.selected = (delegate.selected = employee);
	};
	
	// 4) Edit specified employee in editor view
	self.edit	   = function ( employee ) {
		self.select(employee);
		$location.path('/employeeEditor');
	};
}
CafeTownsend.Controllers.EmployeeController .$inject = [ 'employeeService', '$location' ];
