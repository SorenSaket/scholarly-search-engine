var allData = [];
var allSearchEngines = [];
var currentResults = [];
var currentPage;

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