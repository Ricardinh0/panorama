define([

	'pano.gyro',
	'pano.inertia',
	'pano.cube',
	'pano.userSupport',
	'pano.track',
	'pano.ui',
	'three.vector3',
	'utils.log'

],function(Gyro, Inertia, Cube, UserSupport, Track, UI, Vector3, log){
	/*
	*
	*	Setup
	*
	*/
	var faces = ['PANO_north','PANO_east','PANO_south','PANO_west','PANO_up','PANO_down'];
	var skins = [
		{
			type:'paris',
			media:[
				'img/panorama/s2_n.jpg',
				'img/panorama/s2_e.jpg',
				'img/panorama/s2_s.jpg',
				'img/panorama/s2_w.jpg',
				'img/panorama/s2_u.jpg',
				'img/panorama/s2_d.jpg'
			]
		}
	];
	var user = new UserSupport();
	var cube = new Cube(skins, faces);
	var UI = new UI();
	var vec3 = new Vector3();
	var motion = null;
	var inertia = null;
	var gyro = null;
	/*
	*
	*/
	
	/*
	*
	*	Support event
	*
	*/
	var onSupportUpdate = function(e){
		/*
		*	Run or redirect
		*/
		(e.supported) ? cube.load(e) : log(['User unsupported']);
		/*
		*	Reset user
		*/
		user = e;
	}
	/*
	*
	*	Motion event
	*
	*/
	var onMotion = function (e){
		/*
		*
		*/
		vec3.set(e.vec3.x,e.vec3.y,e.vec3.z);
		/*
		*	Update cube
		*/
		cube.rotate(e);
		/*
		*	Update UI
		*/
		UI.rotate(e);
	}
	/*
	*
	*	Cube event
	*
	*/
	var onLoaded = function(e){
		/*
		*
		*/
		gyro = (user.gyro) ? new Gyro(user) : null;
		inertia =  new Inertia('easeOutQuad', 29, 10)
		/*
		*	Add motion listener
		*/
		motion = (user.gyro && user.device.model.toLowerCase()!=='android') ? gyro : inertia;
		motion.addEventListener('onMotionUpdate', onMotion);
		/*
		*	Initialise UI
		*/
		UI.init(user, e);
	}
	/*
	*
	*	Motion toggle event to turn the Gyro experience ON/OFF (if gyro exists)
	*
	*/
	var onMotionToggle = function(e){
		/*
		*	Remove current motion event
		*/
		motion.removeEventListener('onMotionUpdate', onMotion);
		/*
		*	Clear the motion variable
		*/
		motion = null;
		/*	
		*	Set the motion variable to its new type
		*/
		motion = (e) ? gyro : inertia;
		/*
		*	Listen to new motion type
		*/
		motion.addEventListener('onMotionUpdate', onMotion);
	}
	/*
	*
	*	Event listeners
	*
	*/
	user.addEventListener('supportStatusUpdate', onSupportUpdate);
	cube.addEventListener('onLoaded', onLoaded);
	UI.addEventListener('motionToggle', onMotionToggle);
	/*
	*
	*	Test user
	*
	*/
	user.test();
})