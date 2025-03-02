const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(req.url);

    if (req.url.startsWith('/css/') || req.url.startsWith('/assets/') || req.url.startsWith('/js/')) {
        const filePath = path.join(__dirname, req.url);

        const ext = path.extname(filePath);
        let contentType = 'text/plain';
        if (ext === '.css') contentType = 'text/css';
        if (ext === '.js') contentType = 'application/javascript';
        if (ext === '.png') contentType = 'image/png';
        if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';

        res.setHeader('Content-Type', contentType);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('File not found');
            } else {
                res.end(data);
            }
        });
        return;
    }

    res.setHeader('Content-Type', 'text/html');
    let filePath = path.join(__dirname, 'pages');

    switch (req.url) {
        case '/':
            filePath = path.join(filePath, 'home', 'index.html');
            res.statusCode = 200;
            break;
        case '/about':
            filePath = path.join(filePath, 'about', 'about.html');
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            return;
        case '/calculator':
            filePath = path.join(filePath, 'calculator', 'main.html');
            res.statusCode = 200;
            break;
        case '/notes':
            filePath = path.join(filePath, 'note', 'note.html');
            res.statusCode = 200;
            break;
        case '/resume':
            filePath = path.join(filePath, 'resume', 'portfolio.html');
            res.statusCode = 200;
            break;
        default:
            filePath = path.join(filePath, 'error', '404.html');
            res.statusCode = 404;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        } else {
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});
