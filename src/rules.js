import {extend} from 'vee-validate';

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

extend('required', {
  validate(value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    };
  },
  message: '{_field_} is required',
  computesRequired: true
});

function getPasswordWeakness(password) {
  let weakness = null
  let rules = [
    {
      symbols: '!@#$%^&*()_+=/?\\~`',
      message: 'Consider using special symbols such as \'!@#$%-^&*()_+=/?\\\\~`\''
    },
    {
      symbols: 'qwertyuioplkjhgfdsazxcvbnm',
      message: 'The password must include at least one lower case letter'
    },
    {
      symbols: 'QWERTYUIOPLKJHGFDSAZXCVBNM',
      message: 'The password must include at least one upper case letter'
    },
    {
      symbols: '1234567890',
      message: 'The password must include at least one digit'
    },
  ]
  for (let ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
    let hasSym = false
    for (let sIndex = 0; sIndex < rules[ruleIndex].symbols.length; sIndex++) {
      if (password.indexOf(rules[ruleIndex].symbols[sIndex]) !== -1) {
        hasSym = true
        break;
      }
    }
    if (!hasSym) {
      weakness = rules[ruleIndex].message
      break
    }
  }

  return weakness
}

extend('strong_password', function v() {
  this.validate = (value) => {
    this.weakness = getPasswordWeakness(value);
    return null === this.weakness
  }
  this.message = () => {
    return this.weakness
  },
  this.computesRequired = true
});

export default extend