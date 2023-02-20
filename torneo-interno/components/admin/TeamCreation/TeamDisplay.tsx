import React from "react";
import { Card, Grid, Typography, CardContent } from "@mui/material";
import TeamComponent from "./team/TeamComponent";
import { TeamView } from "../../../models/Team";
import CustomDroppable from "../../form/commons/dragDrop/CustomDroppable";

interface Props {
  teams: TeamView[];
}

const TeamDisplay = (props: Props) => {
  console.log(props.teams);
  return (
    <Grid container spacing={2}>
      {props.teams.length > 0 ? (
        props.teams.map((el, index) => (
          <Grid item xs={4} key={index}>
            <CustomDroppable droppableId={el.id}>
              <TeamComponent team={el}></TeamComponent>
            </CustomDroppable>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography>No hay equipos</Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default TeamDisplay;
