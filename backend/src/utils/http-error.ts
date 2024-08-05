export class HttpError extends Error {
  statusCode: number;
  details: object | string | undefined;

  constructor(statusCode: number, message: string, details?: object | string) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}
