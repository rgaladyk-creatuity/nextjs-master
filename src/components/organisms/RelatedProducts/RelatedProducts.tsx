import { ProductList } from "../ProductList/ProductList";
import { executeGraphql } from "@/components/utils";
import { RelatedProductsGetListDocument } from "@/gql/graphql";

export const RelatedProducts = async ({ categorySlug }: { categorySlug: string }) => {
	const relatedProducts = await executeGraphql(RelatedProductsGetListDocument, {
		categorySlug,
	});

	return (
		<section data-testid="related-products">
			<h2>Related products:</h2>
			<ProductList products={relatedProducts?.products || []} />
		</section>
	);
};
