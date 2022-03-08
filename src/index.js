import { handler } from './handler.js';
import compression from 'compression';
import express from 'express';

/* global PATH_ENV, HOST_ENV, PORT_ENV */

export const path = process.env[PATH_ENV] || false;
export const host = process.env[HOST_ENV] || '0.0.0.0';
export const port = process.env[PORT_ENV] || (!path && '3000');

/**
 * @param {express.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>>} res
 */
function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

const server = express();
server.use(compression({ filter: shouldCompress }));
server.use(handler);
server.listen(3000, () => {
	console.log(`Listening on port ${port}`);
});

export { server };
