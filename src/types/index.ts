export interface ResponseResult<T> {
  data: T;
  statusCode: number;
  timestamp: string;
  error?: string;
  message: string;
}
