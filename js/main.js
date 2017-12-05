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

function fullscreen(setFullscreen)
{
	var resultcontainer = document.getElementById("resultcontainer")
	var contentcontainer = document.getElementById("contentcontainer")
	if(setFullscreen)
	{
		resultcontainer.style.display = "none";
		contentcontainer.style.flex = "0 0 100%";
		contentcontainer.style.maxWidth = "100%";
	}
	else
	{
		resultcontainer.style.display = "initial";
		contentcontainer.style.flex = "0 0 58.333333%";
		contentcontainer.style.maxWidth = "0 0 58.333333%";
	}
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