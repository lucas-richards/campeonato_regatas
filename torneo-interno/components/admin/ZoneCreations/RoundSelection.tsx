import { Grid, Button } from "@mui/material";
import React from "react";

export interface RoundSelectionProps {
  rounds: number[];
  onRoundSelected: any;
  onNewRound: any;
}

const RoundSelection = (props: RoundSelectionProps) => {
  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          <Grid container>
            {(props.rounds || []).map((el) => (
              <Grid item key={el} lg={1} md={2} sm={4}>
                <Button variant="outlined">{el}</Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Button variant="text" onClick={props.onNewRound}>
            Nueva ronda
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default RoundSelection;
