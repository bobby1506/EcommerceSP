const isEmpty = (field, fieldName) => {
  if (!field) {
    return {
      field: fieldName,
      message: `Please enter ${fieldName}`,
    };
  }
  return null;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  isEmpty,
  isValidEmail,
  isValidPassword,
};
