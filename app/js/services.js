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
angular.service( 'CafeTownsend', function( $route, $location, $window, sessionService, $log )  {
    $log.log('initializing CafeTownsend routes...');
    
    // Configure session model (for authentication) as root model
    $route.parent( this.$new( CafeTownsend.Controllers.SessionController ) );
    
    // Configure template rendering based on routes
    $route.when('/login',          { template: 'partials/login.html',         controller: CafeTownsend.Controllers.LoginController } );
    $route.when('/employee',       { template: 'partials/employees.html',     controller: CafeTownsend.Controllers.EmployeeController } );
    $route.when('/employee/edit',  { template: 'partials/employee_edit.html', controller: CafeTownsend.Controllers.EmployeeEditController } );
    $route.otherwise({ redirectTo: '/employee' });
        
    // Now listen for `#afterRouteChange` events
    this.$on( '$afterRouteChange', function( current, previous ) {
      
      var user          = sessionService.session();
      var authenticated = ( user && user.authenticated );
      var view          = authenticated ? $location.path() : "";
        
      switch( view )
      {
        case "/employee/edit" :
        case "/employee" :
        {
            if( angular.isDefined( $route.current.scope ) )
            {
              $route.current.scope.params = $route.current.params;
            }
            
            $window.scrollTo(0,0);        
            break;
        }
        
        case "/login" :
        default: 
        {
            // Must login before other views are available.
          
            $location.path( authenticated ? '/employee' : '/login' );
            break;
        }
      }
      
    });
    
}, { $inject : ['$route', '$location', '$window', 'sessionService', '$log' ], $eager  : true } );


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
    
}, { $inject : [ '$log' ], $eager  : true } );


/**
 * Employees CRUD Service:  
 * 
 * Get list of all employees and current/selected employee
 */ 
angular.service('employeeService', function( $log )  {
  $log.log('initializing Employee services...');
  
  var employees = [{ 
                    id        : uuid.v1(), 
                    firstName : "Thomas", 
                    lastName  : "Burleson",
                    email     : "ThomasBurleson@Gmail.com",
                    startDate : '12/09/2011'
                  }];
  
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
  
  // Remove record by id (if found); return updated employees
  function removeEmployee( id ) {
    var buffer = [ ];
    for (var j=0; j<employees.length; j++)
    {
      var it = employees[j];
      if ( it.id != id )
      { 
        buffer.push( it);
      }
    }
    
    return (employees = buffer);
  }
  
  // Expose service CRUD functions
  return {
      selected  : null,
      loadAll   : function()   { return employees;           },
      createNew : function()   { return createEmployee();    },
      remove    : function(id) { return removeEmployee(id);  }
    };

}, { $inject : [ '$log' ], $eager  : true } );

