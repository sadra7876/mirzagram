export class HttpError extends Error {
  statusCode: number;
  result: object | undefined;

  constructor(
    statusCode: number,
    message: string,
    result: object | undefined = undefined
  ) {
    super(message);
    this.statusCode = statusCode;
    this.result = result;
  }
}
