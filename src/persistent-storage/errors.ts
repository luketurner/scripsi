// tslint:disable:max-classes-per-file

export class MissingStateError extends Error {

  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, MissingStateError);
  }
}

export class InvalidPersistenceOperation extends Error {

  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, MissingStateError);
  }
}

export class WIPException extends Error {

  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, MissingStateError);
  }
}
