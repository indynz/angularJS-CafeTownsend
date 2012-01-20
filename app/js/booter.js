/**
* ******************************************************************************************************
*   AngularJS - CafeTownsend
* ******************************************************************************************************
*
*
*   This booter requires the asynchronous script loader http://headjs.com/
*
*   In the application (index.html), we use the following markup before </body>
*
*
*
*    In the code below, we load all files in parallel but execute the javascript in sequence.
*    Note: the `head.ready()` function is called once AngularJS has executed but
*    before the services or controllers are executed.
*
*   Copyright (c) 2011 Mindspace, LLC.
*   Open source under the MIT License.
**/

head.js (
  
  // load files in parallel but execute them in sequence
  
  { jquery      :   "http://code.jquery.com/jquery-1.7.1.min.js"  },

  { angular     :   "js/lib/angular.js#autobind"                  },
  { uuid        :   "js/lib/uuid.js"                              },
  
  { services    :   "js/build/services.js"                        },
  { controllers :   "js/build/controllers.js"                     },
  { directives  :   "js/build/directives.js"                      }
);

head.ready( "jquery", function() {
  
  // Configure module variables...
  
  window.CafeTownsend             = { };
         CafeTownsend.Controllers = { };
  
});
