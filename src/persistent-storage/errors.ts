export class MissingStateError extends Error {

  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, MissingStateError);
  }
}