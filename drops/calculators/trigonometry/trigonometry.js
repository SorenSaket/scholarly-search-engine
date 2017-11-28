function Calculate()
{

}

function ThrowError(errorText)
{

}


function solveTriangle(a, b, c, A, B, C) {
	var sides  = (a != null) + (b != null) + (c != null);  // Boolean to integer conversion
	var angles = (A != null) + (B != null) + (C != null);  // Boolean to integer conversion
	var area, status;
	
	//Checks if equation is unsolvable
	if (sides + angles != 3)
		throw "Give exactly 3 pieces of information";
	else if (sides == 0)
		throw "Give at least one side length";
	else if (sides == 3) 
	{
		status = "Side side side (SSS) case";
		if (c >= a + b || a >= b + c || b >= c + a)
			throw status + " - No solution";
		A = solveAngle(b, c, a);
		B = solveAngle(c, a, b);
		C = solveAngle(a, b, c);
		// Heron's formula
		var s = (a + b + c) / 2;
		area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
		
	} else if (angles == 2) {
		status = "Angle side angle (ASA) case";
		// Find missing angle
		if (A == null) A = 180 - B - C;
		if (B == null) B = 180 - C - A;
		if (C == null) C = 180 - A - B;
		if (0 >= A || 0 >= B || 0 >= C)
			throw status + " - No solution";
		var sinA = Math.sin(degToRad(A));
		var sinB = Math.sin(degToRad(B));
		var sinC = Math.sin(degToRad(C));
		// Use law of sines to find sides
		var ratio;  // side / sin(angle)
		if (a != null) { ratio = a / sinA; area = a * ratio * sinB * sinC / 2; }
		if (b != null) { ratio = b / sinB; area = b * ratio * sinC * sinA / 2; }
		if (c != null) { ratio = c / sinC; area = c * ratio * sinA * sinB / 2; }
		if (a == null) a = ratio * sinA;
		if (b == null) b = ratio * sinB;
		if (c == null) c = ratio * sinC;
		
	} else if (and(A != null, a == null) || and(B != null, b == null) || and(C != null, c == null)) {
		status = "Side angle side (SAS) case";
		if (and(A != null, A >= 180) || and(B != null, B >= 180) || and(C != null, C >= 180))
			throw status + " - No solution";
		if (a == null) a = solveSide(b, c, A);
		if (b == null) b = solveSide(c, a, B);
		if (c == null) c = solveSide(a, b, C);
		if (A == null) A = solveAngle(b, c, a);
		if (B == null) B = solveAngle(c, a, b);
		if (C == null) C = solveAngle(a, b, c);
		if (A != null) area = b * c * Math.sin(degToRad(A)) / 2;
		if (B != null) area = c * a * Math.sin(degToRad(B)) / 2;
		if (C != null) area = a * b * Math.sin(degToRad(C)) / 2;
		
	} else {
		status = "Side side angle (SSA) case - ";
		var knownSide, knownAngle, partialSide;
		if (and(a != null, A != null)) { knownSide = a; knownAngle = A; }
		if (and(b != null, B != null)) { knownSide = b; knownAngle = B; }
		if (and(c != null, C != null)) { knownSide = c; knownAngle = C; }
		if (and(a != null, A == null)) partialSide = a;
		if (and(b != null, B == null)) partialSide = b;
		if (and(c != null, C == null)) partialSide = c;
		if (knownAngle >= 180)
			throw status + "No solution";
		var ratio = knownSide / Math.sin(degToRad(knownAngle));
		var temp = partialSide / ratio;  // sin(partialAngle)
		var partialAngle, unknownSide, unknownAngle;
		if (temp > 1 || and(knownAngle >= 90, partialSide >= knownSide))
			throw status + "No solution";
		else if (temp == 1 || knownSide >= partialSide) {
			status += "Unique solution";
			partialAngle = radToDeg(Math.asin(temp));
			unknownAngle = 180 - knownAngle - partialAngle;
			unknownSide = ratio * Math.sin(degToRad(unknownAngle));  // Law of sines
			area = knownSide * partialSide * Math.sin(degToRad(unknownAngle)) / 2;
		} else {
			status += "Two solutions";
			var partialAngle0 = radToDeg(Math.asin(temp));
			var partialAngle1 = 180 - partialAngle0;
			var unknownAngle0 = 180 - knownAngle - partialAngle0;
			var unknownAngle1 = 180 - knownAngle - partialAngle1;
			var unknownSide0 = ratio * Math.sin(degToRad(unknownAngle0));  // Law of sines
			var unknownSide1 = ratio * Math.sin(degToRad(unknownAngle1));  // Law of sines
			partialAngle = [partialAngle0, partialAngle1];
			unknownAngle = [unknownAngle0, unknownAngle1];
			unknownSide = [unknownSide0, unknownSide1];
			area = [knownSide * partialSide * Math.sin(degToRad(unknownAngle0)) / 2,
					knownSide * partialSide * Math.sin(degToRad(unknownAngle1)) / 2];
		}
		if (and(a != null, A == null)) A = partialAngle;
		if (and(b != null, B == null)) B = partialAngle;
		if (and(c != null, C == null)) C = partialAngle;
		if (and(a == null, A == null)) { a = unknownSide; A = unknownAngle; }
		if (and(b == null, B == null)) { b = unknownSide; B = unknownAngle; }
		if (and(c == null, C == null)) { c = unknownSide; C = unknownAngle; }
	}
	
	var circumference = a+b+c;

	return [a, b, c, A, B, C, area, circumference, status];
}

function NumberOfUndefined(arrayOfAngles)
{
	var number = 0;
	for (let index = 0; index < arrayOfAngles.length; index++) {
		if(arrayOfAngles[index] == null)
			number++;
	}
	return number;
}

function butCalculate_onclick() {
	if (CheckForValidInput(frmTriangle.sideA.value,frmTriangle.sideB.value,frmTriangle.sideC.value,frmTriangle.angleA.value,frmTriangle.angleB.value))
	{
		if (SolveForAngles(frmTriangle.sideA.value,frmTriangle.sideB.value,frmTriangle.sideC.value,frmTriangle.angleA.value,frmTriangle.angleB.value)){
			SolveForSides(frmTriangle.sideA.value,frmTriangle.sideB.value,frmTriangle.sideC.value,frmTriangle.angleA.value,frmTriangle.angleB.value)
		}
	}
}	
function CheckForValidInput(sideA,sideB,sideC,angleA,angleB){
	// check to see if both angles were input and they don't add up to 90
	if (angleA>0 && angleB>0){
		var sum = parseFloat(angleA) + parseFloat(angleB)
		if (sum != 90){
			alert ("You input two angles that do not add up to 90 degrees. Please input only one angle or two angles that add up to 90 degrees")
			return false
		}
	}
	// check to see if three sides were input and it is not a real triangle
	if (sideA>0 && sideB>0 && sideC>0){
		sideA=parseFloat(sideA)
		sideB=parseFloat(sideB)
		sideC=parseFloat(sideC)
		if (sideC != Math.sqrt(Math.pow(sideA,2)+Math.pow(sideB,2))){
			alert("You input three sides, but they do not make a right triangle")
			return false
		}
	}
	
return true
}

function rad2deg(valRad){
	return (360/(2*Math.PI)*valRad)
}

function degToRad(valDeg){
	return ((2*Math.PI)/360*valDeg)
}

function SolveForAngles (sideA,sideB,sideC,angleA,angleB){
	if (angleA>0) {
		angleB = 90 - angleA;
	}
	else if (angleB>0) {
		angleA = 90 - angleB;
	}
	else if (sideA>0 && sideB>0){
		angleA = rad2deg(Math.atan (sideA/sideB))
		angleB = rad2deg(Math.atan (sideB/sideA))
	}
	else if (sideA>0 && sideC>0){
			angleA = rad2deg(Math.asin (sideA/sideC))
			angleB = rad2deg(Math.acos (sideA/sideC))
	}
	else if (sideB>0 && sideC>0){
			angleA = rad2deg(Math.acos (sideB/sideC))
			angleB = rad2deg(Math.asin (sideB/sideC))
	}
	if (angleA>0 && angleB>0){
		frmTriangle.angleA.value=angleA
		frmTriangle.angleB.value=angleB
		return true
	}
	else {
		alert ("Not enough information, you must input at least 1 side and an angle or 2 sides")
		return false
	}	
}
	
function SolveForSides (sideA,sideB,sideC,angleA,angleB)	{
	if (sideA>0){
		sideB = sideA / Math.tan(deg2rad(angleA))
		sideC = sideA / Math.sin(deg2rad(angleA))
	}
	else if (sideB>0){
		sideA = sideB / Math.tan(deg2rad(angleB))
		sideC = sideB / Math.sin(deg2rad(angleB))
	}
	
	else if (sideC>0){
		sideA = sideC * Math.sin(deg2rad(angleA))
		sideB = sideC * Math.cos(deg2rad(angleA))
	}
	if (sideA>0 && sideB>0 && sideC>0){
		frmTriangle.sideA.value=sideA
		frmTriangle.sideB.value=sideB
		frmTriangle.sideC.value=sideC
	}
	else {
		alert ("Not enough information, you must input at least 1 side and an angle or 2 sides")
	}	
	
}