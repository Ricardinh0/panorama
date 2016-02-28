define([

	'utils.log'

],function(log){

	var deviceDetect = function(prefix){

		var device = {
			model:''
		};

		var set = function(model){
			//	Set operating system
			device.model = model;
		}

		if( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i))
		{
			set('ios');
		}
		else if(navigator.userAgent.match(/Android/i))
		{
			set('android');
		}
		else
		{
			set('unknown');
		}

		return device;

	}

	return deviceDetect()

})





