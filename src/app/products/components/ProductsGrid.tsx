"use client";

import { SimpleGrid } from "@mantine/core";
import type { TBook } from "@/shared/types";
import { BookCard } from "./BookCard";

export function ProductsGrid({ items }: { items: TBook[] }) {
  return (
    <SimpleGrid cols={3} spacing="lg" mt="lg">
      {items.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </SimpleGrid>
  );
}
