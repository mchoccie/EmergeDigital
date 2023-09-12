import React from "react";
import { Box, TextField, Button } from "@mui/material";

async function linkLeader(credentials) {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/coach/leader", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const LinkingDevPage = () => {
  const [leaderID, setLeaderID] = React.useState("");

  const handleSetLeaderID = (event) => {
    setLeaderID(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(leaderID);
    const res = await linkLeader({
      match: {
        email: {
          _id: leaderID,
        },
      },
    });
    console.log(res);
  };
  return (
    <>
      <h1>Dev page</h1>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            label="LeaderEmail"
            id="outlined-size-normal"
            defaultValue=""
            onChange={handleSetLeaderID}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Link leader
          </Button>
        </div>
      </Box>
    </>
  );
};

export default LinkingDevPage;
