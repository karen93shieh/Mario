/** function MysteryBox(GamePlay, leftV, topV) sets up the mystery box in the game
input: the GamePlay object, the left value, and the top value
output: none
other effect: none
*/
function MysteryBox(GamePlay, leftV, topV){
	var _this=this;
	this.GamePlay=GamePlay;
	this.leftV=leftV;
	this.topV=topV;
	this.hit=0;
	this.elem=$("<img>")
		.attr({src:"pics/mysteryBox.png"})
		.css({position:"absolute", height:parseInt(window.innerHeight*.058), left:this.leftV, top:this.topV});
	this.textElem=$("<div/>")
		.attr({id:"text"})
		.css({fontSize:"2em", color:"white", fontFamily:"myFirstFont", zIndex:100})
		.html("+100")
		.appendTo(this.elem);	
	
	/** this.move moves the mystery box
	input: leftChange
	output: none
	other effect: to make the girl looks like it's moving
	*/
	this.move=function(leftChange){
		this.elem.css({left:this.elem.position().left-leftChange});
	}
	
	/** this.collided runs when the girl collides with the mystery box
	input: none
	output: none
	other effect: points are awarded and then the box turns to emptyBlock
	*/
	this.collided=function(){
		if(this.hit<2){
			this.elem.animate({
				top:this.topV-20
			},100);
			this.GamePlay.points.updatePoints(100);
			this.elem.animate({
				top:this.topV
			},100);
		}
		if(this.hit==2){
			this.elem.animate({
				top:this.topV-20
			},100);
			this.GamePlay.points.updatePoints(100);
			this.elem.animate({
				top:this.topV
			},100);
			setTimeout(function(){_this.elem.attr({src:"pics/emptyBlock.png"});},200);
		}
		this.hit++;
	}
}