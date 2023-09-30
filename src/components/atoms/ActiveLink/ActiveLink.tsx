"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";

export const ActiveLink = ({
	className,
	activeClassName,
	href,
	text,
}: {
	className: string;
	activeClassName: string;
	href: Route | URL;
	text: string;
}) => {
	const path = usePathname();
	let isActive = path === href;

	if (!isActive) {
		const pathWithoutTrailingSlash = path.replace(/^\//, "");
		const hrefWithoutTrailingSlash = href.toString().replace(/^\//, "");

		if (pathWithoutTrailingSlash.length && hrefWithoutTrailingSlash.length) {
			isActive = !!pathWithoutTrailingSlash.match(hrefWithoutTrailingSlash.toString());
		}
	}

	return (
		<Link
			className={clsx(className, isActive ? activeClassName : null)}
			aria-current={!!isActive ? true : undefined}
			href={href}
		>
			{text}
		</Link>
	);
};
