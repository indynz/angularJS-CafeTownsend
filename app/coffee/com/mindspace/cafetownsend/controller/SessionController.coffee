#
# ******************************************************************************************************
#   AngularJS - CafeTownsend
# ******************************************************************************************************
#
#   AngularJS controllers are essentially `presentation models` used for a specific view or route within
#   the HTML5 client.
#
#   These controllers are actually factories that `add` behavior to Angular scopes and are
#   applied to a new scope each time the view is rendered; unless the scope has `reloadOnSearch == false`.
#
#   Each controller can define its own specific dependencies that will be injected during `construction`
#   As such, shared data models and routes are managed at the `services` layer.
#
#   Note: These controllers should NEVER be instantiated manually via `new <xxx>Controller()` syntax.
#         Instead, AngularJS will construct `scopes` and then `extends` those scope instances using 
#         the <xxx>Controller constructor/factory function. The `extend` effectively injects controller
#         properties and methods into the targeted this.
#
#
#   Copyright (c) 2011 Mindspace, LLC.
#   Open source under the MIT License.
#
# ******************************************************************************************************
#

# "use strict"

# ********************************************
# 
# SessionController
# 
# Configure session and authentication information for entire app.
# 
# ********************************************

namespace 'com.mindspace.cafetownsend.controller'

  SessionController:

    class SessionController
      @inject : [ "sessionService", "$location", "$route" ]

      constructor:  ( @sessionService, @$location, $route ) ->  
        @user = @sessionService.session

        # Configure session model (for authentication) as root/parent scope for scopes created on route change.
        $route.parent( this )
        return this

      logoutUser : (event) ->
        @sessionService.logout()
        @$location.path( "/login" )
        return
