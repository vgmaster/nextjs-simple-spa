"use client";

import { ActionIcon, Card, Group, Image, Text } from "@mantine/core";
import { IconHeart, IconHeartFilled, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import type { TBook } from "@/shared/types/book";
import { useAppDispatch } from "@/store/hooks";
import { deleteBook, toggleFavorite } from "@/store/slices/booksSlice";
import { encodeId } from "@/shared/lib/utils";

export function BookCard({ book }: { book: TBook }) {
  const dispatch = useAppDispatch();

  return (
    <Card
      shadow="sm"
      padding="md"
      style={{ height: 250, position: "relative" }}
    >
      <Group justify="space-between">
        <ActionIcon
          color={book.favorite ? "red" : "gray"}
          variant="subtle"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleFavorite(book.id));
          }}
        >
          {book.favorite ? <IconHeartFilled /> : <IconHeart />}
        </ActionIcon>

        <ActionIcon
          color="red"
          variant="subtle"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteBook(book.id));
          }}
        >
          <IconTrash />
        </ActionIcon>
      </Group>
      <Link
        href={`/products/${encodeId(book.id)}`}
        style={{ textDecoration: "none", color: "inherit", flex: 1 }}
      >
        <Group mt="sm" wrap="nowrap">
          {book.coverUrl && (
            <Image src={book.coverUrl} h={120} w={80} fit="cover" alt="cover" />
          )}
          <div>
            <Text fw={600} lineClamp={2}>
              {book.title}
            </Text>
            <Text size="sm" lineClamp={3}>
              {book.description}
            </Text>
          </div>
        </Group>
      </Link>
    </Card>
  );
}
