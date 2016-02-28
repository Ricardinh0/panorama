define([

	'utils.imageloader',
	'utils.log'

],function(ImageLoader, log){


	/*
	*
	*	Cube
	*
	*/
	function Cube(skins, faces){

		//	Media
		this.skins = skins;
		//	Face ID
		this.faces = faces;
		//	User
		this.user = null;
		//
		this.listeners = [];
		//
		this.prefix = '';
		//
		this.panorama = document.querySelector('#PANO');
		//
		this.scene = document.querySelector('#PANO_scene');
		//
		this.fov = ((2*(Math.atan(0.5*window.innerHeight/20)))*180/Math.PI)+100;
		//
		this.initialised = false;

	}


	Cube.prototype = {

		constructor:Cube,

		load:function(user){

			var self = this;
			//	Set user details
			self.user = user;
			//	Set prefix
			self.prefix = user.prefix.js;
			//	Run application
			self.loadImages();

		},

		post:function(type){
			//	For each listener
			for(var i = 0; i < this.listeners.length; i++){

				if(this.listeners[i].type===type){

					switch(type){
						case 'onLoaded':
							this.listeners[i].callback.call(this, {panorama:this.panorama, skins:this.skins});
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

		loadImages:function(){

			var imageLoader = new ImageLoader();
			var self = this;
			var imgs = []

			var imageLoaded = function(e){

				self.imgArray = e.images;

				for (var i = 0; i < e.images.length; i++) {

					e.images[i].style.display = 'none';
					document.body.appendChild(e.images[i]);

				};

				self.buildFaces();

			}

			imageLoader.addEventListener('onLoad', imageLoaded);

			for (var i = 0; i < this.skins.length; i++) {

				imgs = imgs.concat(this.skins[i].media);

			};

			imageLoader.load(imgs);

		},

		buildFaces:function(){

			var skins = {};
			
			for (var i = 0; i < this.skins.length; i++) {

				var skin = this.skins[i].type
				skins[skin] = {}
				skins[skin].name = skin;
				skins[skin].faces = []

				for (var j = 0; j < this.faces.length; j++) {
					/*
					*	Create face
					*/
					var face = document.createElement('div');
					/*
					*	Append to DOM
					*/
					document.querySelector('#'+this.faces[j]).appendChild(face);
					/*
					*	Set class
					*/
					face.className = 'face_media';
					/*
					*	Set face media
					*/
					face.style.backgroundImage = 'url("'+this.skins[i].media[j]+'")';
					/*
					*	Build data object
					*/
					skins[skin].faces.push(face)
					/*
					*	Face opacity is 0 unless its the last skin
					*/
					if(i!==this.skins.length-1){
						face.style.opacity = '0';
						skins[skin].active = false;
					}else{
						skins[skin].active = true;
					}
				}
			}
			//	Reset skins data
			this.skins = skins;
			//	Cube initialised
			if(!this.initialised){
				this.initialised = true;
				this.post('onLoaded');
			}
			
			this.addListeners();

		},

		addListeners: function(){
			
			window.onresize = function(){

				self.fov = ((2*(Math.atan(0.5*window.innerHeight/20)))*180/Math.PI)+100;

			}

		},

		rotate:function(e){
			/*
			*	Rotate cube
			*/
			this.panorama.style[this.prefix+'Perspective'] = this.fov+'px';
			this.panorama.style[this.prefix+'TransformStyle'] = 'preserve-3d';
			this.scene.style[this.prefix+'Transform'] = 'translate3d(0px, 0px, '+this.fov+'px)  rotateZ('+(e.vec3.z%360)*-1+'deg) rotateX(-90deg) rotateX('+(e.vec3.y%360)+'deg) rotateY('+(e.vec3.x%360)*-1+'deg) rotateY(0deg)';
			
			document.querySelector('#PANO_scene_b').style[this.prefix+'Transform'] = 'rotateZ('+(e.vec3.z%360)*-1+'deg) rotateX(-90deg) rotateX('+(e.vec3.y%360)+'deg) rotateY('+(e.vec3.x%360)*-1+'deg) rotateY(0deg)';

		}

	}

	return Cube;

});

