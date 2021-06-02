const http = require('http');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('A request is made')
});
server.listen(port, () => {
    console.log('listening on port ${port}')
})