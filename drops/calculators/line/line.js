function Calculate()
{
    document.getElementById("output").innerHTML = slopeAndPoint(document.getElementById("a").value,document.getElementById("x").value,document.getElementById("y").value);
}


function slopeAndPoint(a, x , y)
{
    var b = y-a*x;

    return "y = " + a + "x +" + b; 
}

/*
<div class="input-group" >
<span class="input-group-addon"> Point</span>
<input id="x" type="number" class="form-control" placeholder="X">
<input id="y" type="number" class="form-control" placeholder="Y">
</div>
<br>
<div class="input-group" >
<span class="input-group-addon"> Slope</span>
    <input id="a" type="number" class="form-control" placeholder="m/a">
</div>*/