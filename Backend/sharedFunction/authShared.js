// Shared utilities for validation
//ismee optimization karna hai agar array ya number aay ato kya karne ka
const isEmpty = (field, fieldName) => {
  if (!field || field.trim() === "") {
    return {
      field: fieldName,
      message: `Please enter ${fieldName}`,
    };
  }
  return null;
};

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
const isValidPassword = (password) => {
  // Example: Password must be 8+ characters, contain a number, uppercase and lowercase
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  isEmpty,
  isValidEmail,
  isValidPassword,
};
