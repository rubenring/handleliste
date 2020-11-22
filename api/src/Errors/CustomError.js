import logger from "../logging/config.js";

class CustomErrorsWithLogging extends Error {
  constructor(message) {
    super(message);
    logger.error(`Stack ${this.stack} - message ${message}`);
  }
}

class ApiError extends CustomErrorsWithLogging {
  constructor(message) {
    super(message);
    this.name = "ApiError";
  }
}

export class BadRequest extends ApiError {
  constructor(message) {
    super(message);
    this.type = "BadRequest";
    this.status = 400;
  }
}
export class NotFound extends ApiError {
  constructor(message) {
    super(message);
    this.type = "NotFound";
    this.status = 404;
  }
}
export class NotAuthenticated extends ApiError {
  constructor(message) {
    super(message);
    this.type = "NotAuthenticated";
    this.status = 401;
  }
}
export class NotAuthorized extends ApiError {
  constructor(message) {
    super(message);
    this.type = "NotAutorized";
    this.status = 403;
  }
}
export class NotModified extends ApiError {
  constructor(message) {
    super(message);
    this.type = "NotModified";
    this.status = 204;
  }
}

export class DatabaseError extends CustomErrorsWithLogging {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}
export class NotFoundInDbError extends DatabaseError {
  constructor(message) {
    super(message);
    this.type = "NotFoundInDbError";
  }
}
export class AuthenticationError extends CustomErrorsWithLogging {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
  }
}

class CryptError extends CustomErrorsWithLogging {
  constructor(message) {
    super(message);
    this.name = "CryptError";
  }
}

export class EncryptionError extends CryptError {
  constructor(message) {
    super(message);
    this.type = "EncryptionError";
  }
}

export class CompareCryptError extends CryptError {
  constructor(message) {
    super(message);
    this.type = "CompareCryptError";
  }
}
