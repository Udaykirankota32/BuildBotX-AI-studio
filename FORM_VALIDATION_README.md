# Authentication UI & Form Validation System

## Overview
This documentation covers the improved authentication UI with centered alerts, field-level validation, and reusable form components.

## Components

### 1. **FormInput Component** (`components/FormInput.jsx`)
Reusable form input component with built-in validation and error display.

**Features:**
- Field-level error messages
- On-blur validation
- Success state (green border)
- Help text support
- Smooth animations
- Accessibility (label, ARIA)

**Usage:**
```jsx
<FormInput
  type="email"
  name="email"
  placeholder="Enter email"
  value={formData.email}
  onChange={handleChange}
  onBlur={() => handleFieldBlur('email')}
  error={fieldErrors.email}
  label="Email Address"
  required
/>
```

### 2. **ToastContext** (`context/ToastContext.jsx`)
Updated toast system with support for multiple stacked alerts.

**Features:**
- Top-center positioning
- 4-second auto-dismiss
- Multiple alert stacking
- Success/Error/Warning/Info types

**Usage:**
```jsx
const { showToast } = useContext(ToastContext);
showToast('Account created!', 'success');
showToast('Invalid email', 'error');
```

## Validation Service (`services/validationService.js`)

### Available Functions

#### `validateField(fieldName, value)`
Validates a single field and returns error message (or empty string if valid).

```jsx
const error = validateField('email', 'user@example.com');
// Returns: '' (valid)

const error = validateField('password', '123');
// Returns: 'Password must be at least 6 characters'
```

#### `validateForm(formData, fields)`
Validates multiple fields at once.

```jsx
const errors = validateForm(
  { name: '', email: 'test@example.com', password: '123456' },
  ['name', 'email', 'password']
);
// Returns: { name: 'This field is required' }
```

#### `hasFormErrors(errors)`
Checks if validation object has any errors.

```jsx
if (hasFormErrors(errors)) {
  return; // Don't submit
}
```

### Validation Rules

| Field | Rules |
|-------|-------|
| **name** | Required, min 2 characters |
| **email** | Required, valid email format |
| **password** | Required, min 6 characters |

## CSS Files

### `styles/toast.css`
- Centered top positioning
- Fade-in animation
- Color variants (success/error/warning/info)
- Responsive sizing

### `styles/formInput.css`
- Error state (red border)
- Success state (green border)
- Error message display
- Help text styling
- Focus/blur transitions

## Implementation Example

**LoginPage.jsx:**
```jsx
const [formData, setFormData] = useState({ email: '', password: '' });
const [fieldErrors, setFieldErrors] = useState({});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  
  // Clear error on input
  if (fieldErrors[name]) {
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
  }
};

const handleFieldBlur = (fieldName) => {
  const error = validateField(fieldName, formData[fieldName]);
  setFieldErrors((prev) => ({ ...prev, [fieldName]: error }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  
  // Validate all fields
  const errors = validateForm(formData, ['email', 'password']);
  setFieldErrors(errors);
  
  if (hasFormErrors(errors)) return;
  
  // Submit form
};
```

## Styling

### Error Message
- **Color:** Red (#ef4444)
- **Icon:** Warning emoji
- **Position:** Below input field

### Success State
- **Border:** Green (#10b981)
- **Background:** Light green tint

### Alert/Toast
- **Position:** Top-center (`left: 50%; transform: translateX(-50%)`)
- **Auto-dismiss:** 4 seconds
- **Animation:** Fade-in from top

## Adding New Validations

To add a new validation rule, update `validationService.js`:

```javascript
export const validateField = (fieldName, value) => {
  if (!value) return 'This field is required';
  
  switch (fieldName) {
    case 'phone':
      if (!/^\d{10}$/.test(value)) {
        return 'Phone must be 10 digits';
      }
      break;
    // ...
  }
  return '';
};
```

Then use in FormInput:
```jsx
<FormInput
  name="phone"
  onBlur={() => handleFieldBlur('phone')}
  error={fieldErrors.phone}
/>
```

## Benefits

✅ **Consistent validation** across forms  
✅ **Reusable components** reduce code duplication  
✅ **Better UX** with field-level errors and visual feedback  
✅ **Centered alerts** for better visibility  
✅ **On-blur validation** catches errors early  
✅ **Clear error messages** help users fix issues  
✅ **Auto-dismiss alerts** don't clutter the UI  

## Browser Support

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers
