const http = require('http')
var packageInfo = require('./package.json');
var bodyParser = require('body-parser');
const server = http.createServer(function(request, response) {
  if (request.method == 'POST') {
    if(request.url != '\/'+ process.env.TOKEN)
    {
      return;
    }
    var data = '';
    request.on('data', function( chunk ) {
      data += chunk;
    });
    request.on('end', function() {
      request.rawBody = data;
      console.log('on end: ', data )
      if (data && data.indexOf('{') > -1 ) {
        request.body = JSON.parse(data);
      }
      telegram.processUpdate(request.body);
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end();
    });
  }
});

console.log('finishing creating server');
module.exports = function (bot) {
  var ip = '::';
  var port = process.env.PORT;

  server.listen(port, ip);
  console.log(`Web server started at http://${ip}:${port}`);
}; 