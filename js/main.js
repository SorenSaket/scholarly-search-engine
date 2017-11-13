var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1ku7WmJuYZ68s-l7fADQDihK3cNVCqcGaAuQeTvtIo98/edit?usp=sharing';
var allData = [];

window.addEventListener('DOMContentLoaded', init);

function init() {
	loadDatabases();
}

function saveData(data, tabletop) {
	allData.push(data);
}

function search(){
	//Get serch Query from input
	var searchQuery = document.getElementById("searchInput").value;
	var foundArticles = findMatchingItemsInDatabase(searchQuery);
	for (var x = 0; x < foundArticles.length; x++) {
		var tempdoc = document.getElementById("resultcontainer").innerHTML='<object type="text/html" data="elements/search_elements.html" ></object>';
		tempdoc.getElementById("title").value = foundArticles[x].name;
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

function loadDatabases(){
	var databases = Cookies.get('databases');
	console.log(databases);
	if(databases == "undefined" || databases == null)
	{
		console.log("No database var found");
		databases = 'https://docs.google.com/spreadsheets/d/1ku7WmJuYZ68s-l7fADQDihK3cNVCqcGaAuQeTvtIo98/edit?usp=sharing';
		Cookies.set("databases",databases);
	}
	document.getElementById("databases").value = databases;
	databases = databases.split(/\r?\n/);
	for (let x = 0; x < databases.length; x++) {
		Tabletop.init( { key: databases[x],
			callback: saveData,
			simpleSheet: true } );
	}
}

function saveDatabases(){
	Cookies.set('databases', document.getElementById("databases").value);
	console.log(Cookies.get('databases'));
	console.log(document.getElementById("databases").value);
}
/*

document.getElementById('searchForm').addEventListener('submit', function(e) {
    search(document.getElementById('searchText'));
    e.preventDefault();
}, false);*/

function includeHTML(){
	//sets the div and (div id) soon TM
	var $div = $('<div>');
	//loads the html into a object
	$div.load('elements/search_element.html #card', function(){
		//gets the html and puts it into a variable
		var html = $(this)
		var title = "ATP"
		var tags = "ATP ENERGI"
		var description = "ATP er kroppens energi kilde"
		var open = "https://twitter.com"
		var opensource = "https://google.com"

		html = html["0"].innerHTML

		//logs the result
		console.log(html)

		html = html.toString();
		html = html.replace("Card title",title);
		html = html.replace("Card tags",tags);
		html = html.replace("Description text",description);
		html = html.replace("#",open);
		html = html.replace("#",opensource);
		html = $(html);
		html = html["0"];
		console.log(html)
		//inserts the html at [0] of result container
		document.getElementById("resultcontainer").appendChild(html)
	});
}