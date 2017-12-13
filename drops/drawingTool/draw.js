var canvas;
var currentElements;
var currentSelectedElement;
var sprites;

window.addEventListener('resize', resizeCanvas, false);


//loadAllSprites

function preload() 
{
    img = loadImage("assets/test_tube.png");
}

function loadAllSprites()
{
    elements.push()
}

function resizeCanvas() {
	resizeCanvas($('#canvasparent').width() , $('#canvasparent').height());
}

function setup()
{
    background(255);
    var canvas = createCanvas($('#canvasparent').width(),$('#canvasparent').height());
    canvas.parent("canvasparent");
}

function draw()
{

}

function drawSprites()
{
    for (let x = 0; x < sprites.length; x++) {

    }
}

function drawAllElements()
{

}