const isBlank = (string) => {
  if (string.trim() === "") {
    return true;
  }

  return false;
};

const isEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(regex)) {
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
  } else if (!isEmail(data.email)) {
    errors.email = "Must provide a valid email";
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

let trimUserInfo = (data) => {
  let userInfo = {};

  // if (!isBlank(data.aboutMe.trim())) {
  //   userInfo.aboutMe = data.aboutMe;
  // }

  return userInfo;
};

module.exports = { isBlank, isSignUpVerified, isLogInVerified, trimUserInfo };
