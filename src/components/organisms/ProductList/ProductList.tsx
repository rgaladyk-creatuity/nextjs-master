import staticData from "./ProductListData.json";
import { type ProductListType } from "@/components/types";
import { ProductListItem } from "@/components/molecules/ProductListItem/ProductListItem";

export const ProductList = () => {
	const data: ProductListType = staticData;
	return (
		<ul className="flex flex-wrap" data-testid="products-list">
			{data.items.map((product) => {
				return <ProductListItem key={product.id} product={product} />;
			})}
		</ul>
	);
};
