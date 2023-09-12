import React, { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import validator from "validator";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login, setUserCoach, setUserLeader } from "Reducers/UserSlice";
import validateDetails from "SignupPage/Validators";

/**
 * Uses the fetch API to send a sign up
 * request to the backend server
 * @param {Object} credentials - object of new user details
 * @returns {Object} - data response from backend OR undefinec
 */
async function signupUser(credentials) {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/auth/signup", {
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
  const dispatch = useDispatch();

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

  // creating input fields for signup form
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

    dispatch(login());
    res.userType === "leader"
      ? dispatch(setUserLeader())
      : dispatch(setUserCoach());
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        mt={{ xs: 0, sm: 4, md: 8, lg: 12 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
          <Grid container>
            <Grid item xs>
              <Link component={NavLink} to="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
            <Grid item>
              <Link component={NavLink} to="/coachsignup" variant="body2">
                Interested as a coach?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
