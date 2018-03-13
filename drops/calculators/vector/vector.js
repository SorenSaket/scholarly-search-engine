var allVectors = [];
var colors = ["#dc3545","#007bff", "#6f42c1","#e83e8c","#17a2b8","#ffc107","#28a745","#20c997","#6610f2","#fd7e14"]

// ---------- UI ----------
function addVector(x,y){
    var count = $("#vectorcontainer").children().length;
    var txt1 = '<tr id="vector' + count +'" style="background-color:' + colors[count] +';"><td><input id="x' + count + '" class="form-control w-100" placeholder="x" value="' + x +'"></td><td><input id="y'+ count +'" style="display:inline" class="form-control w-100" placeholder="y" value="' + y +'"></td><td><button type="button" class="close" aria-label="Close" onclick="removeVector('+ count +')"><span aria-hidden="true">&times;</span></button></td></tr>';
    $("#vectorcontainer").append(txt1);
}

function removeVector(num){
    $("#vector" + num).remove();
    calculate(isDrawingPoints, isDrawingVectors);
}

function removeAllVectors(){
    var count = $("#vectorcontainer").children().length;
    for (let i = 0; i < count; i++) {
        $("#vector" + i).remove();
    }
}

function reAddAllVectors(vectors){
    for (let i = 0; i < vectors.length; i++) 
        addVector(vectors[i].x,vectors[i].y);                                
}

// ---------- a ----------

function GetAllVectors(){
    var allVectors = [];
    var numberOfVectors = $("#vectorcontainer").children().length;
    for (let i = 0; i < numberOfVectors; i++) { 
        if(document.getElementById("vector" + i) != null)
        {
            var xinput = document.getElementById("x" + i);
            var yinput = document.getElementById("y" + i);
            
            if((xinput.value == "" || xinput.value == "0") && (yinput.value == "" || yinput.value == "0")){}else
            {
                allVectors.push(new THREE.Vector2(parseFloat(document.getElementById("x" + i).value) ,parseFloat(document.getElementById("y" + i).value)));
            }
        }
    }
    removeAllVectors();
    reAddAllVectors(allVectors);
    return allVectors;
}

// ---------- Calculations ----------
function calculate(drawPoints, drawVectors){
    
    allVectors = GetAllVectors();
    if(allVectors.length > 0)
    {
        reDraw(drawPoints,drawVectors);
        writeOutput(drawPoints,drawVectors);
    }
}

function writeOutput(drawPoints,drawVectors)
{
    var parent = document.getElementById("outputdata");
    parent.innerText = "";
    
    if(drawVectors)
    {
        for (let i = 0; i < allVectors.length; i++) {
            parent.innerHTML += "dist" + i+ ": " + showDistanceCaluculation(i) + "  "; 
        }
        parent.innerHTML +="<br>";
        if(allVectors.length >= 2)
        {
            var sum = calculateSum();
            parent.innerHTML += "Sum: " + sum.x + ", "+ sum.y + "<br>";
            
            var diff = calculateDifference();
            parent.innerHTML += "Difference: " + diff.x + ", "+ diff.y + "<br>";

            parent.innerHTML += "Dot Product: " + calculateDotProduct() + "<br>";
        }
        if(allVectors.length == 2)
        {
            var ang = calculateAngle();
            parent.innerHTML += "Angle: " + ang + "<br>";
        }
    }
    if(drawPoints)
    {
        if(allVectors.length == 2)
        {
            var avg = calculateAverage();
            parent.innerHTML += "Average: " + avg.x + ", "+ avg.y + "<br>";  
        }
    }
}


function calculateAverage(){
    var average = new THREE.Vector2();
    for (let i = 0; i < allVectors.length; i++) {
        average.x += allVectors[i].x;
        average.y += allVectors[i].y;
    }
    average.x = average.x/allVectors.length;
    average.y = average.y/allVectors.length;
    return average;
}

function calculateSum(){
    var sum = new THREE.Vector2();
    for (let i = 0; i < allVectors.length; i++) {
        sum.x += allVectors[i].x;
        sum.y += allVectors[i].y;
    }
    return sum;
}

function calculateDifference(){
    var difference = new THREE.Vector2();
    for (let i = 0; i < allVectors.length; i++) {
        difference.x -= allVectors[i].x;
        difference.y -= allVectors[i].y;
    }
    return difference;
}

function calculateDistance(i)
{
    var distance = new THREE.Vector2();
    var zero = new THREE.Vector2(0,0);
    distance = zero.distanceTo(allVectors[i]);
    return distance;
}

function showDistanceCaluculation(i)
{
    var distance = pow(allVectors[i].x,2) +pow(allVectors[i].y,2) 
    return "sqrt(" + distance + ")";
}

function calculateDotProduct()
{
    var dot;
    var xdot;
    var ydot;
    for (let i = 0; i < allVectors.length; i++) {
        if(i == 0)
        {
            xdot = allVectors[i].x;
            ydot = allVectors[i].y;
        }
        else
        {
            xdot = xdot* allVectors[i].x;
            ydot = ydot* allVectors[i].y;
        }
    }

    return xdot + ydot;
}

function calculateAngle()
{
    var dotp = calculateDotProduct();
    return  toDegrees(Math.acos((dotp)/(calculateDistance(0)*calculateDistance(1))));
}

function toDegrees (angle) {
    return angle * (180 / Math.PI);
}