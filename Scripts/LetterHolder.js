
var font : Font;

static var letters = new Array();
static var gameScore = 0;
var tempscore = 0;

var timer : Timer;

static var lettertext : String = "";
static var scoretext : String = "";
static var tempscoretext: String = "";
static var longestword : String = "";

static var showwordscore : String = "";
static var showword = false;
var showwordtime : float;

// Use this for initialization

function Start(){
	gameScore = 0;
	tempscore = 0;
	timer = GameObject.FindGameObjectWithTag("MainCamera").GetComponent("Timer");
}

// Update is called once per frame
function Update () {
	if(MainLevel.doublecount < 1){
		MainLevel.doubled = false;
	}
	lettertext = "Letters: " + '\n' + getText();
	scoretext = "Score: " + gameScore.ToString();
	tempscoretext = "Current Value: " + calculateValue(tempscore);
	longestword = "Longest word: " + MainLevel.longestword;
	
	if(Time.timeSinceLevelLoad > showwordtime+2 && showword){
		showword = false;
	}	
	if(Input.GetKey(KeyCode.Space)){
		if(!getWord().Equals("")){
			if(Dictionary.checkForWord(getWord())){
				submitWord();
			}
			else{
				notAWord();
				clearLetters();
				tempscore = 0;
			}
		
		}
	}
	if(Input.touchCount  == 1){
		if(!getWord().Equals("")){
			if(Dictionary.checkForWord(getWord())){
				submitWord();
			}
			else {
				notAWord();
				clearLetters();
				tempscore = 0;
			}
		}
	}

}

function addLetter(s: String){
	//Letterscore is the default value of the letter before any bonuses are applied	
	var letterscore : int;
	if(letters.length < 12){
		letters.push(s);
		switch(s.ToUpper()){
			case "A": case "E": case "I": case "O": 
			case "N": case "R": case "T": case "L": case "S": case "U": letterscore += 1; break;
			case "D": case "G": letterscore +=2; break;
			case "B": case "C": case "M": case "P": letterscore +=3; break;
			case "F": case "H": case "V": case "W": case "Y": letterscore +=4; break;
			case "K": letterscore += 5; break;
			case "J": case "X": letterscore += 8; break;
			case "Q": case "Z": letterscore += 10; break;
		}
	}
	//add letterscore to the score display
	if(MainLevel.doubled){
		MainLevel.doublecount -= 1;
		letterscore *= 2;
	}
	tempscore += letterscore;
}

function addBuff(s : String){
	if(s.ToLower().Equals("!")){
		var level : int = PlayerPrefs.GetInt("Slowdown");
		if(MainLevel.slowed){
			MainLevel.endSlow = Time.timeSinceLevelLoad + level*10;
		}
		else {
			MainLevel.slowed = true;
			if(level*0.2 > Time.timeScale*0.8){
				Time.timeScale = 0.3;
			}
			else{
				Time.timeScale -= level*0.2;
			}
			var carSpeedDivisor : float = 1.0;
			if(Time.timeScale*1.4 > 0.9){
				carSpeedDivisor = 0.9;
			}
			else{
				carSpeedDivisor = Time.timeScale*1.4;
			}
			CarMovement.SPEED *= 1/carSpeedDivisor;
			MainLevel.endSlow = Time.timeSinceLevelLoad + level*10;
		}
	}
	if(s.ToLower().Equals("@")){
		var level2 : int = PlayerPrefs.GetInt("Speed");
		if(MainLevel.spedup){
			MainLevel.endSpeed = Time.timeSinceLevelLoad + level2*10;
		}
		else {
			MainLevel.spedup = true;
			CarMovement.SPEED = 10+PlayerPrefs.GetInt("Speed")*3;
			MainLevel.endSpeed = Time.timeSinceLevelLoad + level2*10;
		}
	}
	if(s.ToLower().Equals("#")){
		var level3 : int = PlayerPrefs.GetInt("Double");
		if(MainLevel.doubled){
			MainLevel.doublecount = level3*2;
		}
		else {
			MainLevel.doubled = true;
			MainLevel.doublecount = level3*2;
		}			
	}
}

function calculateValue( i : int){
	if(getLength() > 3){
		if(getLength() > 5){
			if(getLength() > 7){
				return tempscore.ToString() + "(x4)";
			}
			return tempscore.ToString() + "(x3)";
		}
		return tempscore.ToString() + "(x2)";
	}
	return tempscore.ToString();
}

function calculateValueInt(i : int){
	var retval :int = i;
	if(getLength() > 3){
		retval = i*2;
	}
	if(getLength() > 5){
		retval = i*3;
	}
	if(getLength() > 7){
		retval = i*4;
	}
	return retval;
}

function clearLetters(){
letters = [];
}

function getText(){
	var text = "";
	for(var i = 0; i < letters.length; i += 1){
	text = text + " " + letters[i];
	}
	return text;
}

function getWord(){
	var word = "";
	for(var i = 0; i < letters.length; i++){
	word = word + letters[i];
	}
	return word;
}

function getLength(){
	return letters.length;
}

function submitWord(){
	gameScore += calculateValueInt(tempscore);
	if(tempscore > 0){
		MainLevel.addWord();
	}
	if(getLength() > 4){
		timer.addTime(10);
	}
	if(MainLevel.longestword.length < getLength()){
		longestword = getWord();
		MainLevel.newLongestWord(longestword);
	}
	//show the label for word and points to the user
	showWordLabel();
	
	clearLetters();
	tempscore = 0;
}

//set the time of the label showing and flip the flag to true
function showWordLabel(){
	Debug.Log("wordlabel should be shown");
	showwordtime = Time.timeSinceLevelLoad;
	showwordscore = getWord() +"\nfor "+calculateValueInt(tempscore)+" points";
	showword = true;
}

function notAWord(){
	Debug.Log("wordlabel should be shown");
	showwordtime = Time.timeSinceLevelLoad;
	showwordscore = getWord()+" is \n not a word!";
	showword = true;
}