"use client";

import {
  Button,
  Group,
  SegmentedControl,
  Select,
  TextInput,
} from "@mantine/core";
import Link from "next/link";

type TFiltersBarProps = {
  filter: "all" | "favorites";
  onFilterChange: (value: "all" | "favorites") => void;
  extraFilter: "all" | "hasCover" | "noCover";
  onExtraFilterChange: (value: "all" | "hasCover" | "noCover") => void;
  search: string;
  onSearchChange: (value: string) => void;
};

export function FiltersBar({
  filter,
  onFilterChange,
  extraFilter,
  onExtraFilterChange,
  search,
  onSearchChange,
}: TFiltersBarProps) {
  const handleExtraFilterChange = (value: string | null) => {
    if (value === "all" || value === "hasCover" || value === "noCover") {
      onExtraFilterChange(value);
    } else {
      onExtraFilterChange("all");
    }
  };
  return (
    <>
      <Button component={Link} href={"/products/create-product"}>
        Create product
      </Button>
      <Group mt="md" align="flex-end" gap="md">
        <SegmentedControl
          value={filter}
          onChange={(v) => onFilterChange(v as "all" | "favorites")}
          data={[
            { label: "All", value: "all" },
            { label: "Favorites", value: "favorites" },
          ]}
        />
        <Select
          label="Filter"
          placeholder="Select"
          value={extraFilter}
          onChange={handleExtraFilterChange}
          data={[
            { label: "All", value: "all" },
            { label: "Has cover", value: "hasCover" },
            { label: "No cover", value: "noCover" },
          ]}
          w={220}
        />
        <TextInput
          label="Search"
          placeholder="Title or author"
          value={search}
          onChange={(value) => onSearchChange(value.currentTarget.value)}
          style={{ flex: 1 }}
        />
      </Group>
    </>
  );
}
