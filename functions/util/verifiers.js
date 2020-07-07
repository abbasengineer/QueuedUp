const isBlank = (string) => {
  if (string.trim() === "") {
    return true;
  }

  return false;
};

const isUCSCEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@ucsc.edu$/;

  if (email.match(regex)) {
    return true;
  }

  return false;
};

let isSignUpVerified = (data) => {
  let errors = {};

  if (isBlank(data.fullName)) {
    errors.fullName = "Must provide full name";
  }

  if (isBlank(data.username)) {
    errors.username = "Must provide username";
  }

  if (isBlank(data.email)) {
    errors.email = "Must provide email";
  } else if (!isUCSCEmail(data.email)) {
    errors.email = "Must use @ucsc.edu email";
  }

  if (isBlank(data.password)) {
    errors.password = "Must provide password";
  }

  if (isBlank(data.confirmPassword)) {
    errors.confirmPassword = "Must confirm password";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Nonmatching passwords";
  }

  return {
    valid: Object.keys(errors).length > 0 ? false : true,
    errors,
  };
};

let isLogInVerified = (data) => {
  let errors = {};

  if (isBlank(data.email)) {
    errors.email = "Must provide email";
  }
  if (isBlank(data.password)) {
    errors.password = "Must provide password";
  }

  return {
    valid: Object.keys(errors).length > 0 ? false : true,
    errors,
  };
};

module.exports = { isBlank, isSignUpVerified, isLogInVerified };
