/**
* ******************************************************************************************************
* ******************************************************************************************************
*
*   AngularJS services are objects responsible for common web tasks (typically data services) and
*   are managed by the AngularJS dependency injection system. These services are singletons and are 
*   typically injected via parameters to `Controller` constructor functions.
*
*   Services are excellent candidates for 
*   
*   -  RPC functionality, 
*   -  Data management of data to be shared across Controllers.
*   -  Programmatically configur relationships between routes (partials or templates) & Controllers
*
*   Note: these services are instantiated as singletons and auto-registered with the AngularJS 
*         injection system via `angular.service( ... )`
*
* ******************************************************************************************************
* ******************************************************************************************************
*/

"use strict";

/**
 *  CafeTownsend initialization service
 *
 *  App service which is responsible for the main configuration of the app.
 *  Here routes are configured and session authentication is checked for all route changes.
 *  
 *  http://docs.angularjs.org/#!angular.service
 * 
 */
angular.service( 'CafeTownsend', function( sessionService, $route, $location, $window, $log )  {
    $log.log('initializing CafeTownsend routes...');
    
	var root = this;		// root scope
	
    // Configure session model (for authentication) as root/parent scope for scopes created on route change.
    $route.parent( root.$new( CafeTownsend.Controllers.SessionController ) );
    
    // Configure template rendering based on routes
    $route.when('/login',          { template: 'partials/login.html',         controller: CafeTownsend.Controllers.LoginController } );
    $route.when('/employee',       { template: 'partials/employees.html',     controller: CafeTownsend.Controllers.EmployeeController } );
    $route.when('/employee/:id',   { template: 'partials/employee_edit.html', controller: CafeTownsend.Controllers.EmployeeEditController } );
    $route.otherwise({ redirectTo: '/employee' });
        
    // Now listen for `#afterRouteChange` events
    root.$on( '$afterRouteChange', function( current, previous ) {
      
      var user          = sessionService.session();
      var authenticated = ( user && user.authenticated );
      var view          = authenticated ? $location.path() : "";
      	  
	  	  // @TODO: use regular expression to match `/employee` or `/employee/<uuid>` paths only
	  
		  if ( view.indexOf( "/employee") > -1 ) 
		  {
			  // Either `/employee` or `/employee/<uuid>` is requested
	          $window.scrollTo(0,0);        
		  
		  } else {
		  
	          // Must login before other views are available.
	          $location.path( authenticated ? '/employee' : '/login' );
		  }
		  
    });
    
}, { $inject : ['sessionService', '$route', '$location', '$window', '$log' ], $eager  : true } );


/**
 *  Session Service:  
 *
 *  Build the application session and provide a centralized logout feature
 *  Use closure to store session data.
 */ 
angular.service('sessionService', function( $log )  {
  $log.log('initializing Session services...');
  
  var session = {   
                    userName      : "ThomasBurleson@gmail.com", 
                    password      : "",
                    authenticated  : false
                };

  // Expose service accessor functions
  return { 
            /**
             * Accessor to current `shared` session information
             * Build single instance; if needed.
             */
            session : function () {
                return session;
            },
            
            /**
             * Mutator to logout current authenticated user.
             * 
             * NOTE: redirection (routing) to the `/login` partial is handled
             *       in the SessionController 
             */
            logout : function () {
              session.authenticated = false;
            }
        }; 
    
}, { $inject : [ '$log' ], $eager  : false } );


/**
 * Employees CRUD Service:  
 * 
 * Get list of all employees and current/selected employee
 */ 
angular.service('employeeService', function( $log )  {
  $log.log('initializing Employee services...');
  
	  // Create new employee record
	  // NOTE: Here we define the properties of an `employee`
	  function createEmployee() {    
	    // Use the uuid::v1() to create time-based random UUID
	    var employee = { 
	            id        : uuid.v1(), 
	            firstName : "", 
	            lastName  : "",
	            email     : "",
	            startDate : '01/09/2012',
				isNew     : true
	        };
        
	        employees.push( employee );
        
	    return employee;
	  }

	  // Load all known employees
	  function loadEmployees() {
		  if ( angular.isUndefined(employees) ) {
		    employees = [{ 
		                    id        : uuid.v1(), 
		                    firstName : "Thomas", 
		                    lastName  : "Burleson",
		                    email     : "ThomasBurleson@Gmail.com",
		                    startDate : '12/09/2011'
		                }];
		  }
					
		  return employees;
	  }

	  // Simulate save functionality...
	  function saveEmployee( target ) {
		  if ( angular.isDefined(target) )
		  {
			  // noop;
		  }	  
		  return target;
	  }
  
	  // Remove record by id (if found); return updated employees
	  function deleteEmployee( target ) {
		var id 		= angular.isString(target) ? target : target['id'],
	    	buffer 	= [ ];
		
		angular.forEach( employees,  function(employee, key) {
  	      if ( employee.id != id )
  	      { 
  	        buffer.push( it);
  	      }
		});
    
	    return (employees = buffer);
	  }
	  
	  // Select employee by ID
	  function findEmployee( id ) {
		var found = null;
		
  		angular.forEach( employees,  function(employee, key) {
    	      if ( employee.id == id )
    	      { 
    	        found = employee;
    	      }
  		});
		
		return found;
	  }
	  
  // Auto-load employees
  var employees = loadEmployees();
    
  // Expose service CRUD functions
  return {
      selected  : null,
	  findByID  : function(id)  { return findEmployee(id);	},
      loadAll   : function()   	{ return loadEmployees();       },
	  save      : function(who) { return saveEmployee( who );	},
      create	: function()   	{ return createEmployee();    	},
      delete    : function(who) { return deleteEmployee( who ); }
    };

}, { $inject : [ '$log' ], $eager  : false } );

