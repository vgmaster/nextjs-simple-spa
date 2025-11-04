"use client";

import { Group, Pagination } from "@mantine/core";

type TPaginationBarProps = {
  page: number;
  total: number;
  onChange: (page: number) => void;
};

export function PaginationBar({ page, total, onChange }: TPaginationBarProps) {
  return (
    <Group justify="center" mt="md">
      <Pagination value={page} onChange={onChange} total={total} />
    </Group>
  );
}
