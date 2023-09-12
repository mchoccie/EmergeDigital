import React, { useState } from "react";
// import PasswordStrengthBar from "react-password-strength-bar";
// import validator from "validator";
import { updatePassword } from "./Fetch";

import { Button, TextField, Grid } from "@mui/material";

const Password = ({ userType }) => {
  const [passwordError, setPasswordError] = useState("");
  const [myNewPassword, setMyPassword] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (password) => {
    var error = "";
    console.log(password.length === 0);
    if (password.length >= 6) {
      setPasswordError("");
      error = "";
    } else {
      setPasswordError("Password is too short");
      error = "Password is too short";
    }
    if (error !== "") {
      return;
    } else {
      updatePassword(myNewPassword, userType)
        ? setResult("Password updated")
        : setResult("Update failed");
    }
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            id="outlined-static"
            label="Set your new Password"
            fullWidth
            type="password"
            error={passwordError !== ""}
            helperText={myNewPassword === "" ? passwordError : ""}
            onChange={(e) => setMyPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} justify="center">
          <Button
            onClick={() => {
              handleSubmit(myNewPassword);
            }}
            type="submit"
            variant="contained"
            mt={3}
          >
            Update password
          </Button>
        </Grid>
        <Grid item xs={4} justify="center">
          {result}
        </Grid>
      </Grid>
    </div>
  );
};

export default Password;
