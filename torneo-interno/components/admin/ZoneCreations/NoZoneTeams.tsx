import { List, ListItem } from "@mui/material";
import React from "react";
import CustomDroppable from "../../form/commons/dragDrop/CustomDroppable";
import { ZoneTeam } from "../../../models/Team";
import CustomDraggable from "../../form/commons/dragDrop/CustomDraggable";

interface NoZoneTeamsProps {
  teams: ZoneTeam[];
}

const NoZoneTeams = (props: NoZoneTeamsProps) => {
  return (
    <>
      <CustomDroppable droppableId="no-zone-teams">
        <List>
          {props.teams.map((el, index) => (
            <CustomDraggable
              index={index}
              draggableId={el.id.toString()}
              key={el.id}
            >
              <ListItem divider>{el.name}</ListItem>
            </CustomDraggable>
          ))}
        </List>
      </CustomDroppable>
    </>
  );
};

export default NoZoneTeams;
