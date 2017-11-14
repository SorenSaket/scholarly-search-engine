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