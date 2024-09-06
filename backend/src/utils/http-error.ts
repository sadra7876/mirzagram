import { strings } from "resources/strings";

export abstract class HttpError extends Error {
  statusCode: number;
  result: object | undefined;

  constructor(
    statusCode: number,
    message: string,
    result: object | undefined = undefined
  ) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
    this.statusCode = statusCode;
    this.result = result;
  }
}

export class ServerError extends HttpError {
  constructor(message: string = strings.INTERNAL_SERVER_ERROR) {
    super(500, message);
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export class ClientError extends HttpError {
  constructor(
    message: string = strings.BAD_REQUEST_ERROR,
    statusCode: number = 400
  ) {
    super(statusCode, message);
    Object.setPrototypeOf(this, ClientError.prototype);
  }
}
