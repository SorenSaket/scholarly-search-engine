window.addEventListener("load", init);

function init() {
	loadDatabases();
}

function loadDatabases(){
	var databases = Cookies.get("databases");
	allData = [];
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
                        allData.push(data[y]);
                    }
                },
                simpleSheet: true } );
        }
    }
	
	console.log(allData);
}

function saveDatabases(){
	console.log("Saved Databases");
	Cookies.set("databases", document.getElementById("databases").value);
	loadDatabases();
}