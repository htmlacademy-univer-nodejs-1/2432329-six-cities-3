export const CreateCommentValidationMessage = {
  comment: {
    minLength: 'Minimum length of comment must be 5',
    maxLength: 'Maximum length of comment must be 1024',
  },
  rating: {
    min: 'Min value of rating must be 1',
    max: 'Max value of rating must be 5',
  },
} as const;
