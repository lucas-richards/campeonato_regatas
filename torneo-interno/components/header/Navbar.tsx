import React from "react";
import classes from "./Navbar.module.scss";

import Link from "next/link";
import { AppBar, Toolbar, CssBaseline, Avatar } from "@mui/material";
import Image from "next/image";

function Navbar() {
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Avatar alt="escudo" className={classes.link}>
          <Image src="/logo.png" alt={"Logo regatas"} fill></Image>
        </Avatar>
        <div className={classes.navlinks}>
          <Link href="/" className={classes.link}>
            Home
          </Link>
          <Link href="/about" className={classes.link}>
            About
          </Link>
          <Link href="/contact" className={classes.link}>
            Contact
          </Link>
          <Link href="/faq" className={classes.link}>
            FAQ
          </Link>
          <Link href="/deuda" className={classes.link}>
            Deuda
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
