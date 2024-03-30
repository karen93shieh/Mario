/** function Background(GamePlay, leftScale, idNum) sets the dimension and position of the background image of the game
	input: the GamePlay object, the leftScale, and the id numebr
	output: none
	other effect: none
*/
function Background(GamePlay, leftScale, idNum){
	this.GamePlay=GamePlay;
	this.leftScale=leftScale;
	this.elem=$("<img>")
		.attr({src:"pics/backgroundImg.jpg"})
		.css({height:parseInt(window.innerHeight), position:"absolute", top:0, left:parseInt(window.innerHeight)*1.6*leftScale});
	/** this.move moves the background setting
	input: leftChange
	output: none
	other effect: to make the girl looks like it's moving
	*/
	this.move=function(leftChange){
		this.elem.css({left:this.elem.position().left-leftChange});
	}
}