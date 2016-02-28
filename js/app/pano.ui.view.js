define([

	'utils.eventListener',
	'utils.log'

],function(EventListener, log){
	
	function View(){
		
	}

	View.prototype = new EventListener();

	View.prototype.constructor = View;

	return View

})