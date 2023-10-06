import { ProductListItem } from "@/components/molecules/ProductListItem/ProductListItem";
import { type ProductListItemFragment } from "@/gql/graphql";

export const ProductList = async ({ products }: { products: ProductListItemFragment[] }) => {
	if (!products?.length) {
		return null;
	}

	return (
		<ul className="flex flex-wrap" data-testid="products-list">
			{products.map((product) => {
				return <ProductListItem key={product.id} product={product} />;
			})}
		</ul>
	);
};
