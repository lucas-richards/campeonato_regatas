import React from "react";
import { Grid, Button } from "@mui/material";
import { TeamPlayer, TeamView } from "../../../models/Team";
import NoTeamPlayers from "./NoTeamPlayers";
import TeamDisplay from "./TeamDisplay";
import {
  DragDropContext,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";
import { deepCopy } from "../../../commons/Commons";
import {
  autoCreateTeams,
  AutoGeneratedTeam,
} from "../../../services/TeamAutoCreation";
import { toTeamView } from "../../../transformers/Team";

interface Props {
  noTeamPlayers: TeamPlayer[];
  teams: TeamView[];
  playersInCategory: number;
  onPlayerRearranged: (teams: TeamView[], noTeamPlayers: TeamPlayer[]) => void;
  saveHandler: () => void;
}

const TeamBuildingLayout = (props: Props) => {
  const noTeamPlayerDroppable = "no-team-players";

  const rearangePlayers = (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    const teamsCopy: TeamView[] = deepCopy(props.teams);
    let noTeamPlayersCopy: TeamPlayer[] = deepCopy(props.noTeamPlayers);

    const getPlayer = () =>
      source.droppableId === noTeamPlayerDroppable
        ? noTeamPlayersCopy[source.index]
        : teamsCopy.find((el) => el.id === source.droppableId)?.players[
            source.index
          ];
    const remove = (player: TeamPlayer) => {
      if (source.droppableId === noTeamPlayerDroppable) {
        noTeamPlayersCopy = noTeamPlayersCopy.filter(
          (el) => el.dni !== player.dni
        );
      } else {
        const team = teamsCopy.find((el) => el.id === source.droppableId);
        if (team)
          team.players = team.players.filter((el) => el.dni !== player.dni);
      }
    };

    const add = (player: TeamPlayer) => {
      if (destination.droppableId === noTeamPlayerDroppable) {
        noTeamPlayersCopy.push(player);
      } else {
        const team = teamsCopy.find((el) => el.id === destination.droppableId);
        if (team) team.players.push(player);
      }
    };

    const player = getPlayer();
    if (player) {
      remove(player);
      add(player);
    }

    return { teamsCopy, noTeamPlayersCopy };
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const resorted = rearangePlayers(source, destination);

    props.onPlayerRearranged(resorted.teamsCopy, resorted.noTeamPlayersCopy);
  };

  const autoGenerateTeams = () => {
    const autogenerated: AutoGeneratedTeam[] = autoCreateTeams(
      props.noTeamPlayers,
      props.playersInCategory / 10
    );

    const fullTeams: TeamView[] = autogenerated.map((el) => {
      return toTeamView(el);
    });
    fullTeams.forEach((el) => {
      el.players = el.players.sort(
        (current, next) => current.position.value - next.position.value
      );
    });

    props.onPlayerRearranged(fullTeams, []);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant="outlined" onClick={props.saveHandler} fullWidth>
                Guardar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                disabled={props.noTeamPlayers.length === 0}
                onClick={autoGenerateTeams}
              >
                Autogenerar
              </Button>
            </Grid>
          </Grid>

          <NoTeamPlayers
            noTeam={props.noTeamPlayers}
            noTeamPlayerDroppable={noTeamPlayerDroppable}
          ></NoTeamPlayers>
        </Grid>
        <Grid item xs={9}>
          <TeamDisplay teams={props.teams}></TeamDisplay>
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export default TeamBuildingLayout;
