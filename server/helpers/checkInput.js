import validator from 'validator';


const checkInput = (inputValue) => {
  const errors = {};
  Object.keys(inputValue).forEach((key) => {
    if (!inputValue[key] || (validator.isEmpty(inputValue[key]))) {
      errors[key] = `${key} field is undefined`;
    } else {
      /*
      *Party input Validation
      */
      if (key === 'name' || key === 'type') {
        if (!(validator.isLength(inputValue[key], { min: 3, max: 50 }))) {
          errors[key] = `${key} must be between 3 to 50 characters`;
        }
      }
      if (key === 'about') {
        if (!(validator.isLength(inputValue[key], { min: 20, max: 1000 }))) {
          errors[key] = `${key} field must be between 20 to 1000 characters`;
        }
      }
      if (key === 'phonenumber') {
        if (inputValue[key].match(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/) === null) {
          errors[key] = `Invalid ${key}`;
        }
      }
      if (key === 'hqAddress') {
        if (inputValue[key].match(/^[0-9a-zA-Z ]+$/) === null) {
          errors[key] = `Invalid ${key}`;
        }
      }

      if (key === 'logoUrl' || key === 'passportUrl') {
        if (inputValue[key].match(/\.(gif|jpg|jpeg|tiff|png|mp4)$/i) === null) {
          errors[key] = `Invalid ${key}`;
        }
      }
      // if (key === 'userId') {
      //   if (inputValue[key].match(/^\d*$/) === null) {
      //     errors[key] = `Invalid ${key}`;
      //   }
      // }

      if (key === 'name' || key === 'type' || key === 'firstName' || key === 'lastName' || key === 'otherName') {
        if (inputValue[key].search(/[^A-Za-z\s]/) !== -1) {
          errors[key] = `${key} can only be alphabetical`;
        }
      }
      if (key === 'email') {
        if (!validator.isEmail(inputValue[key])) {
          errors[key] = `Invalid ${key}`;
        }
      }
      if (key === 'password') {
        if (!validator.isLength(inputValue[key], { min: 8, max: 50 })) {
          errors[key] = `${key} must between 8 and 50 characters`;
        }
      }
    }
  });
  return errors;
};
export default checkInput;
