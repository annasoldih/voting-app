class HttpException extends Error {
  code: number;

  status: number;

  message: string;

  error: boolean;

  constructor(code: number, message: string, error: boolean) {
    super(message);
    this.code = code;
    this.status = code;
    this.message = message;
    this.error = error;
  }

  static fail(code: number, message: string) {
    return new HttpException(code, message, true);
  }

  static success() {
    return new HttpException(1, 'success', false);
  }
}

export default HttpException;
