import { useRouter } from "next/router";
import React from "react";
import { Wrapper } from "../../src/components/Wrappers";

const Task = (): JSX.Element => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <Wrapper>
      <p>Post: {pid}</p>
    </Wrapper>
  );
};

export default Task;
