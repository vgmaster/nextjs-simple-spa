"use client";

import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAppDispatch } from "@/store/hooks";
import { updateBook } from "@/store/slices/booksSlice";
import type { TBook } from "@/shared/types";

type TEditProductFormProps = {
  item: TBook;
  onSubmitSuccess: () => void;
};

export function EditProductForm({ item, onSubmitSuccess }: TEditProductFormProps) {
  const dispatch = useAppDispatch();

  const form = useForm<{ title: string; author: string; description: string }>(
    {
      initialValues: {
        title: item.title,
        author: item.author,
        description: item.description,
      },
      validate: {
        title: (value) => (!value.trim() ? "Required" : null),
        author: (value) => (!value.trim() ? "Required" : null),
        description: (value) => (value.trim().length < 5 ? "Min 5 symbols" : null),
      },
    }
  );

  const onSubmit = form.onSubmit((values) => {
    const updated: TBook = {
      ...item,
      title: values.title.trim(),
      author: values.author.trim(),
      description: values.description.trim(),
    };
    dispatch(updateBook(updated));
    onSubmitSuccess();
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <Stack>
        <TextInput label="Title" placeholder="Title" required {...form.getInputProps("title")} />
        <TextInput label="Author" placeholder="Author" required {...form.getInputProps("author")} />
        <TextInput
          label="Description"
          placeholder="Description"
          required
          {...form.getInputProps("description")}
        />
        <Group justify="flex-end">
          <Button type="submit">Save</Button>
        </Group>
      </Stack>
    </form>
  );
}


