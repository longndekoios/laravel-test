export interface HttpResponse<T> {
  status_code: number;
  message: string
  data?: T
}