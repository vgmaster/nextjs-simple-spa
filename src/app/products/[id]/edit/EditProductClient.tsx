"use client";

import { Button, Container, Group, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectBookById } from "@/store/selectors/books";
import { EditProductForm } from "./components/EditProductForm";

export default function EditProductClient({ id }: { id: string }) {
  const router = useRouter();
  const item = useAppSelector(selectBookById(id));

  if (!item) {
    return (
      <Container p="md">
        <Group justify="space-between" mb="md">
          <Title order={3}>Edit product</Title>
          <Button variant="light" onClick={() => router.back()}>
            Go Back
          </Button>
        </Group>
        Not found
      </Container>
    );
  }

  return (
    <Container size="sm" p="md">
      <Group justify="space-between" mb="md">
        <Title order={2}>Edit product</Title>
        <Button variant="light" onClick={() => router.back()}>
          Cancel
        </Button>
      </Group>

      <EditProductForm item={item} onSubmitSuccess={() => router.back()} />
    </Container>
  );
}


