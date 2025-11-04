import type { TBookApiResponse } from "@/shared/types";
import { apiFetch } from "./base";

export const getBooks = () =>
  apiFetch<TBookApiResponse>("/subjects/detective.json?limit=100");
