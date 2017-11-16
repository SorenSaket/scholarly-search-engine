var currentResults = [];
var currentPage;

function revertData()
{
	setSearchEngines();
	revertDatabases();
}

function saveData()
{
	saveDatabases();
	saveSearchEngines();
}

document.getElementById('searchForm').addEventListener('submit', function(e) {
	e.preventDefault();
	if(document.getElementById('searchInput').value.indexOf("wiki") !== -1){
		subsearch();
		console.log("2")
	}
	else{
		search();
		console.log("3")
	}
	displayResults(currentPage);
}

function nextPage(){
	currentPage = currentPage += 1;
	displayResults(currentPage);
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
		document.getElementById("description" + resultToChange).innerText = data.description;
		
		if (data.type == "docs"){
			$("#type" + resultToChange).attr('src', 'assets/cardtypes/doc.png');
			$("#type" + resultToChange).width(38);
			$("#type" + resultToChange).height(38);
			$("#type" + resultToChange).css('float','right');
		}
		else if (data.type == "vid"){
			$("#type" + resultToChange).attr('src', 'assets/cardtypes/vid.png');
			$("#type" + resultToChange).width(38);
			$("#type" + resultToChange).height(38);
			$("#type" + resultToChange).css('float','right');
		}
		else if (data.typ == "cal"){
			$("#type" + resultToChange).attr('src', 'assets/cardtypes/cal.png');
			$("#type" + resultToChange).width(38);
			$("#type" + resultToChange).height(38);
			$("#type" + resultToChange).css('float','right');
		}
		else{
			console.log("ERROR Unknow type")
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
	for (var x = 0; x < allData.length; x++) 
	{
		//Gets tags in article
		var tags = allData[x].tags;
		tags = tags.split(", ");
		//Go though all tags
		for (var y = 0; y < tags.length; y++) 
		{
			//If tag matches to serchQuery
			if(searchQuery.toUpperCase() === tags[y].toUpperCase())
			{
				//Add the article to the return var foundArticles
				foundArticles.push(allData[x]);
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

document.getElementById('searchForm').addEventListener('submit', function(e) {
	e.preventDefault();
	search();
	search();
}, false);

$('#open0').click(function(){ 
	open(0); 
	return false; 
});
$('#open1').click(function(){ 
	open(1); 
	return false; 
});
$('#open2').click(function(){ 
	open(2); 
	return false; 
});

$('#prev').click( function(e) {e.preventDefault(); prevPage(); return false; } );
$('#next').click( function(e) {e.preventDefault(); nextPage(); return false; } );