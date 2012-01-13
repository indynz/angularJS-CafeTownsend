# CafeTownsend - AngularJS

<br/>
This project is an HTML5 implementation of the infamous CafeTownsend application. Cafe Townsend is a well known application to demonstrate any MVC framework for using Flex or ActionScript. There are already ports of Cairngorm, Mate, PureMVC, Spring ActionScript, RobotLegs and now Swiz. 

Recently a developer contributed an HTML5/Javascript port of the application using in the [SpineJS MVC Framework](http://spinejs.com/). 

*  [CafeTownsend - Javascript with AngularJS Ioc]()      … blog pending.
*  [CafeTownsend - Javascript with SpineJS MVC](http://www.websector.de/blog/2011/12/31/spine-js-cafe-townsend-example/)
*  [CafeTownsend - Flex with Swiz IoC](http://www.gridlinked.info/swiz-localization-l10n-logging/)
*  [CafeTownsend - Flex with Mate MVC](http://www.websector.de/blog/2010/03/12/mate-cafe-townsend-example-updated-for-using-flex-4/)



---

AngularJS is an amazing IoC MVC framework for Javascript applications. Supporting pageless architectures, advanced data binding, HTML tempting, and dependency injection… AngularJS is strikingly similar to the Flex [Swiz IoC framework](http://swizframework.org/).

This project contributes an [**Angular.js**](http://angularjs.org/) port of the CafeTownsend application.
CafeTownsend - AngularJS is written in CoffeeScript and uses the [Angular.js](http://angularjs.org/) IoC framework. It uses Mustache for HTML templating and [{Less}](http://lesscss.org/) for dynamic stylesheet language support. 

![Screenshot](https://github.com/ThomasBurleson/angularJS-CafeTownsend/raw/master/app/data/images/screens.png)
<br/>

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
<br/>



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

      js/                 --> javascript files
		booter.js		  --> application booter
        controllers.js    --> application controllers
        services.js       --> custom angular services
        directives.js     --> custom angular directives

        lib/              --> angular and 3rd party javascript libraries
            angular.js      --> the latest angular js
			jquery.min.js   --> jQuery v1.7 minified
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

## Pending Features

This effort is still ongoing with some in-progress effort that will provide the following features:

*  Provide `loading indicator` as startup screen
*  Support deep linking with synch data loads
*  Convert disorganized CSS to LESS
*  Use Coffeescript
*  Build CafeTownsend Tests/Scenarios
*  Create view slide transitions 
*  Use AMD loader

## Contact

Stay tuned for upcoming blog article and video on [GridLinked.info](www.gridlinked.info)<br/>
For more information on angular please check out http://angularjs.org/

