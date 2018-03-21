var allVectors = [];
var colors = ["#dc3545","#007bff", "#6f42c1","#e83e8c","#17a2b8","#ffc107","#28a745","#20c997","#6610f2","#fd7e14"]
var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
// ---------- Vector UI ----------
// Adds a new vector DOM element
function addVector(x,y){
    var count = $("#vectorcontainer").children().length;
    var name = convertNumberToName(count);
    var txt1 = 
    '<tr id="vector' + count +'" class="vector" style="background-color:' + colors[count] +';">' +
        '<td class="namecontainer">' +
            '<p class="vectorname"> ' + name +' </p>'+
        '</td>'+
        '<td>' +
            '<input id="x' + count + '" class="form-control w-100" placeholder="x" value="' + x +'">'+
        '</td>'+
        '<td>'+
            '<input id="y'+ count +'" style="display:inline" class="form-control w-100" placeholder="y" value="' + y +'">'+
        '</td>'+
        '<td>'+
            '<button type="button" class="close" aria-label="Close" onclick="removeVector('+ count +')"><span aria-hidden="true">&times;</span></button>'+
        '</td>'+
    '</tr>';
    $("#vectorcontainer").append(txt1);
}
// Removes vector DOM elements
function removeVector(num){
    $("#vector" + num).remove();
}

function removeAllVectors(){
    var vectors = $("#vectorcontainer").children();
    for (let i = 0; i < vectors.length; i++) {
        vectors[i].remove();
    }
}

function reAddAllVectors(vectors){
    for (let i = 0; i < vectors.length; i++) 
        addVector(vectors[i].x,vectors[i].y);                                
}
function removeZeroVectors()
{
    var allVectors = [];
    var vectors = $("#vectorcontainer").children();
    for (let i = 0; i < vectors.length; i++) 
    {
        //
        var vectorNum = vectors[i].id[6];
        var xinput = document.getElementById("x" + vectorNum);
        var yinput = document.getElementById("y" + vectorNum);
        if((xinput.value == "" || xinput.value == "0") && (yinput.value == "" || yinput.value == "0")){}else
        {
            allVectors.push(new THREE.Vector2(parseFloat(document.getElementById("x" + vectorNum).value) ,parseFloat(document.getElementById("y" + vectorNum).value)));
        }
    }
    removeAllVectors();
    reAddAllVectors(allVectors);
}

// ---------- Output UI ----------
function removeAllOutputs(){
    var vectors = $("#outputcontainer").children();
    for (let i = 0; i < vectors.length; i++) {
        vectors[i].remove();
    }
}

function addOutput(name, value)
{
    var component = 
    '<div class="input-group">'
        '<div class="input-group-prepend">'
        '<div class="input-group-text" id="btnGroupAddon">@</div>'
        '</div>'
        '<input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon">'
    '</div>';

}


// ---------- a ----------

function GetAllVectors(){
    var allVectors = [];
    var vectors = $("#vectorcontainer").children();
    for (let i = 0; i < vectors.length; i++) 
    {
        //
        var vectorNum = vectors[i].id[6];
        var xinput = document.getElementById("x" + vectorNum);
        var yinput = document.getElementById("y" + vectorNum);
        allVectors.push(new THREE.Vector2(parseFloat(xinput.value) ,parseFloat(yinput.value)));
         /*   
al        if((xinput.value == "" || xinput.value == "0") && (yinput.value == "" || yinput.value == "0")){}else
        {
            lVectors.push(new THREE.Vector2(parseFloat(document.getElementById("x" + vectorNum).value) ,parseFloat(document.getElementById("y" + vectorNum).value)));
        }*/
    }
    removeAllVectors();
    reAddAllVectors(allVectors);
    return allVectors;
}

function calculate(drawPoints, drawVectors){
    
    allVectors = GetAllVectors();
    if(allVectors.length > 0)
    {
        reDraw(drawPoints,drawVectors);
        writeOutput(drawPoints,drawVectors);
    }
}

function writeOutput(drawPoints,drawVectors){
    /*var parent = document.getElementById("outputdata");
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
    }*/
}


// ---------- Calculations ----------
// Calculate the average position of vectors as points
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
// Calculate the sum of all vectors
function calculateSum(){
    var sum = new THREE.Vector2();
    for (let i = 0; i < allVectors.length; i++) {
        sum.x += allVectors[i].x;
        sum.y += allVectors[i].y;
    }
    return sum;
}
// Calculate the difference/negative sum of all vectors
function calculateDifference(){
    var difference = new THREE.Vector2();
    for (let i = 0; i < allVectors.length; i++) {
        difference.x -= allVectors[i].x;
        difference.y -= allVectors[i].y;
    }
    return difference;
}
// Calculate the distance between 0, 0 and vector i
function calculateDistance(i){
    var distance = new THREE.Vector2();
    var zero = new THREE.Vector2(0,0);
    distance = zero.distanceTo(allVectors[i]);
    return distance;
}
// Calculate the dot product of all vectors
function calculateDotProduct(){
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
// Calculate the angle of vector[0] and vector[1]
function calculateAngle(){
    var dotp = calculateDotProduct();
    return  toDegrees(Math.acos((dotp)/(calculateDistance(0)*calculateDistance(1))));
}
//
function calculateAngleRad(){
    var dotp = calculateDotProduct();
    return  Math.acos((dotp)/(calculateDistance(0)*calculateDistance(1)));
}
//
function showDistanceCaluculation(i){
    var distance = pow(allVectors[i].x,2) +pow(allVectors[i].y,2) 
    return "sqrt(" + distance + ")";
}
// ---------- Utilities ----------
// Converts a number to alphabetic. 0 = A, 1 = B, 26 = AA, 27 = AB
function convertNumberToName(num){
    var numbers = [0];

    // for each number add to array
    for (let i = 0; i < num; i++) 
    {
        // Check if I can add one
        var canadd = canAdd(numbers);
        if(canadd != -1)
        {
            numbers[canadd] += 1;
            for (let index = canadd+1; index < numbers.length; index++) {
                numbers[index] = 0;
            }
        }
        else if (canadd == -1)
        {
            numbers.push(0);
            for (let y = 0; y < numbers.length; y++) {
                numbers[y] = 0;
            }
        }
    }

    return convertArrayToLetters(numbers);
}
// Helper function for the function above. 
function canAdd(array){
    for (let i = 0; i < array.length; i++) {
        if(array[array.length-(1+i)] < 25)
        {
            return array.length-(1+i);
        }
    }
    return -1;
}
// Another helper function for converting number to name
function convertArrayToLetters(array){
    var name = "";
    // Convert numbers to letters
    for (let i = 0; i < array.length; i++) {
        name += alphabet[array[i]];
    }
    return name;
}
// 
function toDegrees (angle) {
    return angle * (180 / Math.PI);
}