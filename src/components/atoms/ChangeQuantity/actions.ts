"use server";

import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/components/utils";
import { CartUpdateProductQuantityDocument } from "@/gql/graphql";

export async function changeItemQuantity(itemId: string, quantity: number) {
	const data = await executeGraphql({
		query: CartUpdateProductQuantityDocument,
		variables: {
			orderItemId: itemId,
			quantity,
		},
		cache: "no-cache",
	});
	revalidateTag("cart");
	return data;
}
