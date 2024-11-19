function createError(status, name) {
  return class extends Error {
    constructor(message = name) {
      super(message);
      this.status = status;
    }
  };
}

const badRequestError = createError(400, "Bad request");
const unauthorizedError = createError(401, "Unauthorized");
const forbiddenError = createError(403, "Forbidden");
const notFoundError = createError(404, "Not found");
const conflictError = createError(409, "Conflict");
const serverError = createError(500, "Server error");

module.exports = {
  badRequestError,
  unauthorizedError,
  forbiddenError,
  notFoundError,
  conflictError,
  serverError,
};
