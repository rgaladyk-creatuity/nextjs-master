"use server";

import { cookies } from "next/headers";
import { executeGraphql } from "@/components/utils";
import {
	CartAddItemDocument,
	CartCreateDocument,
	CartGetByIdDocument,
	CartRemoveItemDocument,
	CartUpdateProductQuantityDocument,
	ProductGetByIdDocument,
} from "@/gql/graphql";

export const getCartData = async () => {
	const cartId = cookies().get("cartId")?.value || "";

	if (cartId.length) {
		const { order: cart } = await executeGraphql({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			next: {
				tags: ["cart"],
			},
		});
		return cart;
	}

	return {
		id: null,
	};
};

export async function getOrCreateCartId(): Promise<string> {
	"use server";
	const cart = await getCartData();
	if (cart?.id) {
		return cart.id;
	}

	const { createOrder: newCart } = await executeGraphql({ query: CartCreateDocument });
	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id);
	return newCart.id;
}

export async function getCartId(): Promise<string> {
	"use server";
	return cookies().get("cartId")?.value || "";
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

	await executeGraphql({
		query: CartAddItemDocument,
		variables: {
			orderId: cartId,
			productId,
			total: product.price,
		},
	});
}

// export async function changeItemQuantity(itemId: string, quantity: number) {
// 	console.log("UPDATE", itemId, quantity);
// 	await executeGraphql({
// 		query: CartUpdateProductQuantityDocument,
// 		variables: {
// 			orderItemId: itemId,
// 			quantity,
// 		},
// 	});
// }

export async function removeProductFromCart(productId: string) {
	await executeGraphql({
		query: CartRemoveItemDocument,
		variables: {
			itemId: productId,
		},
	});
}
