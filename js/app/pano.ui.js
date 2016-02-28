define([

	'pano.ui.loadView',
	'pano.ui.instructionView',
	'utils.requestAnimation',
	'utils.log'

],function(LoadView, InstructionView, RequestAnimation, log){

	function UI(){

		this.user = {};
		this.cube = {};
		this.vec3 = {};
		this.listeners = [];
		this.useGyro = true;
		this.loadView = new LoadView();
		this.instructionView = new InstructionView();

	}

	UI.prototype = {

		constructor:UI,

		init:function(user, cube){
			/*
			*	Set UI details
			*/
			this.user = user;
			this.cube = cube;
			/*
			*	Is the application using a gyro for motion
			*/
			this.useGyro = (user.device.model.toLowerCase()==='android') ? false : true;
			/*
			*	Kill load screen
			*/
			this.loadView.kill(user);
			/*
			*	On loadViews distruction, Load instruction screen
			*/
			this.instructionView.init(user, this.useGyro);
			/*
			*
			*/
			if(!user.gyro) document.body.className = 'inertia';
			/*
			*	If gyro and not an android
			*/
			if(!this.useGyro)this.motionToggle();

		},

		post:function(type){

			//	For each listener
			for(var i = 0; i < this.listeners.length; i++){

				if(this.listeners[i].type===type){

					switch(type){
						case 'motionToggle':
							this.listeners[i].callback.call(this, this.useGyro);
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

		motionToggle:function(){
			//	Set self
			var self = this;
			//	Create button
			this.motionToggleButton = document.createElement('DIV');
			this.motionToggleButton.setAttribute('id', 'motionToggleButton');
			this.motionToggleButton.innerHTML = '<p>Explore via gyroscope</p>';
			//	Append to the body
			document.body.appendChild(this.motionToggleButton);
			//	Events
			this.motionToggleButton.onclick = function(){
				//	If currently using gyro turn off else turn on
				self.useGyro = (self.useGyro) ? false : true;
				//	If currently using gyro set button colour
				self.motionToggleButton.style.color = (self.useGyro) ? '#333' : '#FFF';
				//	Tell the instrutions to change its point of view
				self.instructionView.updateMotion(self.useGyro);
				//	Alert listeners
				self.post('motionToggle');
			}
		},

		rotate:function(e){

			//	Set vec3
			this.vec3 = e.vec3;
			//	Update view
			document.querySelector('#PANO_track').style[this.user.prefix.js+'Transform'] = 'rotateX('+(e.vec3.y-30)+'deg) rotate('+(e.vec3.x%360)*-1+'deg)';

		}

	}

	return UI

})