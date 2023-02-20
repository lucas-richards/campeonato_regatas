import React from "react";
import { Button, Grid } from "@mui/material";
import { Category } from "../../../models/Player";

interface Props {
  categories: Category[];
  clickHandler: any;
}

const TeamCreationButtons = (props: Props) => {
  return (
    <Grid container>
      {props.categories.map((el) => (
        <Grid item key={el.description} lg={1} md={2} sm={4}>
          <Button
            variant="outlined"
            value={el.description}
            onClick={props.clickHandler}
          >
            {el.description}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default TeamCreationButtons;
