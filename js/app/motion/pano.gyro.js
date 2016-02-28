define([

	'three.quaternion',
	'three.matrix4',
	'three.vector3',
	'utils.log'

],function(Quarternion, Matrix4, Vector3, log){

	function toRad(deg){ var radian = (deg*Math.PI) / 180; return radian;}
	function toDeg(rad){ var degree = (rad*180) / Math.PI; return degree;}

	function Gyro(user){

		//	3D Sample
		this.s = document.createElement('DIV');
		//	Sample Matrix
		this.matrix = new Matrix4();
		//	Set co-ords
		this.vec3 = new Vector3();
		//	Orientation
		this.orientation = 0;
		//	Mozilla invert
		this.invert = 1;
		//	Prefix
		this.prefix = user.prefix;
		//
		this.listeners = []
		//	Initiate
		this.init();

	}
	Gyro.prototype = {
		
		//	Constructor
		constructor: Gyro,
		
		//	Initiate
		init: function(){

			//	Append the sample to the body
			document.body.appendChild(this.s);
			//	Set the orientation
			this.updateOrientation(null);
			//	Invert mozilla signal
			this.invert = (this.prefix.js.toLowerCase()==='moz') ? -1 : 1;
			//	Start degree check
			this.degree();

		},

		post:function(type){
			//	For each listener
			for(var i = 0; i < this.listeners.length; i++){

				if(this.listeners[i].type===type){

					switch(type){
						case 'onMotionUpdate':
							this.listeners[i].callback.call(this, {orientation:this.orientation, vec3:this.vec3});
							break;
						default:
							return false;
							break;
					}
				}
			}
		},

		addEventListener:function(type, callback){
			//	Listener list
			this.listeners.push({
				type:type,
				callback:callback
			});
		},

		removeEventListener:function(type){

			for (var i = 0; i < this.listeners.length; i++) {
				if(this.listeners[i].type===type){
					this.listeners.splice(i,1);
				}
			};
			
		},

		degree:function(){

			var self = this;
			var x = 0;				//	X co-ordinate
			var y = 0;				//	Y co-ordinate
			var z = 0;				//	Z co-ordinate
			var q = {};				//	Quarternion object
			var s = self.s;			//	3D sample

			var updateDegree = function(e){

				//	Set the orientation
				self.updateOrientation(null);

				if(self.orientation==90 || self.orientation==-90){

					self.vec3.set(e.alpha*self.invert, ((e.gamma)*(self.orientation/90)*-1)*self.invert, (e.beta*((self.orientation/90)))*self.invert);

				}else{

					//	Update sample
					s.style[self.prefix.js+'Transform'] = "rotateY(" + -e.gamma + "deg) rotateX(" + e.beta + "deg) rotateZ(" + e.alpha + "deg)";
					//	Get the sample's styles
					var cs = window.getComputedStyle(s, null);
					//	Retrieve matrix3d and split out the individual nodes
					var n = cs.getPropertyValue(self.prefix.css + 'transform').split('(')[1].split(')')[0].split(',');
					//	Update matrix
					self.matrix.set(n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7],n[8],n[9],n[10],n[11],n[12],n[13],n[14],n[15])
					//	Decompose matrix to get quarternion
					q = self.matrix.decompose()[1];
					//	Set atanX
					var atanX = q.w*q.w - q.x*q.x - q.y*q.y + q.z*q.z
					//	Set pitch from quarternions
					var pitch = Math.atan2(2*(q.y*q.z + q.w*q.x), atanX);
					//	Set X portait
					x = (self.orientation==180) ? e.alpha + -e.gamma : e.alpha + e.gamma

					if(x > 360){
						x -= 360
					}
					else if(x < 0){
						x += 360
					}

					self.vec3.set(x*self.invert, (toDeg(pitch)*-1)*self.invert, (toDeg(Math.asin(-2*(q.x*q.z - q.w*q.y))))*self.invert);

				}

				self.post('onMotionUpdate');

			}

			window.addEventListener('deviceorientation', updateDegree, false);

		},

		updateOrientation:function(e){
			//
			var self = this;
			//	Get orientation
			switch(window.orientation) 
			{  
				case -90: 	//	Landscape
					//	Set orientation
					self.orientation = window.orientation;
				break; 
				case 0: 	//	Portrait
					//	Set orientation
					self.orientation = window.orientation;
				break;
				case 90: 	//	Landscape
					//	Set orientation
					self.orientation = window.orientation;
				break;
				case 180: 	//	Portrait
					//	Set orientation
					self.orientation = window.orientation;
				break;
			}
		}
	}

	return Gyro;

})





