/** function Menu() handles the homepage of the game
input: none
output: none
other effect: none
*/
function Menu(){
	var _this=this;
	this.elem=$("<div/>")
		.attr({})
		.css({height:parseInt(window.innerHeight*.8),width:parseInt(window.innerHeight*.5), position:"relative", margin:"auto",top:parseInt(window.innerHeight*.1),fontSize:"20px",textAlign:"center"})
		.appendTo($("body"));
		
	this.title=$("<div/>")
		.attr({})
		.css({width:parseInt(window.innerHeight*.4),height:parseInt(window.innerHeight*.1), position:"absolute", left:parseInt(window.innerHeight*.01), top:parseInt(window.innerHeight*.1), textAlign:"center",fontFamily:"MarioFont",fontSize:"3.5em",margin:"15px"})
		.html("Mario")
		.appendTo(this.elem);
		
	this.startGame=$("<input/>")
		.attr({type:"button", value:"Start Game"})
		.css({top:parseInt(window.innerHeight*.25), position:"absolute", width:parseInt(window.innerHeight*.5), backgroundColor:"yellow",height:parseInt(window.innerHeight*.08),border:"5px ridge gold", left:parseInt(window.innerHeight*.01),fontFamily:"MarioFont",fontSize:"1.3em"})
		.click(function(){startGame()})
		.appendTo(this.elem);
		
	this.instruction=$("<input/>")
		.attr({type:"button", value:"Instruction"})
		.css({top:parseInt(window.innerHeight*.40), position:"absolute", width:parseInt(window.innerHeight*.5), backgroundColor:"yellow",height:parseInt(window.innerHeight*.08),border:"5px ridge gold", left:parseInt(window.innerHeight*.01),fontFamily:"MarioFont",fontSize:"1.3em"})
		.click(function(){_this.showDiv("instruction")})
		.appendTo(this.elem);
	this.scoreBut=$("<input/>")
		.attr({type:"button", value:"Score Board"})
		.css({top:parseInt(window.innerHeight*.55), position:"absolute", width:parseInt(window.innerHeight*.5), backgroundColor:"yellow",height:parseInt(window.innerHeight*.08),border:"5px ridge gold", left:parseInt(window.innerHeight*.01),fontFamily:"MarioFont",fontSize:"1.3em"})
		.click(function(){_this.showDiv("score")})
		.appendTo(this.elem);
	
	this.back=$("<div/>")
		.attr({})
		.css({width:parseInt(window.innerHeight*.1),height:parseInt(window.innerHeight*.05), position:"absolute", left:parseInt(window.innerHeight*.05), top:parseInt(window.innerHeight*.7),fontFamily:"MarioFont", padding:10, backgroundColor:"peachpuff"})
		.html("Back")
		.hide()
		.click(function(){_this.lastPage()})
		.appendTo(this.elem);
	
	this.instructionDiv=$("<div/>")
		.attr({})
		.css({width:parseInt(window.innerHeight*.4)-20,height:parseInt(window.innerHeight*.4), position:"absolute", left:parseInt(window.innerHeight*.05), top:parseInt(window.innerHeight*.25),fontFamily:"MarioFont", padding:5, backgroundColor:"lightGreen", opacity:"0.8"})
		.html("Press up down left right to move<br><br>Don't touch the Pikachu!<br><br>Time is money, so try to be fast")
		.hide()
		.appendTo(this.elem);
		
	this.scoreDiv=$("<div/>")
		.attr({})
		.css({width:parseInt(window.innerHeight*.4)-20,height:parseInt(window.innerHeight*.4), position:"absolute", left:parseInt(window.innerHeight*.05), top:parseInt(window.innerHeight*.25),fontFamily:"MarioFont", padding:10, backgroundColor:"lightGreen", opacity:"0.8"})
		.hide()
		.appendTo(this.elem);
	
	this.clearStorage=$("<div/>")
		.attr({})
		.css({width:parseInt(window.innerHeight*.2),height:parseInt(window.innerHeight*.065), position:"absolute", left:parseInt(window.innerHeight*.21), top:parseInt(window.innerHeight*.7),fontFamily:"MarioFont", padding:10, backgroundColor:"peachpuff"})
		.html("Clear Storage")
		.hide()
		.click(function(){_this.clear()})
		.appendTo(this.elem);
	
	/** this.showDiv controls which div should be present on the homepage
	input: value
	output: none
	other effect: if one div is selected, the other divs will not display
	*/
	this.showDiv=function(value){
		this.startGame.hide();
		this.instruction.hide();
		this.scoreBut.hide();
		this.back.show();
		if(value=="instruction"){
			this.instructionDiv.show();
		}else{
			this.scoreDiv.show();
			this.clearStorage.show();
			this.createScore();
		}
	}
	
	/** this.lastPage runs when the game hits the last page
	input: none
	output: none
	other effect: certain divs are shown while the other are hidden
	*/
	this.lastPage=function(){
		this.instructionDiv.hide();
		this.scoreDiv.hide();
		this.clearStorage.hide();
		this.back.hide();
		this.startGame.show();
		this.instruction.show();
		this.scoreBut.show();
	}
	
	/** this.createScore shows the score that the player scores in the score div
	input: none
	output: none
	other effect: the message will display
	*/
	this.createScore=function(){
		var msg=localStorage.getItem(key);
		this.scoreDiv.html(msg);
		if(msg==null){
			this.scoreDiv.html("No score available");
		}
	}
	
	/** this.clear runs when the clear storage button is pressed
	input: none
	output: none
	other effect: the local storage is cleared
	*/
	this.clear=function(){
		localStorage.clear(key);
		var msg=localStorage.getItem(key);
		this.scoreDiv.html("No score available");
	}
}