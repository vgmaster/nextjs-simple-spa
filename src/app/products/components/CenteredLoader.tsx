"use client";

import { Group, Loader } from "@mantine/core";

export function CenteredLoader() {
  return (
    <Group justify="center" align="center" style={{ minHeight: "calc(100vh - 120px)" }}>
      <Loader />
    </Group>
  );
}


