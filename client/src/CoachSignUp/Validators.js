import validator from "validator";

/**
 *
 * @param {Object} details - details from coach submission form
 * @returns {Object} - current errors found in coach submission
 */
const validateDetails = (details) => {
  const curErrors = {
    email: "",
    firstName: "",
    lastName: "",
    occupation: "",
    experience: "",
  };

  if (details.firstName === "") {
    curErrors.firstName = "First name is required";
  }
  if (details.lastName === "") {
    curErrors.lastName = "Last name is required";
  }
  if (details.email === "") {
    curErrors.email = "Email is required";
  } else if (!validator.isEmail(details.email)) {
    curErrors.email = "Not a valid email address";
  }
  if (details.occupation === "") {
    curErrors.occupation = "Occupation is required";
  }
  if (details.experience === "") {
    curErrors.experience = "Years experience is required";
  }
  return curErrors;
};

export default validateDetails;
