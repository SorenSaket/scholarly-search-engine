var currentDrawSize = 2;
var currentOutlineSize = 0;
var currentColor;
var currentAlternativeColor;
var canvas;

var elements = [];

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
	resizeCanvas($('#canvasparent').width() , $('#canvasparent').height());
}

function setup()
{
	var canvas = createCanvas($('#canvasparent').width(),$('#canvasparent').height());
    canvas.parent("canvasparent");
    currentColor = color(0,0,0);
    currentAlternativeColor = color(255,255,255);
}

function draw()
{
    clear();
    background(255);
   
    drawElements();


    if(keyIsDown(SHIFT))
        drawSizeGuide();
}

function drawElements()
{
    for (let z = 0; z < elements.length; z++) {
        if(elements[z].outlineSize > 0)
        {
            stroke(elements[z].color);
            strokeWeight(elements[z].outlineSize);
        }else
        {
            noStroke();
        }

        fill(elements[z].color);

        ellipse(elements[z].x,elements[z].y,elements[z].size,elements[z].size);
    }
}


function drawSizeGuide()
{
    noFill();
    stroke(color(0,0,0));
    strokeWeight(1);
    ellipse(mouseX,mouseY, currentDrawSize, currentDrawSize);
}

function keyPressed()
{
    if(keyCode === SHIFT)
    {
        drawSizeGuide();
    }
}

function mousePressed()
{

}

function mouseDragged() 
{
    var el = 
    {
        x: mouseX,
        y: mouseY,
        size: currentDrawSize,
        outlineSize: currentOutlineSize,
        color: currentColor,
        outline: currentOutlineSize
    }
    elements.push(el);
}

function mouseWheel(event)
{
    if(keyIsDown(SHIFT))
    {
        currentDrawSize -= event.delta/10;
        if(currentDrawSize <= 0)
        {
            currentDrawSize = 1;
        }
    }
}



function changeSize(val)
{
    currentDrawSize = val;
    console.log(val);
}

function changeOutlineSize(val)
{
    outlineSize = val;
}