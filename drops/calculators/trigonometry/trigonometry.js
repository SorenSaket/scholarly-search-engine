//
//
//
//
//
/*if (c >= a + b || a >= b + c || b >= c + a)
	displayError("You fucked up");
A = solveAngle(a, b, c, "A");
B = solveAngle(a, b, c, "B");
C = solveAngle(a, b, c, "C");*/

function calculate()
{
	//Gets input and sets it to a variable
	var tempTri = GetInput();
	
	console.log(tempTri);
	
	if(!isUnsolvable(tempTri))
	{
		document.getElementById("output").innerHTML = "";
		//Calculates all sides and angles for the triangle
		tempTri = caluclateTriangle(tempTri);
		
		console.log(tempTri);
		
		//Sets p5 to draw the triangle
		triangleToDraw = tempTri;
		
		SetInput(tempTri);
	
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	}
}

function clearInputOutput()
{
	document.getElementById("a").value = "";
	document.getElementById("b").value = "";
	document.getElementById("c").value = "";
	document.getElementById("A").value = "";
	document.getElementById("B").value = "";
	document.getElementById("C").value = "";
	document.getElementById("area").value = "";
	document.getElementById("circumference").value = "";
	
	document.getElementById("output").innerHTML = "";
}

function GetInput()
{	
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

function SetInput(triangle)
{
	document.getElementById("a").value = triangle.a;
	document.getElementById("b").value = triangle.b;
	document.getElementById("c").value = triangle.c;
	document.getElementById("A").value = triangle.A;
	document.getElementById("B").value = triangle.B;
	document.getElementById("C").value = triangle.C;
	document.getElementById("area").value = triangle.area;
	document.getElementById("circumference").value = triangle.circumference;
}

function displayError(error) {
	console.log(error);
}

function addLine(text) 
{
	//console.log(text);
	document.getElementById("output").innerHTML += text;
}

function caluclateTriangle(triangle)
{
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

			A = solveAngle(a,b,c, "A");
			
			B = solveAngle(a,b,c, "B");
			
			C = solveAngleWith180(A,B,null);
			
			break;
		case 1:
			//Find the missing side
			var unknownSide = GetUnknownSide(a,b,c);
			var knownAngle = GetKnownAngle(A,B,C);

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
					C = solveAngleWith180(A,B,C);
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
					C = solveAngleWith180(A,B,C);
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
					B = solveAngleWith180(A,B,C);
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
				A = solveAngleWith180(A,B,C);
			if (B == null) 
				B = solveAngleWith180(A,B,C);
			if (C == null)
				C = solveAngleWith180(A,B,C);

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
		area: calculateAreaWithSides(a,b,c),
		circumference: calculateCircumference(a,b,c)
	}

	return tempTriangle;
}

function GetUnknownSide(a,b,c)
{
	if(!a)
		return "a";
	else if(!b)
		return "b";
	else
		return "c"
}

function GetUnknownAngle(A,B,C)
{
	if(!A)
		return "A";
	else if(!B)
		return "B";
	else
		return "C"
}

function GetKnownAngle(A,B,C)
{
	if(A)
		return "A";
	else if(B)
		return "B";
	else
		return "C"
}

function isOppositeAngleNull(A, B, C, side)
{
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

function isOppositeSideNull(a, b, c, angle)
{
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

function isUnsolvable(triangle)
{
	var sides  = (triangle.a != null) + (triangle.b != null) + (triangle.c != null);  // Boolean to integer conversion
	var angles = (triangle.A != null) + (triangle.B != null) + (triangle.C != null);  // Boolean to integer conversion
	//Checks if equation is unsolvable
	if (sides + angles != 3)
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

// Returns side c using law of cosines
function solveSide(a, b, C) 
{
	C = degToRad(C);
	if (C > 0.001)
		return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C));
	else // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
		return Math.sqrt((a - b) * (a - b) + a * b * C * C * (1 - C * C / 12));
}

// Returns angle C using law of cosines
function solveAngle(a, b, c, angleToCalculate) 
{
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

function solveAngleWith180(A,B,C)
{
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

function calculateAreaWithSides(a,b,c)
{
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

function calculateCircumference(a,b,c)
{
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

function radToDeg(valRad) {
	return (360 / (2 * Math.PI) * valRad)
}

function degToRad(valDeg) {
	return ((2 * Math.PI) / 360 * valDeg)
}