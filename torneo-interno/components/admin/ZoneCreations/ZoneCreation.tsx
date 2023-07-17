import React, { useState } from "react";
import { Grid } from "@mui/material";
import RoundSelection from "./RoundSelection";
import NoZoneTeams from "./NoZoneTeams";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from "react-beautiful-dnd";
import { RoundView, Zone } from "../../../models/Zones";
import { ZoneTeam } from "../../../models/Team";
import ZoneManagement from "./ZoneManagement";
import { deepCopy } from "../../../commons/Commons";

interface ZoneCreationProps {
  rounds: number[];
  category: string;
}

const ZoneCreation = (props: ZoneCreationProps) => {
  const [zones, setZones]: [Zone[], any] = useState([]);
  const [noZoneTeams, setNoZoneTeams]: [ZoneTeam[], any] = useState([]);
  const [selectedRound, setSelectedRound]: [number, any] = useState(0);
  const onRoundSelection = async (round: number) => {
    const response = await fetch(`/api/admin/zones/${props.category}/${round}`);
    const select: RoundView = await response.json();

    setSelectedRound(round);

    setZones(select.zones);
    setNoZoneTeams(select.noZone);
  };
  const onNewRound = () => {
    const newRound = props.rounds.length + 1;
    props.rounds.push(newRound);
    onRoundSelection(newRound);
  };

  const onNewZone = async (zone: Zone) => {
    const newZones = [...zones, zone];
    setZones(newZones);
  };

  const rearrangeTeams = (
    team: string,
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    console.log(team, source, destination);
    const sourceNoTeam = source.droppableId === "no-zone-teams";

    const selectedTeam = sourceNoTeam
      ? noZoneTeams.find((el) => el.id.toString() === team)
      : zones
          .find((el) => el.id.toString() === source.droppableId)
          ?.teams.find((el) => el.id.toString() === team);
    if (selectedTeam) {
      // Take out team from Source
      if (sourceNoTeam) {
        setNoZoneTeams(
          deepCopy(noZoneTeams.filter((el) => el.id !== selectedTeam.id))
        );
      } else {
        const sourceZone = zones.find(
          (el) => el.id.toString() === source.droppableId
        );
        if (sourceZone && sourceZone.teams) {
          const dc = deepCopy(sourceZone);
          const filteredTeams = sourceZone.teams.filter(
            (el: ZoneTeam) => el.id !== selectedTeam.id
          );
          const sourceZoneCopy: Zone = {
            ...dc,
            teams: sourceZone.teams.filter(
              (el: ZoneTeam) => el.id !== selectedTeam.id
            ),
          };
          const zonesCopy = deepCopy(
            zones.filter((el) => el.id !== sourceZone?.id)
          );
          zonesCopy.push(sourceZoneCopy);
          setZones(zonesCopy);
        }
      }
      //End of Take out team from Source

      // Put team in destination
      const destinationNoTeam = destination.droppableId === "no-zone-teams";

      if (destinationNoTeam) {
        noZoneTeams.push(selectedTeam);
      } else {
        zones
          .find((el) => el.id.toString() === destination.droppableId)
          ?.teams.push(selectedTeam);
      }
      //End of Put team in destination
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    rearrangeTeams(result.draggableId, source, destination);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12}>
            <RoundSelection
              rounds={props.rounds}
              onNewRound={onNewRound}
              onRoundSelected={onRoundSelection}
            ></RoundSelection>
          </Grid>
          <Grid item xs={3}>
            <NoZoneTeams teams={noZoneTeams}></NoZoneTeams>
          </Grid>
          <Grid item xs={9}>
            <ZoneManagement
              zones={zones}
              category={props.category}
              round={selectedRound}
              onNewZone={onNewZone}
            ></ZoneManagement>
          </Grid>
        </Grid>
      </DragDropContext>
    </>
  );
};

export default ZoneCreation;
