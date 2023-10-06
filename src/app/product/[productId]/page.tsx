import { ProductVariants } from "@/components/molecules/ProductVariants/ProductVariants";
import { RelatedProducts } from "@/components/organisms/RelatedProducts/RelatedProducts";
import { executeGraphql } from "@/components/utils";
import { ProductGetByIdDocument, type ProductListItemFragment } from "@/gql/graphql";

type PageParams = {
	params: { productId: string };
};

const getProductData = async (productId: string): Promise<ProductListItemFragment | null> => {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: productId,
	});

	return product || null;
};

export async function generateMetadata({ params }: PageParams) {
	const product = await getProductData(params.productId);

	if (!product) {
		return null;
	}

	const { name, description } = product;

	return {
		title: name,
		description,
	};
}

export default async function ProductPage({ params }: PageParams) {
	const product = await getProductData(params.productId);

	if (!product) {
		return null;
	}

	const { categories, name, description, variants } = product;
	const categorySlug = categories[0].slug || "";

	return (
		<>
			<h1>{name}</h1>
			<p>{description}</p>
			{variants.length && <ProductVariants variants={variants} />}
			{categorySlug.length && <RelatedProducts categorySlug={categorySlug} />}
		</>
	);
}
