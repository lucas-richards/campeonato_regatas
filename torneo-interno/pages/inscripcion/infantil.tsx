import * as React from "react";
import Grid from "@mui/material/Grid";
import { Http2ServerResponse } from "http2";
import OwnerForm from "../../components/form/inscription/OwnerForm";
import YouthInscriptionForm from "../../components/form/inscription/YouthInscriptionForm";
import { Typography } from "@mui/material";
export interface IAppProps {
  dni: string;
}

export default function App(props: IAppProps) {
  return (
    <Grid container direction={"row"} rowGap={1}>
      <Grid item xs={12}>
        <Typography component={"h3"}>Infantil</Typography>
      </Grid>
      <Grid item xs={12}>
        <YouthInscriptionForm></YouthInscriptionForm>
      </Grid>
    </Grid>
  );
}
