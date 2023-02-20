import React, { PropsWithChildren } from "react";
import { Grid, Typography } from "@mui/material";
import { TeamView } from "../../../../models/Team";
import TeamPlayerRow from "./TeamPlayerRow";
import { Player } from "../../../../models/Player";
import CustomDroppable from "../../../form/commons/dragDrop/CustomDroppable";
import CustomDraggable from "../../../form/commons/dragDrop/CustomDraggable";

interface TeamComponentProps {
  team: TeamView;
}

const TeamComponent = (props: PropsWithChildren<TeamComponentProps>) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography>{props.team.name}</Typography>
      </Grid>
      {props.team.players.map((el, index) => (
        <Grid item key={el.dni} xs={12}>
          <CustomDraggable id={el.dni} index={index}>
            <TeamPlayerRow
              player={el}
              captain={el.dni === props.team.captain?.dni}
            ></TeamPlayerRow>
          </CustomDraggable>
        </Grid>
      ))}
    </Grid>
  );
};

export default TeamComponent;
