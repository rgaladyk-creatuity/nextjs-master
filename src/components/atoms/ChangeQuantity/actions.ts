"use server";

import { executeGraphql } from "@/components/utils";
import { CartUpdateProductQuantityDocument } from "@/gql/graphql";
import { revalidateTag } from "next/cache";

export async function changeItemQuantity(itemId: string, quantity: number) {
	await executeGraphql({
		query: CartUpdateProductQuantityDocument,
		variables: {
			orderItemId: itemId,
			quantity,
		},
	});
	revalidateTag("cart");
}
