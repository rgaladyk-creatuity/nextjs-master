import { ProductList } from "../ProductList/ProductList";
import { ProductsGetBySlugDocument } from "@/gql/graphql";
import { executeGraphql } from "@/components/utils";

export const SearchResults = async ({ query }: { query: string }) => {
	const { products } = await executeGraphql(ProductsGetBySlugDocument, { query: decodeURI(query) });

	return (
		<>
			<p>Search results for: {query}</p>
			{products.length ? <ProductList products={products} /> : <p>No results were found</p>}
		</>
	);
};
