- The Latest Stable Release: [AngularJS v0.10.6](https://github.com/angular/angular.js/zipball/v0.10.6)


<a name="0.10.6"></a>
# 0.10.6 bubblewrap-cape (2012-01-17) #

## Features:

- Uses new Angular Modules with [Dependency injection subsystem](http://docs-next.angularjs.org/guide/dev_guide.di) rewrite. 
  - `angular.services()` is no longer supported; use `angular.module()` instead
- Uses new Angular `$q` promises to support asynch data services
- Uses *class-style* coding for Service class as well as Controllers
  - now supports prototype methods and no longer adds behavior to scope instances
- Revised `EmployeeManager` to blend RPC and model… now injected into EmployeeController
- Revised partials to use reference to injected EmployeeManager in databinding
  -  `{{ employees.list.selected }}`

- Uses `cake` to consolidate Coffeescript-generated Javascript; now minimizes also.
  -  allow builds of CoffeeScript files now stored in `js/build/*.js`
  -  adjust bootstrap to use minified `js/build/CafeTownsend.min.js`


<a name="0.10.5"></a>
# 0.10.5 steel-fist (11-11-08) #

## Features:

- Uses `angular.service()` to specify singleton services
- Uses CoffeeScript to build javascript production files
- Uses `functional constructors` to attach Service behaviors to scope instances
