import { AppState } from "@app/types";
import React, { createContext, ReactNode, useState } from "react";

const InitialState: AppState = {
  incrementSolvedTasks: () => {},
  solvedTasks: 0
};

export const StateContext = createContext<AppState>(InitialState);

const StateProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [solvedTasks, setSolvedTasks] = useState(0);

  const incrementSolvedTasks = (): void => setSolvedTasks((prev) => prev + 1);

  return (
    <StateContext.Provider
      value={{
        incrementSolvedTasks,
        solvedTasks
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
