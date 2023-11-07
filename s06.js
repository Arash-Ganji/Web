let webpage = require('http');
let server = webpage.createServer(Bot);
server.listen(80);
let header = {'Content-Type' : 'Text/Plain'}
function Bot (request,response){
    console.log('request recieved url: ',request.url);
    //console.log('request : ',request);
    response.writeHead(200,header);
    response.write('salam'+ request.url);
    response.end();
}