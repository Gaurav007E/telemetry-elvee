import WebSocket, {WebSocketServer} from 'ws';
import http from 'http';

const server = http.createServer((req, res) => {
    console.log(req);
    // res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'WebSocket server is running'}));
});

const wss = new WebSocketServer({server});

wss.on('connection', (ws: WebSocket) => {
    console.log('A new client connected!');

    ws.on('message', (data: any, isBinary: boolean) => {
        console.log(typeof data)
        if (isBinary) {
            const enc = new TextDecoder("utf-8");
            const arr = new Uint8Array(data);
            console.log(data);
            console.log(isBinary);
            console.log(enc.decode(arr));
        } else {
            console.log("Not binary")
        }
    });


    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
