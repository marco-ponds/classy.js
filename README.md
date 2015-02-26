##Classy

Classy is a Javascript Inheritance implementation. This is pretty much everything you need to know.

You will gain access to a simple way to implement a Javascript Class in your code along with a useful "include" method.


---

##Example

###Building.js

```javascript

Class( "Building", {

    //constructor
    Building: function( type ) {

        this.type = type;
        this.floors = 1;

    },

    //methods
    addFloors: function( number ) {

        this.floors += number;

    }

});

```

###Home.js

```javascript

Class( "Home", {

    //constructor
    Home: function( type, familyName ) {

        Building.call( this, type );
        this.familyName = familyName;

    },

    //methods
    changeName: function( name ) {

        this.familyName = name;

    }

})._extends( "Building" );

```

Constructor name must be the same of the Class one. Class extension is achieved through the function ```_extends ( "className" )```.
You can see the file "index.html" to see how to work with the include method. Include has a useful feature which allows you to import multiple files at once ( you can specify an array of strings or a single string, and you're free to avoid to insert the ".js" file extension ):

```javascript

var toInclude = ["js/FirstClass.js", "js/SecondClass" ];
//var toInclude  = "js/OtherClass.js";

include( toInclude, function() {

        var first_instance = new FirstClass( params );

});

```

That's all you need to know to get started. And remember, always stay classy.
