let cvs1 = document.querySelectorAll("#cvs1")[0];
let ctx1 = cvs1.getContext("2d");
let len;
let range = 200;
let [sin,cos] = [Math.sin, Math.cos];
let cvs2 = document.querySelectorAll("#cvs2")[0];
let ctx2 = cvs2.getContext("2d");
ctx1.translate(cvs1.width/2, cvs1.height/2);
ctx1.font = "15px Arial";

let innerLine = function (x1,x2,percent){
	return (x1*percent+x2*(1-percent));
}

let mappingFloyd = function (v) {
	ctx1.clearRect(-1000,-1000,2000,2000);
	for(let i=0; i<len; i++){
		ctx1.beginPath();
		ctx1.arc(range*sin(i*2*Math.PI/len), range*cos(i*2*Math.PI/len), 50, 0, 2 * Math.PI);
		ctx1.stroke();
	}
	for(let i=0; i<len; i++){
		for(let j=i+1; j<len; j++){
			let x1 = range*sin(i*2*Math.PI/len), y1 = range*cos(i*2*Math.PI/len);
			let x2 = range*sin(j*2*Math.PI/len), y2 = range*cos(j*2*Math.PI/len);
			let x3 = innerLine(x1,x2,0.1), y3 = innerLine(y1,y2,0.1);
			let x4 = innerLine(x1,x2,0.9), y4 = innerLine(y1,y2,0.9);
			ctx1.beginPath();
		    ctx1.moveTo(x3,y3);
		    ctx1.lineTo(x4,y4);
		    ctx1.stroke();
		    ctx1.fillText(nodeValue[i][j] === Infinity ? "":Math.floor(nodeValue[i][j]*100)/100, x4, y4);
		    ctx1.fillText(nodeValue[j][i] === Infinity ? "":Math.floor(nodeValue[j][i]*100)/100, x3, y3);
		}
	}
	writeResult(v);
}

let writeResult = function(v){
	ctx2.clearRect(0,0,2000,2000);
	for (let i=0; i<len; i++){
		for (let j=0; j<len; j++){
			ctx2.fillText(Math.floor(v[i][j]*100)/100, i*35+35, j*10+10);
		}
	}
}


let floyd = function (){
	let input = nodeValue;
	let len = input.length;
	if(len**2 == input.flat().length){
		for(let n=0; n<len; n++){
			input[n][n]=0;
		}
		for(let j=0; j<len; j++){
			for(let i=0; i<len; i++){
				for(let k=0; k<len; k++){
					if(input[i][j]+input[j][k] < input[i][k]){
						input[i][k] = input[i][j]+input[j][k];
					}
				}
			}
		}
		writeResult(input);
		return input;
	}
	else{
		console.log("입력오류");
		return null;
	}
}

let nodeValue = [];
let setNodeValue = function (){
	len = Number(document.querySelectorAll("#count")[0].value);
	nodeValue = Array(len).fill(1).map(x=>(Array(len).fill(1).map(x=>(Math.random()<0.4) ? Math.floor(Math.random()*10000)/100 : Infinity)));
	mappingFloyd(nodeValue);
}
