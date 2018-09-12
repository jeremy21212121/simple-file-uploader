var config = require('./config');
var http = require('http');
var url = require('url');

function start(route, routes) {

  function onRequest(request, response) {

    var pathname = url.parse(request.url).pathname;
    var postData = '';

    request.setEncoding('utf8');

    request.addListener('data', function (postDataChunk) {
      postData += postDataChunk;
    });

    request.addListener('end', function () {
      route(routes, pathname, response, postData);
    });
  }

  var server = http.createServer(onRequest).listen(config.port, config.host);

  server.on('error', function(e) {
    if (e.code === 'EADDRINUSE') {
      console.log('ERROR: Port number already in use. Select a different port number in config.js.');
      server.close();
    }
  })

  console.log('Started HTTP server on ' + config.host  + ':' + config.port + '...');
}

module.exports = {
  start: start
};
