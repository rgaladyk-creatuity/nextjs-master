import Link from "next/link";
import { ProductItemImage } from "@/components/atoms/ProductItemImage/ProductItemImage";
import { type ProductListItemFragment } from "@/gql/graphql";

export const ProductListItem = ({ product }: { product: ProductListItemFragment }) => {
	const imageUrl = product.images[0].url || "";
	return (
		<li className="w-full p-4 sm:w-1/2 xl:w-1/4" key={product.id}>
			<Link href={`/product/${product.id}`}>
				<div className="border-w-1 rounded-lg border-2 border-solid border-green-400 bg-gray-100 p-4 text-black hover:bg-gray-200">
					<p className="mb-2 bg-green-500 text-center text-xl font-bold text-white">
						{product.categories[0].name}
					</p>
					{imageUrl.length && <ProductItemImage image={imageUrl} />}
					<h3 className="text-lg font-bold">{product.name}</h3>
					<p>{product.description}</p>
					<p className="text-right text-lg">{product.price}</p>
					<button className="bg-green-400 px-4 py-2 hover:bg-green-600">Add to cart</button>
				</div>
			</Link>
		</li>
	);
};
