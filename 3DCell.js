function Cell (i, j, scl)
{
	this.x = i*scl;
	this.y = j*scl;
	this.isVisited;
	this.wall = []; //up, right, down, left, top, bottom
	// this.isVisited = function()
	//  {
	//  	return this.visited;
	//  }
	this.setVisited = function(state)
	 {
	 	if(state == undefined) this.isVisited = true;
	 	else this.isVisited = state;
	 }
	
	this.disp = function() {
	 	if(this.isVisited) fill('#ea00ff'); else fill(255);
	 	noStroke();
	 	rect(this.x, this.y, scl, scl);
	 	stroke(0);
	 	if(this.wall[0]) line(this.x, this.y, this.x+scl, this.y);
	 	if(this.wall[1]) line(this.x+scl, this.y, this.x+scl, this.y+scl);
	 	if(this.wall[2]) line(this.x, this.y+scl, this.x+scl, this.y+scl)
	 	if(this.wall[3]) line(this.x, this.y, this.x, this.y+scl);
	 	if(!this.wall[4] & this.wall[5]) image(upArw, this.x+3, this.y+3, scl-6,scl-6);
	 	if(!this.wall[5] & this.wall[4]) image(dwArw, this.x+3, this.y+3, scl-6,scl-6);
	 	if(!this.wall[5] & !this.wall[4]) image(updwArw, this.x+3, this.y+3,scl-6, scl-6);
	 	/*
	 	ellipseMode(CENTER);
	 	if(!this.wall[4] & this.wall[5]) fill('#00f0ff'); 
	 	if(!this.wall[5] & this.wall[4]) fill('#180091'); 
	 	if(!this.wall[5] & !this.wall[4])fill('#0030ff'); 
	 	if(!this.wall[4] || !this.wall[5]) ellipse(this.x+(scl/2)+1, this.y+(scl/2)+1, scl-2,scl-2);
	 	*/
	 }
}