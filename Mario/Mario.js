/** function Mario(GamePlay) controls the main character girl
	input: the GamePlay object
	output: none
	other effect: set according to the game background window
*/

function Mario(GamePlay){
	var _this=this;
	this.GamePlay=GamePlay;
	this.distance=[10];
	this.leftKeyDistance=[0];//Check if the user press the left key 
	this.center=[parseInt(window.innerWidth/2)];
	this.marioSpd=[parseInt(window.innerWidth*.0033)];
	this.leftBoundary=[parseInt(window.innerWidth*.29)];
	this.keyPressCode=[];
	
	this.onFloor=true;
	this.timeFrame=10;
	this.yVelocity=0;
	this.currentFloor=parseInt(window.innerHeight*.75);
	this.deltaD=0;
	this.detalT=this.timeFrame*0.01;
	this.marioYSpd=parseInt(window.innerHeight*.295);
	
	this.blockOneArr=this.GamePlay.blockOneArr;
	this.blockThreeArr=this.GamePlay.blockThreeArr;
	this.blockLongArr=this.GamePlay.blockLongArr;
	this.mysteryBoxArr=this.GamePlay.mysteryBoxArr;
	this.pipeOneArr=this.GamePlay.pipeOneArr;
	this.pipeTwoArr=this.GamePlay.pipeTwoArr;
	this.pipeThreeArr=this.GamePlay.pipeThreeArr;
	this.holeArr=this.GamePlay.holeArr;
	this.pole=this.GamePlay.pole;
	
	this.collisionLeft=false;
	this.collisionRight=false;
	this.collisionTop=false;
	//adjustment
	if(window.innerHeight>950){
		this.marioYSpd=230;
	}else if(this.marioYSpd>210){
		this.marioYSpd=210;
	}else if(this.marioYSpd<190){
		this.marioYSpd=190;
	}
	this.elem=$("<img>")
		.attr({src:"pics/girl.png"})
		.css({position:"absolute", left:10, top:parseInt(window.innerHeight*.75), height:parseInt(window.innerHeight*.1)});
	
	/** this.timerForMovement sets the time of the movement functions
	input: none
	output: none
	other effect: the time is based on this.timeFrame
	*/
	this.timerForMovement=setInterval(function(){
		_this.checkCollision();
		_this.move();
		_this.physics();
	},this.timeFrame);
	
	/** this.keyPress runs when the key is pressed
	input: event
	output: none
	other effect: keyCode pushed to the array
	*/
	//Press Key-----------------------------------------------
	this.keyPress=function(e){
		if(this.keyPressCode.indexOf(e.keyCode)==-1){
			this.keyPressCode.push(e.keyCode);
		}
	}	
	
	/** this.keyLifted runs when the key is not being pressed (lifted)
	input: event
	output: none
	other effect: keyCode being spliced out from the array
	*/
	this.keyLifted=function(e){
		var index=this.keyPressCode.indexOf(e.keyCode);
		if(index!=-1){
			this.keyPressCode.splice(index,1);
		}
	}
	
	/** this.physics handles movements of the girl
	input: none
	output: none
	other effect: depends on keys being pressed
	*/
	this.physics=function(){
		this.deltaD=0;
		if(!this.onFloor){
			this.collisionRight=false;
			this.collisionLeft=false;
			this.yVelocity+=(9.8)*this.detalT*4;
			this.deltaD=this.yVelocity*this.detalT*0.4;
		}
		this.elem.css({top:this.elem.offset().top+this.deltaD});
		if(parseInt(this.elem.offset().top)>=parseInt(this.currentFloor)){
			this.onFloor=true;
			this.yVelocity=0;
			this.elem.css({top:this.currentFloor});
			var index=this.keyPressCode.indexOf(38);
			if(index!=-1){
				this.keyPressCode.splice(index,1);
			}
		}
	}	
	/** this.move check if certain key is pressed
	input: none
	output: none
	other effect: calls designated functions that are related to the keys being pressed
	*/
	this.move=function(){
		if(this.keyPressCode.indexOf(39)!=-1){
			this.moveRight();
		}
		if(this.keyPressCode.indexOf(37)!=-1){
			this.moveLeft();
		}
		if(this.keyPressCode.indexOf(38)!=-1){
			this.jump();
		}
	}
	
	/** this.jump shows all conditions when the girl is moving to the left
	input: none
	output: none
	other effect: set according to the game background window
	*/
	this.jump=function(){
		if(this.onFloor){
			this.yVelocity-=this.marioYSpd;
			this.onFloor=false;
			this.currentFloor=parseInt(window.innerHeight*.75);
		}
	}
	
	/** this.moveRight shows all conditions when the girl is moving to the right
	input: none
	output: collision
	other effect: none
	*/
	this.moveRight=function(){
		this.collisionRight=false;
		if(this.collisionLeft){
			return;
		}
		if(this.distance[0]<this.center[0]||this.leftKeyDistance[0]!=0){
			this.elem.css({left:this.elem.offset().left+this.marioSpd[0]});
		}
		if(this.distance[0]>=this.center[0]&&this.leftKeyDistance[0]<=0){
			this.GamePlay.moveSetting(this.marioSpd[0]);
		}
		if(this.leftKeyDistance[0]!=0){
			this.leftKeyDistance[0]=this.leftKeyDistance[0]-this.marioSpd[0];
		}
		this.distance[0]=this.distance[0]+this.marioSpd[0];//Cacluate Mario distance from the start point

	}
	
	/** this.moveLeft shows all conditions when the girl is moving to the left
	input: none
	output: collision
	other effect: none
	*/
	this.moveLeft=function(){
		this.collisionLeft=false;
		if(this.collisionRight){
			return;
		}
		if(this.distance[0]>10&&this.leftKeyDistance[0]<this.leftBoundary[0]){
			this.leftKeyDistance[0]=this.leftKeyDistance[0]+this.marioSpd[0];
		}
		if(this.elem.offset().left>10&&this.leftKeyDistance[0]<this.leftBoundary[0]||(this.distance[0]<(this.center[0]-this.leftBoundary[0])&&this.elem.offset().left>10)){
			this.elem.css({left:this.elem.offset().left-this.marioSpd[0]});
		}
		if(this.distance[0]>10){
			this.distance[0]=this.distance[0]-this.marioSpd[0];
			if(this.leftKeyDistance[0]>=this.leftBoundary[0]&&this.distance[0]>(this.center[0]-this.leftBoundary[0]+10)){	
				this.GamePlay.moveSetting(-this.marioSpd[0]);
			}
		}
	}
	/** this.fall handles when the girl falls to the hole
	input: none
	output: none
	other effect: the game ends when fall
	*/
	//Fall from hole
	this.fall=function(){
		var timer=setInterval(function(){
			_this.physics();
			if(_this.onFloor){
				clearInterval(timer);
				_this.GamePlay.endGame();
			}
		},this.timeFrame)
	}
	
	/**this.checkCollision handles collision of the girl
	input: none
	output: collision
	other effect: depends on what the girl collides with 
	*/
	this.checkCollision=function(){
		var tempLeft;
		var tempTop;
		var tempRight;
		var tempBottom;
		
		var marioLeft=parseInt(this.elem.offset().left);
		var marioTop=parseInt(this.elem.offset().top);
		var marioRight=parseInt(this.elem.offset().left)+parseInt(this.elem.width());
		var marioBottom=parseInt(this.elem.offset().top)+parseInt(this.elem.height());
		
		var collisionTopArr=[0,0,0,0,0,0,0,0,0];
		var collisionLeftArr=[0,0,0,0,0,0,0,0,0];
		var collisionRightArr=[0,0,0,0,0,0,0,0,0];
		
		//Mystery Box--------------------------------------------------------
		for(var i=0; i<this.mysteryBoxArr.length;i++){
			tempLeft=this.mysteryBoxArr[i].elem.offset().left;
			tempTop=this.mysteryBoxArr[i].elem.offset().top;
			tempRight=parseInt(this.mysteryBoxArr[i].elem.width())+parseInt(this.mysteryBoxArr[i].elem.offset().left);
			tempBottom=parseInt(this.mysteryBoxArr[i].elem.height())+parseInt(this.mysteryBoxArr[i].elem.offset().top);
			if(!(tempLeft>marioRight)&&!(tempBottom<marioTop)&&!(tempRight<marioLeft)&&!(tempTop>marioBottom)){
				
				if(!this.onFloor){
				//under the conditino that mario is jumping and hit left or right
					if(Math.abs(tempLeft-marioRight)<5){
						this.collisionLeft=true;
						collisionLeftArr[0]="true";
						break;
					}else if(Math.abs(tempRight-marioLeft)<5){
						this.collisionRight=true;
						collisionRightArr[0]="true";
						break;
					}
				}
				if(tempBottom>marioTop&&tempBottom<marioBottom&&(Math.abs(tempLeft-marioLeft)<35||Math.abs(tempRight-marioRight)<35)){
					//this is for gaing the things in the box
					this.yVelocity+=this.marioYSpd;
					this.elem.css({top:this.elem.offset().top+5});
					this.mysteryBoxArr[i].collided();
					return;
				}else if(tempBottom>marioTop&&tempBottom<marioBottom){
					this.yVelocity+=this.marioYSpd;
					this.elem.css({top:this.elem.offset().top+5});
					return;
				}else if(tempTop<=marioBottom&&tempTop>=marioTop&&(Math.abs(tempLeft-marioLeft)<=35||Math.abs(tempRight-marioRight)<=35)){
					this.currentFloor=this.mysteryBoxArr[i].elem.offset().top-this.elem.height();
					this.collisionTop=true;
					this.collisionLeft=false;
					this.collisionRight=false;
					collisionTopArr[0]="true";
					return;
				}else if(tempLeft>marioLeft&&tempLeft<marioRight){
					this.collisionLeft=true;
				}else if(tempRight>marioLeft&&tempRight<marioRight){
					this.collisionRight=true;
				}
			}	
			
		}
		
		//BlockOne--------------------------------------------------
		for(var i=0; i<this.blockOneArr.length;i++){
			tempLeft=this.blockOneArr[i].elem.offset().left;
			tempTop=this.blockOneArr[i].elem.offset().top;
			tempRight=parseInt(this.blockOneArr[i].elem.width())+parseInt(this.blockOneArr[i].elem.offset().left);
			tempBottom=parseInt(this.blockOneArr[i].elem.height())+parseInt(this.blockOneArr[i].elem.offset().top);
			
			if(!(tempLeft>marioRight)&&!(tempBottom<marioTop)&&!(tempRight<marioLeft)&&!(tempTop>marioBottom)){
				if(!this.onFloor){
				//under the conditino that mario is jumping
					if(Math.abs(tempLeft-marioRight)<5){
						this.collisionLeft=true;
						collisionLeftArr[1]="true";
						break;
					}else if(Math.abs(tempRight-marioLeft)<5){
						this.collisionRight=true;
						collisionRightArr[1]="true";
						break;
					}
				}
				if(tempBottom>marioTop&&tempBottom<marioBottom){
					this.yVelocity+=this.marioYSpd;
					this.elem.css({top:this.elem.offset().top+5});
					return;
				}else if(tempTop<=marioBottom&&tempTop>=marioTop&&(Math.abs(tempLeft-marioLeft)<35||Math.abs(tempRight-marioRight)<35)){
					this.currentFloor=this.blockOneArr[i].elem.offset().top-this.elem.height();
					this.collisionTop=true;
					this.collisionLeft=false;
					this.collisionRight=false;
					collisionTopArr[1]="true";
					return;
				}else if(tempLeft>marioLeft&&tempLeft<marioRight){
					this.collisionLeft=true;
				}else if(tempRight>marioLeft&&tempRight<marioRight){
					this.collisionRight=true;
				}
			}
		}
		
		//PipeOne-----------------------------------------------
		for(var i=0; i<this.pipeOneArr.length;i++){
			tempLeft=this.pipeOneArr[i].elem.offset().left;
			tempTop=this.pipeOneArr[i].elem.offset().top;
			tempRight=parseInt(this.pipeOneArr[i].elem.width())+parseInt(this.pipeOneArr[i].elem.offset().left);
			tempBottom=parseInt(this.pipeOneArr[i].elem.height())+parseInt(this.pipeOneArr[i].elem.offset().top);
			if(!(tempLeft>marioRight)&&!(tempBottom<marioTop)&&!(tempRight<marioLeft)&&!(tempTop>marioBottom)){
				if(tempTop<=marioBottom&&tempTop>=marioTop&&(Math.abs(tempLeft-marioLeft)<35||Math.abs(tempRight-marioRight)<35)){
					this.currentFloor=this.pipeOneArr[i].elem.offset().top-this.elem.height();
					this.collisionTop=true;
					this.collisionLeft=false;
					this.collisionRight=false;
					collisionTopArr[2]="true";
					return;
				}else if(tempRight>marioLeft&&tempRight<marioRight){
					this.collisionRight=true;
					if(this.currentFloor!=this.pipeOneArr[i].elem.offset().top-this.elem.height()){
						collisionTopArr[2]="false";
					}
				}else if(tempLeft>marioLeft&&tempLeft<marioRight){
					this.collisionLeft=true;
					if(this.currentFloor!=this.pipeOneArr[i].elem.offset().top-this.elem.height()){
						collisionTopArr[2]="false";
					}
				}
			}
			
		}
		
		//PipeTwo--------------------------------------
		for(var i=0; i<this.pipeTwoArr.length;i++){
			tempLeft=this.pipeTwoArr[i].elem.offset().left;
			tempTop=this.pipeTwoArr[i].elem.offset().top;
			tempRight=parseInt(this.pipeTwoArr[i].elem.width())+parseInt(this.pipeTwoArr[i].elem.offset().left);
			tempBottom=parseInt(this.pipeTwoArr[i].elem.height())+parseInt(this.pipeTwoArr[i].elem.offset().top);
			if(!(tempLeft>marioRight)&&!(tempBottom<marioTop)&&!(tempRight<marioLeft)&&!(tempTop>marioBottom)){
				if(tempTop<=marioBottom&&tempTop>=marioTop&&(Math.abs(tempLeft-marioLeft)<35||Math.abs(tempRight-marioRight)<35)){
					this.currentFloor=this.pipeTwoArr[i].elem.offset().top-this.elem.height();
					this.collisionTop=true;
					this.collisionLeft=false;
					this.collisionRight=false;
					collisionTopArr[3]="true";
					return;
				}else if(tempRight>marioLeft&&tempRight<marioRight){
					this.collisionRight=true;
					if(this.currentFloor!=this.pipeTwoArr[i].elem.offset().top-this.elem.height()){
						collisionTopArr[3]="false";
					}
				}else if(tempLeft>marioLeft&&tempLeft<marioRight){
					this.collisionLeft=true;
					if(this.currentFloor!=this.pipeTwoArr[i].elem.offset().top-this.elem.height()){
						collisionTopArr[3]="false";
					}
				}
			}
		}
		
		//PipeThree----------------------------------------------
		for(var i=0; i<this.pipeThreeArr.length;i++){
			tempLeft=this.pipeThreeArr[i].elem.offset().left;
			tempTop=this.pipeThreeArr[i].elem.offset().top;
			tempRight=parseInt(this.pipeThreeArr[i].elem.width())+parseInt(this.pipeThreeArr[i].elem.offset().left);
			tempBottom=parseInt(this.pipeThreeArr[i].elem.height())+parseInt(this.pipeThreeArr[i].elem.offset().top);
			if(!(tempLeft>marioRight)&&!(tempBottom<marioTop)&&!(tempRight<marioLeft)&&!(tempTop>marioBottom)){
				if(tempTop<=marioBottom&&tempTop>=marioTop&&(Math.abs(tempLeft-marioLeft)<35||Math.abs(tempRight-marioRight)<35)){
					this.currentFloor=this.pipeThreeArr[i].elem.offset().top-this.elem.height();
					this.collisionTop=true;
					this.collisionLeft=false;
					this.collisionRight=false;
					collisionTopArr[4]="true";
					return;
				}else if(tempRight>marioLeft&&tempRight<marioRight){
					this.collisionRight=true;
					if(this.currentFloor!=this.pipeThreeArr[i].elem.offset().top-this.elem.height()){
						collisionTopArr[4]="false";
					}
				}else if(tempLeft>marioLeft&&tempLeft<marioRight){
					this.collisionLeft=true;
					if(this.currentFloor!=this.pipeThreeArr[i].elem.offset().top-this.elem.height()){
						collisionTopArr[4]="false";
					}
				}
			}
		}
		
		//BlockLong--------------------------------------------------
		for(var i=0; i<this.blockLongArr.length;i++){
			tempElem=this.blockLongArr[i].elem;
			tempLeft=this.blockLongArr[i].elem.offset().left;
			tempTop=this.blockLongArr[i].elem.offset().top;
			tempRight=parseInt(this.blockLongArr[i].elem.width())+parseInt(this.blockLongArr[i].elem.offset().left);
			tempBottom=parseInt(this.blockLongArr[i].elem.height())+parseInt(this.blockLongArr[i].elem.offset().top);
			
			if(!(tempLeft>marioRight)&&!(tempBottom<marioTop)&&!(tempRight<marioLeft)&&!(tempTop>marioBottom)){
				if(!this.onFloor){
				//under the conditino that mario is jumping
					if(Math.abs(tempLeft-marioRight)<5){
						this.collisionLeft=true;
						collisionLeftArr[5]="true";
						break;
					}else if(Math.abs(tempRight-marioLeft)<5){
						this.collisionRight=true;
						collisionRightArr[5]="true";
						break;
					}
				}
				if(tempBottom>marioTop&&tempBottom<marioBottom){
					this.yVelocity+=this.marioYSpd;
					this.elem.css({top:this.elem.offset().top+5});
					return;
				}else if(tempTop<=marioBottom&&tempTop>=marioTop){
					//condition:mario has to be within 10px left and right
					this.currentFloor=this.blockLongArr[i].elem.offset().top-this.elem.height();
					this.collisionTop=true;
					this.collisionLeft=false;
					this.collisionRight=false;
					collisionTopArr[5]="true";
					return;
				}else if(tempLeft>marioLeft&&tempLeft<marioRight){
					this.collisionLeft=true;
				}else if(tempRight>marioLeft&&tempRight<marioRight){
					this.collisionRight=true;
				}
			}
		}
		
		//BlockThree--------------------------------------------------
		for(var i=0; i<this.blockThreeArr.length;i++){
			tempElem=this.blockThreeArr[i].elem;
			tempLeft=this.blockThreeArr[i].elem.offset().left;
			tempTop=this.blockThreeArr[i].elem.offset().top;
			tempRight=parseInt(this.blockThreeArr[i].elem.width())+parseInt(this.blockThreeArr[i].elem.offset().left);
			tempBottom=parseInt(this.blockThreeArr[i].elem.height())+parseInt(this.blockThreeArr[i].elem.offset().top);
			
			if(!(tempLeft>marioRight)&&!(tempBottom<marioTop)&&!(tempRight<marioLeft)&&!(tempTop>marioBottom)){
				if(!this.onFloor){
				//under the conditino that mario is jumping
					if(Math.abs(tempLeft-marioRight)<5){
						this.collisionLeft=true;
						collisionLeftArr[5]="true";
						break;
					}else if(Math.abs(tempRight-marioLeft)<5){
						this.collisionRight=true;
						collisionRightArr[5]="true";
						break;
					}
				}
				if(tempBottom>marioTop&&tempBottom<marioBottom){
					this.yVelocity+=this.marioYSpd;
					this.elem.css({top:this.elem.offset().top+5});
					return;
				}else if(tempTop<=marioBottom&&tempTop>=marioTop){
					//condition:mario has to be within 10px left and right
					this.currentFloor=this.blockThreeArr[i].elem.offset().top-this.elem.height();
					this.collisionTop=true;
					this.collisionLeft=false;
					this.collisionRight=false;
					collisionTopArr[5]="true";
					return;
				}else if(tempLeft>marioLeft&&tempLeft<marioRight){
					this.collisionLeft=true;
				}else if(tempRight>marioLeft&&tempRight<marioRight){
					this.collisionRight=true;
				}
			}
		}
		
		//Hole--------------------------------------------------
		for(var i=0; i<this.holeArr.length;i++){
			tempElem=this.holeArr[i].elem;
			tempLeft=this.holeArr[i].elem.offset().left;
			tempTop=this.holeArr[i].elem.offset().top;
			tempRight=parseInt(this.holeArr[i].elem.width())+parseInt(this.holeArr[i].elem.offset().left);
			tempBottom=parseInt(this.holeArr[i].elem.height())+parseInt(this.holeArr[i].elem.offset().top);
			if(tempLeft<marioLeft&&tempRight>marioRight&&marioBottom>=this.currentFloor&&this.onFloor){
				this.currentFloor=parseInt(window.innerHeight);
				this.onFloor=false;
				clearInterval(_this.timerForMovement);
				clearInterval(_this.GamePlay.timer.timerOne);
				this.fall();
			}
		}
		
		this.GamePlay.pole.collision();
		
		if(collisionTopArr.indexOf("true")==-1){
			if(this.collisionTop){
				this.currentFloor=parseInt(window.innerHeight*.75);
				this.collisionTop=false;
				this.onFloor=false;
			}
		}
	}
}
	