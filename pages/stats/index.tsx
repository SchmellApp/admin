import React from "react";
import { Wrapper } from "@/components/Wrappers";
import { Button } from "@mantine/core";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(function Statistics(): JSX.Element {
  return (
    <Wrapper>
      <Button>Test</Button>
    </Wrapper>
  );
});
