import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export function isValidId(req, res, next) {
  const { id } = req.params;
  if (isValidObjectId(id) === false) {
    throw createHttpError(400, 'ID invalid');
  }
  next();
}
