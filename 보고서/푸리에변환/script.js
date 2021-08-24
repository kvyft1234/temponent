var cvs = document.querySelectorAll("#canvas")[0];
var cvs1 = document.querySelectorAll("#canvas1")[0];
var cvs2 = document.querySelectorAll("#canvas2")[0];
var ctx = cvs.getContext("2d");
var ctx1 = cvs1.getContext("2d");
var ctx2 = cvs2.getContext("2d");
ctx.translate(0,500);
ctx1.translate(0,500);
ctx2.translate(0,500);

var [sin,cos,E,ran]=[Math.sin, Math.cos, Math.E, x=>Math.random()*10-5];
var cl = console.log;
Array.num = function(i){let sum=0; return Array(i).fill(1).map(j=>sum++)};
Array.sum = function(arr){let sum=0; arr.map(function(i){sum += i}); return sum;};

var 신호 = [];

var tri = Array(4).fill(1).map(y=>Array(2).fill(1).map(x => ran()+1));

function arrSum(arr){
	let sum=0;
	arr.map(function(a){sum += a});
	return sum;
}

for(let i = 0; i<1000; i+=1){
	let x = JSON.parse(JSON.stringify(tri));
	신호.push(arrSum(x.map(function(a){return a[0]*cos(a[1]*i/10)})));
}
console.log(tri);

ctx.beginPath();
ctx.moveTo(0,0);
for(let j=0; j<2000; j++){
	ctx.lineTo(j,-10*신호[j]);
}
ctx.stroke();

function calculateFlouier(){
	let out = [];
	for(let frequency=0; frequency<10; frequency += 0.01){
		let sum=0;
		for(let i=0; i<신호.length; i++){
			sum += cos(i*frequency*0.1)*신호[i];
		}
		out.push(sum/신호.length);
	}
	return out;
}

function result(){
	let arr = calculateFlouier();
	cl(arr.length);
	ctx1.beginPath();
	ctx1.moveTo(0,0);
	let out=[];
	for(let j=0; j<arr.length; j++){
		ctx1.lineTo(j,-300*(arr[j]));
			out.push([j,arr[j]]);
	}
	cl(out.map(x => [x[1],x[0]*0.01]));
	ctx1.stroke();
	ctx2.moveTo(0,0);
	ctx2.beginPath();
	Array.num(1000).map(function(i){ctx2.lineTo.apply(ctx2,[i,-Array.sum(out.map(j=>10*j[1]*cos(i*j[0]/1000)))])});
	ctx2.stroke();
}

