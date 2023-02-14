import React from "react";

interface TeamCreationProps {
  categories: Category[];
}

const armadoEquipos = (props: TeamCreationProps) => {
  const onClickHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {};

  return (
    <div>
      Armado Equipos
      {props.categories.map((el) => (
        <Button
          key={el.description}
          variant="outlined"
          value={el.description}
          onClick={onClickHandler}
        >
          {el.description}
        </Button>
      ))}
    </div>
  );
};

export default armadoEquipos;

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps } from "next";
import { Category } from "../../models/Player";
import { getCategories } from "../../services/db/CategoriaService";
import { Button } from "@mui/material";
import { normalize } from "../../services/db/PrismaClientServer";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const categories: Category[] = await getCategories("");

  return {
    props: {
      categories: normalize(categories),
    },
  };
};
