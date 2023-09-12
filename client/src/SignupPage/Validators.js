import validator from "validator";

// function to error check submission details
const validateDetails = (details) => {
  const curErrors = {
    password: "",
    passwordAgain: "",
    email: "",
    firstName: "",
    lastName: "",
  };

  if (details.firstName === "") {
    curErrors.firstName = "First name is required";
  }
  if (details.lastName === "") {
    curErrors.lastName = "Last name is required";
  }
  if (details.password === "") {
    curErrors.password = "Password is required";
  } else if (details.password.length < 6) {
    curErrors.password = "Password must be at least 6 characters long";
  }
  if (details.passwordAgain === "") {
    curErrors.passwordAgain = "Matching password is required";
  } else if (details.password !== details.passwordAgain) {
    curErrors.passwordAgain = "Passwords did not match";
  }
  if (details.email === "") {
    curErrors.email = "Email is required";
  } else if (!validator.isEmail(details.email)) {
    curErrors.email = "Not a valid email address";
  }
  return curErrors;
};

export default validateDetails;
