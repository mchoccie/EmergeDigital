import React, { useState } from "react";
import { useDispatch } from "react-redux";
import validator from "validator";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  login,
  setFirstName,
  setLastName,
  setUserCoach,
  setUserLeader,
  setUserAdmin,
  setUserId,
} from "Reducers/UserSlice";
import validateDetails from "LoginPage/Validators";

/**
 * Login function uses the fetch API to send
 * credentials to backend via POST request
 * @param {Object} credentials - Login credentials to send to backend
 * @returns {Object} - Resolved request promise containing backend response
 */
async function loginUser(credentials) {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

/**
 * Login function calls loginUser function to
 * log a user in. If login is successful the function
 * returns a token. Else sends an alert
 * @returns {JSX} - JSX representing Login page
 */
const Login = () => {
  const [failedAuth, setFailedAuth] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const checkEmail = (email) => {
    if (email === "" || validator.isEmail(email)) {
      setErrors({ ...errors, email: "" });
    } else {
      setErrors({ ...errors, email: "Not a valid email address" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const curErrors = validateDetails(details);
    if (curErrors.email !== "" || curErrors.password !== "") {
      return setErrors(curErrors);
    }
    const res = await loginUser({
      email: details.email,
      password: details.password,
    });
    if (res === "Incorrect username/password") {
      setFailedAuth(true);
    } else {
      dispatch(login());
      dispatch(setUserId(res.id.toString()));
      dispatch(setFirstName(res.firstName));
      dispatch(setLastName(res.lastName));
      if (res.userType === "leader") dispatch(setUserLeader());
      else if (res.userType === "coach") dispatch(setUserCoach());
      else if (res.userType === "admin") dispatch(setUserAdmin());
      else alert("Something went wrong!");
    }
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
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            autoFocus
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            onBlur={(e) => checkEmail(e.target.value)}
            error={errors.email !== ""}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            onBlur={(e) => setErrors({ ...errors, password: e.target.value })}
            error={errors.password !== "" && details.password === ""}
            helperText={details.password === "" ? errors.password : ""}
          />
          {failedAuth && (
            <Alert severity="error">Invalid login credentials</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={NavLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            <Grid item>
              <Link component={NavLink} to="/forgot" variant="body2">
                {"I forgot my password"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
