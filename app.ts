import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;