define([

	'pano.ui.view',
	'utils.log'

],function(View, log){
	
	function LoadView(){

		this.user = {};
		this.view = document.getElementById('PANO_load');

	}

	LoadView.prototype = new View();

	LoadView.prototype.constructor = LoadView;

	LoadView.prototype.kill = function(user){
		/*
		*	Set this
		*/	
		var self = this;
		/*
		*	Set user
		*/	
		self.user = user;
		/*
		*	On animation end event
		*/
		var animationEnd = function(e){
			/*
			*	Kill this
			*/
			document.body.removeChild(this);
			/*
			*	Tell anyone listening
			*/
			self.post('onDistruction', {event:'onDistruction'});
		}
		/*
		*	Listen to for animation end event
		*/
		this.animationListener(self.view, 'AnimationEnd', animationEnd, user.prefix.js);
		/*
		*	Delay introduction
		*/
		setTimeout(function(){
			self.view.className = 'PANO_killLoad';
		},1000);

	}

	return LoadView

})