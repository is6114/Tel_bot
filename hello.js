
const curl = require("curl");
const jsdom = require("jsdom");
const url = "http://rozklad.kpi.ua/Schedules/ViewSchedule.aspx?g=ca29408e-92e6-4394-ac55-56e1c45d5c8e";
exports.parse = (callback) => {
  curl.get(url, null, (err,resp,body)=>{
      if(resp.statusCode == 200){
         var res = parseData(body);
         callback(res);
      }
      else{
         //some error handling
         console.log("error while fetching url");
      }
    });
};
function parseData(html){
  const {JSDOM} = jsdom;
  const dom = new JSDOM(html);
  const $ = (require('jquery'))(dom.window);
  var first = [];
  var second = [];
  for(var i = 0;i<6;i++){
    first.push(Array(5).fill("-"));
  }
  for(var i = 0;i<6;i++){
    second.push(Array(5).fill("-"));
  }
  var items = $('table')
  count = 0;
  $(items[0]).find("tr:gt(0)").find("td").each(function(){
  msg = $(this).find(".plainLink").attr('title')
  if(msg ){
    y = parseInt(count/7);
    x = count%7-1; 
    
    //console.log(x +" s " +y +" ssad "+ count)
    first[x][y] = msg;
    //console.log(sched)
  }
  count++;

})
for(var i = 0; i < 6; i++)
  {
    if(i == 0){ firstWeekStr += '\nПонеділок\n'; }
    else if (i == 1) { firstWeekStr += 'Вівторок\n'}
    else if (i == 2) { firstWeekStr += 'Середа\n'}
    else if (i == 3) { firstWeekStr += 'Четвер\n'}
    else if (i == 4) { firstWeekStr += 'Пятниця\n'}
    else if (i == 5) { firstWeekStr += 'Субота\n'}

    for(var j = 0; j < 5; j++)
    {
      firstWeekStr += `${j+1}. ${first[i][j]}\n`;
    }
  }
count = 0;
  $(items[1]).find("tr:gt(0)").find("td").each(function(){
  msg = $(this).find(".plainLink").attr('title')
  if(msg ){
    y = parseInt(count/7);
    x = count%7-1; 
    
    //console.log(x +" s " +y +" ss "+ count)
    second[x][y] = msg;
    //console.log(sched)
  }
  count++;
})
for(var i = 0; i < 6; i++)
{
  if(i == 0){ secondWeekStr += 'Понеділок\n'; }
  else if (i == 1) { secondWeekStr += 'Вівторок\n'}
  else if (i == 2) { secondWeekStr += 'Середа\n'}
  else if (i == 3) { secondWeekStr += 'Четвер\n'}
  else if (i == 4) { secondWeekStr += 'Пятниця\n'}
  else if (i == 5) { secondWeekStr += 'Субота\n'}

  for(var j = 0; j < 5; j++)
  {
    secondWeekStr += `${j+1}. ${second[i][j]}\n`;
  }
}

console.log('ParseData finished\n');
return firstWeekStr + secondWeekStr;
};