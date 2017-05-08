import os from 'os';
import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import logger, { morganStreamWriter } from './logger';
import { forwardToGzippedScripts, serveStaticAssets } from './static-assets';
import { createUniverse } from './realtime/god';
import { attachServer } from './realtime/server';

import './bootstrap';

const app = express();
const server = http.createServer(app);
const port = process.env.SERVER_PORT;

//=> Enable CORS in dev mode so the front can reach the API
if (process.env.WEBPACK_ENV == 'development') {
    app.use(cors());
}

//=> Logging of HTTP requests with morgan
const morganFormat = process.env.WEBPACK_ENV == 'production'
    ? ':remote-addr - :method :url [:status], resp. :response-time ms, :res[content-length] bytes, referrer ":referrer"'
    : 'dev';

app.use(morgan(morganFormat, { stream: morganStreamWriter }));

//=> Serve static assets
if (process.env.WEBPACK_ENV == 'production') {
    app.use(forwardToGzippedScripts);
}

app.use(serveStaticAssets);

//=> Attach socket.io server to the HTTP server
attachServer(server);

//=> Start the HTTP server
server.listen(port, () => {
    logger.info(`🌍 Up and running @ http://${os.hostname()}:${port}`);
    logger.info(`Built for: ${process.env.WEBPACK_ENV}`);

    //=> First day
    createUniverse();
});
