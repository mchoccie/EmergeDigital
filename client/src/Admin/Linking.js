import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Container,
  Typography,
} from "@mui/material";

async function post(path, body) {
  return fetch(process.env.REACT_APP_BACKEND_URL + path, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((r) => r.json().then((data) => ({ status: r.status, body: data })));
}

const Linking = () => {
  const [leaderEmail, setLeaderEmail] = useState("");
  const [coachEmail, setCoachEmail] = useState("");
  const [linkResponse, setLinkResponse] = useState("");

  const updateLeaderEmail = (event) => {
    setLeaderEmail(event.target.value);
  };

  const updateCoachEmail = (event) => {
    setCoachEmail(event.target.value);
  };

  const handleSubmitLink = async (e) => {
    e.preventDefault();
    const res = await post("/api/admin/link", {
      leader: leaderEmail,
      coach: coachEmail,
    });
    console.log(res.status);
    setLinkResponse(res.body);
  };

  const handleSubmitUnlink = async (e) => {
    e.preventDefault();
    const res = await post("/api/admin/unlink", {
      leader: leaderEmail,
      coach: coachEmail,
    });
    setLinkResponse(res.body);
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
          Link Leaders and Coaches
        </Typography>
      </Box>
      <Box mt={{ xs: 2, sm: 3 }}>
        <Grid container component="form" spacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={12}>
            <TextField
              label="Leader Email"
              id="outlined-size-normal"
              defaultValue=""
              fullWidth
              onChange={updateLeaderEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Coach Email"
              id="outlined-size-normal"
              defaultValue=""
              fullWidth
              onChange={updateCoachEmail}
            />
          </Grid>
          <Grid item xs={12}>
            {linkResponse !== "" ? linkResponse : ""}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={handleSubmitLink}
            >
              Link
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={handleSubmitUnlink}
            >
              Unlink
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Linking;
