import React from "react";
import { Button, Grid } from "@mui/material";
import { Zone, ZoneType } from "../../../models/Zones";
import ZoneComponent from "./Zone/ZoneComponent";

interface ZoneManagementProps {
  zones: Zone[];
  category: string;
  round: number;
  onNewZone: (zone: Zone) => void;
}
const ZoneManagement = (props: ZoneManagementProps) => {
  const addZone = () => {
    const zoneNumber = props.zones.length + 1;
    const zone: Zone = {
      id: -1 * zoneNumber,
      name: `Nueva Zona ${zoneNumber}`,
      type: ZoneType.LEAGUE,
      categoryString: props.category,
      round: props.round,
      teams: [],
    };
    props.onNewZone(zone);
  };
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Button onClick={addZone}>Nueva Zona</Button>
        </Grid>
        {props.zones.map((zone) => (
          <Grid item key={zone.id} md={6} xs={12}>
            <ZoneComponent zone={zone}></ZoneComponent>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ZoneManagement;
