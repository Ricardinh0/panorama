define([

],function(CL){
	/*
	*
	*
	*	Track
	*	@	
	*
	*/
	function Track(gaID){
		

		_gaq.push(['_setAccount', gaID]);
		_gaq.push(['_trackPageview']);

		if(_gat!==null){
			this.pageTracker = _gat._getTrackerByName() || null;
			this.accountId = this.pageTracker._getAccount() || null;
		}

		this.timeStamp = new Date().getTime();
		this.eventArray = [];

	}

	Track.prototype = {

		constructor: Track,

		event: function(category, action, label) {
			//
			var self = this;
			//
			self.eventArray.push([category, action, label]);

		},
		pushEvents:function(timeStamp, callBack){

			var self = this;
			var tracked = false;
			var timeStamp = timeStamp || false;
			var time = '';
			var eventArrayLength = self.eventArray.length;

			if(timeStamp){
				
				var currentTimeStamp = new Date().getTime();
				var diff = Math.max(0, Math.floor((currentTimeStamp - self.timeStamp)/1000));
				var seconds = diff % 60;
				var minutes = Math.floor((diff /= 60) % 60);
				var hours = Math.floor((diff /= 60) % 24);
				
				time = ' - ' + hours + ':' + minutes + ':' + seconds;

			}

			//	Push events
			for(var i = 0; i < self.eventArray.length; i++){
				if(_gat!==null) tracked = self.pageTracker._trackEvent('BRW_POS___' + self.eventArray[i][0], self.eventArray[i][1], self.eventArray[i][2] + time)
				--eventArrayLength;
				if(eventArrayLength<=0 && typeof callBack === 'function') callBack();
			}
			//	Reset
			self.eventArray = [];

		}

	}

	return Track;

})





