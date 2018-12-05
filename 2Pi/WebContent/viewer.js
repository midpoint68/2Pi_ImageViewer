/**
 * 
 */

var fov = Math.PI*160/180;
function TwoPiViewer(imgSrc){
	this.img = new Image();
	this.img.src = imgSrc;
	
	this.display = function(ctx){
		
	}
	
	this.render = function(ctx, z, x){
		var cw = ctx.canvas.width;
		var ch = ctx.canvas.height;
		var fovH = fov*ch/cw;
		var w = this.img.width;
		var h = this.img.height;
		var sx = (z/(2*Math.PI))*w;
		var sy = h/2 - ((Math.abs(x -fovH/2))/(Math.PI))*h;
		var swidth = ((z+fov)/(2*Math.PI))*w - sx;
		var sheight = h/2 + ((Math.abs(x+fovH/2))/(Math.PI))*h - sy;
		ctx.drawImage(this.img, sx, sy, swidth, sheight, 0, 0, cw, ch);
		if(sx < 0) ctx.drawImage(this.img, w-sx, sy, swidth, sheight, 0, 0, cw, ch);
		if(sx + swidth > w) ctx.drawImage(this.img, sx-w, sy, swidth, sheight, 0, 0, cw, ch);
		
		var divs = 60;
		var divW = Math.ceil(cw/divs);
			
		for(let i = 0; i < divs; i++){
			var xPos = i*divW;
			var imgDat = ctx.getImageData(xPos, 0, divW, ch);
			var mod = Math.pow(Math.abs((i-(divs/2))/divs)*Math.sin(fov/2)*6, 2);
			putResized(ctx, xPos, imgDat, mod, divs);
		}
	}
	
}

function putResized(ctx, xPos, dat, mod, divs){
	let chunk = Math.ceil(dat.height/divs);
	for(let i = 0; i < divs; i++){
		let vertMod = mod*(i - (divs/2));
		ctx.putImageData(dat, xPos, vertMod, 0, i*chunk, dat.width, chunk*vertMod/2);
	}
}