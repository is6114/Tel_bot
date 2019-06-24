
/*
const rp = require('request-promise');
const url = 'https://kino-teatr.ua/kinoafisha-kiev.phtml?date=23.06.2019';

rp(url)
  .then(function(html){
    //success!
    console.log(html);
  })
  .catch(function(err){
    //handle error
  });
*/
const curl = require("curl");
const jsdom = require("jsdom");
const url = "http://rozklad.kpi.ua/Schedules/ViewSchedule.aspx?g=ca29408e-92e6-4394-ac55-56e1c45d5c8e";
curl.get(url, null, (err,resp,body)=>{
  if(resp.statusCode == 200){
     parseData(body);
  }
  else{
     //some error handling
     console.log("error while fetching url");
  }
});
function parseData(html){
  const {JSDOM} = jsdom;
  const dom = new JSDOM(html);
  const $ = (require('jquery'))(dom.window);
 
  //l'et's start extracting the data
  //var items = $("tr");
  
  //console.log(items.length)
  //for(var i = 1;i< items.length/2;i++){
    
  //console.log("hi")
  //  for(var j = 0;j< items.length/2;j++){
  //  console.log($(items[j]).find('tr')[i].text);
 // }
//}
/*var items = $('table')
for (var i=0;i<items.length;i++){
  console.log('aaaaaaaaaaaaaaaaaaaaaaaa');

  console.log($(items[i]).find("tr:gt(1)").find('td'));
  console.log('bbbbbbbbbbbbbbbbbbbbbbbb');


}*/
$("#plainLink a").each(function () {
    // 'this' is now the raw td DOM element
    console.log($(this).html());
});
}
