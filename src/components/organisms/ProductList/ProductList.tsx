// import staticData from "./ProductListData.json";
import { type ProductItemType } from "@/components/types";
import { ProductListItem } from "@/components/molecules/ProductListItem/ProductListItem";

export const ProductList = async ({ products }: { products: ProductItemType[] }) => {
	// const data: ProductListType = staticData;

	if (!products.length) {
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
