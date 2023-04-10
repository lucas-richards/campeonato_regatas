import React, { useState } from "react";
import { Grid } from "@mui/material";
import RoundSelection from "./RoundSelection";
import NoZoneTeams from "./NoZoneTeams";
import { DragDropContext } from "react-beautiful-dnd";
import { RoundView, Zone } from "../../../models/Zones";
import { ZoneTeam } from "../../../models/Team";

interface ZoneCreationProps {
  rounds: number[];
  category: string;
}

const ZoneCreation = (props: ZoneCreationProps) => {
  const [zones, setZones]: [Zone[], any] = useState([]);
  const [noZoneTeams, setNoZoneTeams]: [ZoneTeam[], any] = useState([]);
  const onRoundSelection = async (round: number) => {
    const response = await fetch(`/api/admin/zones/${props.category}/${round}`);
    const selectedRound: RoundView = await response.json();
    setZones(selectedRound.zones);
    setNoZoneTeams(selectedRound.noZone);
  };
  const onNewRound = () => {
    onRoundSelection(0);
  };

  return (
    <>
      <DragDropContext onDragEnd={() => {}}>
        <Grid container>
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
            Zonas
          </Grid>
        </Grid>
      </DragDropContext>
    </>
  );
};

export default ZoneCreation;
