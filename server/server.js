var nodeStatic = require('node-static')
var http = require('http')
var port = 5858

var file = new nodeStatic.Server('.', {
    cache: 0,
    gzip: true
})

http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response)
    }).resume()
}).listen(port)