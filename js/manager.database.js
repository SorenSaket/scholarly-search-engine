var allDatabases = [];

window.addEventListener("load", init);

function init() {
	loadDatabases();
}

function loadDatabases(){
	var databases = Cookies.get("databases");
	allDatabases = [];
	if(databases == "undefined" || databases == null)
	{
        databases = [];
        console.log("No database var found");
    }else
    {
        document.getElementById("databases").value = databases;
        databases = databases.split("\n");
        for (let x = 0; x < databases.length; x++) {
            Tabletop.init( { key: databases[x],
                callback: function(data, tabletop){
                    for (let y = 0; y < data.length; y++) {
                        allDatabases.push(data[y]);
                    }
                },
                simpleSheet: true } );
        }
    }
	
	console.log(allDatabases);
}

function revertDatabases(){
	document.getElementById("databases").value = Cookies.get("databases");
}

function saveDatabases(){
    if(document.getElementById("databases").value != Cookies.get("databases"))
    {
        console.log("Saved Databases");
        Cookies.set("databases", document.getElementById("databases").value);
        loadDatabases();
    }
}