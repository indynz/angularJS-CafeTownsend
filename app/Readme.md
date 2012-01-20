These following javascript files are the original, hand-written javascript files.

	js/master/*.js


These `masters` are deprecated since Coffeescript is now used generate the Javascript. <br/>
The master CoffeeScript files are in:

    coffee/*.coffee

Developers should use command line to watch and generate the javascript builds:

	js/build/*.js

On background, running terminal window use the following command line:

	coffee -c -b -o ./js/build -w ./coffee

