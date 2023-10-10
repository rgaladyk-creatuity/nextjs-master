import { executeGraphql } from "@/components/utils";
import {
	CartAddItemDocument,
	CartCreateDocument,
	CartGetByIdDocument,
	ProductGetByIdDocument,
} from "@/gql/graphql";
import { cookies } from "next/headers";

export async function getOrCreateCart() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const { order: cart } = await executeGraphql({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
		});
		if (cart) {
			return cart;
		}
	}

	const { createOrder: newCart } = await executeGraphql({ query: CartCreateDocument });
	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id);
	return newCart;
}

export async function addProductToCart(cartId: string, productId: string) {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: productId,
		},
	});
	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	console.log(cartId, productId);

	await executeGraphql({
		query: CartAddItemDocument,
		variables: {
			orderId: cartId,
			productId,
			total: product.price,
		},
	});
}
