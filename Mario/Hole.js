/** function Hole(GamePlay, leftV, topV) sets the dimension and position of the hole
input: the GamePlay object, left value, and top value
output: none
other effects: none
*/
function Hole(GamePlay, leftV, topV){
	this.GamePlay=GamePlay;
	this.leftV=leftV;
	this.topV=topV;
	this.elem=$("<img>")
		.attr({src:"pics/hole.png"})
		.css({position:"absolute", width:parseInt(window.innerHeight*.058)*3, left:this.leftV, top:this.topV});
	
	/** this.move moves the hole
	input: leftChange
	output: none
	other effect: to make the girl looks like it's moving
	*/
	this.move=function(leftChange){
		this.elem.css({left:this.elem.position().left-leftChange});
	}
}