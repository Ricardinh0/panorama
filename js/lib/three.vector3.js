define([

],function(){
	
	/*
	*	@THREE JS http://threejsdoc.appspot.com/doc/index.html
	* 	@author mr.doob / http://mrdoob.com/
	* 	@author kile / http://kile.stravaganza.org/
	* 	@author philogb / http://blog.thejit.org/
	* 	@author mikael emtinger / http://gomo.se/
	* 	@author egraether / http://egraether.com/
	*/

	Vector3 = function ( x, y, z ) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	};
	Vector3.prototype = {
		constructor: Vector3,
		set: function ( x, y, z ) {
			this.x = x;
			this.y = y;
			this.z = z;
			return this;
		},
		length: function () {
			return Math.sqrt( this.lengthSq() );
		},
		lengthSq: function () {
			return this.x * this.x + this.y * this.y + this.z * this.z;
		}
	}

	return Vector3;

})