import { type Route } from "next";
import staticData from "./TopNavData.json";
import { ActiveLink } from "@/components/atoms/ActiveLink/ActiveLink";
import { SearchBar } from "@/components/molecules/SearchBar/SearchBar";
import { type TopNavItemType, type TopNavType } from "@/components/types";

export const TopNav = () => {
	const data: TopNavType = staticData.map((links) => {
		return {
			path: links.path as Route,
			name: links.name,
		};
	});

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
									activeClassName="text-blue-600"
								/>
							</li>
						);
					})}
				</ul>
				<SearchBar />
			</div>
		</nav>
	);
};
