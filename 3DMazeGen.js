var maze = { s:10, h:3, scl:20, startPoint:0, finishPoint:0, visited:0 }
var cells = [];
var pos = { x:0, y:0, z:0, idx: 0, dir:6, m:false, auto_m:false};

function preload() 
 {
	upArw = loadImage('../src/img/arrowUp.png',function(){},function(){console.log("There's a failure loading image");});
	dwArw = loadImage('../src/img/arrowDown.png',function(){},function(){console.log("There's a failure loading image");});
	updwArw = loadImage('../src/img/arrowUpDown.png',function(){},function(){console.log("There's a failure loading image");});
	arwKeys = loadImage('../src/img/arrowKeys.png',function(){},function(){console.log("There's a failure loading image");});
	key_w = loadImage('../src/img/w.png',function(){},function(){console.log("There's a failure loading image");});
	key_s = loadImage('../src/img/s.png',function(){},function(){console.log("There's a failure loading image");});
	credit = loadImage('../src/img/Valentine Card.png',function(){},function(){console.log("There's a failure loading image");});
 }
function setup() 
 {
 	maze.s = int(prompt("Enter Maze Size: ",10)); 
 	maze.h = int(prompt("Enter Maze Height: ",3));
 	if(maze.s < 1) {maze.s = 1}; 
 	if(maze.h < 1) {maze.h = 1};
 	maze.scl = Math.floor(480/maze.s);
 	createCanvas(750,600);
 	createMaze();
 }
function draw()
 {
 	background(51); 
 	dispLeftPanel(540);
 	dispRightPanel(540);
 	dispTxt("3D Maze Game", 272, 62, 54, 0, CENTER, BOLD);
 	dispTxt("3D Maze Game", 270, 60, 54, '#ffba00', CENTER, BOLD);
 	dispTxt("Floor : "+(pos.z+1), 80, 140, 20, 0, CENTER, BOLD);
 	posUpdate();
 	dispMazeArea(20,80);	
 	if(pos.idx === maze.finishPoint) {noLoop(); dispFinishScreen();}
 }
function createMaze()
 {
 	maze.startPoint = Math.floor(random()*maze.s)*maze.s;
 	maze.finishPoint = (maze.h-1)*(maze.s*maze.s) + Math.floor(random()*maze.s+1)*maze.s-1;
 	for(var i = 0; i < maze.s*maze.s*maze.h; i++) 
 	 {
 		cells[i] = new Cell((i%maze.s), ((i-i%maze.s)/maze.s)%maze.s, maze.scl);
 		cells[i].setVisited(false);
 		for(var j = 0; j < 6; j++) cells[i].wall[j] = true;
 	 } 
 	remWall(maze.startPoint,3);
 	remWall(maze.finishPoint,1);
 	pos.x = 0;
 	pos.y = maze.startPoint/maze.s;
 	toCell(maze.finishPoint);
 	for(var i = 0; i < maze.s*maze.s*maze.h; i++) cells[i].setVisited(false);
 }
function dispMaze(floor)
 {
 	if(floor == undefined) floor = 0;
 	for(var i = 0; i < maze.s*maze.s; i++) cells[i+(floor)*maze.s*maze.s].disp();
 }
function toCell(init)
 {
 	var curr = init;
 	cells[curr].setVisited();
 	maze.visited++;
 	while(maze.visited < maze.s*maze.s*maze.h)
 	{
 		var nei = calcNei(curr);
 		var idxDest,dest; //index of destination, destination;
 		if(nei[6]) {
 			do
			 {
			 	idxDest = Math.floor(random()*6);
			 } while (nei[idxDest]); //re-pick random destination if it's the visited nei
			switch(idxDest)
			 {
			 	case 0: dest = curr-maze.s; break;
			 	case 1: dest = curr+1; break;
			 	case 2: dest = curr+maze.s; break;
			 	case 3: dest = curr-1; break;
			 	case 4: dest = curr+maze.s*maze.s; break;
			 	case 5: dest = curr-maze.s*maze.s; break;
			 }
			remWall(curr, idxDest, dest);
			toCell(dest);
		}	
		else break;
 	}
 }
function calcNei(cel)
 {
 	var out = []; //top, right, bottom, left, top, bottom, hasNei
 	out[6] = false;

 	if(cel%(maze.s*maze.s) < maze.s) out[0] = true; //check if cell is_at_up 
 	else out[0] = cells[cel-maze.s].isVisited; //check cell's up_nei
 	
 	if(cel%maze.s == maze.s-1) out[1] = true; //check if cell is_at_right
 	else out[1] = cells[cel+1].isVisited; //check cell's right_nei
 	
 	if(cel%(maze.s*maze.s) >= maze.s*(maze.s-1)) out[2] = true; //check if cell is_at_down
 	else out[2] = cells[cel+maze.s].isVisited; //check cell's down_nei
 	
 	if(cel%maze.s == 0) out[3] = true; //check if cell is_at_left
 	else out[3] = cells[cel-1].isVisited; //check cell's left_nei

 	if(cel >= maze.s*maze.s*(maze.h-1)) out[4] = true; //check if cell is_at_top
 	else out[4] = cells[cel+maze.s*maze.s].isVisited; //check cell's top_nei

 	if(cel < maze.s*maze.s) out[5] = true; //check if cell is_at_bottom
 	else out[5] = cells[cel-maze.s*maze.s].isVisited; //check cell's bottom_nei

 	if(!out[0] || !out[1] || !out[2] || !out[3] || !out[4] || !out[5]) out[6] = true;
 	
 	return out;
 }
function remWall(cel, dir, dest)
 {
 	cells[cel].wall[dir] = false; //remove current cells wall pointing to direction
 	if(dest != undefined){
 		switch(dir)
 		 {
 		 	case 0: cells[dest].wall[2] = false; break;
 		 	case 1: cells[dest].wall[3] = false; break;
 		 	case 2: cells[dest].wall[0] = false; break;
 		 	case 3: cells[dest].wall[1] = false; break;
 		 	case 4: cells[dest].wall[5] = false; break;
 		 	case 5: cells[dest].wall[4] = false; break;
 		 }
 	}
 }
function dispLeftPanel(wid)
 {
  	noStroke();
 	fill('#fedb98');
  	if(wid == undefined)rect(0,0,460,height);
  	else rect(0,0,wid,height);
 }
function dispRightPanel(wid)
 {
  	push();
 	if(wid == undefined) translate(460,0);
 	else translate(wid,0);
 	stroke(0); line(0,0,0,height);
 	noStroke(); fill('#f5c76e'); rect(0,0,width-460,height);
 	dispTxt("How to Play: ", 15, 65, 24, 0, LEFT, BOLD);
 	image(arwKeys, 18, 93, 50, 38);
 	dispTxt(": Moves", 80, 117, 18);
 	image(key_w, 32, 142, 20, 20);
 	dispTxt(": Climb Up", 80, 158, 18);
 	image(key_s, 32, 178, 20, 20);
 	dispTxt(": Climb Down", 80, 194, 18);

 	push();
 	if(wid != undefined) translate((width-wid-120)/2, 250);
 	else translate((460-120)/2, 250);
 	dispTxt("Floor :", 61, 1, 28, 0, CENTER, BOLD);
 	dispTxt("Floor :", 60, 0, 28, '#ffa200', CENTER, BOLD);
 	translate(0, 6);
 	fill(255);
 	stroke(0);
 	rect(0,0,120,120);
 	// translate(60,60);
 	noStroke();
 	dispTxt((pos.z+1), 40, 60, 50, 80, CENTER, BOLD);
 	stroke(80);
 	strokeWeight(3);
 	line(100,20,20,100);
 	noStroke();
 	dispTxt(maze.h, 80, 100, 50, 80, CENTER, BOLD);
 	pop();

 	image(credit, 30, 415, 150, 160);
 	pop();

 }
function dispTxt(txt, x, y, siz, c, alg, sty)
 {
 	push();
 	if(x != undefined & y != undefined) translate(x,y);
 	if(c != undefined) fill(c); else fill(0);
 	if(sty != undefined) textStyle(sty);
 	if(siz != undefined) textSize(siz); else textSize(11);
 	if(alg != undefined) textAlign(alg); else textAlign(LEFT);
 	text(txt,0,0);
 	pop();
 }
function dispMazeArea(x,y)
 {
  	push();
  	if(x == undefined || y == undefined) translate(20,170);
 	else translate(x,y);
 	fill(255);
 	rect(0,0,maze.s*maze.scl+20,maze.s*maze.scl+20);
 	translate(10,10);
 	dispMaze(pos.z);
 	ellipseMode(CENTER);
 	fill(255, 0, 0);
 	ellipse(pos.x*maze.scl+maze.scl*.5, pos.y*maze.scl+maze.scl*.5, maze.scl*.5, maze.scl*.5);
 	pop();
 }
function posUpdate() 
 {
 	pos.idx = pos.x + pos.y*maze.s + pos.z*maze.s*maze.s;

 	if(pos.dir != 6){
 		if(!cells[pos.idx].wall[pos.dir]) {
 			switch(pos.dir) {
 				case 0: pos.y--; break;
 				case 1: if(pos.idx != maze.finishPoint) {pos.x++;} break;
 				case 2: pos.y++; break;
 				case 3: if(pos.idx != maze.startPoint) {pos.x--;} break;
 				case 4: pos.z++; break;
 				case 5: pos.z--; break;
 			}
 		}
 	}
 	pos.dir = 6;
 	if(pos.auto_m) {
 		if(pos.m) cells[pos.idx].setVisited();
 		else cells[pos.idx].setVisited(false);
 	} else if(pos.m) {
		cells[pos.idx].setVisited(!cells[pos.idx].isVisited);
		pos.m = false;
 	}
 }
function keyPressed()
 {
 	if(keyCode == 87 && pos.z < maze.h-1) pos.dir = 4; //step up
 	if(keyCode == 83 && pos.z > 0) pos.dir = 5; //step down
 	if(keyCode === UP_ARROW) pos.dir = 0;
 	if(keyCode === DOWN_ARROW) pos.dir = 2;
 	if(keyCode === LEFT_ARROW) pos.dir = 3;
 	if(keyCode === RIGHT_ARROW) pos.dir = 1;
 	if(keyCode == 68) pos.m = !pos.m;
 	if(keyCode == 77) {pos.auto_m = true; pos.m = !pos.m;}
// 	// if(keyCode == 82) {
 	// 	if(confirm("Do you want to restart?"))
 	// 	{
 	// 		for(var i = cells.length; i > 0; i--) cells.pop();
	 // 		maze.startPoint = 0; maze.finishPoint = 0; maze.visited = 0;
	 // 		pos.x = 0; pos.y = 0; pos.z = 0;
	 // 		setup(); 
	 // 		draw();
 	// 	}
// 	// }
 }
 function dispFinishScreen()
  {
  	fill(80,98);
  	rect(0,0,width, height);
  	dispTxt("You Win", width/2, height/2+10, 150, "#FFFF00", CENTER, BOLD);
  	dispTxt("Press 'F5' to restart.", width/2, height/2+60, 30, 255, CENTER);
  }