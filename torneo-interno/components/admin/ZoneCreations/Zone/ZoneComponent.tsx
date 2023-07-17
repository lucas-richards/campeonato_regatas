import React, { PropsWithChildren } from "react";
import {
  Card,
  CardActions,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import TeamPlayerRow from "./ZoneTeamRow";
import CustomDraggable from "../../../form/commons/dragDrop/CustomDraggable";
import classes from "./ZoneComponent.module.scss";
import { Zone } from "../../../../models/Zones";
import ZoneTeamRowComponent from "./ZoneTeamRow";
import CustomDroppable from "../../../form/commons/dragDrop/CustomDroppable";

interface ZoneComponentProps {
  zone: Zone;
}

const ZoneComponent = (props: PropsWithChildren<ZoneComponentProps>) => {
  const changedNameHandler = (event: any) => {
    props.zone.name = event.target.value;
  };
  const changedTypeHandler = (event: any) => {
    props.zone.type = event.target.type;
  };
  return (
    <Card variant="outlined">
      <CardContent>
        <div className={classes["zone-name"]}>
          <TextField
            defaultValue={props.zone.name}
            onChange={changedNameHandler}
            variant="standard"
            required
            fullWidth
          />
        </div>
        <div className={classes["zone-name"]}>
          <FormControl fullWidth variant="standard">
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={props.zone.type}
              onChange={changedTypeHandler}
              label="Age"
            >
              <MenuItem value={0}>Round Robin</MenuItem>
              <MenuItem value={1}>Playoff</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes["zone-teams"]}>
          <CustomDroppable droppableId={`${props.zone.id}`}>
            {props.zone.teams.length > 0 ? (
              props.zone.teams.map((el, index) => (
                <CustomDraggable
                  key={el.name}
                  draggableId={el.id.toString()}
                  index={index}
                >
                  <ZoneTeamRowComponent team={el}></ZoneTeamRowComponent>
                </CustomDraggable>
              ))
            ) : (
              <Typography>Arrastre equipos</Typography>
            )}
          </CustomDroppable>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoneComponent;
