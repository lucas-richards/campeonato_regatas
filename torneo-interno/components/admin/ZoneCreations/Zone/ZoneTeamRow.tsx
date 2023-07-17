import React from "react";
import { Grid, Typography } from "@mui/material";
import { ZoneTeam } from "../../../../models/Team";
import classes from "./ZoneTeamRow.module.scss";

export interface ZoneTeamRowComponentProps {
  team: ZoneTeam;
}

const ZoneTeamRowComponent = (
  props: React.PropsWithChildren<ZoneTeamRowComponentProps>
) => {
  return (
    <Grid container key={props.team.name} pl={2} className={classes.team}>
      <Grid item xs={12}>
        <Typography variant="body2">{props.team.name}</Typography>
      </Grid>
    </Grid>
  );
};

export default ZoneTeamRowComponent;
