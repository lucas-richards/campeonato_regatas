import { List, ListItem } from "@mui/material";
import React from "react";
import CustomDroppable from "../../form/commons/dragDrop/CustomDroppable";
import { ZoneTeam } from "../../../models/Team";

interface NoZoneTeamsProps {
  teams: ZoneTeam[];
}

const NoZoneTeams = (props: NoZoneTeamsProps) => {
  return (
    <>
      <CustomDroppable droppableId="no-zone-teams">
        <List>
          {props.teams.map((el) => (
            <ListItem divider key={el.id}>
              {el.name}
            </ListItem>
          ))}
        </List>
      </CustomDroppable>
    </>
  );
};

export default NoZoneTeams;
