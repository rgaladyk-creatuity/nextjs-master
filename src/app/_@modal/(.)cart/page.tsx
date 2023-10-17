import { getCartData } from "@/app/cart/actions";
import { Overlay } from "@/components/atoms/Overlay/Overlay";

export default async function ModalCart() {
	const cart = await getCartData();

	if (!cart?.id) {
		return null;
	}

	return (
		<>
			<Overlay />
			<div className="absolute right-0 top-0 z-40 h-screen w-full max-w-sm bg-white">
				<ul>{cart?.orderItems.map((item) => <li key={item.id}>{item.product?.name}</li>)}</ul>
			</div>
		</>
	);
}
