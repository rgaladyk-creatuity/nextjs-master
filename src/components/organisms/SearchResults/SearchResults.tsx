"use client";

import { gql, useSuspenseQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { ProductList } from "../ProductList/ProductList";
import { ProductsGetBySlugDocument, type ProductsGetBySlugQuery } from "@/gql/graphql";

export const SearchResults = () => {
	const searchParams = useSearchParams();
	const query = searchParams.get("query");

	const gqlQuery = gql`
		${ProductsGetBySlugDocument}
	`;

	const { data }: { data: ProductsGetBySlugQuery } = useSuspenseQuery(gqlQuery, {
		variables: {
			query,
		},
	});

	const products = data?.products || [];

	return (
		<>
			<p>Search results for: {query}</p>
			{products.length ? <ProductList products={products} /> : <p>No results were found</p>}
		</>
	);
};
