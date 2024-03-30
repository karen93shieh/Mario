/** function GamePlay() sets up the object needed for the game play
	input: none
	output: none
	other effect: none
*/
function GamePlay(){
	var _this=this;
	this.elem=$("body");
	this.blockOneArr=[];
	this.blockThreeArr=[];
	this.blockLongArr=[];
	this.mysteryBoxArr=[];
	this.pipeOneArr=[];
	this.pipeTwoArr=[];
	this.pipeThreeArr=[];
	this.holeArr=[];
	this.enemyArr=[];
	this.gameOn=true;
	this.name;
	this.currentBlockLeftValue=0;//Reference point for the left value when the scene is building
	this.blockOneWidth=parseInt(window.innerHeight*.058);//Reference block size measurement
	
	/** this.backgroundArr creates the background image
	input: none
	output: tempArr
	other effect: the background repeats to make it looks like it's moving
	*/
	this.backgroundArr=(function(){
		var tempArr=[];
		var tempLeft=0;
			for(var i=0; i<10; i++){
				tempArr.push(new Background(this, tempLeft, i));
				tempLeft++;
			}
		return tempArr;
	})();
	this.mario=new Mario(this);
	this.timer=new Timer(this);
	this.points=new Points(this);
	
	/** this.createBlockArr creates the block/pipes for the game
	input: none
	output: none
	other effect: the positions of the blocks/pipes are according to the window
	*/
	this.createBlockArr=function(){
		this.mysteryBoxArr.push(new MysteryBox(this,parseInt(window.innerWidth*.5)-(this.blockOneWidth*4),parseInt(window.innerHeight*.64)));
		this.blockOneArr.push(new BlockOne(this, parseInt(window.innerWidth*.55), parseInt(window.innerHeight*.64)));
		this.currentBlockLeftValue=parseInt(window.innerWidth*.55);
		this.mysteryBoxArr.push(new MysteryBox(this,this.currentBlockLeftValue+this.blockOneWidth,parseInt(window.innerHeight*.64)));
		this.currentBlockLeftValue+=this.blockOneWidth;
		this.blockOneArr.push(new BlockOne(this, this.currentBlockLeftValue+this.blockOneWidth, parseInt(window.innerHeight*.64)));
		this.mysteryBoxArr.push(new MysteryBox(this,this.currentBlockLeftValue+this.blockOneWidth,parseInt(window.innerHeight*.64)-parseInt(window.innerHeight*.27)));
		this.currentBlockLeftValue+=this.blockOneWidth;
		this.mysteryBoxArr.push(new MysteryBox(this,this.currentBlockLeftValue+this.blockOneWidth,parseInt(window.innerHeight*.64)));
		this.currentBlockLeftValue+=this.blockOneWidth;
		this.blockOneArr.push(new BlockOne(this, this.currentBlockLeftValue+this.blockOneWidth, parseInt(window.innerHeight*.64)));
		this.currentBlockLeftValue+=this.blockOneWidth;
		
		this.pipeOneArr.push(new PipeOne(this, this.currentBlockLeftValue+(this.blockOneWidth*4), parseInt(window.innerHeight*.745)))
		this.currentBlockLeftValue+=this.blockOneWidth*4;

		this.enemyArr.push(new Enemy(this, this.currentBlockLeftValue+this.blockOneWidth*4, parseInt(window.innerHeight*.76)));
		this.pipeTwoArr.push(new PipeTwo(this, this.currentBlockLeftValue+(this.blockOneWidth*8), parseInt(window.innerHeight*.69)))
		this.currentBlockLeftValue+=this.blockOneWidth*8;

		this.enemyArr.push(new Enemy(this, this.currentBlockLeftValue+this.blockOneWidth*4, parseInt(window.innerHeight*.76)));
		this.pipeThreeArr.push(new PipeThree(this, this.currentBlockLeftValue+(this.blockOneWidth*8), parseInt(window.innerHeight*.655)))
		this.currentBlockLeftValue+=this.blockOneWidth*8;
		this.pipeThreeArr.push(new PipeThree(this, this.currentBlockLeftValue+(this.blockOneWidth*15), parseInt(window.innerHeight*.655)))
		this.currentBlockLeftValue+=this.blockOneWidth*15;
		
		this.holeArr.push(new Hole(this, this.currentBlockLeftValue+(this.blockOneWidth*12), parseInt(window.innerHeight*.79)))
		this.currentBlockLeftValue+=this.blockOneWidth*12;
		this.blockOneArr.push(new BlockOne(this, this.currentBlockLeftValue+(this.blockOneWidth*12), parseInt(window.innerHeight*.64)));
		this.currentBlockLeftValue+=this.blockOneWidth*12;
		this.mysteryBoxArr.push(new MysteryBox(this,this.currentBlockLeftValue+this.blockOneWidth,parseInt(window.innerHeight*.64)));
		this.currentBlockLeftValue+=this.blockOneWidth;
		this.blockOneArr.push(new BlockOne(this, this.currentBlockLeftValue+this.blockOneWidth, parseInt(window.innerHeight*.64)));
		this.currentBlockLeftValue+=this.blockOneWidth;
		this.blockLongArr.push(new BlockLong(this, this.currentBlockLeftValue+this.blockOneWidth, parseInt(window.innerHeight*.64)-parseInt(window.innerHeight*.27)));
		this.currentBlockLeftValue+=this.blockOneWidth;

		this.enemyArr.push(new Enemy(this, this.currentBlockLeftValue+this.blockOneWidth*4, parseInt(window.innerHeight*.64)-parseInt(window.innerHeight*.27)-parseInt(window.innerHeight*.09)));
		this.holeArr.push(new Hole(this, this.currentBlockLeftValue+(this.blockOneWidth*8), parseInt(window.innerHeight*.79)))
		this.currentBlockLeftValue+=this.blockOneWidth*8;
		this.blockThreeArr.push(new BlockThree(this, this.currentBlockLeftValue+(this.blockOneWidth*7), parseInt(window.innerHeight*.64)-parseInt(window.innerHeight*.27)));
		this.currentBlockLeftValue+=this.blockOneWidth*7;
		this.mysteryBoxArr.push(new MysteryBox(this,this.currentBlockLeftValue+(this.blockOneWidth*3),parseInt(window.innerHeight*.64)-parseInt(window.innerHeight*.27)));
		this.currentBlockLeftValue+=this.blockOneWidth*3;
		this.blockOneArr.push(new BlockOne(this, this.currentBlockLeftValue, parseInt(window.innerHeight*.64)));
		this.blockThreeArr.push(new BlockThree(this, this.currentBlockLeftValue+(this.blockOneWidth*7), parseInt(window.innerHeight*.64)));
		this.currentBlockLeftValue+=this.blockOneWidth*7;
		
		this.mysteryBoxArr.push(new MysteryBox(this,this.currentBlockLeftValue+(this.blockOneWidth*9), parseInt(window.innerHeight*.64)));
		this.currentBlockLeftValue+=this.blockOneWidth*9;
		this.mysteryBoxArr.push(new MysteryBox(this,this.currentBlockLeftValue+(this.blockOneWidth*3), parseInt(window.innerHeight*.64)));
		this.mysteryBoxArr.push(new MysteryBox(this,this.currentBlockLeftValue+(this.blockOneWidth*3), parseInt(window.innerHeight*.64)-parseInt(window.innerHeight*.27)));
		this.currentBlockLeftValue+=this.blockOneWidth*3;
		this.mysteryBoxArr.push(new MysteryBox(this,this.currentBlockLeftValue+(this.blockOneWidth*3), parseInt(window.innerHeight*.64)));
		this.currentBlockLeftValue+=this.blockOneWidth*3;
		
		this.blockOneArr.push(new BlockOne(this, this.currentBlockLeftValue+(this.blockOneWidth*8), parseInt(window.innerHeight*.64)));
		this.currentBlockLeftValue+=this.blockOneWidth*8;
		this.blockThreeArr.push(new BlockThree(this, this.currentBlockLeftValue+(this.blockOneWidth*4), parseInt(window.innerHeight*.64)-parseInt(window.innerHeight*.27)));
		this.currentBlockLeftValue+=this.blockOneWidth*4;
		this.blockOneArr.push(new BlockOne(this, this.currentBlockLeftValue+(this.blockOneWidth*9), parseInt(window.innerHeight*.64)-parseInt(window.innerHeight*.27)));
		this.currentBlockLeftValue+=this.blockOneWidth*9;
		this.mysteryBoxArr.push(new MysteryBox(this,this.currentBlockLeftValue+this.blockOneWidth, parseInt(window.innerHeight*.64)-parseInt(window.innerHeight*.27)));
		this.blockThreeArr.push(new BlockThree(this, this.currentBlockLeftValue+this.blockOneWidth, parseInt(window.innerHeight*.64)));
		this.currentBlockLeftValue+=this.blockOneWidth;
		this.mysteryBoxArr.push(new MysteryBox(this,this.currentBlockLeftValue+this.blockOneWidth, parseInt(window.innerHeight*.64)-parseInt(window.innerHeight*.27)));
		this.currentBlockLeftValue+=this.blockOneWidth;
		this.blockOneArr.push(new BlockOne(this, this.currentBlockLeftValue+this.blockOneWidth, parseInt(window.innerHeight*.64)-parseInt(window.innerHeight*.27)));
		this.currentBlockLeftValue+=this.blockOneWidth;
		
		this.pole=new Pole(this, this.currentBlockLeftValue+(this.blockOneWidth*7),parseInt(window.innerHeight*.64)-parseInt(window.innerHeight*.27));
		this.currentBlockLeftValue+=this.blockOneWidth*7;
	}
		
	/** this.moveSetting moves the elements including the background, blocks, etc
	input: the speed value
	output: none
	other effect: the only one function that children calls
	*/
	this.moveSetting=function(vSpd){
		for(var i=0; i<this.backgroundArr.length; i++){
			this.backgroundArr[i].move(vSpd);
		}
		for(var i=0; i<this.blockOneArr.length; i++){
			this.blockOneArr[i].move(vSpd);
		}
		for(var i=0; i<this.mysteryBoxArr.length; i++){
			this.mysteryBoxArr[i].move(vSpd);
		}
		for(var i=0; i<this.pipeOneArr.length; i++){
			this.pipeOneArr[i].move(vSpd);
		}
		for(var i=0; i<this.pipeTwoArr.length; i++){
			this.pipeTwoArr[i].move(vSpd);
		}
		for(var i=0; i<this.pipeThreeArr.length; i++){
			this.pipeThreeArr[i].move(vSpd);
		}
		for(var i=0; i<this.holeArr.length; i++){
			this.holeArr[i].move(vSpd);
		}
		for(var i=0; i<this.blockLongArr.length; i++){
			this.blockLongArr[i].move(vSpd);
		}
		for(var i=0; i<this.blockThreeArr.length; i++){
			this.blockThreeArr[i].move(vSpd);
		}
		for(var i=0; i<this.enemyArr.length; i++){
			this.enemyArr[i].move(vSpd);
		}
		this.pole.move(vSpd);
	}
	
	/** this.endGame display when the game is over
	input: none
	output: none
	other effect: alerts game over with score, the score then is saved in local storage
	*/
	this.endGame=function(){
		setTimeout(function(){
			alert("Game Over!");
			_this.name=prompt("Please enter your name","John Doe");
			alert(_this.name+", your score is "+_this.points.score);
			alert("Your score has been record. You can either go back to the home page [refresh] or play again [press enter]");
			_this.points.storeScore(_this.name);
			_this.gameOn=false;
		},100);
	}
	
	/** this.draw append the elements to the gameplay, which is the body of the document
	input: none
	output: none
	other effect: the elements are appended to there designated part
	*/
	this.draw=function(){
		for(var i=0; i<this.backgroundArr.length; i++){
			this.elem.append(this.backgroundArr[i].elem);
		}
		this.createBlockArr();
		for(var i=0; i<this.blockOneArr.length; i++){
			this.elem.append(this.blockOneArr[i].elem);
		}
		for(var i=0; i<this.mysteryBoxArr.length; i++){
			this.elem.append(this.mysteryBoxArr[i].elem);
		}
		for(var i=0; i<this.pipeOneArr.length; i++){
			this.elem.append(this.pipeOneArr[i].elem);
		}
		for(var i=0; i<this.pipeTwoArr.length; i++){
			this.elem.append(this.pipeTwoArr[i].elem);
		}
		for(var i=0; i<this.pipeThreeArr.length; i++){
			this.elem.append(this.pipeThreeArr[i].elem);
		}
		for(var i=0; i<this.holeArr.length; i++){
			this.elem.append(this.holeArr[i].elem);
		}
		for(var i=0; i<this.blockLongArr.length; i++){
			this.elem.append(this.blockLongArr[i].elem);
		}
		for(var i=0; i<this.blockThreeArr.length; i++){
			this.elem.append(this.blockThreeArr[i].elem);
		}
		for(var i=0; i<this.enemyArr.length; i++){
			this.elem.append(this.enemyArr[i].elem);
		}
		this.elem.append(this.timer.elem);
		this.elem.append(this.points.elem);
		this.elem.append(this.pole.elem);
		this.elem.append(this.mario.elem);
	}
}