"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "./actions";

export const ChangeQuantity = ({ itemId, quantity }: { itemId: string; quantity: number }) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);

	return (
		<>
			<form className="flex">
				<button
					data-testid="decrement"
					className="h-6 w-6 border"
					type="submit"
					formAction={async () => {
						setOptimisticQuantity(optimisticQuantity - 1);
						await changeItemQuantity(itemId, optimisticQuantity - 1);
					}}
				>
					-
				</button>
			</form>
			<td data-testid="quantity">{optimisticQuantity}</td>
			<form className="flex">
				<button
					data-testid="increment"
					className="h-6 w-6 border"
					type="submit"
					formAction={async () => {
						setOptimisticQuantity(optimisticQuantity + 1);
						await changeItemQuantity(itemId, optimisticQuantity + 1);
					}}
				>
					+
				</button>
			</form>
		</>
	);
};
