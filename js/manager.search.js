function strSplit(string) {
    var str = string.replace('(','("');
    str = str.replace(/,/g,'","');
    var pos = str.lastIndexOf(')');
    str = str.substring(0,pos) + '")' + str.substring(pos+1);
    console.log (str);
    return str;
}

function commands(){
	var searchEngines = JSON.parse(Cookies.get("searchengines"));
	console.log(searchEngines);
	var commandArray = [];
	for (i = 0; i < searchEngines.length; i++) {
		commandArray.push(searchEngines[i].command);
		console.log(commandArray);
	}
	return commandArray;
}

function autocomplete(){
	var searchQuery = document.getElementById("searchInput").value;
	var list = document.getElementById("autocomplete");
	var url = "https://www.google.dk/complete/search?client=psy-ab&hl=da&gs_rn=64&gs_ri=psy-ab&tok=_1shqUG7g-CR-M65jyAEZQ&cp=3&gs_id=b&q=" + searchQuery+ "&xhr=t";
	console.log(searchQuery);
	$.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=?', function(data){
		array = JSON.parse(data.contents);
		array = array[1];
		for (i = 0; i < array.length; i++) {
			string = array[i][0].toString();
			var find = "<b>";
			var find2 = "</b>";
			var re = new RegExp(find, "");
			var re2 = new RegExp(find2, "");
			string = string.replace(re,"");
			string = string.replace(re2,"");
			document.getElementById("a"+ i).value = string;
		}
	});
}

function search(){
	console.log("Searching...");
	//Get serch Query from input
	var searchQuery = document.getElementById("searchInput").value;
	var command;
	//If is command
	if (searchQuery[0] == "/"){
		command = strSplit(searchQuery.replace("/", ""));
		eval(command);
		fullscreen(true);
	}//If is subsearch
	else if (searchQuery[0] == "."){
		command = searchQuery.replace(".", "");
		subsearch(command);
		fullscreen(true);
	}//Else seach in database
	else
	{
		currentResults = findMatchingItemsInDatabase(searchQuery);
		displayResults(0);
		fullscreen(false);
	}
}

function subsearch(query){
	var command = query.substr(0,query.indexOf(' '));
	var finalquery = query.substr(query.indexOf(' ')+1);
	for (let index = 0; index < allSearchEngines.length; index++) {
		if(allSearchEngines[index].command == command)
		{
			document.getElementById("contentdisplayer").setAttribute("src",allSearchEngines[index].link + finalquery);
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
		document.getElementById("type" + resultToChange).className = "type fa " + getFACode(data.type);
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

function getFACode(type){
	var faCode;	
	switch (type) {
		case "audio":
			faCode = "fa-file-audio-o";
			break;
		case "cal":
			faCode = "fa-calculator";
			break;
		case "code":
			faCode = "fa-file-code-o";
			break;
		case "doc":
			faCode = "fa-file-text-o";
			break;
		case "html":
			faCode = "fa-html5";
			break;
		case "img":
			faCode = "fa-file-image-o";
			break;
		case "vid":
			faCode = "fa-file-video-o";
			break;
		case "pdf":
			faCode = "fa-file-pdf-o";
			break;
		case "sheet":
			faCode = "fa-file-excel-o";
			break;
		case "slide":
			faCode = "fa-file-powerpoint-o";
			break;
		case "zip":
			faCode = "fa-file-zip-o";
			break;
		default:
			faCode = "fa-file-o";
			break;
	}
	return faCode;
}


$('#searchInput').on('input', function() { 
    autocomplete();
});