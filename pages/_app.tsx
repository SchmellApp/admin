import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { toPageTitle } from "../src/utils/path";
import { useRouter } from "next/router";
import "dayjs/locale/nb";
import { useColorScheme } from "@mantine/hooks";

export default function App(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;
  const computerColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(computerColorScheme);
  const toggleColorScheme = (): void =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  const { pathname } = useRouter();

  useEffect(() => {
    setColorScheme(computerColorScheme);
  }, [computerColorScheme]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Schmell - {toPageTitle(pathname)}</title>
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
            },
            colors: {
              white: [
                "#FFFFFF",
                "#E6E6E6",
                "#CFCFCF",
                "#BABABA",
                "#A7A7A7",
                "#979797",
                "#888888"
              ]
            }
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
