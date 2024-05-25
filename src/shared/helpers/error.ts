import { ApplicationError, ValidationErrorField } from '../libs/rest';

export function createErrorObject(
  errorType: ApplicationError,
  error: string,
  details: ValidationErrorField[] = []
) {
  return { errorType, error, details };
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
