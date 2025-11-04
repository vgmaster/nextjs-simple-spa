import { getBooks } from "@/shared/api";
import EditProductClient from "./EditProductClient";
import { decodeId, encodeId } from "@/shared/lib/utils";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const decodedId = decodeId(id);
  return <EditProductClient id={decodedId} />;
}

export async function generateStaticParams() {
  const products = await getBooks();

  const ids = Array.isArray(products?.works)
    ? products.works
        .map((work: { key?: string }) => (work?.key || "").replace(/^\//, ""))
        .map((id) => encodeId(id))
        .filter((id: string) => !!id)
    : [];

  return ids.map((id: string) => ({ id }));
}
