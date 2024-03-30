/** function Points(GamePlay) sets up the point system of the game
input: the GamePlay object
output: none
other effect: set according to the game background window
*/
function Points(GamePlay){
	var _this=this;
	this.GamePlay=GamePlay;
	this.time=400;
	this.score=0;
	this.elem=$("<div/>")
		.attr({})
		.css({position:"absolute", height:parseInt(window.innerHeight*.058), width:parseInt(window.innerWidth*0.15), top:0, margin:10, fontSize:parseInt(window.innerWidth*0.025), color:"white", fontFamily:"MarioFont", textAlign:"left"})
		.html("MARIO<br>000000")
	this.elem.css({left:parseInt(window.innerWidth*0.025)});
	
	/** this.updatePoints updates the points while the player is playing the game
	input: the points that the player earns
	output: none
	other effect: the format of the score would change accordingly
	*/
	this.updatePoints=function(pts){
		this.score+=pts;
		if(JSON.stringify(this.score).length==3){
			this.elem.html("MARIO<br>000"+this.score);
		}else if(JSON.stringify(this.score).length==4){
			this.elem.html("MARIO<br>00"+this.score);
		}else if(JSON.stringify(this.score).length==5){
			this.elem.html("MARIO<br>0"+this.score);
		}else{
			this.elem.html("MARIO<br>"+this.score);
		}
	}
	
	/** this.storeScore saves the score the player earns in local storage
	input: userName of the player
	output: none
	other effect: shows in score board
	*/
	this.storeScore=function(userName){
		var tempInfo=userName+" "+this.GamePlay.points.score+"<br>";
		var localStorageInfo;
		if(localStorage.getItem(key)==null||localStorage.getItem(key)=="undefined"){
			localStorage.setItem(key, tempInfo);
		}else{
			localStorageInfo=localStorage.getItem(key);
			localStorageInfo+=tempInfo
			localStorage.setItem(key, localStorageInfo);
		}
	}
}