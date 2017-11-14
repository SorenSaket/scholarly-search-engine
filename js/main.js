var allData = [];
var currentResults = [];
var currentPage;


function search(){
	//Get serch Query from input
	var searchQuery = document.getElementById("searchInput").value;
	//document.getElementById("searchInput").value = "";
	currentResults = findMatchingItemsInDatabase(searchQuery);
	displayResults(0);
}


function prevPage()
{
	currentPage = currentPage-= 1;
	if(currentPage < 0)
	{
		currentPage = 0;
	}
	displayResults(currentPage);
}

function nextPage()
{
	currentPage = currentPage += 1;
	displayResults(currentPage);
}

function displayResults(page)
{
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

function changeResult(resultToChange, data)
{
	if(data != null)
	{
		document.getElementById("result" + resultToChange).style.display = "block";
		document.getElementById("opensource" + resultToChange).href = data.link;
		document.getElementById("title" + resultToChange).innerText = data.name;
		document.getElementById("tags" + resultToChange).innerText = data.tags.substring(0, 64) + "...";
		document.getElementById("description" + resultToChange).innerText = data.description;
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
	var final = currentPage*3 + resultToOpen
	document.getElementById("contentdisplayer").setAttribute("src", currentResults[final].link);
}

document.getElementById('searchForm').addEventListener('submit', function(e) {
	e.preventDefault();
	search();
}, false);

$('#open0').click(function()
{ 
	open(0); 
	return false; 
});
$('#open0').click(function()
{ 
	open(1); 
	return false; 
});
$('#open0').click(function()
{ 
	open(2); 
	return false; 
});