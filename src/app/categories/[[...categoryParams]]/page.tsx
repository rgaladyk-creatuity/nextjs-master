import { notFound } from "next/navigation";
import { AllProductsList } from "@/components/organisms/AllProductsList/AllProductsList";
import { ProductList } from "@/components/organisms/ProductList/ProductList";
import { executeGraphql } from "@/components/utils";
import { ProductsGetByCategorySlugDocument } from "@/gql/graphql";

export default async function CategoryPage({
	params: { categoryParams },
}: {
	params: { categoryParams: string[] };
}) {
	if (!categoryParams?.length || !categoryParams[0]) {
		return <AllProductsList />;
	}

	const categorySlug = categoryParams[0] || "";
	// const pageNumber = categoryParams[1] || 1;

	const { categories } = await executeGraphql(ProductsGetByCategorySlugDocument, {
		slug: categorySlug,
	});

	if (!categories[0]?.products.length) {
		notFound();
	}

	const products = categories[0].products;
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ProductList products={products} />
			{/* <Pagination path={"/products"} currentPage={currentPage} totalPages={10} /> */}
		</main>
	);
}
