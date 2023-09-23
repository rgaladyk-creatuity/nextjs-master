import { ProductItemImage } from "@/components/atoms/ProductItemImage/ProductItemImage";
import { type ProductItemType } from "@/components/types";

export const ProductListItem = ({ product }: { product: ProductItemType }) => {
	return (
		<li className="w-full p-4 sm:w-1/2 xl:w-1/4" key={product.id}>
			<div className="rounded-lg bg-gray-100 p-4 text-black hover:bg-gray-200">
				<p className="mb-2 bg-green-500 text-center text-xl font-bold text-white">
					{product.category}
				</p>
				<ProductItemImage image={product.image} />
				<h3 className="text-lg font-bold">{product.name}</h3>
				<p>{product.description}</p>
				<p className="text-right text-lg">{product.price}</p>
				<button className="bg-green-400 px-4 py-2 hover:bg-green-600">Add to cart</button>
			</div>
		</li>
	);
};
