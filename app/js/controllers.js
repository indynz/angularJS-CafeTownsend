/**
 * Configure session authentication model for entire app.
 */
CafeTownsend.Controllers.SessionController = function ( $route, $location, $log ) {
	var self = this;

    self.$log = $log;
	self.user = { 	
					userName		: "ThomasBurleson@gmail.com", 
					password		: "",
					authenticated	: false
				};

	/**
	 * Logout current authenticated user and route to `/login` view
	 */
	self.logout = function () {
		self.user.authenticated = false;
					
		$location.path('/login');
	}

	// Configure session model (for authentication)
	// NOTE: redundant here... as already performed in services.js
	
	$route.parent( self );
}
CafeTownsend.Controllers.SessionController.$inject = [ '$route',  '$location', '$log' ];


/**
 * Manages the login process for the CafeTownsend application
 * Using the current userName/password, authenticate the user.
 */
CafeTownsend.Controllers.LoginController = function ( $location ) {
	var self = this;

	/**
	 * Authenticate user using specified username and password!
	 */
	self.authenticateUser = function() {
		var user = self.user;
		
		if ((user.userName != "") && (user.password == "angular"))
		{
			user.authenticated = true;
			$location.path('/employees');
		}
	}
}
CafeTownsend.Controllers.LoginController.$inject = [ '$location' ];



/**
 * Manages the prentationModel for the EmployeeList view
 * @author thomasburleson
 */
CafeTownsend.Controllers.EmployeeController = function (  ) {
	
	this.employees 			=  [ { firstName : "Thomas", lastName : "Burleson" } ];
	
}
CafeTownsend.Controllers.EmployeeController .$inject = [  ];
