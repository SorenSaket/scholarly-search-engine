var currentDrawSize = 2;
var currentOutlineSize = 0;
var currentScatterValue = 0;
var currentBackgroundColor;
var currentColor;
var currentAlternativeColor;
var canvas;
var currentTool = "brush";
var currentFiletype = "png";
var isDrawing = false;
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
    currentBackgroundColor = color(255,255,255);
}

function draw()
{
    clear();
    background(currentBackgroundColor);
   
    drawElements();


    if(keyIsDown(SHIFT))
        drawSizeGuide();
}

function drawElements()
{
    for (let z = 0; z < elements.length; z++) {
        if(elements[z].isStart && elements[z].type == "curve")
        {
            beginShape();
        }
            
        
        //Color
        if(elements[z].outlineSize > 0)
        {
            stroke(elements[z].outlineColor);
            strokeWeight(elements[z].outlineSize);
        }else
        {
            noStroke();
        }
        fill(elements[z].color);

        //Elements
        switch (elements[z].type) {
            case "brush":
                ellipse(elements[z].x,elements[z].y,elements[z].size,elements[z].size);
                break;
            case "line":
                verte(elements[z].x,elements[z].y);
                break;
            case "curve":
                console.log("das");
                noFill();
                stroke(elements[z].color);
                strokeWeight(elements[z].size);
                curveVertex(elements[z].x,elements[z].y);
                break;
            default:
                break;
        }
        

        if(elements[z].isEnd)
        {
            endShape();
        }  
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

function mouseClicked() 
{
    var isStart = false;
    var isEnd = false;
    if(!isDrawing)
    {
        isStart = true;
        isDrawing = true;
    }
    else
    {
        isEnd = true;
        isDrawing = false;
    }
    var el = 
    {
        x: mouseX + random(-currentScatterValue,currentScatterValue),
        y: mouseY + random(-currentScatterValue,currentScatterValue),
        size: currentDrawSize,
        outlineSize: currentOutlineSize,
        color: currentColor,
        outlineColor: currentAlternativeColor,
        type: currentTool,
        isStart: isStart,
        isEnd: isEnd
    }
    elements.push(el);
}


function mouseDragged() 
{
    var el = 
    {
        x: mouseX + random(-currentScatterValue,currentScatterValue),
        y: mouseY + random(-currentScatterValue,currentScatterValue),
        size: currentDrawSize,
        outlineSize: currentOutlineSize,
        color: currentColor,
        outlineColor: currentAlternativeColor,
        type: currentTool
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

function clearDocument()
{
    elements = [];
}

function exportCanvas()
{
    saveCanvas(canvas,"cool pic",currentFiletype)
}

// ---------------- Helper functions  ----------------

function random(min,max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ---------------- UI input function stuff  ----------------

function changeSize(value){
    currentDrawSize = parseFloat(value);
    document.getElementById("brushSizeValue").innerText = value;
}

function changeOutlineSize(value){
    currentOutlineSize = parseFloat(value);
    document.getElementById("outlineSizeValue").innerText = value;
}

function changeScatter(value){
    currentScatterValue = parseFloat(value);
    document.getElementById("scatterValue").innerText = value;
}


function changeColor(value){
    currentColor = value;
}

function changeAlternativeColor(value){
    currentAlternativeColor = value;
}

function changeBackgroundColor(value){
    currentBackgroundColor = value;
}

function changeFiletype(value)
{
    currentFiletype = value;
}

function changeTool(tool)
{
    currentTool = tool;
    console.log("Changed tool to: " + tool);
}