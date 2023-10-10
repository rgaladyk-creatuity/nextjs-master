import { notFound } from "next/navigation";
import { ProductList } from "@/components/organisms/ProductList/ProductList";
import { executeGraphql } from "@/components/utils";
import { ProductsGetByCategorySlugDocument } from "@/gql/graphql";
import { Pagination } from "@/components/molecules/Pagination/Pagination";

const getCategoryData = async (categoryParams: string[]) => {
	if (!categoryParams?.length) {
		return null;
	}

	const categorySlug = categoryParams[0] || "";
	let currentPage;
	try {
		const tmp = parseInt(categoryParams[1]);
		if (isNaN(tmp)) {
			throw new Error("Not a nubmer");
		}
		currentPage = tmp;
	} catch {
		currentPage = 1;
	}

	const { categories } = await executeGraphql(ProductsGetByCategorySlugDocument, {
		slug: categorySlug,
	});

	return {
		categorySlug,
		currentPage,
		category: categories[0] || null,
	};
};

export async function generateMetadata({
	params: { categoryParams },
}: {
	params: { categoryParams: string[] };
}) {
	const data = await getCategoryData(categoryParams);

	if (!data?.category) {
		notFound();
	}

	return {
		// title: data.category.name,
		title: "Categories",
	};
}

export default async function CategoryPage({
	params: { categoryParams },
}: {
	params: { categoryParams: string[] };
}) {
	const data = await getCategoryData(categoryParams);

	if (!data?.category) {
		notFound();
	}

	const { categorySlug, currentPage, category } = data;

	const products = category.products;
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Categories</h1>
			<h2>{category.name}</h2>
			<ProductList products={products} />
			<Pagination path={`/categories/${categorySlug}`} currentPage={currentPage} totalPages={10} />
		</main>
	);
}
