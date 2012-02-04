# CafeTownsend - AngularJS

<br/>
This project is an HTML5/Javascript implementation of the infamous CafeTownsend application. CafeTownsend is a well known application created to demonstrate various MVC frameworks using Flex or ActionScript. There are known ports using Cairngorm, Mate, PureMVC, Spring ActionScript, RobotLegs and Swiz. 

Recently a developer contributed an HTML5 port of the application using the javascript [Spine](http://spinejs.com/) MVC framework. 

*  [CafeTownsend - Javascript with AngularJS Ioc]()      … blog pending.
*  [CafeTownsend - Javascript with SpineJS MVC](http://www.websector.de/blog/2011/12/31/spine-js-cafe-townsend-example/)
*  [CafeTownsend - Flex with Swiz IoC](http://www.gridlinked.info/swiz-localization-l10n-logging/)
*  [CafeTownsend - Flex with Mate MVC](http://www.websector.de/blog/2010/03/12/mate-cafe-townsend-example-updated-for-using-flex-4/)


This project contributes a superior port of the HTML5 CafeTownsend application;using the [Angular.js IoC](http://angularjs.org/) framework.


![Screenshot](https://github.com/ThomasBurleson/angularJS-CafeTownsend/raw/master/app/data/images/screens.png)<br/>

Click to play with the live [CafeTownsend Demo](http://thomasburleson.github.com/cafetownsend/index.html).



---

AngularJS is an amazing IoC MVVM framework for Javascript applications. Supporting pageless architectures, advanced data binding, HTML templating, and dependency injection… AngularJS is strikingly similar to the Flex [Swiz IoC framework](http://swizframework.org/).


Note: Subsequent CSS version will be rewritten in [{Less}](http://lesscss.org/) for dynamic stylesheet language support. <br/>
The AngularJS port also demonstrates significant advantages over the SpineJS implementation:

*  Pageless Architecture
*  Improved routing with `deep link` support
*  Significant reduction in HTML template fragments
*  Rigorous elimination of Javascript code from HTML 
*  Inter-controller data sharing
*  Session Management/Authentication
*  Lazy loading of data services (*with auto-jsonify of external JSON data*)
*  Code versions handwritten in both Javascript and Coffeescript 
*  Demonstrates `separation-of-concerns` for Model-Views-Controllers
*  Demonstates `dependency injection` for services and Controllers
*  Demonstrates best practices for `Model-View-View-Model (MVVM)` architectures
*  Uses [CoffeeScript](http://coffeescript.org/) files for services and controller classes



## Directory Layout

    app/                  --> all of the files to be used in production

      index.html          --> app layout file (the main html template file of the app)

	  data/

        css/              --> css files
          app.css         --> default stylesheet

        images/           --> image files

        partials/         --> angular view partials (partial html templates)
          login.html
          employees.html
          employee_edit.html

        members.json      --> external, simple JSON data 

	  coffee/			  --> master developer files for service & controller classe		Cakefile          --> cake build script
		bootstrap.coffee  	  --> asynch loader and initializer (using head.js)

		com/mindspace/cafetownsend/	
			CafeTownsendApp.coffee --> application class to establish routes and session

			controller/			
				SessionController.coffee
				LoginController.coffee
				EmployeeController.coffee
				EmployeeEditController.coffee

			service/
				EmployeeManager.coffee
				SessionService.coffee

	  	com/mindspace/angular/
			directive/			
				dblClick.coffee   --> doubleClick directive
	            focus.coffee      --> focus directive
	
      js/                 --> javascript files
		/build            --> javascript output from CoffeeScript builds
          
			directives.js     --> library of Angular directives
			bootstrap.js  	  --> asynch loader and initializer (using head.js)
			CafeTownsend.js   --> CafeTownsend services, controllers, and models

        lib/              --> angular and 3rd party javascript libraries
            angular.js      --> AngularJS v0.10.5 IoC Framework
			jquery.min.js   --> jQuery v1.7 minified
			head.min.js     --> asynch script loader
			namespace.min.js--> namespace support for `package` class organization
			uuid.js			--> uuid generator

    config/jsTestDriver.conf    --> config file for JsTestDriver

    logs/                 --> JSTD and other logs go here (git-ignored)

    scripts/              --> handy shell/js/ruby scripts
      test-server.bat     --> starts JSTD server (windows)
      test-server.sh      --> starts JSTD server (*nix)
      test.bat            --> runs all unit tests (windows)
      test.sh             --> runs all unit tests (*nix)
      watchr.rb           --> config script for continuous testing with watchr
      web-server.js       --> simple development webserver based on node.js

    test/                 --> test source files and libraries
      e2e/                -->
        runner.html       --> end-to-end test runner (open in your browser to run)
        scenarios.js      --> end-to-end specs

      lib/
        angular/                --> angular testing libraries
          angular-mocks.js      --> mocks that replace certain angular services in tests
          angular-scenario.js   --> angular's scenario (end-to-end) test runner library
          version.txt           --> version file

        jasmine/                --> Pivotal's Jasmine - an elegant BDD-style testing framework
        jasmine-jstd-adapter/   --> bridge between JSTD and Jasmine
        jstestdriver/           --> JSTD - JavaScript test runner

      unit/                     --> unit level specs/tests
        controllersSpec.js      --> specs for controllers

## Build Notes


Developers should use the cake script to build, consolidate, and minify the custom Javascript into Cafetownsend.min.js

    cd ./coffee; cake build

*  CafeTownsend.js - consolidate application code
*  bootstrap.js    - asynch loader and initializer (using head.js)
*  directives.js   - reusable library of Angular directives

## Pending Features

This effort is still ongoing with some in-progress effort that will provide the following features:

*  Provide `loading indicator` as data load indicator
*  Support deep linking with synch data loads
*  Convert disorganized CSS to LESS
*  Build CafeTownsend Tests/Scenarios
*  Create view slide transitions 

## Contact

Stay tuned for upcoming blog article and video on the [GridLinked](http://www.gridlinked.info) blog.<br/>
For more information on angular please check out http://angularjs.org/

