export interface ValidationErrorResult {
    title: string;
    status: number;
    errors: { [key: string]: string[] }
}

export function isValidationErrorResult(error: any): error is ValidationErrorResult {
    return error && typeof error === 'object' && 'errors' in error;
}

export function getValidationMessages(validationErrorResult: ValidationErrorResult){
    const errors = validationErrorResult.errors;
    return Object.keys(errors).flatMap(key => errors[key][0])
}