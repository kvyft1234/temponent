var cvs = document.querySelectorAll("#canvas")[0];
var ctx = cvs.getContext("2d");
var 수식 = document.querySelectorAll("input[name=수식]")[0].value;
var 배율;
var 계산값;
var cl = console.log;

var [ln,log,abs,sin,cos,tan,sec,csc,cot,e] = [Math.log, Math.log10, Math.abs, Math.sin, Math.cos, Math.tan, x=>1/cos(x), x=>1/sin(x), x=>1/tan(x), Math.E];

ctx.transform(1,0,0,1,500,500);

function 격자그리기(){
	ctx.font = "15px Arial";
	ctx.beginPath();
	ctx.moveTo(-500,0);
	ctx.lineTo(500,0);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0,-500);
	ctx.lineTo(0,500);
	ctx.stroke();
	for(let i=-10; i<11; i++){
		ctx.fillText(Math.floor(100*i*50/배율)/100, i*50, 14);
	}
	for(let i=-10; i<11; i++){
		ctx.fillText(Math.floor(100*i*50/배율)/100, 2, -i*50);
	}
}

function 수식계산(x){
	return eval(수식.replaceAll("x","("+x+")").replaceAll("^","**"));
}

function 미분(x){
	return (수식계산(x+0.005)-수식계산(x-0.005))/0.01;
}

function 그래프(){
	지우기();
	수식 = document.querySelectorAll("input[name=수식]")[0].value;
	let k = 500/배율;
	ctx.beginPath();
	ctx.moveTo(-k*배율,-수식계산(-k)*배율);
	for(let i=-k; i<k; i+=0.01){
		ctx.lineTo(i*배율,-수식계산(i)*배율);
	}
	ctx.stroke();
}

function 미분그래프(){
	지우기();
	수식 = document.querySelectorAll("input[name=수식]")[0].value;
	let k = 500/배율;
	ctx.beginPath();
	ctx.moveTo(-k*배율,-미분(-k)*배율);
	for(let i=-k; i<k; i+=0.01){
		ctx.lineTo(i*배율,-미분(i)*배율);
	}
	ctx.stroke();
}

function 지우기(){
	배율 = document.querySelectorAll("input[name=배율]")[0].value;
	ctx.clearRect(-500,-500,1000,1000);
	격자그리기();
}

그래프();