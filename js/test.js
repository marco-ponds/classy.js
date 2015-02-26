Class("Persona", {
	//constructor
	Persona : function(nome, cognome) {
		console.log("inside persona con");
		this.nome = nome;
		this.cognome = cognome;
	},
	//methods
	stampa : function() {
		console.table(console);
	}
});


Class("Studente", {
	//constructor
	Studente : function(nome, cognome, matricola) {
		console.log("inside studente con");
		Persona.call(this, nome, cognome);
		this.matricola = matricola;
	},
	//methods
	stampaMatricola : function() {
		console.log("mi chiamo " + this.nome + " " + this.cognome + " n. matricola : " + this.matricola);
	}

})._extends("Persona");

Class("Inge", {
	//cosntructor
	Inge : function() {
		console.log("inside inge con");
		Studente.call(this, "Marco", "stagni", "099657");
		this.isInge = true;
	},

	toggleInge : function() {
		this.isInge = !this.isInge;
	}

})._extends("Studente");

