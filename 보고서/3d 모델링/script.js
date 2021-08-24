 
var xLength = window.innerWidth;
var yLength = window.innerHeight;
var mousePos = {x:0,y:0};
 
var canvas = document.querySelectorAll('canvas')[0];
var ctx = canvas.getContext('2d');
 
var speed = 1.5;
var camx = 0.0, camy = 0.0, camz = 0.0;
var rotx = 0, roty = 0;
var sin = Math.sin, cos = Math.cos;
var tempx,tempy,tempz;
var sinRotX, sinRotY, cosRotX, cosRotY;
 
var rate = 750;
var zPlane = 0.1;
 
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacebarPressed = false;
var shiftPressed = false;
var zoominPressed = false;
var zoomoutPressed = false;
var fasterPressed = false;
var slowerPressed = false;
 
function keyDownHandler(event) {
    if(event.keyCode == 68) {
        rightPressed = true;
    }
    else if(event.keyCode == 65) {
        leftPressed = true;
    }
    if(event.keyCode == 83) {
    	downPressed = true;
    }
    else if(event.keyCode == 87) {
    	upPressed = true;
    }
    if(event.keyCode == 32) {
    	spacebarPressed = true;
    }
    else if(event.keyCode == 16) {
    	shiftPressed = true;
    }
    if(event.keyCode == 79){
    	zoominPressed = true;
    }
    if(event.keyCode == 80){
    	zoomoutPressed = true;
    }
    if(event.keyCode == 75){
    	fasterPressed = true;
    }
    if(event.keyCode == 76){
    	slowerPressed = true;
    }
}
 
function keyUpHandler(event) {
    if(event.keyCode == 68) {
        rightPressed = false;
    }
    else if(event.keyCode == 65) {
        leftPressed = false;
    }
    if(event.keyCode == 83) {
    	downPressed = false;
    }
    else if(event.keyCode == 87) {
    	upPressed = false;
    }
    if(event.keyCode == 32) {
    	spacebarPressed = false;
    }
    else if(event.keyCode == 16) {
    	shiftPressed = false;
    }
    if(event.keyCode == 79){
    	zoominPressed = false;
    }
    if(event.keyCode == 80){
    	zoomoutPressed = false;
    }
    if(event.keyCode == 75){
    	fasterPressed = false;
    }
    if(event.keyCode == 76){
    	slowerPressed = false;
    }
}
 
function handler(){
    if(rightPressed){
    	camx += speed*cosRotY;
    	camz += speed*sinRotY;
    }
    if(leftPressed){
    	camx -= speed*cosRotY;
    	camz -= speed*sinRotY;
    }
    if(upPressed){
    	camx -= speed*sinRotY;
    	camz += speed*cosRotY;
    }
    if(downPressed){
    	camx += speed*sinRotY;
    	camz -= speed*cosRotY;
    }
    if(spacebarPressed){
    	camy += speed;
    }
    if(shiftPressed){
    	camy -= speed;
    }
    if(zoominPressed){
    	rate /= 0.9;
    }
    if(zoomoutPressed){
    	rate *= 0.9;
    }
    if(fasterPressed){
    	speed *= 0.9;
    }
    if(slowerPressed){
    	speed /= 0.9;
    }
	[sinRotX,sinRotY,cosRotX,cosRotY]=[sin(rotx),sin(roty),cos(rotx),cos(roty)];
}

function mouseDownHandler(e){
	if(preTri.length<3){
		preTri.push([camx-10*sinRotY*cosRotX,camy+10*sinRotX,camz+10*cosRotY*cosRotX]);
	}
	if(preTri.length==3){
		tri.push({a:preTri[0], b:preTri[1], c:preTri[2]});
		preTri = [];
	}
}
 
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousedown', mouseDownHandler, false);
 
onmousemove = function (e) {
	let k = document.querySelectorAll(".index")[0];
	k.style.left = e.pageX + "px";
	k.style.top = e.pageY + "px";
	document.querySelectorAll("#mouseX")[0].innerText = e.pageX;
	document.querySelectorAll("#mouseY")[0].innerText = e.pageY;
	mousePos.x = Number(document.querySelectorAll("#mouseX")[0].innerText) - (xLength/2);
	mousePos.y = (yLength/2) - Number(document.querySelectorAll("#mouseY")[0].innerText);
	rotx = mousePos.y/100;
	if(rotx < -1.57){
		rotx = -1.57;
	}
	if(rotx > 1.57){
		rotx = 1.57;
	}
	roty = -mousePos.x/100;
	xLength = window.innerWidth;
	yLength = window.innerHeight;
}

function modifyPos(p){
	setValue(p[0] - camx, p[1] - camy, p[2] - camz);
	return [tempx*cosRotY+tempz*sinRotY, tempy*cosRotX-(tempz*cosRotY-tempx*sinRotY)*sinRotX, (tempz*cosRotY-tempx*sinRotY)*cosRotX+tempy*sinRotX];
}
 
function setValue(x,y,z){
	tempx=x; tempy=y; tempz=z;
}
 
function filltriangle(pos1,pos2,pos3){
	ctx.beginPath();
	ctx.moveTo(pos1[0]+xLength/2,yLength/2-pos1[1]);
	ctx.lineTo(pos2[0]+xLength/2,yLength/2-pos2[1]);
	ctx.lineTo(pos3[0]+xLength/2,yLength/2-pos3[1]);
	ctx.closePath();
	ctx.fill();
}
 
function projection(pos){
	return [pos[0]/pos[2]*rate, pos[1]/pos[2]*rate];
}
 
function division(pos1,pos2){
	return [(pos1[0]*(pos2[2]-zPlane)+(zPlane-pos1[2])*pos2[0])/(pos2[2]-pos1[2]),(pos1[1]*(pos2[2]-zPlane)+(zPlane-pos1[2])*pos2[1])/(pos2[2]-pos1[2]), zPlane];
}
 
function polygon(p1,p2,p3){
	let pos1=modifyPos(p1), pos2=modifyPos(p2), pos3=modifyPos(p3);
	if (pos2[2] > pos3[2]){
		let pos0 = pos2;
		pos2=pos3;
		pos3=pos0;
	}
	if (pos1[2] > pos2[2]){
		let pos0 = pos1;
		pos1=pos2;
		pos2=pos0;
	}
	if (pos2[2] > pos3[2]){
		let pos0 = pos2;
		pos2=pos3;
		pos3=pos0;
	}
	if (pos1[2] > zPlane){
		filltriangle(projection(pos1),projection(pos2),projection(pos3));
	} else if (pos2[2] > zPlane){
		var pos4 = division(pos1,pos2);
		var pos5 = division(pos1,pos3);
		filltriangle(projection(pos2),projection(pos3),projection(pos4));
		filltriangle(projection(pos3),projection(pos4),projection(pos5));
	} else if (pos3[2] > zPlane){
		var pos4 = division(pos1,pos3);
		var pos5 = division(pos2,pos3);
		filltriangle(projection(pos3),projection(pos4),projection(pos5));
	}
}
 
function randompos(){
	return new Array(3).fill(1).map(function () {return Math.random()*100;});
}
 
var newpos1=[], newpos2=[], newpos3=[];
function newranpos(){
	this.a = randompos();
	this.b = randompos();
	this.c = randompos();
}

var point = [[0,0,0],[100,0,0],[0,100,0]];
var tri = [{a:point[0],b:point[1],c:point[2]}];
var preTri = [];

setInterval(function(){
	handler();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(let i=0; i<tri.length; i++){
		polygon(tri[i].a, tri[i].b, tri[i].c);
	}
	ctx.beginPath();
	ctx.moveTo(xLength/2-10,yLength/2);
	ctx.lineTo(xLength/2+10,yLength/2);
	ctx.closePath();
	ctx.stroke();
}, 20);




