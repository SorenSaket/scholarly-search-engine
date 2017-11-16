function includeJS(file)
{
    var script  = document.createElement("script");
    script.src  = file;
    script.type = "text/javascript";

    document.getElementsByTagName("head").item(0).appendChild(script);
    console.log("Loaded: " + file);
}

function includeSS(file)
{
  //creates a link element and adds its properies
  var link  = document.createElement("link");
  link.href  = file;
  link.rel = "stylesheet"

  //adds the code to the <head> tag
  document.getElementsByTagName("head").item(0).appendChild(link);
}

//libraries
//includeJS("js/jquery-3.2.1.min.js");
includeJS("js/libs/tabletop.min.js");
includeJS("js/libs/js.cookie.js");
includeJS("js/libs/seedrandom.js")
includeJS("https://use.fontawesome.com/06fa86ec9b.js");
includeJS("js/libs/bootstrap.bundle.min.js");
includeSS("css/bootstrap.min.css");

//just CSS
includeSS("css/styles.css");

//custom scripts
includeJS("js/main.js");
includeJS("js/manager.database.js");
includeJS("js/manager.searchengine.js");
includeJS("js/manager.search.js");


//Drops
includeJS("drops/calculators/trigonometry/py.js");
includeJS("drops/calculators/trigonometry/trigonometry.js")