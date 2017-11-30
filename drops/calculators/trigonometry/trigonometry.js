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



}

function caluclateTriangle(triangle)
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
			//SSS
			addLine("// Law of cosines");
			addline("$${c^2}\; = {\rm{ }}{a^2}\; + {\rm{ }}{b^2}\; - {\rm{ }}2ab{\rm{ }}cos\left( C \right)$$");

			addLine("// Calculate A");
			A = solveAngle(a,b,c, "A");
			
			addLine("// Calculate B");
			B = solveAngle(a,b,c, "B");
			
			addLine("// Calculate C");
			C = solveAngleWith180(A,B,null);
			break;
		case 1:
			//Find the missing side
			var unknownSide = GetUnknownSide(a,b,c);
			var knownAngle = GetKnownAngle(A,B,C);

			//Check if the missing side's opposing angle is null
			if(isOppositeAngleNull(unknownSide))
			{
				//SSA
				//find Known Angle
				if(knownAngle == "A")
				{
					//Calulate angle nr2 with sin
					B = Math.asin(degToRad((sinA/a)*b));
					addLine("//Calculate B");
					addLine("$${{\sin (B)} \over b} = {{\sin (A)} \over a}$$");
					addLine("$$\sin (B) = {{\sin (A)} \over a}*b$$");
					addLine("$$B = {\sin ^{ - 1}}({{\sin (A)} \over a}*b)$$");
					addLine("$$B = {\sin ^{ - 1}}({{\sin (A)} \over a}*b)$$");
					
					//Calulate The last angle with 180
					C = solveAngleWith180(A,B,C);
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
			addLine("$${a \over {\sin (A)}} = {b \over {\sin (B)}} = {c \over {\sin (C)}}$$");
			
			if (a != null) 
			{
				ratio = a / sinA;
				area = a * ratio * sinB * sinC / 2;
				b = ratio * sinB;
				c = ratio * sinC;
				addLine("//Calculate b");
				addLine("$$b = {a \over {\sin (A)}}*\sin (B)$$");
				addLine("$$"+ b+ " = {"+ a+" \over {\sin (" + A + ")}}*\sin ("+ B + ")$$");
				
				addLine("//Calculate c");
				addLine("$$c = {a \over {\sin (A)}}*\sin (C)$$");
				addLine("$$"+ c+ " = {"+ a+" \over {\sin (" + A + ")}}*\sin ("+ C + ")$$");
			}
			if (b != null) 
			{
				ratio = b / sinB;
				area = b * ratio * sinC * sinA / 2;
				a = ratio * sinA;
				c = ratio * sinC;
				addLine("//Calculate a");
				addLine("$$a = {b \over {\sin (B)}}*\sin (A)$$");
				addLine("$$" + a + " = {" + b +" \over {\sin (" + B +")}}*\sin (" + A +")$$");

				addLine("//Calculate c");
				addLine("$$c = {b \over {\sin (B)}}*\sin (C)$$");
				addLine("$$" + c + " = {" + b +" \over {\sin (" + B +")}}*\sin (" + C +")$$");
			}
			if (c != null) 
			{
				ratio = c / sinC;
				area = c * ratio * sinA * sinB / 2;
				a = ratio * sinA;
				b = ratio * sinB;
				addLine("//Calculate a");
				addLine("$$a = {c \over {\sin (C)}}*\sin (A)$$");
				addLine("$$" + a + " = {" + c + " \over {\sin (" + C + ")}}*\sin (" + A + ")$$");
				
				addLine("//Calculate b");
				addLine("$$b = {c \over {\sin (C)}}*\sin (B)$$");
				addLine("$$" + b + " = {" + c + " \over {\sin (" + C + ")}}*\sin (" + B + ")$$");
			}
		break;
		case 3:
			displayError("Cannot calculate sides with only 3 Angles");
		break;
		default:
			break;
	}

}
			

function displayError(error) {
	console.log(error);
}

function addLine(text) {

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
	switch (angleToCalculate) {
		case "A":
			var A = temp = ( b * b + c * c - a * a) / (2 * b * c);
			addLine("$$A = {\cos ^{ - 1}}({{{b^2} + {c^2} - {a^2}} \over {2*b*c}})$$");
			addLine("$$" + A + " = {\cos ^{ - 1}}({{{" + b + "^2} + {" + c + "^2} - {" + a + "^2}} \over {2*" + b + "*" + c + "}})$$");
			break;
		case "B":
			var B = temp =  ( c * c + a * a - b * b) / (2 * c * a);
			addLine("$$B = {\cos ^{ - 1}}({{{c^2} + {a^2} - {b^2}} \over {2*c*a}})$$");
			addLine("$$" + B + " = {\cos ^{ - 1}}({{{" + c + "^2} + {" + a + "^2} - {" + b + "^2}} \over {2*" + c + "*" + a + "}})$$");
			break;
		case "C":
			var C = temp = (a * a + b * b - c * c) / (2 * a * b);
			addLine("$$C = {\cos ^{ - 1}}({{{a^2} + {b^2} - {c^2}} \over {2*a*b}})$$");
			addLine("$$" + C + " = {\cos ^{ - 1}}({{{" + a + "^2} + {" + b + "^2} - {" + c + "^2}} \over {2*" + a + "*" + b + "}})$$");
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

function solveAngleWith180(A,B,C)
{
	if (A == null)
	{
		A = 180 - B - C;
		addLine("// Calculate A");
		addLine("$$A = 180 - B - C$$");
		addLine("$$" + A + " = 180 - " + B + " - " + C + "$$");
		return A;
	} 
	if (B == null) 
	{
		B = 180 - A - C;
		addLine("// Calculate B");
		addLine("$$B = 180 - A - C$$");
		addLine("$$" + B + " = 180 - " + A + " - " + C + "$$");
		return B;
	}
	if (C == null)
	{
		C = 180 - A - B;
		addLine("// Calculate C");
		addLine("$$C = 180 - A - B$$");
		addLine("$$" + C + " = 180 - " + A + " - " + B + "$$");
		return C;
	}
}