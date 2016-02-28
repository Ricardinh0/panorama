define([

],function(){


	function EventListener(){

		this.listeners = [];

	}

	EventListener.prototype = {

		constructor:EventListener,

		post:function(type, dataObject){

			//	For each listener
			for(var i = 0; i < this.listeners.length; i++){

				if(this.listeners[i].type===type){

					this.listeners[i].callback.call(this, (!dataObject) ? null : dataObject);

				}
			}
		},

		addEventListener:function(type, callback){

			if(typeof callback === 'function')
			{
				if(typeof type === 'string')
				{
					this.listeners.push({
						type:type,
						callback:callback
					});
				}
				else if(!type)
				{
					throw 'Please reference an event type.'
					return false;
				}
				else
				{
					throw 'Event type should be a string.'
					return false;
				}
			}
			else if(!callback)
			{
				throw 'Please reference an event callback.'
				return false;
			}
			else
			{
				throw 'Event callback is not function.'
				return false;
			}
			
		},

		removeEventListener:function(type){
			//	Listener list
			for (var i = 0; i < this.listeners.length; i++) {
				
				if(this.listeners[i].type===type){
					
					this.listeners.splice(i,1);

				}

			}

		},

		animationListener:function(element, type, callback, prefix){
			
			var prefix = (prefix.toLowerCase()==='moz') ? '' : prefix.toLowerCase();

			var onEvent = function(e){
				callback.call(this, {e:e});
				element.removeEventListener(prefix+type, onEvent);
			}

			element.addEventListener(prefix+(prefix===''?type.toLowerCase():type), onEvent, false);

		}

	}

	return EventListener;

})