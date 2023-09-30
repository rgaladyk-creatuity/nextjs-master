import { type Route } from "next";
import staticData from "./TopNavData.json";
import { type TopNavItemType, type TopNavType } from "@/components/types";
import { ActiveLink } from "@/components/atoms/ActiveLink/ActiveLink";

export const TopNav = () => {
	const data: TopNavType = staticData.map((links) => {
		return {
			path: links.path as Route,
			name: links.name,
		};
	});

	return (
		<nav className="mx-auto max-w-xl" role="navigation">
			<ul className="text-center">
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
		</nav>
	);
};
