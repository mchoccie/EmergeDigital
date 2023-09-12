import React, { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";


const ForgotPage = () => {
  const [email, setEmail] = useState("");
  const [resetResponse, setResetResponse] = useState("");

  async function resetPassword(email) {
    const body = {
      email: email
    };
    return fetch(process.env.REACT_APP_BACKEND_URL + "/api/auth/resetpass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((r) => r.json());
  };

  async function handleReset(email) {
    const res = await resetPassword(email);
    setResetResponse(res.message);
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            id="outlined-static"
            label="Email address"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={2} >
          <Button onClick={() => { handleReset(email) }} type="submit" variant="contained" mt={3}>
            Request reset
          </Button>
        </Grid>
        <Grid item xs={12}>
          {resetResponse !== "" ? resetResponse : ""}
        </Grid>
      </Grid>
    </div>
  );
}

export default ForgotPage;