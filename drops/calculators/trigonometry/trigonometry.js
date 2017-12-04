// ---------------- Variables ----------------

//The priority of calculation of each element
var calculationOrder = ["a", "b", "c", "A", "B", "C"];
//The preferred algorithm to use when calculating a side
var sideAlgorithmPreference = ["sin", "cos"];
//The preferred algorithm to use when calculating an angle
var angleAlgorithmPreference = ["180", "sin", "cos"];
//The current triangle to calculate
var currentTriangle;

// ---------------- Functions to call ---------------

// The function that the calculate button calls
function calculate(){
	//Gets input and sets it to a variable
	var tempTri = getInput();
	
	console.log(tempTri);
	
	if(!isUnsolvable(tempTri))
	{
		document.getElementById("output").innerHTML = "";
		//Calculates all sides and angles for the triangle
		tempTri = caluclateTriangle(tempTri);
		
		console.log(tempTri);
		
		//Sets p5 to draw the triangle
		triangleToDraw = tempTri;
		
		setInput(tempTri);
	
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	}
}
// The function that you can call from SSE
function tri(a,b,c,A,B,C){
	//wip
}

// ---------------- Calculation Functions ---------------

// The current way of calculation a triangle (Not working)
function caluclateTriangle(triangle){
	var a = triangle.a;
	var b = triangle.b;
	var c = triangle.c;
	var A = triangle.A;
	var B = triangle.B;
	var C = triangle.C;

	var sides = (a != null) + (b != null) + (c != null);
	var angles = (A != null) + (B != null) + (C != null);

	switch (angles) {
		case 0:
			//SSS

			A = calculateAngleCos(a,b,c, "A");
			
			B = calculateAngleCos(a,b,c, "B");
			
			C = calculateAngle180(A,B,null);
			
			break;
		case 1:
			//Find the missing side
			var unknownSide = getUnknownSide(a,b,c);
			var knownAngle = getKnownAngle(A,B,C);

			//Check if the missing side's opposing angle is null
			if(isOppositeAngleNull(A,B,C,unknownSide))
			{
				//SSA
				//find Known Angle
				if(knownAngle == "A")
				{
					//Calulate angle nr2 with sin
					var x = (Math.sin(degToRad(A))*b)/a;
					B = radToDeg( Math.asin(x));

					addLine("//Calculate B");
					addLine
					(
						"\\begin{align} " + 
						"B &= \\sin ^{ - 1} \\left( {{{b*\\sin (A)} \\over a}} \\right) \\\\ " +
						"&= \\sin ^{ - 1} \\left( {{{" + b + "*\\sin (" + A + ")} \\over " + a + "}} \\right) \\\\ " +
						"& = \\sin ^{ - 1} \\left( {" + x + "} \\right) \\\\  " +
						"& = " + B +
						"\\end{align}"
					);
					
					//Calulate The last angle with 180
					C = calculateAngle180(A,B,C);
				}
				if(knownAngle == "B")
				{
					//Calulate angle nr2 with sin
					var x = (Math.sin(degToRad(B))*a)/b;
					A = radToDeg( Math.asin(x));

					addLine("//Calculate A");
					addLine
					(
						"\\begin{align} " + 
						"A &= \\sin ^{ - 1} \\left( {{{a*\\sin (B)} \\over b}} \\right) \\\\ " +
						"& = \\sin ^{ - 1} \\left( {{{" + a + "*\\sin (" + B + ")} \\over " + b + "}} \\right) \\\\ " +
						"& = \\sin ^{ - 1} \\left( {" + x + "} \\right) \\\\  " +
						"& = " + A +
						"\\end{align}"
					);
					
					//Calulate The last angle with 180
					C = calculateAngle180(A,B,C);
				}
				if(knownAngle == "C")
				{
					//Calulate angle nr2 with sin
					var x = (Math.sin(degToRad(B))*a)/b;
					A = radToDeg( Math.asin(x));

					addLine("//Calculate A");
					addLine
					(
						"\\begin{align} " + 
						"A &= \\sin ^{ - 1} \\left( {{{a*\\sin (B)} \\over b}} \\right) \\\\ " +
						"& = \\sin ^{ - 1} \\left( {{{" + a + "*\\sin (" + B + ")} \\over " + b + "}} \\right) \\\\ " +
						"& = \\sin ^{ - 1} \\left( {" + x + "} \\right) \\\\  " +
						"& = " + A +
						"\\end{align}"
					);

					//Calulate The last angle with 180
					B = calculateAngle180(A,B,C);
				}


				//Calulate the missing side with sin
			}
			else
			{
				//SAS
				//Calculate the unknow side with cosin
				//Calulate angle nr2 with sin
				//Calulate The last angle with 180
			}
			break;
		case 2:
			if (A == null)
				A = calculateAngle180(A,B,C);
			if (B == null) 
				B = calculateAngle180(A,B,C);
			if (C == null)
				C = calculateAngle180(A,B,C);

			if (A <= 0 || B <= 0 || C <= 0)
				displayError("No solution");
			
			var sinA = Math.sin(degToRad(A));
			var sinB = Math.sin(degToRad(B));
			var sinC = Math.sin(degToRad(C));
			
			// Use law of sines to find sides
			var ratio; // side / sin(angle)
			
			addLine("//Law Of Sines");
			addLine("$${a \\over {\\sin (A)}} = {b \\over {\\sin (B)}} = {c \\over {\\sin (C)}}$$");
			
			if (a != null) 
			{
				ratio = a / sinA;
				area = a * ratio * sinB * sinC / 2;
				b = ratio * sinB;
				c = ratio * sinC;
				addLine("//Calculate b");
				addLine("$$b = {a \\over {\\sin (A)}}*\\sin (B)$$");
				addLine("$$"+ b+ " = {"+ a+" \\over {\\sin (" + A + ")}}*\\sin ("+ B + ")$$");
				
				addLine("//Calculate c");
				addLine("$$c = {a \\over {\\sin (A)}}*\\sin (C)$$");
				addLine("$$"+ c+ " = {"+ a+" \\over {\\sin (" + A + ")}}*\\sin ("+ C + ")$$");
			}
			else if (b != null) 
			{
				ratio = b / sinB;
				area = b * ratio * sinC * sinA / 2;
				a = ratio * sinA;
				c = ratio * sinC;
				addLine("//Calculate a");
				addLine("$$a = {b \\over {\\sin (B)}}*\\sin (A)$$");
				addLine("$$" + a + " = {" + b +" \\over {\\sin (" + B +")}}*\\sin (" + A +")$$");

				addLine("//Calculate c");
				addLine("$$c = {b \\over {\\sin (B)}}*\\sin (C)$$");
				addLine("$$" + c + " = {" + b +" \\over {\\sin (" + B +")}}*\\sin (" + C +")$$");
			}
			else if (c != null) 
			{
				ratio = c / sinC;
				area = c * ratio * sinA * sinB / 2;
				a = ratio * sinA;
				b = ratio * sinB;
				addLine("//Calculate a");
				addLine("$$a = {c \\over {\\sin (C)}}*\\sin (A)$$");
				addLine("$$" + a + " = {" + c + " \\over {\\sin (" + C + ")}}*\\sin (" + A + ")$$");
				
				addLine("//Calculate b");
				addLine("$$b = {c \\over {\\sin (C)}}*\\sin (B)$$");
				addLine("$$" + b + " = {" + c + " \\over {\\sin (" + C + ")}}*\\sin (" + B + ")$$");
			}
		break;
		case 3:
			displayError("Cannot calculate sides with only 3 Angles");
		break;
		default:
			break;
	}

	var tempTriangle =
	{
		a: a,
		b: b,
		c: c,
		A: A,
		B: B,
		C: C,
		area: calculateAreaHeron(a,b,c),
		circumference: calculateCircumference(a,b,c)
	}

	return tempTriangle;
}
// The NEW way of calculation a triangle (Not working either)
function caluclateTriangle1(triangle){	
	for (let x = 0; x < calculationOrder.length; x++) {
		triangle = calculateElement(triangle, calculationOrder[x]);
	}
	
	var tempTriangle =
	{
		a: a,
		b: b,
		c: c,
		A: A,
		B: B,
		C: C,
		area: calculateAreaHeron(a,b,c),
		circumference: calculateCircumference(a,b,c)
	}

	return tempTriangle;
}
//WIP
function calculateElement(triangle, elementToCalculate){

	if(elementToCalculate == "a" && triangle.a == null)
	{
		//Sin
		var al = determineUsedAlgorithm(triangle, elementToCalculate)
		
		for (let x = 0; x < al.neededVars.length; x++) {
			triangle = calculateElement(triangle, al.neededVars[x]);
		}
		
		if(al.algorithm == "sin")
		{
			//Use b/sin(B) or c/sin(C)
			//solveSideSin(a,b,c,A,B,C, "a");
		}
		else if(al.algorithm == "cos")
		{
			a = calculateSideCos(/*wip*/);
		}
	}
	else if(elementToCalculate == "b" && b == null)
	{

	}
	else if(elementToCalculate == "c" && c == null)
	{

	}
	else if(elementToCalculate == "A" && A == null)
	{

	}
	else if(elementToCalculate == "B" && B == null)
	{

	}
	else if(elementToCalculate == "C" && C == null)
	{
		
	}

	return triangle;
}
// Determine the algorithm to use based on preferences and missing elements
function determineUsedAlgorithm(triangle, elementToCalculate){
	if(sideAlgorithmPreference[0] == "sin")
	{
		if(triangle)



	}
	else
	{

	}



	var temp =
	{


	}

	return temp;
}
// Returns side c using law of cosines WIP
function calculateSide(a, b, C) {
	C = degToRad(C);
	if (C > 0.001)
		return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C));
	else // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
		return Math.sqrt((a - b) * (a - b) + a * b * C * C * (1 - C * C / 12));
}
// WIP
function calculateSideCos(a, b, C) {
	C = degToRad(C);
	if (C > 0.001)
		return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C));
	else // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
		return Math.sqrt((a - b) * (a - b) + a * b * C * C * (1 - C * C / 12));
}
// Returns side with sinus rule WIP
function calculateSideSin(a,b,c,A,B,C, sideToSolve){
	var sinA = Math.sin(degToRad(A));
	var sinB = Math.sin(degToRad(B));
	var sinC = Math.sin(degToRad(C));
	
	// Use law of sines to find sides
	var ratio; // side / sin(angle)
	
	if (a != null) 
	{
		ratio = a / sinA;
		area = a * ratio * sinB * sinC / 2;
		b = ratio * sinB;
		c = ratio * sinC;
		addLine("//Calculate b");
		addLine("$$b = {a \\over {\\sin (A)}}*\\sin (B)$$");
		addLine("$$"+ b+ " = {"+ a+" \\over {\\sin (" + A + ")}}*\\sin ("+ B + ")$$");
		
		addLine("//Calculate c");
		addLine("$$c = {a \\over {\\sin (A)}}*\\sin (C)$$");
		addLine("$$"+ c+ " = {"+ a+" \\over {\\sin (" + A + ")}}*\\sin ("+ C + ")$$");
	}
	else if (b != null) 
	{
		ratio = b / sinB;
		area = b * ratio * sinC * sinA / 2;
		a = ratio * sinA;
		c = ratio * sinC;
		addLine("//Calculate a");
		addLine("$$a = {b \\over {\\sin (B)}}*\\sin (A)$$");
		addLine("$$" + a + " = {" + b +" \\over {\\sin (" + B +")}}*\\sin (" + A +")$$");

		addLine("//Calculate c");
		addLine("$$c = {b \\over {\\sin (B)}}*\\sin (C)$$");
		addLine("$$" + c + " = {" + b +" \\over {\\sin (" + B +")}}*\\sin (" + C +")$$");
	}
	else if (c != null) 
	{
		ratio = c / sinC;
		area = c * ratio * sinA * sinB / 2;
		a = ratio * sinA;
		b = ratio * sinB;
		addLine("//Calculate a");
		addLine("$$a = {c \\over {\\sin (C)}}*\\sin (A)$$");
		addLine("$$" + a + " = {" + c + " \\over {\\sin (" + C + ")}}*\\sin (" + A + ")$$");
		
		addLine("//Calculate b");
		addLine("$$b = {c \\over {\\sin (C)}}*\\sin (B)$$");
		addLine("$$" + b + " = {" + c + " \\over {\\sin (" + C + ")}}*\\sin (" + B + ")$$");
	}
}
// Returns angle C using law of cosines
function calculateAngleCos(a, b, c, angleToCalculate) {
	var temp;
	addLine("// --- Calculate " + angleToCalculate +", using law of cosines ---");
	switch (angleToCalculate) {
		case "A":
			var A = temp = ( b * b + c * c - a * a) / (2 * b * c);
			addLine("$$A = {\\cos ^{ - 1}}({{{b^2} + {c^2} - {a^2}} \\over {2*b*c}})$$");
			addLine("$$" + radToDeg(Math.acos(A)) + " = {\\cos ^{ - 1}}({{{" + b + "^2} + {" + c + "^2} - {" + a + "^2}} \\over {2*" + b + "*" + c + "}})$$");
			break;
		case "B":
			var B = temp =  ( c * c + a * a - b * b) / (2 * c * a);
			addLine("$$B = {\\cos ^{ - 1}}({{{c^2} + {a^2} - {b^2}} \\over {2*c*a}})$$");
			addLine("$$" + radToDeg(Math.acos(B)) + " = {\\cos ^{ - 1}}({{{" + c + "^2} + {" + a + "^2} - {" + b + "^2}} \\over {2*" + c + "*" + a + "}})$$");
			break;
		case "C":
			var C = temp = (a * a + b * b - c * c) / (2 * a * b);
			addLine("$$C = {\\cos ^{ - 1}}({{{a^2} + {b^2} - {c^2}} \\over {2*a*b}})$$");
			addLine("$$" + radToDeg(Math.acos(C)) + " = {\\cos ^{ - 1}}({{{" + a + "^2} + {" + b + "^2} - {" + c + "^2}} \\over {2*" + a + "*" + b + "}})$$");
			break;
		default:
			break;
	}
	return radToDeg(Math.acos(temp));
}
//Returns the missing angle with the 180 rule
function calculateAngle180(A,B,C){
	if (A == null)
	{
		A = 180 - B - C;
		addLine("// --- Calculate A with 180 rule ---");
		addLine
		(
			"\\begin{align} " + 
			"A & = 180&deg; - B - C \\\\ " +
			"& = 180&deg; - " + B + "&deg; - " + C + "&deg; \\\\ " + 
			"& = " + A + "&deg;  \\\\ " +
			"\\end{align}"
		);

		return A;
	} 
	if (B == null) 
	{
		B = 180 - A - C;
		addLine("// --- Calculate B with 180 rule ---");
		addLine
		(
			"\\begin{align} " + 
			"B & = 180&deg; - A - C \\\\ " +
			"& = 180&deg; - " + A + "&deg; - " + C + "&deg; \\\\ " + 
			"& = " + B + "&deg;  \\\\ " +
			"\\end{align}"
		);

		return B;
	}
	if (C == null)
	{
		C = 180 - A - B;
		addLine("// --- Calculate C with 180 rule ---");
		addLine
		(
			"\\begin{align} " + 
			"C & = 180&deg; - A - B \\\\ " +
			"& = 180&deg; - " + A + "&deg; - " + B + "&deg; \\\\ " + 
			"& = " + C + "&deg;  \\\\ " +
			"\\end{align}"
		);
		return C;
	}
}
//Returns the area of a triangle with Heron's formula
function calculateAreaHeron(a,b,c){
	var s = (a + b + c)/2;
	var t = s * (s - a) * (s - b) * (s - c)
	var area = Math.sqrt(t);
	
	addLine("//Calculate Area with Heron's formula")
	addLine("\\begin{align}");
	addLine("s & = {{(a + b + c)} \\over 2} \\\\");
	addLine(s + "& = {{(" + a + " + " + b + " + " + c + ")} \\over 2} \\\\");
	addLine("\\end{align}");

	addLine
	(
		"\\begin{align} " + 
		"area  & = \\sqrt {s(s - a)(s - b)(s - c)} \\\\ " +
		"& = \\sqrt {" + s + "(" + s + " - " + a + ")(" + s + " - " + b + ")(" + s + " - " + c + ")} \\\\ " + 
		"& = \\sqrt {" + s + "(" + (s - a) + ")(" + (s - b) + ")(" + (s - c) + ")}  \\\\ " +
		"& = \\sqrt {" + t + "} \\\\ " + 
		"& = " + area + " " + 
		"\\end{align}"
	);

	return area;
}
//Returns the cirumfrence of a triangle
function calculateCircumference(a,b,c){
	circumference = a + b + c;
	addLine("//Calculate circumference");
	addLine
	(
		"\\begin{align} " + 
		"circumference &= a + b + c \\\\ " +
		"& = " + circumference +
		" \\end{align}"
	);
	return circumference;
}

// ---------------- Output/Input ----------------

// Clears all inputs and outputs (Resets the calculator)
function clearInputOutput(){
	//Clear input
	document.getElementById("a").value = "";
	document.getElementById("b").value = "";
	document.getElementById("c").value = "";
	document.getElementById("A").value = "";
	document.getElementById("B").value = "";
	document.getElementById("C").value = "";
	document.getElementById("area").value = "";
	document.getElementById("circumference").value = "";
	
	//Clear ouputs
	document.getElementById("output").innerHTML = "";
	
	triangleToDraw = null;
}
// Returns a triangle from input
function getInput(){
	var triangle = {
		a: parseFloat(document.getElementById("a").value),
		b: parseFloat(document.getElementById("b").value),
		c: parseFloat(document.getElementById("c").value),
		A: parseFloat(document.getElementById("A").value),
		B: parseFloat(document.getElementById("B").value),
		C: parseFloat(document.getElementById("C").value)
	};
	if(triangle.a == "" || triangle.a == 0 || isNaN(triangle.a))
		triangle.a = null;
	if(triangle.b == "" || triangle.b == 0 || isNaN(triangle.b))
		triangle.b = null;
	if(triangle.c == "" || triangle.c == 0 || isNaN(triangle.c))
		triangle.c = null;
	if(triangle.A == "" || triangle.A == 0 || isNaN(triangle.A))
		triangle.A = null;
	if(triangle.B == "" || triangle.B == 0 || isNaN(triangle.B))
		triangle.B = null;
	if(triangle.C == "" || triangle.C == 0 || isNaN(triangle.C))
		triangle.C = null;
	return triangle;
}
// Sets input to triangle values
function setInput(triangle){
	document.getElementById("a").value = triangle.a;
	document.getElementById("b").value = triangle.b;
	document.getElementById("c").value = triangle.c;
	document.getElementById("A").value = triangle.A;
	document.getElementById("B").value = triangle.B;
	document.getElementById("C").value = triangle.C;
	document.getElementById("area").value = triangle.area;
	document.getElementById("circumference").value = triangle.circumference;
}
// Displays an error (just console.logs for now)
function displayError(error) {
	console.log(error);
}
// Adds a line to the output
function addLine(text) {
	document.getElementById("output").innerHTML += text;
}

// ---------------- Helper Functions (Not all of these are used) ----------------

//Returns a bool depending if triangle is unsolvable
function isUnsolvable(triangle){
	var sides  = (triangle.a != null) + (triangle.b != null) + (triangle.c != null);  // Boolean to integer conversion
	var angles = (triangle.A != null) + (triangle.B != null) + (triangle.C != null);  // Boolean to integer conversion
	if (sides + angles < 3)
	{
		displayError("Give at least 3 pieces of information");
		return true;
	}
	else if (sides == 0)
	{
		displayError("Give at least one side length");
		return true;
	}
	else
	{
		return false;
	}
}
//Returns the opposite side of side as a string
function getOppositSide(angle){
	if(side == "A")
		return "a";
	else if(side == "B")
		return "b";
	else if(side == "C")
		return "c";
	else
		return null;
}
//Returns the opposite angle of side as a string
function getOppositeAngle(side){
	if(side == "a")
		return "A";
	else if(side == "b")
		return "B";
	else if(side == "c")
		return "C";
	else
		return null;
}
//Returns the unknown side from 3 sides as string
function getUnknownSide(a,b,c){
	if(!a)
		return "a";
	else if(!b)
		return "b";
	else
		return "c"
}
//Returns the unknown angle from 3 angles as string
function getUnknownAngle(A,B,C){
	if(!A)
		return "A";
	else if(!B)
		return "B";
	else if(!C)
		return "C"
	else
	{
		console.log("There are no unknown angles");
		return null;
	}
}
//Returns the known side from 3 side as string
function getKnownSide(A,B,C){
	if(A)
		return "A";
	else if(B)
		return "B";
	else if(C)
		return "C"
	else
	{
		console.log("There are no known sides");
		return null;
	}
}
//Returns the known angle from 3 angles as string
function getKnownAngle(A,B,C){
	if(A)
		return "A";
	else if(B)
		return "B";
	else if(C)
		return "C"
	else
	{
		console.log("There are no known angles");
		return null;
	}
}
//Returns a bool if the opposite side of an angle is null
function isOppositeSideNull(a, b, c, angle){
	switch (angle) {
		case "A":
			if(a == null)
				return true;
			break;
		case "B":
			if(b == null)
				return true;
			break;
		case "C":
			if(c == null)
				return true;
			break;
		default:
			console.log("You must input an angle: A, B or C");
			return false;
			break;
	}
	return false;
}
//Returns a bool if the opposite angle of a side is null
function isOppositeAngleNull(A, B, C, side){
	switch (side) {
		case "a":
			if(A == null)
				return true;
			break;
		case "b":
			if(B == null)
				return true;
			break;
		case "c":
			if(C == null)
				return true;
			break;
		default:
			console.log("You must input a side: a, b or c");
			return false;
			break;
	}
	return false;
}
//Converts radians to degrees
function radToDeg(valRad) {
	return (360 / (2 * Math.PI) * valRad)
}
//Converts degrees to radians
function degToRad(valDeg) {
	return ((2 * Math.PI) / 360 * valDeg)
}
//WIP
function sin(inputfloat){
	//wip
}
//WIP
function arcsin(inputfloat){
	//wip
}
//WIP
function cos(inputfloat){
	//wip
}
//WIP 
function arccos(inputfloat){
	//wip
}