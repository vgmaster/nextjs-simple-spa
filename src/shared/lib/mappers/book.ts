import { TBook, TBookApiItem } from "@/shared/types/book";

export function mapBook(api: TBookApiItem): TBook {
  // normalize id
  const rawId = api.key || "";
  const id = rawId.startsWith("/") ? rawId.slice(1) : rawId;

  return {
    id,
    title: api.title,
    author: api.authors?.[0]?.name || "Unknown",
    favorite: false,
    description: api.subject?.slice(0, 5).join(", ") || "No description",
    coverUrl: api.cover_id
      ? `https://covers.openlibrary.org/b/id/${api.cover_id}-M.jpg`
      : null,
  };
}
