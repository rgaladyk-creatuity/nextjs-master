import { ProductList } from "@/components/organisms/ProductList/ProductList";
import { executeGraphql } from "@/components/utils";
import { ProductsGetListDocument } from "@/gql/graphql";

export default async function ProductsPage() {
	const { products } = await executeGraphql({ query: ProductsGetListDocument });

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ProductList products={products} />
			{/* <Pagination path={"/products"} currentPage={currentPage} totalPages={10} /> */}
		</main>
	);
}
