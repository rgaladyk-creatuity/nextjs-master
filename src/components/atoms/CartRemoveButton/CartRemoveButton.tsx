"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeProductFromCart } from "@/app/cart/actions";

export const CartRemoveButton = ({ itemId }: { itemId: string }) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	return (
		<button
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await removeProductFromCart(itemId);
					router.refresh();
				});
			}}
		>
			Remove
		</button>
	);
};
