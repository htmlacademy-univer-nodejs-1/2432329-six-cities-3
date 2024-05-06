export const LoginUserValidationMessage = {
  email: {
    invalidFormat: 'Must be a valid email',
  },
  password: {
    minLength: 'Minimum password length must be 1',
    maxLength: 'Maximum password length must be 15',
  },
} as const;
