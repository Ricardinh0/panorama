define([

],function(){

	function Logger(){
		var b = document.getElementsByTagName('BODY')[0];
		this.o;
		this.init();
	}
	Logger.prototype = {
		
		constructor: Logger,
		
		init: function(){

			this.o = this.logWrap(0);
			document.getElementsByTagName('BODY')[0].appendChild(this.o);
			
		},
		
		logWrap: function(p){
			var output = document.createElement('DIV');
			output.style.position = 'absolute';
			output.style.top = p+'px';
			output.style.background = 'black';
			output.style.color = 'yellow';
			output.style.fontSize = '11px';
			output.style.fontFamily = 'Helvetica, Arial';
			output.style.width = '100%';
			output.style.opacity = '.7';
			return output;
		},
		
		conlog:function(mgs){

			var mgs = mgs || [];

			this.o.innerHTML = '';

			for(var i = 0; i < mgs.length; i++){
				
				this.o.innerHTML += '<br>' + mgs[i]
				console.log(mgs[i])

			}
		},
		
		permlog: function(mgs){
			var o = this.logWrap(30);
			o.innerHTML = mgs;
			document.getElementsByTagName('BODY')[0].appendChild(o)
		}
		
	}

	var _ = new Logger();
	var log = function(array){_.conlog(array)}

	return log;
})