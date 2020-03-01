import {extend} from 'vee-validate';
import { confirmed, required } from 'vee-validate/dist/rules';

extend('confirmed', {
  ...confirmed,
  message: 'Fields should match'
})
extend('max', {
  validate(value, args) {
    return value.length <= args.max;
  },
  message: '{_field_} is maximum {max} symbols length',
  params: ['max']
});

extend('min', {
  validate(value, args) {
    return value.length >= args.min;
  },
  message: '{_field_} is minimum {min} symbols length',
  params: ['min']
});

extend('positive', {
  validate(value, args) {
    if ([undefined, null].indexOf(value) !== -1) {
      return true
    }
    return parseInt(value) >= 0 && parseInt(value) == value;
  },
  message: '{_field_} should be positive number'
});

extend('required', {
  ...required,
  message: '{_field_} is required'
});

extend('has_special', {
  validate(value, args) {
    let specials = '!@#$%^&*()_+=/?\\~`'
    for (let sIndex = 0; sIndex < specials.length; sIndex++) {
      if (value.indexOf(specials[sIndex]) !== -1) {
        return true
      }
    }
    return false
  },
  message: 'Consider using special symbols such as \'!@#$%-^&*()_+=/?\\\\~`\''
});

extend('has_alpha', {
  validate(value, args) {
    let alpha = 'qwertyuioplkjhgfdsazxcvbnm'
    for (let sIndex = 0; sIndex < alpha.length; sIndex++) {
      if (value.indexOf(alpha[sIndex]) !== -1) {
        return true
      }
    }
    return false
  },
  message: '{_field_} must include at least one lower case letter'
});

extend('has_upper_alpha', {
  validate(value, args) {
    let alpha = 'QWERTYUIOPLKJHGFDSAZXCVBNM'
    for (let sIndex = 0; sIndex < alpha.length; sIndex++) {
      if (value.indexOf(alpha[sIndex]) !== -1) {
        return true
      }
    }
    return false
  },
  message: '{_field_} must include at least one upper case letter'
});

extend('has_digits', {
  validate(value, args) {
    let digits = '1234567890'
    for (let sIndex = 0; sIndex < digits.length; sIndex++) {
      if (value.indexOf(digits[sIndex]) !== -1) {
        return true
      }
    }
    return false
  },
  message: '{_field_} must include at least one digit'
});

export default extend