export class HttpError extends Error {
  statusCode: number;
  result: object | null;

  constructor(statusCode: number, message: string, result: object | null = null) {
    super(message);
    this.statusCode = statusCode;
    this.result = result;
  }
}
