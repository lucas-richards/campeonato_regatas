import React, { PropsWithChildren } from "react";
import { Card, CardActions, CardContent, TextField } from "@mui/material";
import { TeamView } from "../../../../models/Team";
import TeamPlayerRow from "./TeamPlayerRow";
import CustomDraggable from "../../../form/commons/dragDrop/CustomDraggable";
import classes from "./TeamComponent.module.scss";

interface TeamComponentProps {
  team: TeamView;
}

const TeamComponent = (props: PropsWithChildren<TeamComponentProps>) => {
  const changedNameHandler = (event: any) => {
    props.team.name = event.target.value;
  };
  return (
    <Card variant="outlined">
      <CardContent>
        <div className={classes["team-name"]}>
          <TextField
            defaultValue={props.team.name}
            onChange={changedNameHandler}
            variant="standard"
            required
            fullWidth
          />
        </div>
        <div className={classes["team-players"]}>
          {props.team.players.map((el, index) => (
            <CustomDraggable key={el.dni} draggableId={el.dni} index={index}>
              <TeamPlayerRow
                player={el}
                captain={el.dni === props.team.captain?.dni}
              ></TeamPlayerRow>
            </CustomDraggable>
          ))}
        </div>
      </CardContent>
      <CardActions>
        {props.team.players
          .map((el) => el.level.value)
          .reduce((cur, next) => cur + next)}
        <hr></hr>
        {props.team.players.length}
      </CardActions>
    </Card>
  );
};

export default TeamComponent;
