define([

	'pano.ui.view',
	'utils.log'

],function(View, log){
	
	function InstructionView(){

		this.user = null;
		this.useGyro = null;
		this.view = document.getElementById('PANO_instructions');
		this.viewChildren = {
			gyro:document.getElementById('PANO_instruct_gyro'),
			inertia:document.getElementById('PANO_instruct_inertia')
		}

	}

	InstructionView.prototype = new View();

	InstructionView.prototype.constructor = InstructionView;

	InstructionView.prototype.init = function(user, useGyro){
		/*
		*	Set user
		*/
		this.user = user;
		/*
		*	What instructions to give
		*/
		this.instructMotion(this.user.gyro && useGyro ? 'gyro': 'inertia')
		/*
		*	Display this view
		*/
		this.view.style.display = 'none';
		
	}

	InstructionView.prototype.instructMotion = function(type){
		/*
		*	Set this
		*/
		var self = this;
		/*
		*	On animation end event
		*/
		var animationEnd = function(e){
			/*
			*	Hide old
			*/
			this.style.display = 'none';
			/*
			*	Show new
			*/
			self.viewChildren[type].style.display = 'table-cell';
			self.viewChildren[type].className = 'PANO_instructOn';

		}
		/*
		*
		*/
		for(key in this.viewChildren){

			if(key!==type){

				this.viewChildren[key].className = 'PANO_instructOff';
				this.animationListener(this.viewChildren[key], 'AnimationEnd', animationEnd, this.user.prefix.js);

			}
		}
	}	

	InstructionView.prototype.updateMotion = function(useGyro){
		/*
		*	Update which instructions to give
		*/
		this.instructMotion(useGyro ? 'gyro' : 'inertia');
	}
	
	return InstructionView

})