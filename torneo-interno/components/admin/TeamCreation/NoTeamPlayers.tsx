import React from "react";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import TeamPlayerRow from "./team/TeamPlayerRow";
import { TeamPlayer } from "../../../models/Team";
import CustomDraggable from "../../form/commons/dragDrop/CustomDraggable";
import CustomDroppable from "../../form/commons/dragDrop/CustomDroppable";
import classes from "./NoTeamPlayers.module.scss";

interface Props {
  noTeam: TeamPlayer[];
  noTeamPlayerDroppable: string;
}

const NoTeamPlayers = (props: Props) => {
  const withPlayers = props.noTeam.map((el, index) => (
    <Grid item xs={12} mb={1} key={el.dni}>
      <CustomDraggable draggableId={el.dni} index={index}>
        <TeamPlayerRow player={el}></TeamPlayerRow>
      </CustomDraggable>
    </Grid>
  ));

  const noPlayers = <Typography className="">No hay jugadores</Typography>;
  const playersTitle = (
    <Typography className="" textAlign={"center"}>
      Jugadores sin equipo
    </Typography>
  );

  const droppableContainer = (
    <Card variant="outlined">
      <CardContent>
        <Typography textAlign={"center"}>
          Arrastrar jugador para desasignar de cualquier equipo
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Grid container direction="column" spacing="2">
      <Grid item xs={12} pb={2}>
        {props.noTeam.length === 0 ? noPlayers : playersTitle}
      </Grid>
      <CustomDroppable droppableId={props.noTeamPlayerDroppable}>
        {props.noTeam.length === 0 ? droppableContainer : withPlayers}
      </CustomDroppable>
    </Grid>
  );
};

export default NoTeamPlayers;
