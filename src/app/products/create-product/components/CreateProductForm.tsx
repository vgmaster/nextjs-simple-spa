"use client";

import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { addBook } from "@/store/slices/booksSlice";

export function CreateProductForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      title: "",
      author: "",
      description: "",
    },
    validate: {
      title: (value) => (!value.trim() ? "Required" : null),
      author: (value) => (!value.trim() ? "Required" : null),
      description: (value) =>
        value.trim().length < 5 ? "Min 5 symbols" : null,
    },
  });

  const onSubmit = form.onSubmit((values) => {
    const newBook = {
      id: crypto.randomUUID(),
      title: values.title.trim(),
      author: values.author.trim(),
      description: values.description.trim(),
      favorite: false,
      coverUrl: null,
    };
    dispatch(addBook(newBook));
    router.back();
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <Stack>
        <TextInput
          label="Title"
          placeholder="Title"
          required
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Author"
          placeholder="Author"
          required
          {...form.getInputProps("author")}
        />
        <TextInput
          label="Description"
          placeholder="Description"
          required
          {...form.getInputProps("description")}
        />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
}
