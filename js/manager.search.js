function strSplit(string) {
    var str = string.replace('(','("')
    str = str.replace(/,/g,'","')
    var pos = str.lastIndexOf(')')
    str = str.substring(0,pos) + '")' + str.substring(pos+1)
    console.log (str)
    return str
}

function search(){
	//Get serch Query from input
	var searchQuery = document.getElementById("searchInput").value;
	//document.getElementById("searchInput").value = "";
	if (searchQuery[0] == "/"){
		var command = strSplit(searchQuery.replace("/", ""));
		eval(command);
	}
	if (searchQuery[0] == "."){
		var command = searchQuery.replace(".", "");
		subsearch(command);
	}
	else
	{
		currentResults = findMatchingItemsInDatabase(searchQuery);
		displayResults(0);
	}
}

function subsearch(query)
{
	var command = query.substr(0,query.indexOf(' '));
	var finalquery = query.substr(query.indexOf(' ')+1);
	for (let index = 0; index < allSearchEngines.length; index++) {
		if(allSearchEngines[index].command == command)
		{
			document.getElementById("contentdisplayer").setAttribute("src", allSearchEngines[index].link + finalquery);
		}
	}
}


function displayResults(page){
	document.getElementById("navigation0").innerHTML = page +1;
	currentPage = page;
	//Find the starting element in the currentResults array
	var firstResultToDisplay = page*3;
	//needed if there's less than 3 result on the page
	var cardsToDisplay = currentResults.length;

	if(cardsToDisplay > 3)
	{
		cardsToDisplay = 3;
	}

	for (let index = 0; index < 3; index++) 
	{
		if(index > cardsToDisplay)
		{
			changeResult(index,null);
		}
		else
		{
			changeResult(index,currentResults[firstResultToDisplay + index]);
		}
	}
}

function changeResult(resultToChange, data){
	if(data != null)
	{
		document.getElementById("result" + resultToChange).style.display = "block";
		document.getElementById("opensource" + resultToChange).href = data.link;
		document.getElementById("title" + resultToChange).innerText = data.name;
		document.getElementById("tags" + resultToChange).innerText = data.tags.substring(0, 82) + "...";
		document.getElementById("description" + resultToChange).innerText = data.description.substring(0, 161) + "...";

		if (data.type == "doc"){
			document.getElementById("type" + resultToChange).className = "type fa " + "fa-file-text";
		}
		else if (data.type == "vid"){
			document.getElementById("type" + resultToChange).className = "type fa " + "fa-video-camera";
		}
		else if (data.type == "cal"){
			document.getElementById("type" + resultToChange).className = "type fa " + "fa-calculator";
		}
		else if (data.type == "html"){
			document.getElementById("type" + resultToChange).className = "type fa " + "fa-html5";
		}
		else if (data.type == "sheet"){
			document.getElementById("type" + resultToChange).className = "type fa " + "fa-file-excel-o";
		}
		else if (data.type == "slide"){
			document.getElementById("type" + resultToChange).className = "type fa " + "fa-file-powerpoint-o";
		}
		else if (data.type == "img"){
			document.getElementById("type" + resultToChange).className = "type fa " + "fa-file-image-o";
		}
		else if (data.type == "pdf"){
			document.getElementById("type" + resultToChange).className = "type fa " + "fa-file-pdf-o";
		}
		else
		{
			document.getElementById("type" + resultToChange).className = "type fa " + "fa-file-o";
		}
	}
	else
	{
		document.getElementById("result" + resultToChange).style.display = "none";
	}
}

function findMatchingItemsInDatabase(searchQuery){
	//The returning var containing all articles with matching tags
	var foundArticles = [];
	
	//For each article in sheetData
	for (var x = 0; x < allDatabases.length; x++) 
	{
		//Gets tags in article
		var tags = allDatabases[x].tags;
		tags = tags.split(", ");
		//Go though all tags
		for (var y = 0; y < tags.length; y++) 
		{
			//If tag matches to serchQuery
			if(searchQuery.toUpperCase() === tags[y].toUpperCase())
			{
				//Add the article to the return var foundArticles
				foundArticles.push(allDatabases[x]);
			}
		}
	}
	return foundArticles;
}

function open(resultToOpen){
	var final = ((currentPage*3) + resultToOpen);
	console.log("Opening: " + currentResults[final].name);
	document.getElementById("contentdisplayer").setAttribute("src", currentResults[final].link);
}

function prevPage(){
	currentPage = currentPage-= 1;
	if(currentPage < 0)
	{
		currentPage = 0;
	}
	displayResults(currentPage);
}

function nextPage(){
	currentPage = currentPage += 1;
	if(currentPage > currentResults/3)
	{
		currentPage = currentResults/3;
	}
	displayResults(currentPage);
}