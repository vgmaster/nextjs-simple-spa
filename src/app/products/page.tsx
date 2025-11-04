"use client";

import { Container, Text, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectBooksError,
  selectBooksFilter,
  selectBooksItems,
  selectBooksLoading,
} from "@/store/selectors/books";
import { setFilter } from "@/store/slices/booksSlice";
import { CenteredLoader } from "./components/CenteredLoader";
import { FiltersBar } from "./components/FiltersBar";
import { PaginationBar } from "./components/PaginationBar";
import { ProductsGrid } from "./components/ProductsGrid";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectBooksItems);
  const filter = useAppSelector(selectBooksFilter);
  const loading = useAppSelector(selectBooksLoading);
  const error = useAppSelector(selectBooksError);

  const [extraFilter, setExtraFilter] = useState<
    "all" | "hasCover" | "noCover"
  >("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 300);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const filtered = useMemo(() => {
    let list =
      filter === "favorites" ? items.filter((book) => book.favorite) : items;

    if (extraFilter === "hasCover")
      list = list.filter((book) => !!book.coverUrl);
    if (extraFilter === "noCover") list = list.filter((book) => !book.coverUrl);

    const q = debouncedSearch.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (book) =>
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q)
      );
    }

    return list;
  }, [items, filter, extraFilter, debouncedSearch]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage((prevPage) => (prevPage === 1 ? prevPage : 1));
  }, [filter, extraFilter, debouncedSearch]);

  return (
    <Container size="xl" p="md">
      <Title order={2}>Books</Title>

      <FiltersBar
        filter={filter}
        onFilterChange={(value) => dispatch(setFilter(value))}
        extraFilter={extraFilter}
        onExtraFilterChange={(value) => setExtraFilter(value)}
        search={search}
        onSearchChange={setSearch}
      />

      {loading ? (
        <CenteredLoader />
      ) : (
        <>
          {error && <Text c="red">{error}</Text>}

          <ProductsGrid items={paged} />

          <PaginationBar page={page} total={totalPages} onChange={setPage} />
        </>
      )}
    </Container>
  );
}
