
var canvas = document.querySelectorAll("#canvas")[0];
var ctx = canvas.getContext('2d');
ctx.translate(1000,1000);
ctx.lineWidth=5;

var canvas1 = document.querySelectorAll("#canvas1")[0];
var ctx1 = canvas1.getContext('2d');
ctx1.translate(1000,1000);
ctx1.lineWidth=5;

Array.num = function(a){let sum=-1; return Array(a).fill(1).map(function(k){sum++; return sum;})};
Math.rand = function(){let r=Math.random(); return Math.log(r/(1-r))};
JSON.new = function(a){return JSON.parse(JSON.stringify(a));};
Array.sum = function(a){let sum=0; Array.num(a.length).map(function(k){sum += a[k]}); return sum;};
mkArray = function(a,...b){return b.length==0 ? Array(a).fill(0):Array(a).fill(0).map(i=>mkArray(...b))};
var cl = console.log;

const ai = {
	value : {
		Layer : [],
		weight : [],
		bias : [],
		x : [],
		delta : [],
		eta : 0.01
	},
	getValue : function(){return JSON.new(ai.value)},
	setForm : function (){
		let l = ai.getValue().Layer;
		this.value.weight = Array.num(l.length-1).map(x => Array(l[x+1]).fill(1).map(y => Array(l[x]).fill(1).map(z => Math.rand())));
		this.value.bias = Array.num(l.length-1).map(x => Array(l[x+1]).fill(1).map(y => Math.rand()));
		this.value.x = Array.num(l.length).map(x => Array(l[x]).fill(1).map(y => x==0 ? Math.rand():0));
		this.value.z = Array.num(l.length-1).map(x => Array(l[x+1]).fill(0));
		this.value.delta = Array.num(l.length-1).map(x => Array(l[x+1]).fill(0));
	},
	setStart : function (Layer){
		this.value.Layer = Layer;
		this.setForm();
		this.updateValue();
		ctx.renderNeural(new ai.getValue());
		document.querySelectorAll("#cost")[0].innerText = ai.value.cost;
	},
	activationFunction : {
		sigmoid : function(k){return 1/(1+Math.E**(-k))},
		relu : function(k){return k>0 ? k:0},
		tanh : function(k){return Math.tanh(k)},
		preRelu : function(k){return k>0 ? k:0.01*k},
		now : "sigmoid"
	},
	updateValue : function (input){
		let i = input;
		let v = ai.getValue();
		let l = v.Layer;
		let x = v.x;
		let w = v.weight;
		let b = v.bias;
		let af = this.activationFunction[this.activationFunction.now];
		if(input){
			if(i.length==this.value.Layer[0]){
				this.value.x[0] = i;
			}else{
				cl(i + "은 input길이와 다릅니다");
				return;
			}
		}else{
			x[0] = Array(l[0]).fill(0).map(Math.rand);
		}
		this.value.x = Array.num(l.length).map(function(i){if(!!i){return Array.num(l[i]).map(function(j){return af(Array.sum(Array.num(l[i-1]).map(function(k){return x[i-1][k]*w[i-1][j][k];})) + b[i-1][j]);})}else{return x[i];}});
	},
	backpropagation : function(answer){
		let v = ai.getValue();
		let l = v.Layer;
		let ll = l.length;
		let d = v.dleta;
		let x = v.x;
		let z = v.z;
		let eta = v.eta;
		let weight = v.weight;
		let bias = v.bias;
		cl(x);
		let f = this.activationFunction[this.activationFunction.now];
		let df = function(k){return (f(k+0.01)-f(k-0.01))/0.02};
		if(answer.length == l[ll-1]){
			for(let i=0; i<l[ll-1]; i++){
				d[ll-2][i] = 2*(x[ll-1][i]-answer[i])*df(z[ll-1][i]);
				for(let j=0; j<l[ll-2]; j++){
					weight[ll-2][i][j] -= eta * d[ll-2][i] * x[ll-2][j];
				}
				bias[ll-1][i] -= eta*d[ll-2][i];
			}
			for(let i=ll-3; i>=0; i++){
				for(let j=0; j<l[i+1]; j++){
					d[i][j]=0;
					for(let k=0; k<l[i]; k++){
						d[i][k] += d[i+1][j]*weight[i+1][j][k]*df(z[i][k]);
					}
					for(let k=0; k<l[i+1]; k++){
						weight[ll-2][i][j] -= eta * d[ll-2][i] * x[ll-2][j];
					}
					bias[i][j] -= eta*d[i][j];
				}
			}
		}else{
			cl("올바른 함수 인자가 아닙니다.");
		}
	}
};

ctx.line = function(x1,y1,x2,y2,w){
	ctx.strokeStyle = "#"+(w>0.5 ? 16**5+Math.floor((w-0.5)*511):(255-Math.floor(w*511))*16**4).toString(16);
	this.beginPath();
	this.moveTo(x1,y1);
	this.lineTo(x2,y2);
	this.stroke();
}

ctx.renderNeural = function(value){
	this.clearRect(-1000,-1000,2000,2000);
	let s = function(k){return 1/(1+Math.E**(-1.2*k))};
	let l = value.Layer;
	let w = value.weight;
	//Array.num(l.length-1).map(function(i){Array.num(l[i]).map(function(j){Array.num(l[i+1]).map(function(k){ctx.line(l.length-1!=0 ? -800+1600/(l.length-1)*i:0,(l[i]-1)!=0 ? -800+1600/(l[i]-1)*j:0,(l.length-1)!=0 ? -800+1600/(l.length-1)*(i+1):0,(l[i+1]-1)!=0 ? -800+1600/(l[i+1]-1)*k:0,s(w[i][k][j]))})})});
	Array.num(l.length-1).map(function(i){Array.num(l[i]).map(function(j){Array.num(l[i+1]).map(function(k){ctx.line(-800+1600/(l.length+1)*i,-800+1600/(l[i]+1)*(j+1),-800+1600/(l.length+1)*(i+1),-800+1600/(l[i+1]+1)*(k+1),s(w[i][k][j]))})})});
}

ai.setStart([3,6,1]);
//ai.backpropagation([1,2,3,4]);