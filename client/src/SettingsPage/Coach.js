import React, { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import { updateDetail } from "./Fetch";

/**
 *
 * @returns {JSX} - JSX representing Settings page
 */
const Coach = () => {
  const [calendlyLink, setCalendlyLink] = useState("");
  const [myIntro, setMyIntro] = useState("");
  const [myEducation, setMyEducation] = useState("");
  const [myPhilosophy, setMyPhilosophy] = useState("");
  const [myApproaches, setMyApproaches] = useState("");
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            id="outlined-static"
            label="Calendly Link"
            fullWidth
            onChange={(e) => setCalendlyLink(e.target.value)}
          />
        </Grid>
        <Grid item xs={2} >
          <Button onClick={() => { updateDetail("coach.calendlyLink", calendlyLink) }} type="submit" variant="contained" mt={3}>
            Update Link
          </Button>
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="outlined-static"
            label="Set your Intro"
            multiline
            fullWidth
            rows={4}
            onChange={(e) => setMyIntro(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button onClick={() => { updateDetail("coach.about", myIntro) }} type="submit" variant="contained">
            Update Intro
          </Button>
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="outlined-static"
            label="Set your Education History"
            multiline
            fullWidth
            rows={4}
            onChange={(e) => setMyEducation(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button onClick={() => { updateDetail("coach.experience", myEducation) }} type="submit" variant="contained">
            Update Education
          </Button>
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="outlined-static"
            label="Set your coaching philosophy"
            multiline
            fullWidth
            rows={4}
            onChange={(e) => setMyPhilosophy(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button onClick={() => { updateDetail("coach.philosophy", myPhilosophy) }} type="submit" variant="contained">
            Update philosophy
          </Button>
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="outlined-static"
            label="Set your coaching approach"
            multiline
            fullWidth
            rows={4}
            onChange={(e) => setMyApproaches(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} justify="center">
          <Button onClick={() => { updateDetail("coach.approaches", myApproaches) }} type="submit" variant="contained" mt={3}>
            Update approaches
          </Button>
        </Grid>


      </Grid>
    </div>
  );
};

export default Coach;
