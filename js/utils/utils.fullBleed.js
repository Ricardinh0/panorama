aspectratio = target.width/target.height;

target.width = stgWidth;	
target.height = stgWidth/aspectratio;

if (target.height > 0.8 * stgHeight) {
	target.height = 0.8 * stgHeight;
	target.width = target.height * aspectratio;
}

target.x = (stgWidth/2) - (target.width/2);
target.y = (stgHeight/2) - (target.height/2);