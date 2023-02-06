import * as React from "react";
import Grid from "@mui/material/Grid";
import { Http2ServerResponse } from "http2";
import OwnerForm from "../../components/form/inscription/OwnerForm";
import YouthInscriptionForm from "../../components/form/inscription/YouthInscriptionForm";
import { Typography } from "@mui/material";
import { GetStaticProps } from "next";
import { getCategories } from "../../services/db/CategoriaService";
import { Category } from "../../models/Player";
import { AppProps } from "next/app";
import { normalize } from "../../services/db/PrismaClientServer";

export interface IAppProps {
  dni: string;
}

const App = (props: any) => {
  return (
    <Grid container direction={"row"} rowGap={1}>
      <Grid item xs={12}>
        <Typography component={"h3"}>Infantil</Typography>
      </Grid>
      <Grid item xs={12}>
        <YouthInscriptionForm
          categories={props.categories}
        ></YouthInscriptionForm>
      </Grid>
    </Grid>
  );
};

export default App;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const categories: Category[] = await getCategories("M");
  return {
    props: {
      categories: normalize(categories),
    },
  };
};
