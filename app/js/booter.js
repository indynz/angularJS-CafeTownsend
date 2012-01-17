/**
* ******************************************************************************************************
*   AngularJS - CafeTownsend
* ******************************************************************************************************
*
* 	Copyright (c) 2011 Mindspace, LLC.
* 	Open source under the MIT License.
*
*/

head.js ( 
	
	{ jquery: 		"http://code.jquery.com/jquery-1.7.1.min.js" 	},
	{ angular: 		"js/lib/angular.js#autobind" 					},
	{ uuid: 		"js/lib/uuid.js" 								},
	
	{ services: 	"js/services.js" 			},
	{ controllers: 	"js/controllers.js" 		},
	{ directives: 	"js/directives.js" 			}
);

head.ready( "angular", function() {
	
	// Configure module variables...
	
	window.CafeTownsend  			= { };
		   CafeTownsend.Controllers = { };
	
});
