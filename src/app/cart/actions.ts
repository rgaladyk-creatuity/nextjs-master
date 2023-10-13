"use server";

import { executeGraphql } from "@/components/utils";
import {
	CartAddItemDocument,
	CartCreateDocument,
	CartGetByIdDocument,
	CartRemoveItemDocument,
	CartUpdateProductQuantityDocument,
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
			next: {
				tags: ["cart"],
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

	await executeGraphql({
		query: CartAddItemDocument,
		variables: {
			orderId: cartId,
			productId,
			total: product.price,
		},
	});
}

export async function changeItemQuantity(itemId: string, quantity: number) {
	await executeGraphql({
		query: CartUpdateProductQuantityDocument,
		variables: {
			itemId,
			quantity,
		},
	});
}

export async function removeProductFromCart(productId: string) {
	await executeGraphql({
		query: CartRemoveItemDocument,
		variables: {
			itemId: productId,
		},
	});
}
