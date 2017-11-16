var allSearchEngines = [];

window.addEventListener("load", init);

function init() {
	loadSearchEngines();
}

function loadSearchEngines(){
    console.log("Loading search engines");
    var searchEngines = Cookies.get("searchengines");
	if(searchEngines == "undefined" || searchEngines == null || searchEngines.length == 0 || !isJson(searchEngines))
	{
		console.log("No search engine var found");
        searchEngines = [];
        
        var wiki = {
            command:"wiki",
            link: "https://en.wikipedia.org/w/index.php?title=Special:Search&search="
        };
       
        var yt = {
            command:"yt",
            link:"https://www.youtube.com/results?search_query="
        }
        
        var khan = {
            command :"khan",
            link:"https://www.khanacademy.org/search?referer=%2F&page_search_query="
        };

        searchEngines.push(wiki, yt, khan);
        Cookies.set("searchengines", searchEngines);
        allSearchEngines = searchEngines;
    }else
    {
        console.log(searchEngines);
        allSearchEngines = JSON.parse(searchEngines);
    }
    setSearchEngines();
}
    

function saveSearchEngines(){
    searchEngines = [];
    var count = $("#searchenginecontainer").children().length;
    console.log( count + "AAAAAAAAAAAAAAAAAAA");
    for (let index = 0; index < count; index++) 
    {
        var temp =
        {
            command : document.getElementById("secommand" + index).value,
            link :  document.getElementById("selink" + index).value,
        };

        console.log("Search engine nr: " + index + "  command: " + temp.command + "  link: " + temp.link + "    " + temp);

        searchEngines.push(temp);
    }
    console.log(searchEngines);
    allSearchEngines = searchEngines;
	Cookies.set("searchengines", allSearchEngines);
}

function setSearchEngines(){
    $("#searchenginecontainer").empty();
    for (var index = 0; index < allSearchEngines.length; index++) 
    {
        var command = allSearchEngines[index].command;
        var link = allSearchEngines[index].link;
        var txt1 = '<tr id="searchengine' + index +'"><th><input id="secommand' + index + '" class="form-control w-100" type="search" placeholder="command" aria-label="Search" value="' + command + '"></th><td><input id="selink'+ index +'" style="display:inline" class="form-control w-100" type="search" placeholder="link" aria-label="Search" value="' + link + '"></td><td><button type="button" class="close" aria-label="Close" onclick="removeSearchEngine('+ index +')"><span aria-hidden="true">&times;</span></button></td></tr>';
        $("#searchenginecontainer").append(txt1);
    }
}

function addSearchEngine(){
    var count = $("#searchenginecontainer").children().length;
    console.log("Adding search engine with ID: " + count);
    var txt1 = '<tr id="searchengine' + count +'"><th><input id="secommand' + count + '" class="form-control w-100" type="search" placeholder="command" aria-label="Search"></th><td><input id="selink'+ count +'" style="display:inline" class="form-control w-100" type="search" placeholder="link" aria-label="Search" ></td><td><button type="button" class="close" aria-label="Close" onclick="removeSearchEngine('+ count +')"><span aria-hidden="true">&times;</span></button></td></tr>';
    $("#searchenginecontainer").append(txt1);
}

function removeSearchEngine(num){
    $("#searchengine" + num).remove();
}

$('#addsearchengine').click( function(e) {e.preventDefault(); addSearchEngine(); return false; } );

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}