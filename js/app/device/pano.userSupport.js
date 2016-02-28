define([

	'pano.deviceDetect',
	'pano.language',
	'pano.prefix',
	'utils.log'

],function(Device, Language, Prefix, log){

	function UserSupport(){

		this.listeners = []
		this.user = {}
		
	}

	UserSupport.prototype = {

		constructor: UserSupport,

		post:function(type){

			//	For each listener
			for(var i = 0; i < this.listeners.length; i++){

				if(this.listeners[i].type===type){

					switch(type){
						case 'supportStatusUpdate':
							this.listeners[i].callback.call(this, this.user);
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

		test:function(){

			var self = this;
			var user = self.user;
			//	Set support (Default)
			user.supported = true;
			//	Set locale
			user.locale = Language;
			//	Set device
			user.device = Device;
			//	Set prefix
			user.prefix = Prefix;
			//	Test MS as it doesn't currently support 'preserve-3d' and should be booted if so. This application is dependent on 'preserve-3d'.
			if(user.prefix.js.toLowerCase()==='ms'){
				//	Create test element
				var element = document.createElement('LINK');
				//	Append to DOM
				document.getElementsByTagName('HEAD')[0].insertBefore(element, null);
				//	Set test style
				element.style[user.prefix.js+'TransformStyle'] = 'preserve-3d';
				//	Get the test elements computed styels
				var cs = window.getComputedStyle(element, null),
		        //	Extract the transformStyle style
		        transformStyle = cs.getPropertyValue(user.prefix.css+'transform-style');
		        //	Test its content
				user.supported = (transformStyle!=='preserve-3d') ? false : true;
				//	Remove the test element
				element.parentNode.removeChild(element);
	        }
	        //	Setup Gyro (orientationEvent) test
			var orientationSupport = function(callBack){
				//
				if (window.DeviceOrientationEvent)
				{
					//	Test signal
					var _i = null;
					var _e = null;
					var _c = 0;
					//	Signal listener
					var _updateDegree = function(e){
						_e = e;
					}
					//	Add listner
					window.addEventListener('deviceorientation', _updateDegree, false);
					//	Check event support
					_i = window.setInterval(function()
					{
						//	If _e doesn't === null and there is a signal from alpha
						if(_e !== null && _e.alpha !== null)
						{
							//	Clear interval
							clearInterval(_i);
							//	Remove listener
							window.removeEventListener('deviceorientation', _updateDegree);
							//	Return user
							callBack.call(this, true);
						}
						else
						{
							//	Increment the counter
							_c++;
							//	If the counter === 10
							if(_c === 10){
								//	Clear interval
								clearInterval(_i);
								//	Remove listener
								window.removeEventListener('deviceorientation', _updateDegree);
								//	Return user
								callBack.call(this, false);
							}
						}
					//	Repeat the test every 200th of a second
					}, 200);
				}
				else
				{
					//	Return user
					callBack.call(this, false);
				}
			}
			//	Add callBack for the Gyro (orientationEvent) test
			var callBack = function(hasGyro){
				//	
				user.gyro = hasGyro;
				//
				self.post('supportStatusUpdate')
			}
			//	Test Gyro (orientationEvent)
			orientationSupport(callBack);

		}
	}

	return UserSupport;
})





