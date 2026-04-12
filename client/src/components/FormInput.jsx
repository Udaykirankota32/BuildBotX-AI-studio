import { useState } from 'react';
import '../styles/formInput.css';

function FormInput({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  pattern,
  label,
  helpText,
}) {
  const [touched, setTouched] = useState(false);

  const handleBlur = (e) => {
    setTouched(true);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const showError = touched && error;

  return (
    <div className="form-input-wrapper">
      {label && (
        <label htmlFor={name} className="form-input-label">
          {label}
          {required && <span className="form-required">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`form-input ${showError ? 'form-input-error' : ''} ${
          !showError && touched && !error ? 'form-input-valid' : ''
        }`}
        required={required}
        pattern={pattern}
      />
      {showError && <div className="form-input-error-message">{error}</div>}
      {helpText && !showError && (
        <div className="form-input-help-text">{helpText}</div>
      )}
    </div>
  );
}

export default FormInput;
