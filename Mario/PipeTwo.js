/** function PipeTwo(GamePlay, leftV, topV) sets the dimension and position of the second pipe
input: the GamePlay object, left value, and top value
output: none
other effects: none
*/
function PipeTwo(GamePlay, leftV, topV){
	this.GamePlay=GamePlay;
	this.leftV=leftV;
	this.topV=topV;
	this.elem=$("<img>")
		.attr({src:"pics/pipeTwo.png"})
		.css({position:"absolute", height:parseInt(window.innerHeight*.165), width:parseInt(window.innerHeight*.058)*2, left:this.leftV, top:this.topV});
	
	/** this.move moves the PipeTwo object
	input: leftChange
	output: none
	other effect: to make the girl looks like it's moving
	*/
	this.move=function(leftChange){
		this.elem.css({left:this.elem.position().left-leftChange});
	}
}