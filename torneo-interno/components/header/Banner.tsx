import React from "react";
import classes from "./Banner.module.css";
import Image from "next/image";

const Banner = () => {
  return (
    <>
      <Image
        src="/logo.png"
        alt=""
        className={classes.img}
        width="200"
        height="100"
      />
    </>
  );
};
export default Banner;
