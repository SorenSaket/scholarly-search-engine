var canvasSize = 100;
var canvas;
var zoom = 64;
var offsetX = 0;
var offsetY = 0;
var lastOffsetX = 0;
var lastOffsetY = 0;
var lastMousePosX = 0;
var lastMousePosY = 0;
var clicked = false;
var triangleToDraw;

//Setup funtions
function windowResized() {
	canvasSetup();
}
function setup(){
	var canvas = createCanvas(100,100);
	canvas.parent("canvasparent");
	canvas.mouseWheel(changeSize);
	canvasSetup();
}
function canvasSetup(){
	var parent = document.getElementById('canvasparent');
	resizeCanvas(parent.offsetWidth , parent.offsetHeight);
}

// Draw functions
function draw(){
	clear();
	background(color(255));
	textSize(16);
	if(triangleToDraw != null)
	{
		DrawTriangle(triangleToDraw.a, triangleToDraw.b, triangleToDraw.c, triangleToDraw.A, triangleToDraw.B, triangleToDraw.C, zoom);
	}
	DrawGuides();
}
function DrawTriangle(a,b,c,A,B,C,zoom){
	var textOffset = 10;
	var pointSize = 16;
	

	var aColor = color(220,53,69);
	var Ax = CenterPosX() + offsetX;
	var Ay = CenterPosY()+ offsetY;
	
	var bColor = color(0,123,255);
	var Bx = CenterPosX()+(c*Math.cos(degToRad(A))*zoom)+ offsetX;
	var By = CenterPosY()-(c*Math.sin(degToRad(A))*zoom)+ offsetY;

	var cColor = color(40,167,69);
	var Cx = CenterPosX() + zoom*b + offsetX;
	var Cy = CenterPosY() + offsetY;
	
	// ---- Draw Triangle Background ---- 

	noStroke();
	fill(color("rgba(233,236,239, 0.5)"));
	triangle(Ax,Ay,Cx,Cy,Bx,By);


	// ---- Draw Helper Lines ----
	
	strokeWeight(1);
	noFill();
	stroke(color(0));

	if(true)
	{
		line(Bx, By, Bx, Ay);
		fill(color(0));
		//text((c*Math.cos(degToRad(A))).toFixed(2), Bx, By + (Ay-By)/2);
		
		noFill();
		ellipse(CenterPosX() + offsetX,CenterPosY() + offsetY,zoom,zoom);
	}
	
	// ---- Draw sides ---- 

	strokeWeight(4);
	
	stroke(cColor);
	line(Ax, Ay, Bx, By);

	stroke(aColor);
	line(Bx, By, Cx, Cy);

	stroke(bColor);
	line(Cx, Cy,Ax, Ay);

	
	// ---- Draw Points ----
	
	noStroke();

	//A

	fill(aColor);
	ellipse(Ax,Ay,pointSize,pointSize)
	text("A = " + A + ascii(176), Ax-textOffset , Ay+20)
	text("a = " + a, (Bx+Cx)/2 + textOffset, (By+Cy)/2);

	//B
	
	fill(bColor);
	ellipse(Bx,By,pointSize,pointSize)
	text("B = " + B + ascii(176), Bx , By-textOffset)
	text("b = " + b, (Ax+Cx)/2, (Ay+Cy)/2 + textOffset*2);

	//C

	fill(cColor);
	ellipse(Cx,Cy,pointSize,pointSize);
	text("C = " + C + ascii(176), Cx+textOffset , Cy)	
	text("c = " + c, (Ax+Bx)/2 - textOffset*6, (Ay+By)/2);
}
function DrawGuides()
{
	color(0, 0, 0);
	fill(0, 0, 0);
	text(offsetX + ", " + offsetY + ". Zoom: " + zoom, 16, 32);
}

//Control funtions
function mouseDragged(e){
	
	if(e.srcElement == canvas)
	{
		if(!clicked)
		{
			lastMousePosX = mouseX;
			lastMousePosY = mouseY;
			lastOffsetX = offsetX;
			lastOffsetY = offsetY;
	
			clicked = true;
		}
		offsetX = lastOffsetX + (mouseX - lastMousePosX);
		offsetY = lastOffsetY + (mouseY - lastMousePosY);
	}

}
function mouseClicked() {
	clicked = false;
}
function changeSize(event){
	if (event.deltaY > 0) {
		zoom = zoom - 5;
		if(zoom < 1)
			zoom = 1;
	} else{
		zoom = zoom + 5;
		}
}

//Helper functions
function CenterPosY(){
	return height/2;
}
function CenterPosX(){
	return width/2;
}
function ascii (a) { return String.fromCharCode(a); }