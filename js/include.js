function includeJS(file)
{

    var script  = document.createElement('script');
    script.src  = file;
    script.type = 'text/javascript';

    document.getElementsByTagName('head').item(0).appendChild(script);

}

function includeSS(file)
{
  //creates a link element and adds its properies
  var link  = document.createElement('link');
  link.href  = file;
  link.rel = "stylesheet"

  //adds the code to the <head> tag
  document.getElementsByTagName('head').item(0).appendChild(link);
}