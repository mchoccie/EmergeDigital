import validator from "validator";

const validateDetails = (details) => {
  const curErrors = {
    email: "",
    password: "",
  };
  if (details.email === "") {
    curErrors.email = "Email is required";
  } else if (!validator.isEmail(details.email)) {
    curErrors.email = "Not a valid email address";
  }
  if (details.password === "") {
    curErrors.password = "Password is required";
  }
  return curErrors;
};

export default validateDetails;
