import { Wrapper } from "../../../../../src/components/Wrappers";
import { MediaQuery, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";

export default function Questions(): JSX.Element {
  const route = useRouter();
  return (
    <Wrapper>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Title order={2} mb="sm">
          Spørsmål {route.query.slug}
        </Title>
      </MediaQuery>
      <Title order={2} mb="sm">
        Spørsmål {route.query.slug}
      </Title>
    </Wrapper>
  );
}
