import "../styles/globals.css";
import Container from "@mui/material/Container";

import type { AppProps } from "next/app";
import Header from "../components/header/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
    </Container>
  );
}
