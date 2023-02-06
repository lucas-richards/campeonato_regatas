import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import classes from "./FormSection.module.scss";
import EmailTextfield from "../commons/EmailTextfield";
import DniTextField from "../commons/DniTextField";
import NormalTextField from "../commons/NormalTextField";
import { Typography } from "@mui/material";
import PhoneTextField from "../commons/PhoneTextField";
import DatePickerField from "../commons/DatePickerField";

interface MaleYouthForm {
  control: any;
  startDate: Date;
  endDate: Date;
}

// const player: Player = {
//   dni: "1231231",
//   name: "asasd",
//   lastName: "12312casdc",
//   email: "a@a.com",
//   phone: "12312312344",
//   birthdate: new Date("05-05-2016"),
//   gender: "M",
// };

// const application: YouthInscription = {
//   emergencyPhone: "1136718735",
//   position: 1,
//   level: 2,
//   owner: owner,
//   player: player,
//   captain: true,
// };

const MaleYouthForm = (props: MaleYouthForm) => {
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
    </Grid>
  );
};
export default MaleYouthForm;
