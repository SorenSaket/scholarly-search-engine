function loadSearchEngines(){
	var searchEngines = Cookies.get("searchengines");

	if(searchEngines == "undefined" || searchEngines == null)
	{
		console.log("No database var found");
        searchEngines = [];
        searchEngines[0].command = "wiki"
        searchEngines[0].link = "wikipedia.org/w/index.php?title=Special:Search&search="
        searchEngines[0].usemod = true;
        searchEngines[0].defaultmod = "en";

		Cookies.set("searchengines", searchEngines);
	}
    setSearchEngines();
}

function saveSearchEngines(){
    console.log("Saved Search Engines");
	Cookies.set("searchengines", );
	loadSearchEngines();
}


function setSearchEngines()
{
    for (var index = 0; index < array.length; index++) 
    {
        var txt1 = '<tr><th><input id="command' + index + '" class="form-control mr-sm-2 w-100" type="search" placeholder="command" aria-label="Search"></th><td><input id="link'+ index +' " style="display:inline" class="form-control w-100" type="search" placeholder="link" aria-label="Search"></td></tr>'; 
        $("#searchengines").append(txt1);
    } 
}

function addSearchEngine()
{

}