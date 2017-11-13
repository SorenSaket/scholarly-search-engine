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

//libraries
includeJS('https://cdnjs.cloudflare.com/ajax/libs/tabletop.js/1.5.2/tabletop.min.js')
includeJS('https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js')
includeJS('https://use.fontawesome.com/06fa86ec9b.js')
includeJS('https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js')
includeJS('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js')
includeJS('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js')

//custom scripts
includeJS('js/main.js')

//just CSS
includeSS('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css')
includeSS('css/styles.css')