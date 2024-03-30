/** function Timer(GamePlay) sets up the timer in the game
input: the GamePlay object
output: none
other effect: the position is set according to the game play background window
*/
function Timer(GamePlay){
	var _this=this;
	this.GamePlay=GamePlay;
	this.time=[400];
	this.timerOne;
	this.elem=$("<div/>")
		.attr({})
		.css({position:"absolute", height:parseInt(window.innerHeight*.058), width:parseInt(window.innerWidth*0.1), top:0, margin:10, fontSize:parseInt(window.innerWidth*0.025), color:"white", fontFamily:"MarioFont", textAlign:"right"})
		.html("TIME<br>"+_this.time[0])
	this.elem.css({left:parseInt(window.innerWidth)-parseInt(this.elem.width())-parseInt(window.innerWidth*0.025)});
	
	/** this.timerOne sets up the timer when the time is under 50 seconds
	input: none
	output: none
	other effect: the timer has a flashy effect of color switching between red and white
	*/
	this.timerOne=setInterval(function(){
		_this.time[0]--;
		if(_this.time[0]<=50&&_this.time[0]%2>=1){
			_this.elem.css({color:"red"});
		}else if(_this.time[0]<=50&&_this.time[0]%2==0){
			_this.elem.css({color:"white"});
		}
		_this.elem.html("TIME<br>"+_this.time[0]);
		if(_this.time[0]<=0){
			clearInterval(_this.timerOne);
			clearInterval(_this.GamePlay.mario.timerForMovement);
			_this.elem.html("TIME<br>"+_this.time[0]);
			_this.GamePlay.endGame();
		}
	},700)
}