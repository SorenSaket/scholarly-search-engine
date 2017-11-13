var allData = [];

window.addEventListener('DOMContentLoaded', init);

function init() {
	loadDatabases();
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
			callback: function(data, tabletop){
				allData.push(data);
			},
			simpleSheet: true } );
	}
}

function saveDatabases(){
	Cookies.set('databases', document.getElementById("databases").value);
	console.log(Cookies.get('databases'));
	console.log(document.getElementById("databases").value);
}

function search(){
	//Get serch Query from input
	var searchQuery = document.getElementById("searchInput").value;
	document.getElementById("searchInput").value = "";
	var foundArticles = findMatchingItemsInDatabase(searchQuery);
	for (var x = 0; x < foundArticles.length; x++) {
		document.getElementById("resultcontainer").innerHTML = "";
		addResult(foundArticles[x].type,foundArticles[x].name,foundArticles[x].description,foundArticles[x].tags, foundArticles[x].link);
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
		console.log(tags);
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

function addResult(type, name, description, tags, link){
	//sets the div and (div id) soon TM
	var $div = $('<div>');
	//loads the html into a object
	$div.load('elements/search_element.html #card', function(){
		//gets the html and puts it into a variable
		var html = $(this)
		//gets the string version of the html
		html = html["0"].innerHTML
		//change the values 
		html = html.toString();
		html = html.replace("Card title",name);
		html = html.replace("Card tags",tags);
		html = html.replace("Description text",description);
		html = html.replace("#",link);
		html = html.replace("#",link);
		
		//make the string int a html obj again
		html = $(html);
		html = html["0"];

		//logs the html obj
		console.log(html)

		//inserts the html results
		document.getElementById("resultcontainer").appendChild(html)
	});
}