/**
 * Field Validation Utilities
 * Provides reusable validation functions for form fields
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateName = (name) => {
  return name && name.trim().length > 0;
};

export const validateField = (fieldName, value) => {
  const trimmedValue = typeof value === 'string' ? value.trim() : value;

  // Check if empty
  if (!trimmedValue) {
    return 'This field is required';
  }

  // Field-specific validation
  switch (fieldName) {
    case 'email':
      if (!validateEmail(value)) {
        return 'Invalid email format';
      }
      break;

    case 'password':
      if (!validatePassword(value)) {
        return 'Password must be at least 6 characters';
      }
      break;

    case 'name':
      if (!validateName(value)) {
        return 'Name cannot be empty';
      }
      if (trimmedValue.length < 2) {
        return 'Name must be at least 2 characters';
      }
      break;

    default:
      break;
  }

  return '';
};

/**
 * Validate entire form object
 * @param {Object} formData - Form data object
 * @param {Array} fields - Array of field names to validate
 * @returns {Object} - Object with field names as keys and error messages as values
 */
export const validateForm = (formData, fields) => {
  const errors = {};

  fields.forEach((fieldName) => {
    const error = validateField(fieldName, formData[fieldName] || '');
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};

/**
 * Check if form has any errors
 * @param {Object} errors - Errors object from validateForm
 * @returns {Boolean}
 */
export const hasFormErrors = (errors) => {
  return Object.keys(errors).length > 0;
};
