//
//
//
//
//

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
			A = solveAngle(a, b, c, "A");
			B = solveAngle(a, b, c, "B");
			C = solveAngle(a, b, c, "C");
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
function solveAngle(a, b, c, angleToCalculate) {
	var temp;
	switch (angleToCalculate) {
		case "A":
			temp = ( b * b + c * c - a * a) / (2 * b * c);
			addLine("$$A = {\cos ^{ - 1}}({{{b^2} + {c^2} - {a^2}} \over {2*b*c}})$$");
			break;
		case "B":
			temp = ( c * c + a * a - b * b) / (2 * c * a);
			addLine("$$B = {\cos ^{ - 1}}({{{c^2} + {a^2} - {b^2}} \over {2*c*a}})$$");
			break;
		case "C":
			temp = (a * a + b * b - c * c) / (2 * a * b);
			addLine("$$C = {\cos ^{ - 1}}({{{a^2} + {b^2} - {c^2}} \over {2*a*b}})$$");
			break;
		default:
			break;
	}
	if (-1 <= temp && temp <= 0.9999999)
	{
		return radToDeg(Math.acos(temp));
	}
	else if (temp <= 1) // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
	{
		
		return radToDeg(Math.sqrt((c * c - (a - b) * (a - b)) / (a * b)));
	}
	else
		displayError("No solution");
}


function displayError(error) {
	console.log(error);
}

function addLine(text) {

	
}