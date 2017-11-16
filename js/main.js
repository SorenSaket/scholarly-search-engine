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