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
	var $div = $('<div>');
	$div.load('elements/search_element.html #card', function(){
		var html = $(this)
		html = html["0"]
		console.log(html)
		document.getElementById("resultcontainer").appendChild(html)
	});
}