define([

],function(){

	/*
	*	@THREE JS http://threejsdoc.appspot.com/doc/index.html
	* 	@author mikael emtinger / http://gomo.se/
	* 	@author alteredq / http://alteredqualia.com/
	*/
	Quaternion = function( x, y, z, w ) {
		this.set(
			x || 0,
			y || 0,
			z || 0,
			w !== undefined ? w : 1
		);
	};
	Quaternion.prototype = {
		constructor: Quaternion,
		set: function ( x, y, z, w ) {
			this.x = x;
			this.y = y;
			this.z = z;
			this.w = w;
			return this;
		},
		setFromRotationMatrix: function ( m ) {
			// Adapted from: http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
			function copySign(a, b) {
				return b < 0 ? -Math.abs(a) : Math.abs(a);
			}
			var absQ = Math.pow(m.determinant(), 1.0 / 3.0);
			this.w = Math.sqrt( Math.max( 0, absQ + m.n11 + m.n22 + m.n33 ) ) / 2;
			this.x = Math.sqrt( Math.max( 0, absQ + m.n11 - m.n22 - m.n33 ) ) / 2;
			this.y = Math.sqrt( Math.max( 0, absQ - m.n11 + m.n22 - m.n33 ) ) / 2;
			this.z = Math.sqrt( Math.max( 0, absQ - m.n11 - m.n22 + m.n33 ) ) / 2;
			this.x = copySign( this.x, ( m.n32 - m.n23 ) );
			this.y = copySign( this.y, ( m.n13 - m.n31 ) );
			this.z = copySign( this.z, ( m.n21 - m.n12 ) );
			this.normalize();
			return this;
		},
		normalize: function () {
			var l = Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );
			if ( l === 0 ) {
				this.x = 0;
				this.y = 0;
				this.z = 0;
				this.w = 0;
			} else {
				l = 1 / l;
				this.x = this.x * l;
				this.y = this.y * l;
				this.z = this.z * l;
				this.w = this.w * l;
			}
			return this;
		}
	}

	return Quaternion;

})