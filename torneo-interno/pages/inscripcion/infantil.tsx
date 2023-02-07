import * as React from "react";
import Grid from "@mui/material/Grid";
import YouthInscriptionForm from "../../components/form/inscription/YouthInscriptionForm";
import { Typography } from "@mui/material";
import { GetStaticProps } from "next";
import { getCategories } from "../../services/db/CategoriaService";
import { Category, Level, Position } from "../../models/Player";
import { normalize } from "../../services/db/PrismaClientServer";
import { getPositions } from "../../services/db/PuestoService";
import { getLevels } from "../../services/db/NivelService";

export interface AppProps {
  categories: Category[];
  positions: Position[];
  levels: Level[];
}

const App = (props: AppProps) => {
  return (
    <Grid container direction={"row"} rowGap={1}>
      <Grid item xs={12}>
        <Typography component={"h3"}>Infantil</Typography>
      </Grid>
      <Grid item xs={12}>
        <YouthInscriptionForm
          categories={props.categories}
          positions={props.positions}
          levels={props.levels}
        />
      </Grid>
    </Grid>
  );
};

export default App;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const categories: Category[] = await getCategories("M");
  const positions: Position[] = await getPositions();
  const levels: Level[] = await getLevels();
  return {
    props: {
      categories: normalize(categories),
      positions,
      levels,
    },
  };
};
