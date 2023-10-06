import { ProductList } from "@/components/organisms/ProductList/ProductList";
import { executeGraphql } from "@/components/utils";
import {
	CollectionsGetByCategorySlugDocument,
	type CollectionsGetByCategorySlugQuery,
} from "@/gql/graphql";

export async function generateMetadata({ params }: { params: { collectionSlug: string } }) {
	const { collectionSlug } = params;
	const data: CollectionsGetByCategorySlugQuery = await executeGraphql(
		CollectionsGetByCategorySlugDocument,
		{
			slug: collectionSlug,
		},
	);

	const name = data.collections[0].name;

	return {
		title: name,
	};
}

export default async function CollectionsPage({ params }: { params: { collectionSlug: string } }) {
	const { collectionSlug } = params;
	const data: CollectionsGetByCategorySlugQuery = await executeGraphql(
		CollectionsGetByCategorySlugDocument,
		{
			slug: collectionSlug,
		},
	);

	const name = data.collections[0].name;
	const products = data.collections[0].products || [];

	return (
		<>
			<h1>{name}</h1>
			<ProductList products={products} />
		</>
	);
}
