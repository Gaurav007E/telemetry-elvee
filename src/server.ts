import WebSocket, {WebSocketServer} from 'ws';
import http from 'http';
import * as zlib from 'zlib';

const server = http.createServer((req, res) => {
    console.log(req);
    // res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'WebSocket server is running'}));
});

const wss = new WebSocketServer({server});

wss.on('connection', (ws: WebSocket) => {
    console.log('A new client connected!');
    ws.on('message', (data: WebSocket.RawData, isBinary: boolean) => {
        console.log("rowData Buffer", data)
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