#pragma strict

var projectile : GameObject;
var time: float;
var x : int = 0;
static var SPEED = -7;

function Start () {
	projectile.name = projectile.name.Substring(0,1);
	time = Time.timeSinceLevelLoad;
}

//Called continuously at the beginning of every frame
function Update () {
        // Give the cloned object an initial velocity along the current 
        // object's Z axis
        
        //Every 30 seconds, increase speed by 3 
    x = SPEED - 3*((Time.timeSinceLevelLoad - time)/30);
	if(x < -19){
        x = -19;
    }
        //If the slowdown buff is applied, reduce speed
  	projectile.rigidbody.velocity = Vector3(0,0,x); 

    if(projectile.transform.position.z < -30){
        Destroy(projectile);
    }     
}


//Called when the letter touches the trigger contained in the holder
function OnTriggerEnter(other : Collider)
{       
	Destroy(projectile);
	if(Application.loadedLevelName.Equals("VersionLevels")){
    	GameObject.FindWithTag("MainCamera").GetComponent(LetterHolder).addBuff(projectile.name);
    }
    if(Application.loadedLevelName.Equals("VersionEndless")){
    	GameObject.FindWithTag("MainCamera").GetComponent(LetterHolderEndless).addBuff(projectile.name);
    }
    if(Application.loadedLevelName.Equals("VersionTutorial")){
    	GameObject.FindWithTag("MainCamera").GetComponent(LetterHolderTutorial).addBuff(projectile.name);
    }
}
