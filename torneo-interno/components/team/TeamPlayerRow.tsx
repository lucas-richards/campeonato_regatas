import React from "react";
import { Grid, Typography } from "@mui/material";
import { TeamPlayer } from "../../models/Team";
import classes from "./TeamPlayerRow.module.scss";

export interface TeamPlayerRowProps {
  player: TeamPlayer;
  captain?: boolean;
}

const positionClass = ["goalkeeper", "defender", "midfielder", "forward"];

const TeamPlayerRow = (props: TeamPlayerRowProps) => {
  return (
    <Grid
      container
      key={props.player.dni}
      className={`${classes.player} ${props.captain ? classes.captain : ""}`}
      pl={2}
    >
      <Grid item xs={8}>
        <Typography variant="body2">{`${props.player.name} ${props.player.lastName}`}</Typography>
      </Grid>
      <Grid
        item
        xs={2}
        className={classes[positionClass[props.player.position.value - 1]]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography noWrap align="center" variant="body2">
          {props.player.position.symbol}
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography noWrap align="center" variant="body2">
          {props.player.level.symbol}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TeamPlayerRow;
