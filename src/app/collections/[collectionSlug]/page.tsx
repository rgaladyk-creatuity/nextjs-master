import { ProductList } from "@/components/organisms/ProductList/ProductList";
import { executeGraphql } from "@/components/utils";
import {
	CollectionsGetByCategorySlugDocument,
	type CollectionsGetByCategorySlugQuery,
} from "@/gql/graphql";

export default async function CollectionsPage({ params }: { params: { collectionSlug: string } }) {
	const { collectionSlug } = params;
	const data: CollectionsGetByCategorySlugQuery = await executeGraphql(
		CollectionsGetByCategorySlugDocument,
		{
			slug: collectionSlug,
		},
	);

	const products = data.collections[0].products || [];

	return <ProductList products={products} />;
}
