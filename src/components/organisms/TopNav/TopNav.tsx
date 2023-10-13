import { type Route } from "next";
import staticData from "./TopNavData.json";
import { ActiveLink } from "@/components/atoms/ActiveLink/ActiveLink";
import { SearchBar } from "@/components/molecules/SearchBar/SearchBar";
import { type TopNavItemType, type TopNavType } from "@/components/types";
import { getOrCreateCart } from "@/app/cart/actions";

export const TopNav = async () => {
	const data: TopNavType = staticData.map((links) => {
		return {
			path: links.path as Route,
			name: links.name,
		};
	});

	let quantity = 0;
	const cartData = await getOrCreateCart();
	if (typeof cartData === "object") {
		cartData.orderItems.forEach((item) => {
			quantity += item.quantity;
		});
	}

	return (
		<nav className="mx-auto max-w-xl" role="navigation">
			<div className="flex items-center">
				<ul className="flex text-center">
					{data.map((link: TopNavItemType, idx: number) => {
						return (
							<li key={idx} className="m-4 inline-block text-xl font-semibold hover:underline">
								<ActiveLink
									href={link.path}
									text={link.name}
									className="text-blue-400"
									activeClassName="text-blue-600 border-b-2 border-solid border-green-500"
								/>
							</li>
						);
					})}
				</ul>
				<SearchBar />
				{quantity}
			</div>
		</nav>
	);
};
