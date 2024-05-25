export const CreateUserValidationMessage = {
  name: {
    minLength: 'Minimum name length must be 1',
    maxLength: 'Maximum name length must be 15',
  },
  email: {
    invalidFormat: 'Must be a valid email',
  },
  type: {
    invalidFormat: 'Must be one of: Regular, Pro',
  },
  password: {
    minLength: 'Minimum password length must be 6',
    maxLength: 'Maximum password length must be 12',
  },
} as const;
