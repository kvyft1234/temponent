var cl = function(a, ...b){console.log(a, ...b); return a;};
var makeArray = function (arr){return Array(arr[0]).fill(0).map(i => arr.length>1 ? makeArray(arr.slice(1)):0)};
var	rangeArray = function (n){let sum=0; return Array(n).fill(0).map(i => sum++)};
var randInteger = function (a,b){return Math.floor(a+Math.random()*(b-a))} // 실수 a~b 사이의 정수 랜덤 생성
var randReal = function (a,b){return a+Math.random()*(b-a)};
var reverseSigmoid = function (x){return Math.log(x/(1-x))};
var random = function (x){return reverseSigmoid(Math.random())};
var resetArray = function (arr){return arr.map(random)};
var sumArray = function (arr){let sum=0; arr.map(i=>{sum+=i}); return sum;};
JSON.new = arr => JSON.parse(JSON.stringify(arr));


var idGet = function(id){return document.querySelectorAll("#"+id)[0]};
var cvs = idGet("cvs");
var ctx = cvs.getContext("2d");


const fluid = {};
fluid.variable = {};
fluid.do = {};
fluid.variable.size = [];
fluid.variable.press = [];
fluid.variable.velocity = [];
fluid.variable.particle = [];
fluid.do.setSpace = function(sizeArr){
	fluid.variable.size = sizeArr;
	fluid.variable.press = makeArray(sizeArr);
	fluid.variable.velocity = makeArray(sizeArr.concat([2]));
}; // ex:setSpace([700,700])
fluid.do.addParticle = function(x,y){
	fluid.variable.particle.push([x+randReal(-5,5),y+randReal(-5,5)]);
};
fluid.do.updatePress = function(){
	fluid.variable.press = makeArray(fluid.variable.size);
	for(let i=0; i < fluid.variable.particle.length; i++){
		let j = fluid.variable.particle[i];
		let k = j.map(Math.floor);
		fluid.variable.press[k[0]][k[1]] += (1+k[0]-j[0])*(1+k[1]-j[1]);
		fluid.variable.press[k[0]][k[1]+1] += (1+k[0]-j[0])*(j[1]-k[1]);
		fluid.variable.press[k[0]+1][k[1]] += (j[0]-k[0])*(1+k[1]-j[1]);
		fluid.variable.press[k[0]+1][k[1]+1] += (j[0]-k[0])*(j[1]-k[1]);
	}
};
fluid.do.updateVelocity = function(){
	let v = JSON.new(fluid.variable.velocity);
	// for(let i=1; i < s[0]-2; i++){
	// 	for(let j=1; j < s[1]-2; j++){
	// 		let
	// 		if
	// 		fluid.variable.velocity[i][j][0] += v[i][j][0];
	// 		fluid.variable.velocity[i][j][1] += v[i][j][1];
	// 		fluid.variable.velocity[i][j][0] -= v[i][j][0];
	// 		fluid.variable.velocity[i][j][1] -= v[i][j][1];
	// 	}
	// }
	let p = JSON.new(fluid.variable.press);
	let s = fluid.variable.size;
	for(let i=1; i < s[0]-2; i++){
		for(let j=1; j < s[1]-2; j++){
			fluid.variable.velocity[i][j][0] += -0.001*(p[i+1][j]-p[i-1][j]);
			fluid.variable.velocity[i][j][1] += -0.001*(p[i][j+1]-p[i][j-1])+0.1;
			fluid.variable.velocity[i][j][0] *= 0.9;
			fluid.variable.velocity[i][j][1] *= 0.9;
		}
	}
};
fluid.do.updateParticle = function(){
	let a = fluid.variable.particle;
	let b = a.length;
	let c = fluid.variable.velocity;
	for(let i=0; i<b; i++){
		let d=c[Math.floor(a[i][0])][Math.floor(a[i][1])];
		if( (a[i][0]+d[0]>1) && (a[i][0]+d[0]<98) ){
			a[i][0] += d[0];
		}else{
			d[0] *= -0.9;
		}
		if( (a[i][1]+d[1]>1) && (a[i][1]+d[1]<98) ){
			a[i][1] += d[1];
		}else{
			d[1] *= -0.1;
		}
	}
};
fluid.do.makeFrame = function(){
	fluid.do.updatePress();
	fluid.do.updateVelocity();
	fluid.do.updateParticle();
};
fluid.do.project = function(){
	let p = fluid.variable.particle;
	fluid.do.makeFrame();
	ctx.clearRect(0,0,1000,1000);
	ctx.fillStyle = "rgba(0,0,0,0.1)";
	for(let i=0; i<p.length; i++){ctx.beginPath(); ctx.arc(10*p[i][0],10*p[i][1],10,0,2*Math.PI); ctx.fill();}
}


fluid.do.setSpace([100,100]);
for(let i=0; i<5000; i++){fluid.do.addParticle(50,50);}
var interval1 = setInterval(fluid.do.project,10);
setTimeout(function(){clearInterval(interval1)},50000);



// roh * dv_x/dt = - dp/dx + k * (ddv_x/dxdx + ddv_x/dydy + ..) + roh * g_x
// roh * dv_y/dt = - dp/dy + k * (ddv_y/dxdx + ddv_y/dydy + ...) + roh * g_y













