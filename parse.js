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
const url = "http://rozklad.kpi.ua/Schedules/ScheduleGroupSelection.aspx";
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
  $(function () {
    $('#ctl00_MainContent_ctl00_txtboxGroup').val("ІС-61");
    $('#ctl00_MainContent_ctl00_btnShowSchedule').click();
  });
  //l'et's start extracting the data
  //var items = $("tr");
  
  //console.log(items.length)
  //for(var i = 1;i< items.length/2;i++){
    
  //console.log("hi")
  //  for(var j = 0;j< items.length/2;j++){
  //  console.log($(items[j]).find('tr')[i].text);
 // }
//}
var items = $('table')
for (var i=0;i<items.length;i++){
  console.log(items[i].find("tr:gt(j)"))//j 1,2,3,4,5

}  
}