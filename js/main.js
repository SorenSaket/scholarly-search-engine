var allData = [];
var currentResults = [];
var currentPage;

window.addEventListener("load", init);

function init() 
{
	loadDatabases();
}

function loadDatabases(){
	var databases = Cookies.get("databases");
	allData = [];
	if(databases == "undefined" || databases == null)
	{
		console.log("No database var found");
		databases = "https://docs.google.com/spreadsheets/d/1ku7WmJuYZ68s-l7fADQDihK3cNVCqcGaAuQeTvtIo98/edit?usp=sharing";
		Cookies.set("databases",databases);
	}
	document.getElementById("databases").value = databases;
	databases = databases.split("\n");
	for (let x = 0; x < databases.length; x++) {
		Tabletop.init( { key: databases[x],
			callback: function(data, tabletop){
				for (let y = 0; y < data.length; y++) {
					allData.push(data[y]);
				}
			},
			simpleSheet: true } );
	}
	console.log(allData);
}

function saveDatabases(){
	console.log("Saved Databases");
	Cookies.set("databases", document.getElementById("databases").value);
	loadDatabases();
}

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
	else{
		currentResults = findMatchingItemsInDatabase(searchQuery);
		displayResults(0);
	}
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