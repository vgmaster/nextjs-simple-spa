import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/booksSlice";

export const makeStore = () =>
  configureStore({
    reducer: { books: booksReducer },
  });
