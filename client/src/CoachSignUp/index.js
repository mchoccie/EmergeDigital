import React, { useState } from "react";
import validator from "validator";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Button,
  Box,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import validateDetails from "CoachSignUp/Validators";

/**
 *
 * @returns {JSX} - JSX representing Signup page
 */
const CoachSignup = () => {
  const [details, setDetails] = useState({
    fields: ["firstName", "lastName", "occupation", "experience", "email"],
    firstName: "",
    lastName: "",
    occupation: "",
    experience: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    occupation: "",
    experience: "",
    email: "",
  });

  const labels = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    occupation: "Occupation",
    experience: "Years experience",
  };

  const checkEmail = (email) => {
    if (email === "" || validator.isEmail(email)) {
      setErrors({ ...errors, email: "" });
    } else {
      setErrors({ ...errors, email: "Not a valid email address" });
    }
  };

  const checkFields = (field, e) => {
    const val = e.target.value;
    if (field === "email") {
      checkEmail(val);
    } else {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const inputFields = details.fields.map((field, key) => {
    const sm =
      field === "firstName" ||
      field === "lastName" ||
      field === "occupation" ||
      field === "experience"
        ? 6
        : 12;
    // const confidential = ["password", "passwordAgain"];
    return (
      <React.Fragment key={key}>
        <Grid item xs={12} sm={sm}>
          <TextField
            autoComplete="off"
            name={field}
            label={labels[field]}
            type={"text"}
            id={field}
            required
            fullWidth
            onChange={(e) => {
              if (field === "experience")
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              setDetails({ ...details, [field]: e.target.value });
            }}
            onBlur={(e) => checkFields(field, e)}
            error={errors[field] !== ""}
            helperText={errors[field]}
          />
        </Grid>
        {/* {field === "password" && (
          <Grid item xs={12}>
            <PasswordStrengthBar password={details.password} />
          </Grid>
        )} */}
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
      curErrors.email !== "" ||
      curErrors.occupation !== "" ||
      curErrors.experience !== ""
    ) {
      return setErrors(curErrors);
    }

    //NOT SURE WHAT TO PUT IN HERE EMERGE NEEDS TO VERIFY COACHES!
    alert("Send this somewhere!");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        mt={{ xs: 0, sm: 4, md: 8, lg: 12 }}
        sx={{
          // marginTop: 8,
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
            Register Interest
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={NavLink} to="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
            <Grid item>
              <Link component={NavLink} to="/signup" variant="body2">
                Not a coach?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default CoachSignup;
