const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');



//HTTP SERVER
const sendFile = (res, filePath, type) => {
    const fullfilePath = `${__dirname}/${filePath}`;

    res.writeHead(200, {
        'Content-Type': type
    });
    const readStream = fs.createReadStream(fullfilePath);
    readStream.pipe(res);
};

const httpServer = http.createServer((req, res) => {
    if(req.url === '/') {
        sendFile(res, 'public/index.html', 'text/html');
        return
    };
    if(req.url === '/js/main.js') {
        sendFile(res, 'public/js/main.js', 'application/javascript');
        return
    };

    res.writeHead(404);
    res.end();
});
httpServer.listen(3000, function() {
    console.log((new Date()) + 'Server is listening on port 3000');
});

//WEBSOCKET(WS) server

const wsServer = new WebSocket.Server({ server: httpServer });
    wsServer.on('connection', (socket) => {
        console.log((new Date()) + 'New WS connection'); 
        socket.on('message', (data) => {
            //console.log(socket)
            console.log(`Frontend send ${data}`)
        });
    });

