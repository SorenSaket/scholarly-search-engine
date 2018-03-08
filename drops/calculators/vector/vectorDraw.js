var canvas;
var parent ;
var centerX;
var centerY;
var pxPerUnit = 32;
var isDrawingPoints = false;
var isDrawingVectors = false;

function resizeCanvas() {
	resizeCanvas(parent.offsetWidth,parent.offsetWidth);
    centerX = width/2;
    centerY = height/2; 
}

function setup() {
    parent = document.getElementById("canvasparent");
    var canvas = createCanvas(parent.offsetWidth,parent.offsetWidth);
    canvas.parent("canvasparent");
    centerX = width/2;
    centerY = height/2;
    reDraw(false, false);
}

function reDraw(points, vectors)
{
    isDrawingPoints = points;
    isDrawingVectors = vectors;
    background(240);
    drawGrid();
    if(points)
        drawPoints();
    if(vectors)
        drawVectors();
}

function drawPoints()
{
    for (let i = 0; i < allVectors.length; i++) 
    {
        fill(colors[i]);
        noStroke();
        ellipse(
            centerX + (allVectors[i].x*pxPerUnit), 
            centerY - (allVectors[i].y*pxPerUnit), pxPerUnit/4, pxPerUnit/4);
    }
}

function drawVectors()
{
    // Draw vectors
    for (let i = 0; i < allVectors.length; i++) 
        drawVector(centerX,centerY,centerX+allVectors[i].x*pxPerUnit,centerY-allVectors[i].y*pxPerUnit, colors[i])
    if(allVectors.length > 1)
        drawVectorSum();
}

function drawVectorSum()
{
    var x = centerX;
    var y = centerY;
    var x2;
    var y2;
    // Draw Vector sum
    for (let i = 0; i < allVectors.length; i++) {
        x2 = x + (allVectors[i].x*pxPerUnit);
        y2 = y - (allVectors[i].y*pxPerUnit);
        drawVector(x,y, x2, y2, colors[i])
        x = x2;
        y = y2;
    }
}

// input in pixels
function drawVector(x1,y1,x2,y2, color)
{
    var offset = 8;
    
    // Draw Line
    fill(color);
    stroke(color);
    strokeWeight(3);
    line(x1,y1,x2,y2);

    //Draw arrow
    push();
    noStroke();
    var angle = atan2(y1 - y2, x1 - x2); //gets the angle of the line
    translate(x2, y2); //translates to the destination vertex
    rotate(angle-PI);
    triangle(
        0, 0, 
        -offset, offset/2, 
        -offset, -offset/2);
    pop();
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