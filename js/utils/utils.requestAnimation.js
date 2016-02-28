define([

],function(){
	
	/*
	*
	*	Request Animation Frame Shim
	*
	*/

	requestAnimationFrame = (function(){

		return	window.requestAnimationFrame       	||
				window.webkitRequestAnimationFrame 	||
				window.mozRequestAnimationFrame    	||
				window.oRequestAnimationFrame 		||
			 	function(fn){
					window.setTimeout(fn, 1000/60);
				};

	})();

	return requestAnimationFrame;


})