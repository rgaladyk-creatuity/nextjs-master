import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { ProductList } from "@/components/organisms/ProductList/ProductList";
import { type ProductItemType } from "@/components/types";

const ITEMS_PER_PAGE = 20;

export default async function ProductsPage({ params }: { params: { pageNumber: string } }) {
	const { pageNumber } = params;
	let currentPage;
	try {
		currentPage = parseInt(pageNumber);
		if (isNaN(currentPage)) {
			throw new Error("Not found");
		}
	} catch {
		currentPage = 1;
	}

	const response = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${ITEMS_PER_PAGE}&offset=${
			(currentPage - 1) * ITEMS_PER_PAGE
		}`,
	);
	const data = (await response.json()) as ProductItemType[];

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ProductList products={data} />
			<Pagination path={"/products"} currentPage={currentPage} totalPages={10} />
		</main>
	);
}
