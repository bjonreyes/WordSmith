#pragma strict

/*
 *This script defines the actions of the Timer object in the main game view.
 *It determines when the game ends.
 */

//Appearance of the timer
var texture : Texture;

//Variables that are used in counting down
var gameEnd: boolean = false;
var startTime : float;
var restSeconds : int = 3;
var roundedRestSeconds : int;
private var displaySeconds : int;
private var displayMinutes : int;
var countDownSeconds : int = 180;

//Appearance of the font used in the timer
var font : Font;

function Awake(){
startTime = Time.time;
countDownSeconds = 180;
}

function OnGUI(){
//Converts a default 1024x600 screen to the current screen size
var horizRatio : float = Screen.width / 1024.0;
var vertRatio : float  = Screen.height / 640.0;
GUI.matrix = Matrix4x4.TRS (Vector3(0, 0, 0), Quaternion.identity, Vector3 (horizRatio, vertRatio, 1));

//Sets up the clock
 var guiTime: float = Time.time - startTime;
 restSeconds = countDownSeconds - (guiTime);
 
//Sets up the style for the font display
 var mystyle : GUIStyle = new GUIStyle();
 mystyle.font = font;
 mystyle.normal.textColor = Color.white;

 
//Clock math
    roundedRestSeconds = Mathf.CeilToInt(restSeconds);
    displaySeconds = roundedRestSeconds % 60;
    displayMinutes = roundedRestSeconds / 60; 
    
    var text: String = String.Format ("{0:00}:{1:00}", displayMinutes, displaySeconds);    
    
	GUI.Label(Rect(808, 100, 150, 40), text, mystyle);
}

function Start () {
	gameEnd = false;
}

function Update () {
	if(Time.fixedTime - startTime > 5){ 
		if(roundedRestSeconds == 0){
		Time.timeScale = 0;
		}
	}
	if (restSeconds < 3 || roundedRestSeconds == 0) {
		gameEnd = true;
	}
}

function gameEnded(){
	return gameEnd;
}

function getSecondsLeft(){
	return restSeconds;
}

function addTime(i: int){
	countDownSeconds += i;
}

function slowTime(i: int){
	Time.timeScale = (double)(1/i);
}