#pragma strict

var newObject : Transform;

var letterA: GameObject;
var letterB: GameObject;
var letterC: GameObject;
var letterD: GameObject;
var letterE: GameObject;
var letterF: GameObject;
var letterG: GameObject;
var letterH: GameObject;
var letterI: GameObject;
var letterJ: GameObject;
var letterK: GameObject;
var letterL: GameObject;
var letterM: GameObject;
var letterN: GameObject;
var letterO: GameObject;
var letterP: GameObject;
var letterQ: GameObject;
var letterR: GameObject;
var letterS: GameObject;
var letterT: GameObject;
var letterU: GameObject;
var letterV: GameObject;
var letterW: GameObject;
var letterX: GameObject;
var letterY: GameObject;
var letterZ: GameObject;

var speed : GameObject;

var spawntime = 1.0;

var spawntime2 = 1.52;

var probmult = 0.4;

var position : float;
var number : float;
var time: float;

var slowdownRate : int;
var speedRate: int;
var doubleRate: int;

function Start () {
	slowdownRate = PlayerPrefs.GetInt("Slowdown");
	speedRate = PlayerPrefs.GetInt("Speed");
	doubleRate = PlayerPrefs.GetInt("Double");

	time = Time.timeSinceLevelLoad + 18;
}


function Update () {
	if(Time.timeSinceLevelLoad == 30){
		generateSpeed(101);
	}
	if(Time.timeSinceLevelLoad % 30 == 0 && spawntime > .4){
		spawntime -= .1;
		if(spawntime2 > .51){
			spawntime2 -= .17;
		}
	}
	if (Time.timeSinceLevelLoad - time > spawntime) {
		RandomLetter();
		RandomNumber();
		var clone : Transform;
		clone = Instantiate(newObject.transform, Vector3(position , -5 , 10 ) , 
			newObject.transform.rotation);
		
		if(Random.value > probmult && Time.timeSinceLevelLoad - time > spawntime2){
			RandomLetter();
			RandomNumber();
			Instantiate(newObject.transform, Vector3(position , -5, 10) , newObject.transform.rotation);
		}
		
		time = Time.timeSinceLevelLoad;
	}
		
}

function RandomNumber(){
	position = Random.value * 13 - 4.5;
	/*if(position < 1){
		position = -4.5;
	}
	else if(position < 2){
		position = 0	;
	}
	else if(position < 3){
		position = 4.5;
	}
	else {
		position = 9;
	}*/
}

function RandomLetter(){
var object: GameObject;
number = Random.value * 98;
if(number < 12){
object = letterE;
}
else if(number < 21){
object = letterA;
}
else if(number < 30){
object = letterI;
}
else if(number < 38){
object = letterO;
}
else if(number < 44){
object = letterN;
}
else if(number < 50){
object = letterR;
}
else if(number < 56){
object = letterT;
}
else if(number < 60){
object = letterL;
}
else if(number < 64){
object = letterS;
}
else if(number < 68){
object = letterU;
}
else if(number < 72){
object = letterD;
}
else if(number < 75){
object = letterG;
}
else if(number < 77){
object = letterB;
}
else if(number < 79){
object = letterC;
}
else if(number < 81){
object = letterM;
}
else if(number < 83){
object = letterP;
}
else if(number < 85){
object = letterF;
}
else if(number < 87){
object = letterH;
}
else if(number < 89){
object = letterV;
}
else if(number < 91){
object = letterW;
}
else if(number < 93){
object = letterY;
}
else if(number < 94){
object = letterK;
}
else if(number < 95){
object = letterJ;
}
else if(number < 96){
object = letterX;
}
else if(number < 97){
object = letterQ;
}
else if(number < 98){
object = letterZ;
}
newObject = object.transform;
}


function generateSpeed(i: int){
	var object: GameObject;
	position = Random.value*10-1.5;
	var randomvar = Random.value*100;
	if(i > randomvar){	
		object = speed;
		newObject = object.transform;
	
		var clone : Transform;
		clone = Instantiate(newObject.transform, Vector3(position , 0.5 , 10 ) , 
			newObject.transform.rotation);
	}
}