const http = require('http');
const path = require('path');
const fs = require('fs');
const fspromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
//initialize object 
const myEmitter = new Emitter();
myEmitter.on('log', (msg,fileName) => logEvents(msg,fileName)); //this is how you listen to an event
const PORT = process.env.port || 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fspromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ''
        );

        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;

        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            { 'content-type': contentType }
        );
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (err) {
        console.log(err);
        myEmitter.emit('log', `${err.name}\t${err.message}`, 'errorlog.txt');
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqlog.txt');

    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    //chainturnay another form of if else statement 
    let filePath =
        contentType === 'text/html' && req.url === '/' //condition
            ? path.join(__dirname, 'views', 'index.html')//code
            : contentType === 'text/html' && req.url.slice(-1) === '/'//condition
                ? path.join(__dirname, 'views', req.url, 'index.html')//code
                : contentType === 'text/html'//condition
                    ? path.join(__dirname, 'views', req.url) //code
                    : path.join(__dirname, req.url); // this is the default if everything is false

    // makes .html extension not required in the browser

    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        serveFile(filePath, contentType, res);
    } else {
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'location': '/' });
                res.end;
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
        }
    }
})
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));