import { useContext } from "react";
import { StateContext } from "@app/providers";
import { AppState } from "@app/types";

export const useAppState = (): AppState => useContext(StateContext);
