import React from "react";
import { Grid } from "@mui/material";
import { TeamPlayer, TeamView } from "../../../models/Team";
import NoTeamPlayers from "./NoTeamPlayers";
import TeamDisplay from "./TeamDisplay";
import {
  DragDropContext,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";
import { ResolverResult } from "react-hook-form";

interface Props {
  noTeamPlayers: TeamPlayer[];
  teams: TeamView[];
  onPlayerRearranged: (teams: TeamView[]) => void;
}

const TeamBuildingLayout = (props: Props) => {
  const rearangePlayers = (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    const teamsCopy: TeamView[] = JSON.parse(JSON.stringify(props.teams));
    const sourceTeam = teamsCopy.find((el) => el.id === source.droppableId);
    const destinationTeam = teamsCopy.find(
      (el) => el.id === destination.droppableId
    );
    if (sourceTeam && destinationTeam) {
      const player = sourceTeam.players[source.index];

      if (player) {
        sourceTeam.players = sourceTeam.players.filter(
          (el) => el.dni !== player?.dni
        );
        destinationTeam.players.push(player);
      }
    }

    return teamsCopy;
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const teamsCopy = rearangePlayers(source, destination);

    props.onPlayerRearranged(teamsCopy);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container>
        <Grid item xs={3}>
          <NoTeamPlayers noTeam={props.noTeamPlayers}></NoTeamPlayers>
        </Grid>
        <Grid item xs={9}>
          <TeamDisplay teams={props.teams}></TeamDisplay>
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export default TeamBuildingLayout;
