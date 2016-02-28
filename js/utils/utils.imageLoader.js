define([

],function(){


	function LoadImages(){

		this.listeners = [];
		this.images = [];

	}

	LoadImages.prototype = {

		constructor: LoadImages,

		post:function(type){
			//	For each listener
			for(var i = 0; i < this.listeners.length; i++){

				if(this.listeners[i].type===type){

					switch(type){

						case 'onLoad':
							this.listeners[i].callback.call(this, {images:this.images});
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

		load:function(srcArray){

			var self = this;
			
			var imageLoad = function(srcArray){

				var _img = null;
				var _imgArray = [];
				var _length = srcArray.length;

				//	Create image objects
				for(var i = 0; i < srcArray.length; i++){
					
					var _img = new Image();
			        
			        _img.onload = function() {

			            --_length;
			            if(_length <= 0) imageLoaded(_imgArray)

			        }

			        _img.onerror = function(){

			        	throw 'Image location or URL not found.';

			        }

			        _img.src = srcArray[i];
			        _imgArray.push(_img);

				}
			}


			var imageLoaded = function(imageArray){

				self.images = imageArray;
				self.post('onLoad');

			}

			imageLoad(srcArray);
		}
	}

	return LoadImages;

})





