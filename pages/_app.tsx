import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from "@mantine/core";
import React, { useState } from "react";
import { getParsedTitle } from "../src/utils/path";
import { useRouter } from "next/router";

export default function App(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (): void =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Schmell - {getParsedTitle(pathname)}</title>
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            fontFamily: "Montserrat, sans-serif",
            headings: {
              fontFamily: "Montserrat, sans-serif"
            }
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
