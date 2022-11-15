import {
  QueryObserverLoadingErrorResult,
  QueryObserverLoadingResult,
  QueryObserverRefetchErrorResult,
  QueryObserverSuccessResult
} from "@tanstack/query-core";
import { UseMutationResult } from "@tanstack/react-query";

export type QueryObserverResult<TData> =
  | QueryObserverRefetchErrorResult<TData>
  | QueryObserverSuccessResult<TData>
  | QueryObserverLoadingErrorResult<TData>
  | QueryObserverLoadingResult<TData>;

export type MutationObserverResult<TResult, TData> = UseMutationResult<
  TResult,
  unknown,
  TData,
  unknown
>;
