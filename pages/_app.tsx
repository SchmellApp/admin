import "@app/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from "@mantine/core";
import React, { useState } from "react";
import { toPageTitle } from "@app/utils";
import { useRouter } from "next/router";
import "dayjs/locale/nb";
import { UserProvider } from "@auth0/nextjs-auth0";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export default function App(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;
  const { pathname } = useRouter();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  const toggleColorScheme = (): void =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  const title = `Schmell - ${toPageTitle(pathname)}`;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{title}</title>
        <link rel="shortcut icon" href="/faviconv2.ico" />
      </Head>

      <QueryClientProvider client={client}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <UserProvider>
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
          </UserProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
}
