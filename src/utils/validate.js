export const checkValidData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
    password
  );

  if (!isEmailValid) return 'Please enter a valid email address';
  if (!isPasswordValid)
    return 'Your password must contain minimum 8 characters, atleast one letter and one number';

  // If both email and password are valid return null
  return null;
};
