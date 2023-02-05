import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import classes from "./FormSection.module.scss";
import EmailTextfield from "../commons/EmailTextfield";
import DniTextField from "../commons/DniTextField";
import NormalTextField from "../commons/NormalTextField";
import { Typography } from "@mui/material";
import PhoneTextField from "../commons/PhoneTextField";

interface OwnerProps {
  control: any;
}

const OwnerForm = (props: OwnerProps) => {
  return (
    <Grid container rowGap={2} className={classes.box}>
      <Grid item xs={12}>
        <Typography component="h4">Datos del Responsable</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} pl={1} pr={1}>
        <DniTextField name="ownerDni" control={props.control}></DniTextField>
      </Grid>
      <Grid item xs={12} sm={6} md={4} pl={1} pr={1}>
        <EmailTextfield
          name="ownerEmail"
          control={props.control}
        ></EmailTextfield>
      </Grid>
      <Grid item xs={12} sm={6} md={4} pl={1} pr={1}>
        <NormalTextField
          control={props.control}
          name="ownerName"
          label="Nombre"
        ></NormalTextField>
      </Grid>
      <Grid item xs={12} sm={6} md={4} pl={1} pr={1}>
        <NormalTextField
          name="ownerSurname"
          label="Apellido"
          control={props.control}
        ></NormalTextField>
      </Grid>
      <Grid item xs={12} sm={6} md={4} pl={1} pr={1}>
        <PhoneTextField
          name="ownerPhone"
          label="Telefono"
          control={props.control}
        ></PhoneTextField>
      </Grid>
    </Grid>
  );
};
export default OwnerForm;
