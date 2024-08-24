import * as fs from 'node:fs';

import swaggerUI from 'swagger-ui-express';

import { SWAGGER_PATH } from '../constants/index.js';
import createHttpError from 'http-errors';

export function swaggerDocs() {
  try {
    const doc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(doc)];
  } catch (error) {
    return (req, res, next) => {
      next(createHttpError(500, 'Can not load swagger docs'));
    };
  }
}
