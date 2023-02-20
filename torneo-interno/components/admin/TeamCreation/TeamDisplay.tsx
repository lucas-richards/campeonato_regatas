import React from "react";
import { Grid } from "@mui/material";
import TeamComponent from "./team/TeamComponent";
import { TeamView } from "../../../models/Team";
import CustomDroppable from "../../form/commons/dragDrop/CustomDroppable";

interface Props {
  teams: TeamView[];
}

const TeamDisplay = (props: Props) => {
  return (
    <Grid container spacing={2}>
      {props.teams.map((el, index) => (
        <Grid item xs={4} key={index}>
          <CustomDroppable droppableId={el.id}>
            <TeamComponent team={el}></TeamComponent>
          </CustomDroppable>
        </Grid>
      ))}
    </Grid>
  );
};

export default TeamDisplay;
