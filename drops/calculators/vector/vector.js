function addVector(){
    var count = $("#vectorcontainer").children().length;
    var txt1 = '<tr id="vector' + count +'"><td><input id="x' + count + '" class="form-control w-100" placeholder="x"></td><td><input id="y'+ count +'" style="display:inline" class="form-control w-100" placeholder="y" ></td><td><button type="button" class="close" aria-label="Close" onclick="removeVector('+ count +')"><span aria-hidden="true">&times;</span></button></td></tr>';
    $("#vectorcontainer").append(txt1);
}

function removeVector(num){
    $("#vector" + num).remove();
}

function GetAllVectors()
{
    var allVectors = [];
    var numberOfVectors = $("#vectorcontainer").children().length;
    console.log(numberOfVectors);
    for (let i = 0; i < numberOfVectors; i++) {
        console.log($("#x" + i).value);
        allVectors.push(new THREE.Vector2(parseFloat(document.getElementById("x" + i).value) ,parseFloat(document.getElementById("y" + i).value)))
    }
    console.log(allVectors);
    return allVectors;
}

function calculateAverage()
{
    var sum = new THREE.Vector2();
    var vectors = GetAllVectors();
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