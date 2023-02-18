import React, { PropsWithChildren } from "react";
import { Grid, Typography } from "@mui/material";
import { TeamView } from "../../models/Team";
import TeamPlayerRow from "./TeamPlayerRow";
import { Player } from "../../models/Player";

interface TeamComponentProps {
  team: TeamView;
}

const TeamComponent = (props: PropsWithChildren<TeamComponentProps>) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography>{props.team.name}</Typography>
      </Grid>
      {props.team.players.map((el) => (
        <Grid key={el.dni} xs={12}>
          <TeamPlayerRow
            player={el}
            captain={el.dni === props.team.captain?.dni}
          ></TeamPlayerRow>
        </Grid>
      ))}
    </Grid>
  );
};

export default TeamComponent;
