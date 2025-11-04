"use client";

import { Button, Container, Group, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { CreateProductForm } from "./components/CreateProductForm";

export default function CreateProductPage() {
  const router = useRouter();

  return (
    <Container size="sm" p="md">
      <Group justify="space-between" mb="md">
        <Title order={2}>Create product</Title>
        <Button variant="light" onClick={() => router.back()}>
          Go Back
        </Button>
      </Group>
      <CreateProductForm />
    </Container>
  );
}
