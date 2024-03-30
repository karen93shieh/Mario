/** function Pole(GamePlay, leftV, topV) sets the dimension and position of the pole
	input: the GamePlay object, the left value, and the top value
	output: none
	other effect: none
*/
function Pole(GamePlay, leftV, topV){
	var _this=this;
	this.GamePlay=GamePlay;
	this.leftV=leftV;
	this.topV=topV-parseInt(window.innerHeight*.165);
	this.elem=$("<img>")
		.attr({src:"pics/pole.png"})
		.css({position:"absolute", height:parseInt(window.innerHeight*.65), width:parseInt(window.innerWidth*.07), left:this.leftV, top:this.topV});

  /** this.move moves the pole
	input: leftChange
	output: none
	other effect: to make the girl looks like it's moving
	*/
	this.move=function(leftChange){
		this.elem.css({left:this.elem.position().left-leftChange});
	}
	
	/** this.collision uses the position of mario to check if it collides with the pole
	input: none
	output: none
	other effect: calls this.timeToPoint if collides
	*/
	this.collision=function(){
		var tempLeft=this.elem.offset().left+this.elem.width()/2;
		var tempTop=this.elem.offset().top;
		var tempRight=parseInt(this.elem.width())+parseInt(this.elem.offset().left);
		var tempBottom=parseInt(this.elem.height())+parseInt(this.elem.offset().top);
		
		var marioLeft=parseInt(this.GamePlay.mario.elem.offset().left);
		var marioTop=parseInt(this.GamePlay.mario.elem.offset().top);
		var marioRight=parseInt(this.GamePlay.mario.elem.offset().left)+parseInt(this.GamePlay.mario.elem.width());
		var marioBottom=parseInt(this.GamePlay.mario.elem.offset().top)+parseInt(this.GamePlay.mario.elem.height());
		
		if(!(tempLeft>marioRight)&&!(tempBottom<marioTop)&&!(tempRight<marioLeft)&&!(tempTop>marioBottom)){
			clearInterval(this.GamePlay.mario.timerForMovement);
			clearInterval(this.GamePlay.timer.timerOne);
			this.timeToPoints();
		}
	}
	
	/** this.timeToPoint clears the timer and calculates the points/score player gets
	input: none
	output: the score the player gets
	other effect: none
	*/
	this.timeToPoints=function(){
		clearInterval(_this.GamePlay.timer.timerOne);
		var points=this.GamePlay.timer.time[0]*50;
		var timer=setInterval(function(){
			if(points>0){
				points=points-100;
				_this.GamePlay.points.updatePoints(100);
				if(_this.GamePlay.timer.time[0]>1){
					_this.GamePlay.timer.time[0]+=-2;
				}else if(_this.GamePlay.timer.time[0]==1){
					_this.GamePlay.timer.time[0]+=-1;
				}
				_this.GamePlay.timer.elem.html("TIME<br>"+_this.GamePlay.timer.time[0]);
			}else{
				clearInterval(timer);
				_this.GamePlay.mario.fall();
			}
		},8);
	}
}