"use client";

import { Provider } from "react-redux";
import { useEffect, useMemo } from "react";
import { makeStore } from "@/store";
import { createTheme, MantineProvider } from "@mantine/core";
import { fetchBooks } from "@/store/slices/booksSlice";

import "@mantine/core/styles.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => makeStore(), []);

  useEffect(() => {
    store.dispatch(fetchBooks());
  }, [store]);

  const theme = createTheme({});

  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </MantineProvider>
  );
}
