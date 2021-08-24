 
var xLength = window.innerWidth;
var yLength = window.innerHeight;
var mousePos={x:0,y:0};
 
var canvas = document.querySelectorAll('canvas')[0];
var ctx = canvas.getContext('2d');
 
var speed = 1.5;
var camx = 0.0, camy = 0.0, camz = 0.0;
var rotx, roty, rotz=0;
var sin = Math.sin, cos = Math.cos;
var x1,y1,z1,x2,y2,z2,x3,y3,z3,tempx,tempy,tempz;
 
var rate = 400;
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
    //console.log(event.keyCode);
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
    	camx += speed*cos(roty);
    	camz += speed*sin(roty);
    }
    if(leftPressed){
    	camx -= speed*cos(roty);
    	camz -= speed*sin(roty);
    }
    if(upPressed){
    	camx -= speed*sin(roty);
    	camz += speed*cos(roty);
    }
    if(downPressed){
    	camx += speed*sin(roty);
    	camz -= speed*cos(roty);
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
}
 
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
 
onmousemove = function (e) {
	let k = document.querySelectorAll(".index")[0];
	k.style.left = e.pageX + "px";
	k.style.top = e.pageY + "px";
	document.querySelectorAll("#mouseX")[0].innerText = e.pageX;
	document.querySelectorAll("#mouseY")[0].innerText = e.pageY;
	mousePos.x = Number(document.querySelectorAll("#mouseX")[0].innerText) - (xLength/2);
	mousePos.y = (yLength/2) - Number(document.querySelectorAll("#mouseY")[0].innerText);
	rotx = mousePos.y/100;
	roty = -mousePos.x/100;
	xLength = window.innerWidth;
	yLength = window.innerHeight;
}
 
function draw2d(x1,y1,x2,y2){
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}
 
function modifyPos(x,y,z){
	setValue(x - camx, y - camy, z - camz, 0);
	setValue(tempx*cos(roty)+tempz*sin(roty), tempy, tempz*cos(roty)-tempx*sin(roty), 0);
	setValue(tempx, tempy*cos(rotx)-tempz*sin(rotx), tempz*cos(rotx)+tempy*sin(rotx), 0);
	return [tempx, tempy, tempz];
}
 
function setValue(x,y,z,n){
	if(n==0){
		tempx=x; tempy=y; tempz=z;
	} else if(n==1){
		x1=x; y1=y; z1=z;
	} else if(n==2){
		x2=x; y2=y; z2=z;
	} else if(n==3){
		x3=x; y3=y; z3=z;
	}
}

function goTo3d(x,y,z,radius,color){
	let pos = modifyPos(x,y,z);
	if(pos[2]>zPlane){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(pos[0]/pos[2]*rate+xLength/2,yLength/2-pos[1]/pos[2]*rate,radius/pos[2]*10,0,6.28);
		ctx.fill();
	}
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

function polygon(x1,y1,z1,x2,y2,z2,x3,y3,z3){
	var pos1=modifyPos(x1,y1,z1), pos2=modifyPos(x2,y2,z2), pos3=modifyPos(x3,y3,z3);
	if (pos2[2]>pos3[2]){
		var pos0 = pos2;
		pos2=pos3;
		pos3=pos0;
	}
	if (pos1[2]>pos2[2]){
		var pos0 = pos1;
		pos1=pos2;
		pos2=pos0;
	}
	if (pos2[2]>pos3[2]){
		var pos0 = pos2;
		pos2=pos3;
		pos3=pos0;
	}
	if (pos1[2]>zPlane){
		filltriangle(projection(pos1),projection(pos2),projection(pos3));
	} else if (pos2[2]>zPlane){
		var pos4=division(pos1,pos2);
		var pos5=division(pos1,pos3);
		filltriangle(projection(pos2),projection(pos3),projection(pos4));
		filltriangle(projection(pos3),projection(pos4),projection(pos5));
	} else if (pos3[2]>zPlane){
		var pos4=division(pos1,pos3);
		var pos5=division(pos2,pos3);
		filltriangle(projection(pos3),projection(pos4),projection(pos5));
	}
}
 
function cube(middleX,middleY,middleZ,length){
	poligon(middleX-length/2,middleY-length/2,middleZ-length/2);
}
 
function randompos(){
	return new Array(9).fill(1).map(function () {return Math.random()*100;});
}

function drawLine3d(arr){
	ctx.beginPath();
	ctx.moveTo.apply(ctx,arr[0]);
	Array.num(arr.length-1).map(i=>{ctx.lineTo.apply(ctx,modifyPos(arr[i+1][0],0,modifyPos[i+1][1]))});
	ctx.stroke();
}

var newpos1 = randompos();
var newpos2 = randompos();
var newpos3 = randompos();
 

JSON.new = function (a){return JSON.parse(JSON.stringify(a))};
Array.num = function (n){let sum=0; return Array(n).fill(1).map(()=>sum++)};
Array.sum = function (arr){let sum=0; arr.map(function(i){sum+=i}); return sum;};
Array.vecSum = function (arr){
	let [sum1,sum2]=[0,0];
	Array.num(arr.length).map(function(i){sum1+=arr[i][0]; sum2+=arr[i][1]});
	return [sum1,sum2];
}
Array.vecScalarProduct = function(arr,k){return JSON.new(arr).map(i=>i*k)};
cl = function(i, ...j){console.log(i, ...j);return i;};

const au = 149600000000
var planet = [[0,0],[au,0],[au*1.00257,0]], mass = [1.989e30,5.972e24,7.36e22], velocity = [[0,0],[0,29800],[0,29100]], rad = [200,100,50], color = ["red","green","gray"];
var gravityConst=6.67384e-11, timeSpeed=1e7, fps=60, rate0=1e9;

var accelerateTo = function (p1,p2,m){
	let rSquare = (p1[0]-p2[0])**2+(p1[1]-p2[1])**2;
	let kpr = gravityConst*m/rSquare**1.5;
	return [kpr*(p2[0]-p1[0]),kpr*(p2[1]-p1[1])];
}

var render = function (){
	Array.num(mass.length).map(function(i){
		Array.num(mass.length).map(i=>goTo3d(planet[i][0]/rate0,0,planet[i][1]/rate0,rad[i],color[i]));
		velocity[i] = Array.vecSum([velocity[i],Array.vecScalarProduct(Array.vecSum(Array.num(mass.length-1).map(function(j){
			return accelerateTo(planet[i],planet[(i>j) ? j:j+1],mass[(i>j) ? j:j+1])
		})),timeSpeed/fps)])
	});
	Array.num(mass.length).map(function(i){planet[i]=Array.vecSum([planet[i],Array.vecScalarProduct(velocity[i],timeSpeed/fps)])});
	let field = Array.num(200).map(i=>{Array.num(200).map(j=>Array.sum(Array.num(mass.length).map(k=>gravityConst*mass[k]/((planet[k][0]-i)**2+(planet[k][1]-j)**2))))});
	Array.num(200).map(i=>drawLine3d(field[i]));
}

setInterval(function(){
	handler();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	render();
}, 100);