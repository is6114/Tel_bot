const TelegramBot = require('node-telegram-bot-api')

const hello = require('./hello');

const token = process.env.TOKEN;
   
//telegram = new TelegramBot("817941233:AAHfUyb6gK7mkt8jhiJZBM3ymratvoa2N8A", { polling: true });

telegram = new TelegramBot(token);

telegram.setWebHook(process.env.HEROKU_URL + token);


telegram.onText(/\/start/, (msg) => {
      telegram.sendMessage(msg.chat.id, `Hi, ${msg.from.first_name}! Glad to see you!`)
  });
  
  telegram.onText(/\/help/, (msg) => {
      str = "/start - command to initialize bot\n";
      str += "/parse - get and parses week schedule on kpi.rozklad"
  
      telegram.sendMessage(msg.chat.id, str);
  });
  
  telegram.onText(/\/parse/, (msg) => 
  {
      hello.parse(res => 
          {
              if(res)
              {
                telegram.sendMessage(msg.chat.id, res);
              }
          });
  });
module.exports = telegram;