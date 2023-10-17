import { revalidateTag } from "next/cache";
import { addProductToCart, getCartData, getOrCreateCartId } from "@/app/cart/actions";
import { AddToCartButton } from "@/components/atoms/AddToCartClient/AddToCartClient";
import { ProductVariants } from "@/components/molecules/ProductVariants/ProductVariants";
import { RelatedProducts } from "@/components/organisms/RelatedProducts/RelatedProducts";
import { executeGraphql } from "@/components/utils";
import { ProductGetByIdDocument, type ProductListItemFragment } from "@/gql/graphql";
import { AddProductReview } from "@/components/molecules/AddProductReview/AddProductReview";
import { changeItemQuantity } from "@/components/atoms/ChangeQuantity/actions";

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

	const cartData = await getCartData();

	if (!product) {
		return null;
	}

	const { id, categories, name, description, variants } = product;
	const categorySlug = categories[0].slug || "";

	// cart: CartDataFragment;

	async function addProductToCartAction(formData: FormData) {
		"use server";

		const cartId = await getOrCreateCartId();
		if (!cartId) {
			throw new Error("Cant get cart id");
		}

		switch (formData.get("action")) {
			case "add":
				await addProductToCart(cartId, params.productId);
				break;
			case "update":
				const itemId = formData.get("productId");
				const itemQty = formData.get("productQuantity");
				if (itemId !== null && itemQty !== null) {
					await changeItemQuantity(itemId.toString(), (parseInt(itemQty.toString()) || 0) + 1);
				}
				break;
		}

		revalidateTag("cart");
	}

	let itemId = null;
	let itemQuantity = 0;

	if (cartData?.id) {
		cartData?.orderItems?.forEach((item) => {
			if (id === item.product?.id) {
				itemId = item.id;
				itemQuantity = item.quantity;
			}
		});
	}

	return (
		<>
			<h1>{name}</h1>
			<p>{description}</p>
			<pre>{id}</pre>
			<pre>{JSON.stringify(cartData)}</pre>
			<form action={addProductToCartAction}>
				<input type="text" name="action" value={itemId ? "update" : "add"} />
				<input type="text" name="productId" defaultValue={itemId ? itemId : id} hidden />
				<input type="text" name="productQuantity" defaultValue={itemQuantity} hidden />
				{variants.length && <ProductVariants variants={variants} />}
				{/* <button
					type="submit"
					className="w-full rounded-md border bg-slate-700 px-8 py-3 text-white"
				>
					Add to cart
				</button> */}
				<AddToCartButton />
			</form>
			<AddProductReview />
			{categorySlug.length && <RelatedProducts categorySlug={categorySlug} />}
		</>
	);
}
