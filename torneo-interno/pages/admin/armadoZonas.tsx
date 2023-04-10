import React, { useState } from "react";
import { GetStaticProps } from "next";
import { getAllCategories } from "../../services/db/CategoriaService";
import { Category } from "../../models/Player";
import { normalize } from "../../services/db/PrismaClientServer";
import CategoriesButtons from "../../components/admin/CategoriesButtons";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import ZoneCreation from "../../components/admin/ZoneCreations/ZoneCreation";
import { resetServerContext } from "react-beautiful-dnd";

interface ZoneCreationProps {
  categories: Category[];
}

const ArmadoZonas = (props: ZoneCreationProps) => {
  const [category, setCategory]: [string, any] = useState("");
  const [showRounds, setShowRounds]: [boolean, any] = useState(false);
  const [rounds, setRounds]: [number[], any] = useState([]);
  const onClickHandler = async (cat: string) => {
    setCategory(cat);
    const response = await (
      await fetch(`/api/admin/zones/${cat}/rounds`)
    ).json();
    setRounds(response);
    setShowRounds(true);
  };
  return (
    <>
      <Grid container rowGap={2} mt={2}>
        <Grid item xs={12}>
          <Typography>Armado Zonas</Typography>
        </Grid>
        <Grid item xs={12}>
          <CategoriesButtons
            clickHandler={onClickHandler}
            categories={props.categories}
          ></CategoriesButtons>
        </Grid>
        {showRounds ? (
          <Grid item xs={12}>
            <ZoneCreation rounds={rounds} category={category}></ZoneCreation>
          </Grid>
        ) : (
          <Typography>Seleccionar categoría</Typography>
        )}
      </Grid>
    </>
  );
};

export default ArmadoZonas;

export const getStaticProps: GetStaticProps = async () => {
  const categories: Category[] = await getAllCategories();
  resetServerContext();
  return {
    props: {
      categories: normalize(categories),
    },
  };
};
