import { getProducts } from "@/app/prisma-db";
import { ProductDetail } from "./product-detail";
import SearchForm from "./search-form";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string | null;
};

export default async function ProductsPrismaDBPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const products: Product[] = await getProducts(query);

  return (
    <div className="p-4">
      <SearchForm initialQuery={query} />
      <ProductDetail products={products} />
    </div>
  );
}
