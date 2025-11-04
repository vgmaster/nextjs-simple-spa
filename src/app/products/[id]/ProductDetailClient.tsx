"use client";

import {
  ActionIcon,
  Badge,
  Button,
  Container,
  Divider,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectBookById } from "@/store/selectors/books";
import { encodeId } from "@/shared/lib/utils";

export default function ProductDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const item = useAppSelector(selectBookById(id));

  if (!item) {
    return (
      <Container p="md">
        <Group justify="space-between" mb="md">
          <Title order={3}>Product</Title>
          <Button variant="light" onClick={() => router.back()}>
            Go Back
          </Button>
        </Group>
        <Text>Not found</Text>
      </Container>
    );
  }

  return (
    <Container size="sm" p="md">
      <Group justify="space-between" mb="md">
        <Title order={2}>{item.title}</Title>
        <Group gap="xs">
          <Link
            href={`/products/${encodeId(item.id)}/edit`}
            style={{ display: "inline-flex" }}
          >
            <ActionIcon color="blue" variant="subtle">
              <IconPencil />
            </ActionIcon>
          </Link>
          <Button variant="light" onClick={() => router.back()}>
            Go Back
          </Button>
        </Group>
      </Group>

      <Paper withBorder p="md" radius="md">
        <Group align="flex-start" wrap="nowrap">
          {item.coverUrl && (
            <Image src={item.coverUrl} alt={item.title} w={160} radius="sm" />
          )}
          <Stack gap="xs" style={{ flex: 1 }}>
            <Group gap="xs">
              <Badge variant="light">ID: {item.id}</Badge>
            </Group>
            <Text c="dimmed">{item.author}</Text>
          </Stack>
        </Group>

        <Divider my="md" />
        {item.description && <Text>{item.description}</Text>}
      </Paper>
    </Container>
  );
}
