export interface ApiError {
  detail: string;
}

export interface ValidationErrorItem {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ValidationError {
  detail: ValidationErrorItem[];
}

export type ApiErrorResponse = ApiError | ValidationError;
