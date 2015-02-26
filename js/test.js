/**********
PERSON CLASS
************/
Class( "Person", {

	//constructor
	Person : function( name, surname ) {

		console.log( "inside persona constructor" );
		this.name = name;
		this.surname = surname;

	},

	//methods
	print : function() {

		console.log( "Hi, my name is " + this.name );
		return "Hi, my name is " + this.name;

	}

});

/**********
STUDENT CLASS
************/
Class( "Student", {

	//constructor
	Student : function( name, surname, number ) {

		console.log( "Inside Student constructor." );
		Person.call( this, name, surname );
		this.number = number;

	},

	//methods
	printStudent : function() {

		console.log( "My name is " + this.name + " " + this.surname + " and my number is : " + this.number );

	}

})._extends( "Person" );

/***********
ENGINEER CLASS
************/
Class( "Engineer", {

	//cosntructor
	Engineer : function( name, surname, number ) {

		console.log( "Inside Engineer constructor." );
		Student.call( this, name, surname, number );
		this.isEngineer = true;

	},

	toggleEngineer : function() {

		this.isEngineer = !this.isEngineer;

	}

})._extends("Student");
