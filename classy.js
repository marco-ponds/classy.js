var __pool__ = {};

function Class( name, methods ) {

	var upper = __upperCaseFirstLetter__( name );
	__pool__[ upper ] = new __class__( upper, methods );

	//constructor not found
	if ( !methods[upper] ) throw "NO CONSTRUCTOR PROVIDED";
	window[ upper ] = methods[ upper ];
	for ( var k in methods ) {
		if ( k != name ) window[ upper ].prototype[ k ] = methods[ k ];
	}

	//adding a few useful methods
	window[ upper ].prototype[ '__print__' ] = function() { console.table( this ); }
	window[ upper ].prototype[ '_super' ] = function() {};
	return __pool__[upper];

}

//__class__ constructor
__class__ = function( name, methods ) {

	this.name = name;
	this.methods = methods;
}

__class__.prototype.has = {}.hasOwnProperty;
__class__.prototype._extends = function( toextend ) {

	//storing super
	var sup_name = ( typeof( toextend ) == "string" ) ? toextend : toextend.name;

	var c = window[ this.name ];
	var sup = ( typeof( toextend ) == "string" ) ? window[ toextend ] : toextend;
	if ( !sup ) throw "NO UPPER CLASS"
	window[ this.name ].prototype = Object.create( sup.prototype );
	window[ this.name ].prototype.constructor = window[ this.name ];
	//setting methods
	this._setMethods();
	//setting super methods
	window[ this.name ].prototype.__supername = sup_name;
	for ( var method in __supers__[ sup_name ] ) {

		window[ this.name ].prototype[ "_" + method ] = sup.prototype[ method ];

	}
}

__class__.prototype._setMethods = function() {

	for ( var k in this.methods ) {

		if ( k != this.name ) window[ __upperCaseFirstLetter__( this.name ) ].prototype[ k ] = this.methods[ k ];

	}

}

function __upperCaseFirstLetter__ ( s ) {

	return ( s.length > 2 ) ? s[ 0 ].toUpperCase() + s.substring( 1, s.length ) : s.toUpperCase();

}

//include method
function include( src, callback ) {

	var s, r, t, scripts = [];
	var _scripts = document.getElementsByTagName( "script" );
	for (var i = 0; i < _scripts.length; i ++) {

		//collecting all script names.
		scripts.push( _scripts[i].src );

	}
	var alreadyGot = function( value ) {

		for (var i = 0; i < scripts.length; i ++) {

			if (scripts[i].indexOf(value) != -1) return true;

		}
		return false;

	}
	//check if src is array or not,
	//split function in two separate parts
	if ( src instanceof Array ) {

		//for each element import, than call callback
		var got = 0;
		if ( src.length == 0 ) {

			console.log("Why are you triyng to include 0 scripts? This makes me sad.")
			return;

		}
		//console.log(src);
		//console.log(src.length);
		var check = function() {

			if ( got == src.length ) callback();

		}
		for ( var j = 0; j < src.length; j ++ ) {

			if ( !alreadyGot( src[ j ] ) ) {

				s = document.createElement( 'script' );
				s.type = 'text/javascript';
				s.src = ( src[ j ].indexOf( ".js" ) != -1 ) ? src[ j ] : ( src[ j ] + ".js" );
				if ( callback ) {

					s.onload = s.onreadystatechange = function() {

						if ( !this.readyState || this.readyState == 'complete' ) {

							got++;
							check();

						}

					};

				}
				t = document.getElementsByTagName( 'script' )[ 0 ];
				t.parentNode.insertBefore( s, t );

			} else {

				if (callback) check();

			}

		}

	} else if ( typeof src == "string" ) {

		if ( !alreadyGot( src ) ) {

			r = false;
			s = document.createElement( 'script' );
			s.type = 'text/javascript';
			s.src = ( src.indexOf( ".js" ) != -1 ) ? src : ( src + ".js" );
			if ( callback ) {

				s.onload = s.onreadystatechange = function() {

					if ( !r && ( !this.readyState || this.readyState == 'complete') ) {

						r = true;
						callback();

					}

				};

			}
			t = document.getElementsByTagName( 'script' )[ 0 ];
			t.parentNode.insertBefore( s, t );

		} else {

			if (callback) callback();

		}

	}

}
