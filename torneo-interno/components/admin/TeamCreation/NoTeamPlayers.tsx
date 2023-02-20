import React from "react";
import { Grid } from "@mui/material";
import TeamPlayerRow from "./team/TeamPlayerRow";
import { TeamPlayer } from "../../../models/Team";
import { Draggable, Droppable } from "react-beautiful-dnd";
import CustomDraggable from "../../form/commons/dragDrop/CustomDraggable";
import CustomDroppable from "../../form/commons/dragDrop/CustomDroppable";

interface Props {
  noTeam: TeamPlayer[];
}

const NoTeamPlayers = (props: Props) => {
  return (
    <CustomDroppable id="no-team-players">
      <Grid container>
        {props.noTeam.map((el, index) => (
          <Grid item xs={12} mb={1} key={el.dni}>
            <CustomDraggable id={el.dni} index={index}>
              <TeamPlayerRow player={el}></TeamPlayerRow>
            </CustomDraggable>
          </Grid>
        ))}
      </Grid>
    </CustomDroppable>
  );
};

export default NoTeamPlayers;
