import type { TRootState } from "../types";

export const selectBooksState = (state: TRootState) => state.books;

export const selectBooksItems = (state: TRootState) => state.books.items;
export const selectBooksFilter = (state: TRootState) => state.books.filter;
export const selectBooksLoading = (state: TRootState) => state.books.loading;
export const selectBooksError = (state: TRootState) => state.books.error;

export const selectBookById = (id: string | undefined) => (state: TRootState) =>
  id ? state.books.items.find((item) => item.id === id) : undefined;
