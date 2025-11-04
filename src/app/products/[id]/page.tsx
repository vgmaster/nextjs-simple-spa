import { getBooks } from "@/shared/api";
import ProductDetailClient from "./ProductDetailClient";
import { decodeId, encodeId } from "@/shared/lib/utils";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
    const realId = decodeId(id);
  return <ProductDetailClient id={realId} />;
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
