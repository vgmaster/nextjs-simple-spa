export type TBookApiResponse = {
  works: TBookApiItem[];
};

export type TBookApiItem = {
  key: string;
  title: string;
  authors?: { name: string }[];
  cover_id?: number;
  subject?: string[];
};

export type TBook = {
  id: string;
  title: string;
  author: string;
  favorite: boolean;
  description: string;
  coverUrl: string | null;
};
