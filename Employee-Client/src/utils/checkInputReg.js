export const checkStringReg = (name) => {
  const nameReg = /^[a-zA-Z]+$/;
  return !!nameReg.exec(name);
};

export const checkNumberReg = (name) => {
  const nameReg = /^[0-9]+$/;
  return !!nameReg.exec(name);
};

export const checkEmailReg = (name) => {
  const nameReg =
    /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]+$/;
  return !!nameReg.exec(name);
};

export const isNotEmpty = (value) => !!value && value?.trim() !== "";

export const validPass = (value) => {
  // The password cannot contain any spaces.
  // The password must contain at least one lowercase letter.
  // The password must contain at least one uppercase letter.
  // The password must contain at least one digit.
  // The password must contain at least one non-word character (e.g., a special character).
  // The password must be between 8 and 30 characters in length.
  const reg = /^(?!.*[ ])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,30}$/;

  return !!value && !!reg.exec(value);
};

export const getMsgErrorValidPass = (value) => {
  let result = [];
  // The password cannot contain any spaces.
  if (value.includes(" ")) {
    result.push("· cannot contain any spaces.");
  }
  // The password must contain at least one lowercase letter.
  const regLower = /^.*[a-z].*$/m;
  if (!regLower.exec(value)) {
    result.push("· must contain at least one lowercase letter.");
  }
  // The password must contain at least one uppercase letter.
  const regUpper = /^.*[A-Z].*$/m;
  if (!regUpper.exec(value)) {
    result.push("· must contain at least one uppercase letter.");
  }
  // The password must contain at least one digit.
  const regDigit = /^.*[\d].*$/m;
  if (!regDigit.exec(value)) {
    result.push("· must contain at least one digit.");
  }
  // The password must contain at least one non-word character (e.g., a special character).
  const regSpecial = /^.*[~!@#$%^*\-_=+[{\]}\/;:,.?].*$/m;
  if (!regSpecial.exec(value)) {
    result.push("· must contain at least one special character.");
  }
  // The password must be between 8 and 30 characters in length.
  const regLength = /^\S{8,30}$/m;
  if (!regLength.exec(value)) {
    result.push("· must be between 8 and 30 characters in length.");
  }
  return result.join("\n");
};

