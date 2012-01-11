/**
 * App service which is responsible for the main configuration of the app.
 * 
 * http://docs.angularjs.org/#!angular.service
 */
angular.service( 'CafeTownsend', function( $route, $location, $window )  {
	
	 // Configure session model (for authentication) as root model
	 $route.parent( this.$new( CafeTownsend.Controllers.SessionController ) );
	  
	  // Configure template rendering based on routes
	  $route.when('/login', 	  { template: 'partials/login.html', 	  	controller: CafeTownsend.Controllers.LoginController, reloadOnSearch:false } );
	  $route.when('/employees',	{ template: 'partials/employees.html', 	controller: CafeTownsend.Controllers.EmployeeController, reloadOnSearch:false } );
	  
	  $route.otherwise({redirectTo: '/employees'});
	  
	  // Now listen for `#afterRouteChange` events
	  this.$on('$afterRouteChange', function( ) {
		  var user          = $route.current.$parent ? $route.current.$parent['user'] : $route.current['user'];
		  var authenticated = ( user && user.authenticated );
		  var view          = authenticated ? $location.path() : "";
		  	
		  switch( view )
		  {
			  case "/employees" :
			  {
				    $route.current.scope.user   = user;
			      $route.current.scope.params = $route.current.params;
				  
			      $window.scrollTo(0,0);			  
				    break;
			  }
			  
			  case "/login" :
			  default: 
			  {
				    // Must login before other views are available.
				  
			  	  $location.path( authenticated ? '/employees' : '/login' );
				    break;
			  }
		  }
      
	  });
	  
}, { $inject : ['$route', '$location', '$window'], $eager  : true } );


