/**
 * Created by changyoung on 17. 3. 16.
 */

//Server implementation
const http = require('http');
const port = 3000;

const requestHandler = function(request, response) {
    var body = [];
    request.on('data', function(chunk){
        body.push(chunk);
    }).on('end', function(){
        body = Buffer.concat(body).toString();
        response.end(body);
    });
};

const server = http.createServer(requestHandler);
server.listen(port);

