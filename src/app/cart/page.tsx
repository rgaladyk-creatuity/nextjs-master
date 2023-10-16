import { cookies } from "next/headers";
import Link from "next/link";
import { formatMoney } from "../lib/formatMoney";
import { CartRemoveButton } from "@/components/atoms/CartRemoveButton/CartRemoveButton";
import { ChangeQuantity } from "@/components/atoms/ChangeQuantity/ChangeQuantity";
import { executeGraphql } from "@/components/utils";
import { CartGetByIdDocument } from "@/gql/graphql";

export default async function CartPage() {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId?.length) {
		return <p>Cart not found</p>;
		// redirect("/");
	}

	const { order: cart } = await executeGraphql({
		query: CartGetByIdDocument,
		variables: {
			id: cartId,
		},
	});

	if (!cart) {
		return <p>Cart not found</p>;
		// redirect("/");
	}

	if (!cart?.orderItems?.length) {
		return <p>No items in cart</p>;
		// redirect("/");
	}

	return (
		<div>
			<h1>Order #{cart.id} summary</h1>
			<Link href="/cart/details">Details</Link>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Product</th>
						<th>Quantity</th>
						<th>Increase</th>
						<th>Price</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{cart.orderItems.map((item) => {
						if (!item.product) {
							return null;
						}
						return (
							<>
								<tr key={item.id}>
									<td>{item.id}</td>
									<td>{item.product.name}</td>
									<td data-testid="quantity">{item.quantity}</td>
									<td>
										<ChangeQuantity itemId={item.id} quantity={item.quantity} />
									</td>
									<td>{formatMoney(item.product.price)}</td>
									<td>
										<CartRemoveButton itemId={item.id} />
									</td>
								</tr>
								{/* <tr>
									<td colSpan={6}>
										<pre>{JSON.stringify(item.product)}</pre>
									</td>
								</tr> */}
							</>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
