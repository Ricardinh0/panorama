define([

	'utils.log'

],function(log){

	function Inertia(easeFunction, duration, scalar){

		this.easeFunction = easeFunction;
		//	Initial co-ords
		this.currentX = 0;
		this.currentY = 0;
		//	Touch start caching variables
		this.touchStartX = 0;
		this.touchStartY = 0;
		//	Current touch caching variables
		this.touchCurrentX = 0;
		this.touchCurrentY = 0;
		//	Last current touch caching variables
		this.touchLastCurrentX = 0;
		this.touchLastCurrentY = 0;
		//	The delta value of the current co-ords variables
		this.deltaX = 0;
		this.deltaY = 0;
		//	Is the app tracking the delta
		this.trackDelta = false;
		//	Duration of the inertia
		this.duration = duration;
		//	Increment
		this.time = 0;
		//	Scalar to boost the delta value
		this.scalar = scalar;
		//	Vec3 Object
		this.vec3 = {
			x:0,
			y:0,
			z:0
		};
		//
		this.listeners = [];
		//
		this.delta = {
			x:[],
			y:[]
		}
		this.deltaHistory = 5;
		//
		this.init();
	}

	Inertia.prototype = {

		constructor: Inertia,

		init:function(){
			this.events();
			this.ease();
		},

		post:function(type){

			//	For each listener
			for(var i = 0; i < this.listeners.length; i++){

				if(this.listeners[i].type===type){

					switch(type){
						case 'onMotionUpdate':
							this.listeners[i].callback.call(this, {vec3:this.vec3});
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
			//	Listener list
			for (var i = 0; i < this.listeners.length; i++) {
				
				if(this.listeners[i].type===type){
					this.listeners.splice(i,1);

				}

			};
		},
		
		events:function(){

			var self = this;

			var eventCatcher = function (e){

				var touchPoints = (typeof e.changedTouches !== 'undefined') ? e.changedTouches : [e];

				if(e.type.match(/down|start/i)){
					//	Cache touch starting position
					self.touchStartX = parseInt(touchPoints[0].clientX);
					self.touchStartY = parseInt(touchPoints[0].clientY);
					//	Track the movement delta
					self.trackDelta = true;
					//
					this.deltaX	= 0;
					this.deltaY = 0;
					//
					self.delta.x = [];
					self.delta.y = [];
				}

				if(e.type.match(/move/i)){
					e.preventDefault();
					//
					if(self.trackDelta){
						//	On more, update the slide
						self.vec3.x = (self.currentX + parseInt(touchPoints[0].clientX)) - self.touchStartX;
						self.vec3.y = (self.currentY + parseInt(touchPoints[0].clientY)) - self.touchStartY;
						//	Cache the current co-ords on the touch	
						self.touchCurrentX = parseInt(touchPoints[0].clientX);
						self.touchCurrentY = parseInt(touchPoints[0].clientY);
						//
						self.post('onMotionUpdate');
						//
						self.getDelta();
					}
				}

				if(e.type.match(/up|end|leave/i)){
					//	Cache last touch starting position for the inertia to take over
					self.touchStartX = self.vec3.x;
					self.touchStartY = self.vec3.y;
					//	Stop trackin the movement delta
					self.trackDelta = false;
					//	Reset the inertia timer to 0
					self.time = 0;
				}

				if(e.type.match(/cancel/i)){
					//
					this.deltaX	= 0;
					this.deltaY = 0;
					//
					self.delta.x = [];
					self.delta.y = [];
					//
					e.preventDefault();
				}
			}


			if(window.navigator.msPointerEnabled){
				//
				if(typeof document.body.style.msTouchAction !== 'undefined') {
					document.body.style.msTouchAction = 'none';
				}
				//	msPointerEvents
				window.addEventListener("MSPointerDown", eventCatcher, false);
	  			window.addEventListener("MSPointerMove", eventCatcher, false);
	  			window.addEventListener("MSPointerUp", eventCatcher, false);

			}else if('ontouchstart' in window){
				//	TouchEvents
				window.addEventListener('touchstart', eventCatcher, false);
				window.addEventListener('touchmove', eventCatcher, false);
				window.addEventListener('touchend', eventCatcher, false);
				window.addEventListener("touchleave", eventCatcher, false);
				window.addEventListener("touchcancel", eventCatcher, false);
			}

			//	desktop catch all
			window.addEventListener("mousedown", eventCatcher, false);
  			window.addEventListener("mousemove", eventCatcher, false);
  			window.addEventListener("mouseup", eventCatcher, false);

		},

		/*
		*
		*	Easing equations: http://www.gizma.com/easing/
		*
		*/

		linearTween:function (t, b, c, d) {
			return c*t/d + b;
		},

		easeInQuad:function (t, b, c, d) {
			t /= d;
			return c*t*t + b;
		},

		easeOutQuad:function(t, b, c, d) {
			t /= d;
			return -c * t*(t-2) + b;
		},

		easeInOutQuad:function (t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2*t*t + b;
			t--;
			return -c/2 * (t*(t-2) - 1) + b;
		},

		easeInCubic:function (t, b, c, d) {
			t /= d;
			return c*t*t*t + b;
		},

		easeOutCubic:function (t, b, c, d) {
			t /= d;
			t--;
			return c*(t*t*t + 1) + b;
		},

		easeInOutCubic:function (t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2*t*t*t + b;
			t -= 2;
			return c/2*(t*t*t + 2) + b;
		},

		easeInQuart:function (t, b, c, d) {
			t /= d;
			return c*t*t*t*t + b;
		},

		easeOutQuart:function (t, b, c, d) {
			t /= d;
			t--;
			return -c * (t*t*t*t - 1) + b;
		},

		easeInOutQuart:function (t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2*t*t*t*t + b;
			t -= 2;
			return -c/2 * (t*t*t*t - 2) + b;
		},

		easeInQuint:function (t, b, c, d) {
			t /= d;
			return c*t*t*t*t*t + b;
		},

		easeOutQuint:function (t, b, c, d) {
			t /= d;
			t--;
			return c*(t*t*t*t*t + 1) + b;
		},

		easeInOutQuint:function (t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2*t*t*t*t*t + b;
			t -= 2;
			return c/2*(t*t*t*t*t + 2) + b;
		},

		easeInSine:function (t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},

		easeOutSine:function (t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},

		easeInOutSine:function (t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},

		easeInExpo:function (t, b, c, d) {
			return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
		},

		easeOutExpo:function (t, b, c, d) {
			return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
		},

		easeInOutExpo:function (t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
			t--;
			return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
		},

		easeInCirc:function (t, b, c, d) {
			t /= d;
			return -c * (Math.sqrt(1 - t*t) - 1) + b;
		},

		easeOutCirc:function (t, b, c, d) {
			t /= d;
			t--;
			return c * Math.sqrt(1 - t*t) + b;
		},

		easeInOutCirc:function (t, b, c, d) {
			t /= d/2;
			if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			t -= 2;
			return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
		},

		/*
		*
		*	Easing equations end
		*
		*/

		getDelta:function(){

			//	The delta = the current X - the last X
			this.deltaX = this.touchCurrentX - this.touchLastCurrentX;
			this.deltaY = this.touchCurrentY - this.touchLastCurrentY;
			//	Update the last X for the next run
			this.touchLastCurrentX = this.touchCurrentX;
			this.touchLastCurrentY = this.touchCurrentY;
			//
			this.delta.x.unshift(this.deltaX);
			this.delta.y.unshift(this.deltaY);
			
			while(this.delta.x.length > this.deltaHistory){
				this.delta.x.pop();
			}
			while(this.delta.y.length > this.deltaHistory){
				this.delta.y.pop();
			}

		},

		ease:function (){

			var self = this;

			// shim layer with setTimeout fallback
			window.requestAnimFrame = (function(){

				return		window.requestAnimationFrame       ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame    ||
							function( callback ){
								window.setTimeout(callback, 1000 / 60);
							};

			})();

			(function animate(){
				
				requestAnimFrame(animate);

				if(!self.trackDelta && self.time <= self.duration){
					
					/*
					*	@:self[self.easeFunction](t, b, c, d)
					*		t: Current time
					*		b: Start X/Y/ALPHA etc position
					*		c: End X/Y/ALPHA etc position
					*		d: Duration
					*/

					self.currentX = self[self.easeFunction](self.time, self.touchStartX, self.deltaX*self.scalar, self.duration);
					self.currentY = self[self.easeFunction](self.time, self.touchStartY, self.deltaY*self.scalar, self.duration);
					//
					self.vec3.x = self.currentX;
					self.vec3.y = self.currentY;
					//
					self.time++;
					//
					self.post('onMotionUpdate');

				}else{
					//	Reset delta
					self.deltaX = []
					self.deltaY = []
				}

			})();
		}
	}

	return Inertia;

});


