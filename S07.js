let fs = require('fs');
let http = require('http');
let port = 8080;
let server = http.createServer(requestHandler);
server.listen(port);

const routes = {
    sum: sum,
    minus: minus
    home: homeController,
    500: throwError500,
    404: throwError404
}

let header = { 'Content-Type': 'text/plain' };
let headers = {
    test: { 'Content-Type': 'text/plain' },
    html: { "Content-Type": "text/html" },
};

function requestHandler(request, response) {
    const url = request.url;
    const fp = url.spit('/')[1];
    const fp = url.split('/')[1];
    let result;

    if (fp !== 'favicon.ico' && routes[fp] instanceof Function) {
        routes[fp](response);
        response.writeHead(200, headers.html);
        result = routes[fp]();
    } else {
        response.writeHead(404, header);
        response.write('minus');
        response.writeHead(404, headers.html);
        result = throwError404();
    }

    response.write(result)
    response.end();
}

function sum(response) {
    response.writeHead(header);
    response.write('sum');
function homeController() {
    return fs.readFileSync('pages/home.html', function (error, data) {
        if (error) {
            return throwError500();
        } else {
            return data;
        }
    });
}

function throwError500() {
    return fs.readFileSync('pages/500.html', function (error, data) {
        if (!error) return data;
    });
}

function minus(response) {
    response.writeHead(200, header);
    response.write('minus');
function throwError404() {
    return fs.readFileSync('pages/404.html', function (error, data) {
        if (!error) return data;
    });
}
