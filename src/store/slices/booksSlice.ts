import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getBooks } from "@/shared/api";
import { mapBook } from "@/shared/lib/mappers";
import type { TBook } from "@/shared/types";

export const fetchBooks = createAsyncThunk("books/fetch", async () => {
  const res = await getBooks();
  return res.works.map(mapBook);
});

export type TBooksState = {
  items: TBook[];
  filter: "all" | "favorites";
  loading: boolean;
  error: string | null;
};

const initialState: TBooksState = {
  items: [],
  filter: "all",
  loading: false,
  error: null,
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const book = state.items.find((item) => item.id === action.payload);
      if (book) book.favorite = !book.favorite;
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addBook: (state, action: PayloadAction<TBook>) => {
      state.items.unshift(action.payload);
    },
    updateBook: (state, action: PayloadAction<TBook>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setFilter: (state, action: PayloadAction<"all" | "favorites">) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export const { toggleFavorite, deleteBook, addBook, updateBook, setFilter } =
  booksSlice.actions;
export default booksSlice.reducer;
