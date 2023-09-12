import React, { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import validator from "validator";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import validateDetails from "SignupPage/Validators";

/**
 * Uses the fetch API to send a sign up
 * request to the backend server
 * @param {Object} credentials - object of new user details
 * @returns {Object} - data response from backend OR undefinec
 */
async function signupUser(credentials) {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/admin/create-coach", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

/**
 *
 * @returns {JSX} - JSX representing Signup page
 */
const Signup = () => {
  const [details, setDetails] = useState({
    fields: ["firstName", "lastName", "email", "password", "passwordAgain"],
    firstName: "",
    lastName: "",
    password: "",
    passwordAgain: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    password: "",
    passwordAgain: "",
    email: "",
  });

  const [createResponse, setCreateResponse] = useState("");

  const labels = {
    firstName: "First Name",
    lastName: "Last Name",
    password: "Password",
    passwordAgain: "Re-enter password",
    email: "Email Address",
  };

  const checkEmail = (email) => {
    if (email === "" || validator.isEmail(email)) {
      setErrors({ ...errors, email: "" });
    } else {
      setErrors({ ...errors, email: "Not a valid email address" });
    }
  };

  const checkPassword = (password) => {
    if (password === "" || password.length >= 6) {
      setErrors({ ...errors, password: "" });
    } else {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters long",
      });
    }
  };

  const checkFields = (field, e) => {
    const val = e.target.value;
    if (field === "email") {
      checkEmail(val);
    } else if (field === "password") {
      checkPassword(val);
    } else {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const inputFields = details.fields.map((field, key) => {
    const sm = field === "firstName" || field === "lastName" ? 6 : 12;
    const confidential = ["password", "passwordAgain"];
    return (
      <React.Fragment key={key}>
        <Grid item xs={12} sm={sm}>
          <TextField
            autoComplete={confidential.includes(field) ? "new-password" : "off"}
            name={field}
            label={labels[field]}
            type={confidential.includes(field) ? "password" : "text"}
            id={field}
            required
            fullWidth
            onChange={(e) =>
              setDetails({ ...details, [field]: e.target.value })
            }
            onBlur={(e) => checkFields(field, e)}
            error={errors[field] !== ""}
            helperText={errors[field]}
          />
        </Grid>
        {field === "password" && (
          <Grid item xs={12}>
            <PasswordStrengthBar password={details.password} />
          </Grid>
        )}
      </React.Fragment>
    );
  });

  /**
   * Carries out standard email checks to ensure
   * signup is successful. If successful sign up occurs
   * then a success message is sent. Else
   * appropriate alerts are sent
   * @param {*} e - data for form submit
   * @returns {Function} - returns alert or undefined
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const curErrors = validateDetails(details);

    if (
      curErrors.firstName !== "" ||
      curErrors.lastName !== "" ||
      curErrors.password !== "" ||
      curErrors.passwordAgain !== "" ||
      curErrors.email !== ""
    ) {
      return setErrors(curErrors);
    }

    const res = await signupUser({
      email: details.email,
      password: details.password,
      firstName: details.firstName,
      lastName: details.lastName,
    });
    console.log(res);
    if (res === "Email exists") {
      return alert("Email exists");
    }

    setCreateResponse("Coach created!");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add Coa ch
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          mt={{ xs: 2, sm: 3 }}
        >
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {inputFields}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {createResponse !== "" ? createResponse : createResponse}
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
