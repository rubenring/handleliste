class ApiError extends Error {
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
export class NotAuthorized extends ApiError {
  constructor(message) {
    super(message);
    this.type = "NotAutorized";
    this.status = 401;
  }
}
export class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}
export class NotFoundInDbError extends Error {
  constructor(message) {
    super(message);
    this.type = "NotFoundInDbError";
  }
}
export class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
  }
}

class CryptError extends Error {
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
