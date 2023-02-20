import React, { PropsWithChildren } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { TeamView } from "../../../../models/Team";
import TeamPlayerRow from "./TeamPlayerRow";
import CustomDraggable from "../../../form/commons/dragDrop/CustomDraggable";
import classes from "./TeamComponent.module.scss";

interface TeamComponentProps {
  team: TeamView;
}

const TeamComponent = (props: PropsWithChildren<TeamComponentProps>) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <div className={classes["team-name"]}>
          <Typography>{props.team.name}</Typography>
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
    </Card>
  );
};

export default TeamComponent;
