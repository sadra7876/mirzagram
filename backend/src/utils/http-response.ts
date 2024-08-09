export abstract class ApiResponse<R> {
    constructor(
      readonly statusCode: number, 
      readonly isSuccess: boolean, 
      readonly result?: R, 
      readonly messages?: string[]) {}
  }
  
  export class ApiSuccess<R> extends ApiResponse<R> {
    constructor(result?: R, messages?: string[], statusCode: number = 200) {
        super(statusCode, true, result, messages);
    }
  }
  
  export class ApiError<R> extends ApiResponse<R> {
    constructor(statusCode = 500, result?: R, messages?: string[]) {
        super(statusCode, false, result, messages);
    }
  }