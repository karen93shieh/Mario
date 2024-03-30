/** function Enemy(GamePlay, leftV, topV) sets the dimension and position of the enemy
input: the GamePlay object, left value, and top value
output: none
other effects: the enemy moves and will collide with the girl
*/
function Enemy(GamePlay, leftV, topV) {
	var _this=this;
	this.gameplay=GamePlay;
	this.leftV=leftV;
	this.topV=topV;
	this.spd=parseInt(window.innerWidth*.0008);
	this.blockOneWidth=parseInt(window.innerHeight*.058);
	this.bounds=[-parseInt(window.innerWidth*.045),parseInt(window.innerWidth*.045)+this.blockOneWidth];
	
	this.counter=0;
    this.elem=$("<img>")
		.attr({src:"pics/goombas.jpg"})
		.css({position:"absolute", height:parseInt(window.innerHeight*.09), width:parseInt(window.innerHeight*.09), left:this.leftV, top:this.topV});
	/** this.move moves the enemy
	input: leftChange
	output: none
	other effect: to make the girl looks like it's moving
	*/
	this.move=function(leftChange){
		this.elem.css({left:this.elem.position().left-leftChange});
	}
	if(this.spd<=0){
		this.spd=1;
	}
	if(parseInt(Math.random()*2)==0){
		this.spd=-this.spd;
	}
	
	/** this.timer sets the time for the enemy movement and the collision
	input: none
	output: none
	other effect: two functions are called
	*/
	this.timer=setInterval(function(){
		_this.moveEnemy();
		_this.checkCollision();
	},20);
	
	/** this.moveEnemy handles the movement of enemy/pikachu
	input: none
	output: none
	other effect: the enemy moves in a certain boundary
	*/
	this.moveEnemy=function(){
		this.elem.css({left:this.elem.position().left+this.spd});
		this.counter=this.counter+this.spd;
		if(this.counter>=this.bounds[1]) {
			this.spd=-this.spd;
		}else if(this.counter<=this.bounds[0]) {
			this.spd=-this.spd;
		}
	}
	
	/** this.checkCollsion check if the girl collides with enemy/pikachu
	input: none
	output: none
	other effect: game over if the characters collide
	*/
	this.checkCollision=function(){
		var marioLeft=parseInt(_this.gameplay.mario.elem.offset().left);
		var marioTop=parseInt(_this.gameplay.mario.elem.offset().top);
		var marioRight=parseInt(_this.gameplay.mario.elem.offset().left)+parseInt(_this.gameplay.mario.elem.width());
		var marioBottom=parseInt(_this.gameplay.mario.elem.offset().top)+parseInt(_this.gameplay.mario.elem.height());
		
		var enemyLeft=parseInt(_this.elem.offset().left);
		var enemyTop=parseInt(_this.elem.offset().top);
		var enemyRight=parseInt(_this.elem.offset().left)+parseInt(_this.elem.width());
		var enemyBottom=parseInt(_this.elem.offset().top)+parseInt(_this.elem.height());

		if ((enemyRight>=marioLeft) && (enemyLeft<=marioRight) && (enemyTop<=marioBottom) && (enemyBottom>=marioTop)){
			clearInterval(_this.gameplay.mario.timerForMovement);
			clearInterval(_this.gameplay.timer.timerOne);
			clearInterval(_this.timer);
			_this.gameplay.mario.currentFloor=parseInt(window.innerHeight);
			_this.gameplay.mario.onFloor=false;
			_this.gameplay.mario.yVelocity=-120;
			_this.gameplay.mario.fall();
		}
	}
}