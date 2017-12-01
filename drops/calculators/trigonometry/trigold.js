function Calculate() {
	var triangle = {
		'a': document.getElementById("a").value,
		'b': document.getElementById("b").value,
		'c': document.getElementById("c").value,
		'A': document.getElementById("A").value,
		'B': document.getElementById("B").value,
		'C': document.getElementById("C").value
	};
	SetUI(solveTriangle(triangle.a, triangle.b, triangle.c, triangle.A, triangle.B, triangle.C));
	/*if(isUnsolvable(triangle))
	{
		return;
	}*/
	//Checks if equation is unsolvable

	//Calculate all angles
	//Calculate all sides
	//Calculate area and circumference
}

function SetUI(triangle) {
	document.getElementById("a").value = triangle.a;
	document.getElementById("b").value = triangle.b;
	document.getElementById("c").value = triangle.c;
	document.getElementById("A").value = triangle.A;
	document.getElementById("B").value = triangle.B;
	document.getElementById("C").value = triangle.C;
}

function displayError(error) {
	console.log(error);
}
/*
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

function sovleAngles(triangle)
{
	var a = triangle.a;
	var b = triangle.b;
	var c = triangle.c;
	var A = triangle.A;
	var B = triangle.B;
	var C = triangle.C;

	var angles = (A != null) + (B != null) + (C != null); 
	var sides  = (a != null) + (b != null) + (c != null); 
	switch (angles) {
		case 0:
			if (c >= a + b || a >= b + c || b >= c + a)
				displayError("You fucked up");
			A = solveAngle(b, c, a, "A");
			B = solveAngle(c, a, b);
			C = solveAngle(a, b, c);
			break;
		case 1:
			
			break;
		case 2:
		
		break;
		case 3:
		
		break;
		default:
			break;
	}
}*/

function solveTriangle(a, b, c, A, B, C) 
{
	print(a + ", " + b + ", " + c + ", " + A + ", " + B + ", " + C)
	var sides = (a != null && a != "") + (b != null && b != "") + (c != null && c != ""); // Boolean to integer conversion
	var angles = (A != null && A != "") + (B != null && B != "") + (C != null && C != ""); // Boolean to integer conversion
	print("sides: " + sides);
	print("angles: " + angles);
	var area, status, circumference;

	//Checks if equation is unsolvable
	if (sides + angles != 3)
		throw "Give exactly 3 pieces of information";
	else if (sides == 0)
		throw "Give at least one side length";
	else if (sides == 3) {
		status = "Side side side (SSS) case";
		if (a + b <= c || b + c <= a || c + a <= b)
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
		if (A <= 0 || B <= 0 || C <= 0)
			throw status + " - No solution";
		var sinA = Math.sin(degToRad(A));
		var sinB = Math.sin(degToRad(B));
		var sinC = Math.sin(degToRad(C));
		// Use law of sines to find sides
		var ratio; // side / sin(angle)
		if (a != null) {
			ratio = a / sinA;
			area = a * ratio * sinB * sinC / 2;
		}
		if (b != null) {
			ratio = b / sinB;
			area = b * ratio * sinC * sinA / 2;
		}
		if (c != null) {
			ratio = c / sinC;
			area = c * ratio * sinA * sinB / 2;
		}
		if (a == null) a = ratio * sinA;
		if (b == null) b = ratio * sinB;
		if (c == null) c = ratio * sinC;

	} else if (A != null && a == null || B != null && b == null || C != null && c == null) {
		status = "Side angle side (SAS) case";
		if (A != null && A >= 180 || B != null && B >= 180 || C != null && C >= 180)
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

    } else 
    {
		status = "Side side angle (SSA) case - ";
		var knownSide, knownAngle, partialSide;
		if (a != null && A != null) {
			knownSide = a;
			knownAngle = A;
		}
		if (b != null && B != null) {
			knownSide = b;
			knownAngle = B;
		}
		if (c != null && C != null) {
			knownSide = c;
			knownAngle = C;
		}
		if (a != null && A == null) partialSide = a;
		if (b != null && B == null) partialSide = b;
		if (c != null && C == null) partialSide = c;
		if (knownAngle >= 180)
			throw status + "No solution";
		var ratio = knownSide / Math.sin(degToRad(knownAngle));
		var temp = partialSide / ratio; // sin(partialAngle)
		var partialAngle, unknownSide, unknownAngle;
		if (temp > 1 || knownAngle >= 90 && knownSide <= partialSide)
			throw status + "No solution";
		else if (temp == 1 || knownSide >= partialSide) {
			status += "Unique solution";
			partialAngle = radToDeg(Math.asin(temp));
			unknownAngle = 180 - knownAngle - partialAngle;
			unknownSide = ratio * Math.sin(degToRad(unknownAngle)); // Law of sines
			area = knownSide * partialSide * Math.sin(degToRad(unknownAngle)) / 2;
		} else {
			status += "Two solutions";
			var partialAngle0 = radToDeg(Math.asin(temp));
			var partialAngle1 = 180 - partialAngle0;
			var unknownAngle0 = 180 - knownAngle - partialAngle0;
			var unknownAngle1 = 180 - knownAngle - partialAngle1;
			var unknownSide0 = ratio * Math.sin(degToRad(unknownAngle0)); // Law of sines
			var unknownSide1 = ratio * Math.sin(degToRad(unknownAngle1)); // Law of sines
			partialAngle = [partialAngle0, partialAngle1];
			unknownAngle = [unknownAngle0, unknownAngle1];
			unknownSide = [unknownSide0, unknownSide1];
			area = [knownSide * partialSide * Math.sin(degToRad(unknownAngle0)) / 2,
				knownSide * partialSide * Math.sin(degToRad(unknownAngle1)) / 2
			];
		}
		if (a != null && A == null) A = partialAngle;
		if (b != null && B == null) B = partialAngle;
		if (c != null && C == null) C = partialAngle;
		if (a == null && A == null) {
			a = unknownSide;
			A = unknownAngle;
		}
		if (b == null && B == null) {
			b = unknownSide;
			B = unknownAngle;
		}
		if (c == null && C == null) {
			c = unknownSide;
			C = unknownAngle;
		}
    }
    circumference = a + b + c;
    
            var triangle = {
                'a': a,
                'b': b,
                'c': c,
                'A': A,
                'B': B,
                'C': C,
                'area': area,
                'circumference': circumference
            };
            return triangle;
}

// Returns side c using law of cosines
function solveSide(a, b, C) {
    C = degToRad(C);
    if (C > 0.001)
        return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C));
    else // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
        return Math.sqrt((a - b) * (a - b) + a * b * C * C * (1 - C * C / 12));
}

// Returns angle C using law of cosines
function solveAngle(a, b, c) {
    var temp = (a * a + b * b - c * c) / (2 * a * b);
    if (-1 <= temp && temp <= 0.9999999)
        return radToDeg(Math.acos(temp));
    else if (temp <= 1) // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
        return radToDeg(Math.sqrt((c * c - (a - b) * (a - b)) / (a * b)));
    else
        displayError("No solution");
}

function NumberOfUndefined(arrayOfAngles) {
    var number = 0;
    for (let index = 0; index < arrayOfAngles.length; index++) {
        if (arrayOfAngles[index] == null)
            number++;
    }
    return number;
}

function radToDeg(valRad) {
	return (360 / (2 * Math.PI) * valRad)
}

function degToRad(valDeg) {
	return ((2 * Math.PI) / 360 * valDeg)
}