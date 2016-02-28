require.config({
	
	deps: ['app/pano.index'],

	paths:{
		/*
		*	Library
		*/
		'handlebars':'lib/handlebars-v1.3.0',
		'three.matrix4':'lib/three.matrix4',
		'three.vector3':'lib/three.vector3',
		'three.quaternion':'lib/three.quaternion',
		/*
		*	Utilities
		*/
		'utils.imageloader':'utils/utils.imageLoader',
		'utils.log':'utils/utils.logger',
		'utils.requestAnimation':'utils/utils.requestAnimation',
		'utils.animationListener':'utils/utils.animationListener',
		'utils.eventListener':'utils/utils.eventListener',
		/*
		*	Motion workers
		*/
		'pano.gyro':'app/motion/pano.gyro',
		'pano.inertia':'app/motion/pano.inertia',
		/*
		*
		*/
		'pano.copy':'app/copy/pano.copy',
		'pano.template':'app/pano.template',
		/*
		*	Views & Display
		*/
		'pano.cube':'app/pano.cube',
		'pano.ui':'app/pano.ui',
		'pano.ui.animate':'app/pano.ui.animate',
		'pano.ui.view':'app/pano.ui.view',
		'pano.ui.loadView':'app/pano.ui.loadView',
		'pano.ui.instructionView':'app/pano.ui.instructionView',
		/*
		*	Tracking
		*/
		'pano.track':'app/tracking/pano.track',
		/*
		*	User support/language/prefix/device detection
		*/
		'pano.userSupport':'app/device/pano.userSupport',
		'pano.language':'app/device/pano.language',
		'pano.deviceDetect':'app/device/pano.deviceDetect',
		'pano.prefix':'app/device/pano.prefix'

	},

	shim: {
		handlebars: {
			exports: 'Handlebars'
		}
	}

})