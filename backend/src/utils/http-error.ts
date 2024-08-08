export class HttpError extends Error {
  statusCode: number;
  details: object | string | undefined;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
