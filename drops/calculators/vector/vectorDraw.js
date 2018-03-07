var canvas;
var parent ;
var centerX;
var centerY;
var pxPerUnit = 32;

function resizeCanvas() {
	resizeCanvas(parent.offsetWidth,parent.offsetWidth);
    centerX = width/2;
    centerY = height/2; 
}

function setup() {
    parent = document.getElementById("canvasparent");
    console.log(parent.offsetWidth);
    var canvas = createCanvas(parent.offsetWidth,parent.offsetWidth);
    canvas.parent("canvasparent");
    centerX = width/2;
    centerY = height/2;
    reDraw();
}



function reDraw()
{
    background(240);
    drawGrid();
    //drawPoints();
    drawVectors();
}

function drawPoints()
{
    print("Drawing points");
    for (let i = 0; i < allVectors.length; i++) 
    {
        fill(colors[i]);
        noStroke();
        ellipse(centerX + (allVectors[i].x*pxPerUnit), centerY - (allVectors[i].y*pxPerUnit), pxPerUnit/4, pxPerUnit/4);
    }
}

function drawVectors()
{
    for (let i = 0; i < allVectors.length; i++) 
    {
        fill(colors[i]);
        stroke(colors[i]);
        strokeWeight(3)
        var x = centerX + (allVectors[i].x*pxPerUnit);
        var y = centerY - (allVectors[i].y*pxPerUnit);
        var offset = 8;
        //line(centerX,centerY,x,y)
        noStroke();
        var angle = atan2(x, y); //gets the angle of the line
        translate(x, y); //translates to the destination vertex

        rotate(angle+HALF_PI);
        triangle(
            0, 0, 
            -offset, offset/2, 
            -offset, -offset/2);
    }
}

function drawGrid()
{
    
    //line(0, centerY, windowWidth, centerY);
    //line(centerX, 0, centerX, windowHeight);
    
    //Y Lines |||
    for (let i = 0; i < width/pxPerUnit; i++) 
    {
        if(i == round((width/pxPerUnit)/2))
        {
            stroke(0, 0, 0);
            strokeWeight(2);
            centerX = i*pxPerUnit;
        }
        else
        {
            strokeWeight(1);
            stroke('rgba(0,0,0,0.1)');
        }
        
        line(i*pxPerUnit, 0, i*pxPerUnit, height);
    }

    //X Lines ---
    for (let i = 0; i < height/pxPerUnit; i++) 
    {
        if(i == round((height/pxPerUnit)/2))
        {
            stroke(0, 0, 0);
            strokeWeight(2);
            centerY = i*pxPerUnit;
        }
        else
        {
            strokeWeight(1);
            stroke('rgba(0,0,0,0.1)');
        }
        
        line(0, i*pxPerUnit, width, i*pxPerUnit);
    }
}