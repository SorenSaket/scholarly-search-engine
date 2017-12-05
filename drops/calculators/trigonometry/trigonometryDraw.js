var canvasSize = 100;
var canvas;
var scale = 30;
var offsetX = 0;
var offsetY = 0;
var lastOffsetX = 0;
var lastOffsetY = 0;
var lastMousePosX = 0;
var lastMousePosY = 0;
var clicked = false;
var triangleToDraw;

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
	resizeCanvas($('#canvasparent').width() , $('#canvasparent').height());
}

function setup()
{
	var canvas = createCanvas($('#canvasparent').width(),$('#canvasparent').height());
	canvas.parent("canvasparent");
	scale = 30;
	canvas.mouseWheel(changeSize);
}

function draw()
{
	clear();
	background("rgba(0,0,0,0)");
	if(triangleToDraw != null)
	{
		DrawTriangle(triangleToDraw.a, triangleToDraw.b, triangleToDraw.c, triangleToDraw.A, triangleToDraw.B, triangleToDraw.C, scale);
	}
}

function mouseDragged()
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

function mouseClicked() 
{
	clicked = false;
}

function changeSize(event)
{
	if (event.deltaY > 0) {
		scale = scale + 5;
	  } else {
		scale = scale - 5;
	  }
}

function DrawTriangle(a,b,c,A,B,C,scale)
{
	var textOffset = 10;
	var pointSize = 8;
	textSize(16);

	var aColor = color(220,53,69);
	var Ax = CenterPosX() + offsetX;
	var Ay = CenterPosY()+ offsetY;
	
	var bColor = color(0,123,255);
	var Bx = CenterPosX()+(c*Math.cos(degToRad(A))*scale)+ offsetX;
	var By = CenterPosY()-(c*Math.sin(degToRad(A))*scale)+ offsetY;

	var cColor = color(40,167,69);
	var Cx = CenterPosX() + scale*b + offsetX;
	var Cy = CenterPosY() + offsetY;
	
	// ---- Draw Triangle Background ---- 

	noStroke();
	fill(color("rgba(233,236,239, 0.5)"));
	triangle(Ax,Ay,Cx,Cy,Bx,By);


	// ---- Draw Helper Lines ----
	
	strokeWeight(1);
	noFill();
	stroke(color(0,0,0));

	if(0 == 0)
	{
		line(Cx, Cy, Cx, Ay);
		ellipse(CenterPosX() + offsetX,CenterPosY() + offsetY,scale*2,scale*2);
	}
	
	// ---- Draw sides ---- 

	strokeWeight(2);
	
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


function CenterPosY()
{
	return height/2;
}
function CenterPosX()
{
	return width/2;
}

function ascii (a) { return String.fromCharCode(a); }