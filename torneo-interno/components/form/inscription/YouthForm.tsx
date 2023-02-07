import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import classes from "./FormSection.module.scss";
import EmailTextfield from "../commons/EmailTextfield";
import DniTextField from "../commons/DniTextField";
import NormalTextField from "../commons/NormalTextField";
import PhoneTextField from "../commons/PhoneTextField";
import DatePickerField from "../commons/DatePickerField";
import RadioButtonField, { RadioOption } from "../commons/RadioButtonField";
import { Level, Position } from "../../../models/Player";

interface YouthForm {
  control: any;
  startDate: Date;
  endDate: Date;
  positions: Position[];
  levels: Level[];
}

const YouthForm = (props: YouthForm) => {
  const positionOptions: RadioOption[] = props.positions.map((el) => {
    return { label: el.description, value: el.value };
  });
  const levelOptions: RadioOption[] = props.levels.map((el) => {
    return { label: el.description, value: el.value };
  });

  const captainOptions: RadioOption[] = [
    { label: "No", value: false },
    { label: "Si", value: true },
  ];
  return (
    <Grid container rowGap={2} className={classes.box}>
      <Grid item xs={12}>
        <Typography component="h4">Datos del Jugador</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} pl={1} pr={1}>
        <DniTextField name="playerDni" control={props.control}></DniTextField>
      </Grid>
      <Grid item xs={12} sm={6} md={4} pl={1} pr={1}>
        <EmailTextfield
          name="playerEmail"
          control={props.control}
        ></EmailTextfield>
      </Grid>
      <Grid item xs={12} sm={6} md={4} pl={1} pr={1}>
        <NormalTextField
          control={props.control}
          name="playerName"
          label="Nombre"
        ></NormalTextField>
      </Grid>
      <Grid item xs={12} sm={6} md={4} pl={1} pr={1}>
        <NormalTextField
          name="playerSurname"
          label="Apellido"
          control={props.control}
        ></NormalTextField>
      </Grid>
      <Grid item xs={12} sm={6} md={4} pl={1} pr={1}>
        <PhoneTextField
          name="playerPhone"
          label="Telefono de Emergencia"
          control={props.control}
        ></PhoneTextField>
      </Grid>
      <Grid item xs={8} sm={4} md={3} pl={1} pr={1}>
        <DatePickerField
          name="playerBirthdate"
          label="Fecha de Nacimiento"
          control={props.control}
          startDate={props.startDate}
          endDate={props.endDate}
        ></DatePickerField>
      </Grid>
      <Grid item xs={4} sm={2} md={1} pl={1} pr={1}>
        <NormalTextField
          name="playerCategory"
          label="Categoria"
          control={props.control}
          disabled={true}
        ></NormalTextField>
      </Grid>
      <Grid item xs={12} pl={1} pr={1} pt={2}>
        <RadioButtonField
          name="playerPosition"
          control={props.control}
          label="Posición"
          options={positionOptions}
          row={true}
        />
      </Grid>
      <Grid item xs={12} pl={1} pr={1} pt={2}>
        <RadioButtonField
          name="playerLevel"
          control={props.control}
          label="Nivel"
          options={levelOptions}
          row={true}
        />
      </Grid>
      <Grid item xs={12} pl={1} pr={1} pt={2}>
        <RadioButtonField
          name="playerCaptain"
          control={props.control}
          label="Puede ser capitán?"
          options={captainOptions}
          row={true}
        />
      </Grid>
    </Grid>
  );
};
export default YouthForm;
