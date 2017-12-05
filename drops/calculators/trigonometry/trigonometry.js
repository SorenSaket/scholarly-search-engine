// ---------------- Variables ----------------

//The priority of calculation of each element
var calculationOrder = ["a", "b", "c", "A", "B", "C"];
//The preferred algorithm to use when calculating a side
var sideAlgorithmPreference = ["sin", "cos"];
//The preferred algorithm to use when calculating an angle
var angleAlgorithmPreference = ["180", "sin", "cos"];
//The number of decimals to calculate
var floatingPointprecision = 2;
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
		tempTri = caluclateTriangle1(tempTri);

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

// The current way of calculating a triangle (Not working)
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
// The NEW way of calculating a triangle (Not working either)
function caluclateTriangle1(triangle){
	for (let x = 0; x < calculationOrder.length; x++) {
		if(getValueFromElement(triangle, calculationOrder[x]) == null)
			triangle = calculateElement(triangle, calculationOrder[x]);
	}

	triangle.area = calculateAreaHeron(triangle.a,triangle.b,triangle.c);
	triangle.circumference= calculateCircumference(triangle.a,triangle.b,triangle.c);

	return triangle;
}
//WIP
function calculateElement(triangle, elementToCalculate){
	console.log("Calculating: " + elementToCalculate);
	var al = determineUsedAlgorithm(triangle, elementToCalculate)
	for (let x = 0; x < al.neededVars.length; x++) {
		triangle = calculateElement(triangle, al.neededVars[x]);
	}
	/*
	if((elementToCalculate == "a" || elementToCalculate == "b" || elementToCalculate == "c") && getValueFromElement(triangle,elementToCalculate) != null)
	{

	}*/

	if(elementToCalculate == "a")
	{
		if(al.algorithm == "sin")
		{
			//Use b/sin(B) or c/sin(C)??
			var pair = getPairWithE(triangle, elementToCalculate);

			triangle.a = calculateSideSin(getValueFromElement(triangle, pair),getValueFromElement(triangle, pair.toUpperCase()), getValueFromElement(getOppositeAngle(elementToCalculate)), elementToCalculate, pair)
		}
		else if(al.algorithm == "cos")
		{
			
			triangle.a = calculateSideCos(triangle.a,triangle.b,triangle.c, triangle.A);
		}
	}
	else if(elementToCalculate == "b")
	{
		if(al.algorithm == "sin")
		{
			//Use b/sin(B) or c/sin(C)??
			var pair = getPairWithE(triangle, elementToCalculate);

			triangle.b = calculateSideSin(getValueFromElement(triangle, pair),getValueFromElement(triangle, pair.toUpperCase()), getValueFromElement(getOppositeAngle(elementToCalculate)), elementToCalculate, pair)
		}
		else if(al.algorithm == "cos")
		{
			triangle.b = calculateSideCos(triangle.a,triangle.b,triangle.c, triangle.B);
		}
	}
	else if(elementToCalculate == "c")
	{
		if(al.algorithm == "sin")
		{
			//Use b/sin(B) or c/sin(C)??
			var pair = getPairWithE(triangle, elementToCalculate);

			triangle.c = calculateSideSin(getValueFromElement(triangle, pair),getValueFromElement(triangle, pair.toUpperCase()), getValueFromElement(getOppositeAngle(elementToCalculate)), elementToCalculate, pair)
		}
		else if(al.algorithm == "cos")
		{
			triangle.c = calculateSideCos(triangle.a,triangle.b,triangle.c, triangle.C);
		}
	}
	else if(elementToCalculate == "A")
	{
		if(al.algorithm == "180")
		{
			triangle.A = calculateAngle180(triangle.A,triangle.B,triangle.C);
		}else if (al.algorithm == "sin")
		{
			var pair = getPairWithE(triangle, elementToCalculate);
			triangle.A = calculateAngleSin(getValueFromElement(triangle, pair),getValueFromElement(triangle, pair.toUpperCase()), getValueFromElement(triangle, getOppositeSide(elementToCalculate)), elementToCalculate, pair);
		}else if(al.algorithm == "cos")
		{
			triangle.A = calculateAngleCos(triangle.a,triangle.b,triangle.c, "A");
		}
	}
	else if(elementToCalculate == "B")
	{
		if(al.algorithm == "180")
		{
			triangle.B = calculateAngle180(triangle.A,triangle.B,triangle.C);
		}else if (al.algorithm == "sin")
		{
			console.log("AAAAAAAAAAAA");
			var pair = getPairWithE(triangle, elementToCalculate);
			console.log(pair);
			console.log(getOppositeSide(elementToCalculate));
			triangle.B = calculateAngleSin(getValueFromElement(triangle, pair), getValueFromElement(triangle, pair.toUpperCase()), getValueFromElement(triangle, getOppositeSide(elementToCalculate)), elementToCalculate, pair);
			console.log(triangle.B);
		}
		else if(al.algorithm == "cos")
		{
			triangle.B = calculateAngleCos(triangle.a,triangle.b,triangle.c, "B");
		}
	}
	else if(elementToCalculate == "C")
	{
		if(al.algorithm == "180")
		{
			triangle.C = calculateAngle180(triangle.A,triangle.B,triangle.C);
		}else if (al.algorithm == "sin")
		{
			var pair = getPairWithE(triangle, elementToCalculate);
			triangle.C = calculateAngleSin(getValueFromElement(triangle, pair),getValueFromElement(triangle, pair.toUpperCase()), getValueFromElement(triangle,getOppositeSide(elementToCalculate)), elementToCalculate, pair);
		}else if(al.algorithm == "cos")
		{
			triangle.C = calculateAngleCos(triangle.a,triangle.b,triangle.c, "C");
		}
	}

	return triangle;
}
// Determine the algorithm to use based on preferences and missing elements WIP
function determineUsedAlgorithm(triangle, elementToCalculate){
	console.log("Determining algorithm for: " + elementToCalculate);
	
	var temp = {};
	temp.neededVars = [];
	if(elementToCalculate == "a" || elementToCalculate == "b" || elementToCalculate == "c")
	{
		if(sideAlgorithmPreference[0] == "sin")
		{
			if(canUseSinToCalculateSide(triangle))
			{
				temp.algorithm="sin";
			}
			else if(canUseCosToCalculateSide(triangle.a,triangle.b,triangle.c, elementToCalculate))
			{
				temp.algorithm="cos";
			}
			else
			{
				temp.neededVars = getPairsToCalculate(triangle, elementToCalculate);
				temp.algorithm="sin";
			}
		}
		else if(sideAlgorithmPreference[0] == "cos")
		{
			if(canUseCosToCalculateSide(triangle.a,triangle.b,triangle.c, elementToCalculate))
				temp.algorithm="cos";
			else if(canUseSinToCalculateSide(triangle))
				temp.algorithm="sin";
			else
			{
				temp.neededVars = getUnknownSides(triangle.a,triangle.b,triangle.c);
				temp.neededVars.push(getOppositeAngle(elementToCalculate));
				temp.algorithm="cos";
			}
		}
	}
	else if(elementToCalculate == "A" || elementToCalculate == "B" || elementToCalculate == "C")
	{
		if(angleAlgorithmPreference[0] == "180")
		{
			if(canUse180ToCalcuateAngle(triangle.A,triangle.B,triangle.C))
				temp.algorithm="180";
			else if(angleAlgorithmPreference[1] == "sin" && canUseSinToCalculateAngle(triangle))
				temp.algorithm="sin";
			else if(angleAlgorithmPreference[1] == "cos" && canUseCosToCalculateAngle(triangle.a,triangle.b,triangle.c))
				temp.algorithm = "cos"		
			else if(angleAlgorithmPreference[2] == "sin" && canUseSinToCalculateAngle(triangle))
				temp.algorithm="sin";
			else if(angleAlgorithmPreference[2] == "cos" && canUseCosToCalculateAngle(triangle.a,triangle.b,triangle.c))
				temp.algorithm = "cos";
			/*else (angleAlgorithmPreference[1] == "cos")
			{
				temp.neededVars = getUnknownSides(triangle.a,triangle.b,triangle.c);
				temp.algorithm = "cos";
			}*/
		}
		else if(angleAlgorithmPreference[0] == "sin")
		{
			if(canUseSinToCalculateAngle(triangle))
				temp.algorithm = "sin";
			else if(angleAlgorithmPreference[1] == "180" && canUse180ToCalcuateAngle(triangle.A,triangle.B,triangle.C))
				temp.algorithm = "180";
			else if(angleAlgorithmPreference[1] == "cos" && canUseCosToCalculateAngle(triangle.a,triangle.b,triangle.c))
				temp.algorithm = "cos";
			else if(angleAlgorithmPreference[2] == "180" && canUse180ToCalcuateAngle(triangle.A,triangle.B,triangle.C))
				temp.algorithm = "180";
			else if(angleAlgorithmPreference[2] == "cos" && canUseCosToCalculateAngle(triangle.a,triangle.b,triangle.c))
				temp.algorithm = "cos";
			else
			{
				temp.neededVars = getPairsToCalculate(triangle, elementToCalculate);
				temp.algorithm = "sin";
			}
		}
		else if(angleAlgorithmPreference[0] == "cos")
		{
			if(canUseCosToCalculateAngle(triangle.a,triangle.b,triangle.c))
				temp.algorithm = "cos";
			else if(angleAlgorithmPreference[1] == "180" && canUse180ToCalcuateAngle(triangle.A,triangle.B,triangle.C))
				temp.algorithm = "180";
			else if(angleAlgorithmPreference[1] == "sin" && canUseSinToCalculateAngle(triangle))
				temp.algorithm = "sin";
			else if(angleAlgorithmPreference[2] == "180" && canUse180ToCalcuateAngle(triangle.A,triangle.B,triangle.C))
				temp.algorithm = "180";
			else if(angleAlgorithmPreference[2] == "sin" && canUseSinToCalculateAngle(triangle))
				temp.algorithm = "sin";
			else
			{
				temp.neededVars = getUnknownSides(triangle.a,triangle.b,triangle.c);
				temp.algorithm = "cos";
			}
		}
	}
	console.log(temp);
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
//    Two sides must not be null
function calculateSideCos(a, b, c, angle) {
	if(a == null)
	{
		//a^2 = b^2 + c^2 - 2bc * cos(A)
		var x = b*b + c*c - 2*b*c * customCos(angle);
		a = Math.sqrt(x);

		addLine("//Calculate a");
		addLine
		(
			"\\begin{align} " +
			"a &= \\sqrt {{b^2} + {c^2} - 2bc*\cos (A)} \\\\ " +
			"& = \\sqrt {{" + b +"^2} + {" + c +"^2} - 2 *" + b + " * " + c +" * \\cos (" + angle +"&deg;)} \\\\ " +
			"& = \\sqrt {" + x + "} \\\\  " +
			"& = " + a +
			"\\end{align}"
		);

		return a;
	}
	else if(b == null)
	{
		//b^2 = a^2 + c^2 - 2ac * cos(B)
		var x = a*a + c*c - 2*a*c * customCos(angle);
		b = Math.sqrt(x);

		addLine("//Calculate a");
		addLine
		(
			"\\begin{align} " +
			"b &= \\sqrt {{b^2} + {c^2} - 2bc*\cos (A)} \\\\ " +
			"& = \\sqrt {{" + a +"^2} + {" + c +"^2} - 2 *" + a + " * " + c +" * \\cos (" + angle +"&deg;)} \\\\ " +
			"& = \\sqrt {" + x + "} \\\\  " +
			"& = " + b +
			"\\end{align}"
		);

		return b;
	}
	else if(c == null)
	{
		//c^2 = a^2 + b^2 - 2ab * cos(C)
		var x = a*a + b*b - 2*a*b * customCos(angle);
		c = Math.sqrt(x);

		addLine("//Calculate a");
		addLine
		(
			"\\begin{align} " +
			"c &= \\sqrt {{b^2} + {c^2} - 2bc*\cos (A)} \\\\ " +
			"& = \\sqrt {{" + a +"^2} + {" + b +"^2} - 2 *" + a + " * " + b +" * \\cos (" + angle +"&deg;)} \\\\ " +
			"& = \\sqrt {" + x + "} \\\\  " +
			"& = " + c +
			"\\end{align}"
		);
		return b;
	}
}
// Returns side with sinus rule WIP
function calculateSideSinOLD(a,b,c,A,B,C, sideToSolve){

	var sinA = Math.sin(degToRad(A));
	var sinB = Math.sin(degToRad(B));
	var sinC = Math.sin(degToRad(C));

	var ratio; // side / sin(angle)

	if (a != null)
	{
		ratio = a / sinA;
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
function calculateSideSin(pairSide, pairAngle, oppositeAngle, sideToSolve, knownPair){
	if(sideToSolve == "a")
	{
		a = (pairSide/customSin(pairAngle))* customSin(oppositeAngle);
		
		return a;
	}
	else if(sideToSolve == "b")
	{
		b = (pairSide/customSin(pairAngle))* customSin(oppositeAngle);
		
		return b;
	}
	else if(sideToSolve == "c")
	{
		c = (pairSide/customSin(pairAngle))* customSin(oppositeAngle);
		
		return c;
	}
}

function calculateAngleSin(pairSide, pairAngle, oppositeSide, angleToSolve, knownPair)
{
	console.log(pairSide, pairAngle, oppositeSide, angleToSolve, knownPair);
	if(angleToSolve == "A")
	{
		A = customArcsin((customSin(pairAngle)/pairSide)* oppositeSide);
		console.log("Calculated A with sin: " + A);
		return A;
	}
	else if(angleToSolve == "B")
	{
		B = customArcsin((customSin(pairAngle)/pairSide)* oppositeSide);
		console.log("Calculated B with sin: " + B);
		return B;
	}
	else if(angleToSolve == "C")
	{
		C = customArcsin((customSin(pairAngle)/pairSide)* oppositeSide);
		console.log("Calculated C with sin: " + C);
		return C;
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

// -------- Calculator functions --------
//Converts radians to degrees
function radToDeg(valRad) {
	return (360 / (2 * Math.PI) * valRad)
}
//Converts degrees to radians
function degToRad(valDeg) {
	return ((2 * Math.PI) / 360 * valDeg)
}
//WIP
function customSin(inputfloat){
	var float = Math.sin(degToRad(inputfloat));
	
	return roundNumber(float);
}
//WIP
function customArcsin(inputfloat){
	var float = radToDeg(Math.asin(inputfloat));

	return roundNumber(float);
}
//WIPs
function customCos(inputfloat){
	var float = Math.cos(degToRad(inputfloat));
	return roundNumber(float);
}
//WIP
function customArccos(inputfloat){
	var float = radToDeg(Math.acos(inputfloat));
	return roundNumber(float);
}

function roundNumber(num, scale) {
	return +(Math.round(num + "e+2")  + "e-2");
}
// -------- Get functions --------

function getValueFromElement(triangle, element){
	if(element == "a")
		return triangle.a;
	else if(element == "b")
		return triangle.b;
	else if(element == "c")
		return triangle.c;
	else if(element == "A")
		return triangle.A;
	else if(element == "B")
		return triangle.B;
	else if(element == "C")
		return triangle.C;
	else return null;
}
//Returns the opposite side of side as a string
function getOppositeSide(angle){
	if(angle == "A")
		return "a";
	else if(angle == "B")
		return "b";
	else if(angle == "C")
		return "c";
	else
	{
		console.log("Cannot return the opposite side of: " + angle);
		return null;
	}	
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

function getUnknownSides(a,b,c){
	var unknownSides = [];
	if(!a)
		unknownSides.push("a");
	if(!b)
		unknownSides.push("b");
	if(!c)
		unknownSides.push("c");
	return unknownSides;
}

function getUnknownAngles(A,B,C){
	var unknownAngles = [];
	if(!A)
		unknownAngles.push("A");
	if(!B)
		unknownAngles.push("B");
	if(!C)
		unknownAngles.push("C");
	return unknownAngles;
}

function getUnknownAnglesWithE(A,B,C, angleToExclude){
	var unknownAngles = [];
	if(!A && angleToExclude != "A")
		unknownAngles.push("A");
	if(!B && angleToExclude != "B")
		unknownAngles.push("B");
	if(!C && angleToExclude != "C")
		unknownAngles.push("C");
	console.log(unknownAngles);
	return unknownAngles;
}

//Returns the known side from 3 side as string
function getKnownSide(a,b,c){
	if(a)
		return "a";
	else if(b)
		return "b";
	else if(c)
		return "c"
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
//Returns the known sides from 3 sides as array of strings
function getKnownSides(a,b,c){
	var sides = [];
	if(a)
		sides.push("a");
	if(b)
		sides.push("b");
	if(c)
		sides.push("c");
	return sides;
}
//Returns the known angles from 3 angles as array of strings
function getKnownAngles(A,B,C){
	var angles = [];
	if(A)
		angles.push("A");
	if(B)
		angles.push("B");
	if(C)
		angles.push("C");
	return sides;
}
//
function getKnownPairs(triangle){
	var knownPairs = [];
	if(triangle.a && triangle.A)
		knownPairs.push("A");
	if(triangle.b && triangle.B)
		knownPairs.push("B");
	if(triangle.c && triangle.C)
		knownPairs.push("C");
	return knownPairs;
}

function getPairWithE(triangle, pairToExclude){
	if((triangle.a && triangle.A) && (pairToExclude != "a" || pairToExclude != "A"))
		return "a";
	if((triangle.b && triangle.B) && (pairToExclude != "b" || pairToExclude != "B"))
		return "b";
	if((triangle.c && triangle.C) && (pairToExclude != "c" || pairToExclude != "C"))
		return "c";
}

//
function getPairsToCalculate(triangle, elementToExclude){
	var neededElements = [];
	if(triangle.a != null && elementToExclude != "A")
		neededElements.push("A");
	else if(triangle.b != null && elementToExclude != "B")
		neededElements.push("B");
	else if(triangle.c != null && elementToExclude != "C")
		neededElements.push("C");
	else if(triangle.A != null && elementToExclude != "a")
		neededElements.push("a");
	else if(triangle.B != null && elementToExclude != "b")
		neededElements.push("b");
	else if(triangle.C != null && elementToExclude != "c")
		neededElements.push("c");
	else if(elementToExclude != "a" && elementToExclude != "A")
	{
		neededElements.push("a");
		neededElements.push("A");
	}
	else if(elementToExclude != "b" && elementToExclude != "B")
	{
		neededElements.push("b");
		neededElements.push("B");
	}
	else if(elementToExclude != "c" && elementToExclude != "C")
	{
		neededElements.push("c");
		neededElements.push("C");
	}
	return neededElements;
}

// -------- Is functions --------

function isAPairKnown(triangle){
	if(triangle.a && triangle.A)
		return true;
	else if(triangle.b && triangle.B)
		return true;
	else if(triangle.c && triangle.C)
		return true;
	else
		return false;
}
//Returns
function isOtherSidesKnown(a,b,c, side){
	var sides = getKnownSides(a,b,c);
	if(side == "a")
	{
		if(sides.includes(b) && sides.includes(c))
		return true;
	}
	else if(side == "b")
	{
		if(sides.includes(a) && sides.includes(c))
			return true;
	}
	else if(side == "c")
	{
		if(sides.includes(a) && sides.includes(b))
			return true;
	}else
	{
		return false;
	}
}
//If the opposite side of an angle is null. Returns a bool
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
//If the opposite angle of a side is null, Returns a bool i
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

// -------- Can Use --------

function canUseCosToCalculateSide(a,b,c, elementToCalculate){
	if(getValueFromElement(getOppositeAngle(elementToCalculate)) != null && isOtherSidesKnown(a,b,c, elementToCalculate))
		 return true;
	else
		return false;
}

function canUseSinToCalculateSide(triangle){
	var knownPairs = getKnownPairs(triangle);
	if(knownPairs.length > 0)
		return true;
	else
		return false;
}

function canUseSinToCalculateAngle(triangle){
	if(isAPairKnown(triangle))
		 return true;
	else
		return false;
}

function canUseCosToCalculateAngle(a,b,c){
	if(getKnownSides(a,b,c).length == 3)
		 return true;
	else
		return false;
}

function canUse180ToCalcuateAngle(A,B,C){
	var angles = (A != null) + (B != null) + (C != null);
	if(angles == 2)
		return true;
	else 
		return false;
}