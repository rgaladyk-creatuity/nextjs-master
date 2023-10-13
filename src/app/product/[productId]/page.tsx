import { addProductToCart, getOrCreateCart } from "@/app/cart/actions";
import { AddToCartButton } from "@/components/atoms/AddToCartClient/AddToCartClient";
import { ProductVariants } from "@/components/molecules/ProductVariants/ProductVariants";
import { RelatedProducts } from "@/components/organisms/RelatedProducts/RelatedProducts";
import { executeGraphql } from "@/components/utils";
import { ProductGetByIdDocument, type ProductListItemFragment } from "@/gql/graphql";
import { revalidatePath, revalidateTag } from "next/cache";

type PageParams = {
	params: { productId: string };
};

const getProductData = async (productId: string): Promise<ProductListItemFragment | null> => {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: productId,
		},
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

	const { id, categories, name, description, variants } = product;
	const categorySlug = categories[0].slug || "";

	async function addProductToCartAction(formData: FormData) {
		"use server";

		const cart = await getOrCreateCart();
		if (!cart.id) {
			throw new Error("Cant get cart id");
		}

		await addProductToCart(cart.id, params.productId);
		revalidateTag("cart");
	}

	return (
		<>
			<h1>{name}</h1>
			<p>{description}</p>
			<form action={addProductToCartAction}>
				<input type="text" name="productId" defaultValue={id} hidden />
				{variants.length && <ProductVariants variants={variants} />}
				{/* <button
					type="submit"
					className="w-full rounded-md border bg-slate-700 px-8 py-3 text-white"
				>
					Add to cart
				</button> */}
				<AddToCartButton />
			</form>
			{categorySlug.length && <RelatedProducts categorySlug={categorySlug} />}
		</>
	);
}
