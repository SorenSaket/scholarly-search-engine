var allVectors = [];
var colors = ["#dc3545","#007bff", "#6f42c1","#e83e8c","#17a2b8","#ffc107","#28a745","#20c997","#6610f2","#fd7e14"]

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

function reAddAllVectors(vectors)
{
    for (let i = 0; i < vectors.length; i++) 
        addVector(vectors[i].x,vectors[i].y);                                
}

function GetAllVectors()
{
    var allVectors = [];
    var numberOfVectors = $("#vectorcontainer").children().length;
    for (let i = 0; i < numberOfVectors; i++) { 
        var xinput = document.getElementById("x" + i);
        var yinput = document.getElementById("y" + i);
        
        if( (xinput.value != "" && xinput.value != "0") && 
            (yinput.value != "" && yinput.value != "0"))
        {
            allVectors.push(new THREE.Vector2(parseFloat(document.getElementById("x" + i).value) ,parseFloat(document.getElementById("y" + i).value)))
        }
    }
    console.log(allVectors);

    removeAllVectors();
    reAddAllVectors(allVectors);
    return allVectors;
}

function calculate(drawPoints, drawVectors)
{
    allVectors = GetAllVectors();
    reDraw(drawPoints,drawVectors);
}

function calculateAverage(vectors)
{
    var sum = new THREE.Vector2();
    for (let i = 0; i < vectors.length; i++) {
        sum.x += vectors[i].x;
        sum.y += vectors[i].y;
    }
    sum.x = sum.x/vectors.length;
    sum.y = sum.y/vectors.length;
    document.getElementById("output").innerHTML = sum.x +", " +sum.y;
}

function calculateSum()
{
    var sum = new THREE.Vector2();
    var vectors = GetAllVectors();
    for (let i = 0; i < vectors.length; i++) {
        sum.x += vectors[i].x;
        sum.y += vectors[i].y;
    }
    document.getElementById("output").innerHTML = sum.x +", " +sum.y;
}