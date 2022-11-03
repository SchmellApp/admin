import { Wrapper } from "../../../../src/components/Wrappers";
import { MediaQuery, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";

export default function Weeks(): JSX.Element {
  const route = useRouter();
  return (
    <Wrapper>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Title order={2} mb="sm">
          Uker {route.query.pid}
        </Title>
      </MediaQuery>
      <Title order={2} mb="sm">
        Uker {route.query.pid}
      </Title>
    </Wrapper>
  );
}
