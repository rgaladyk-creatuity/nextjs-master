import clsx from "clsx";
import { type Route } from "next";
import Link from "next/link";

export const PaginationLink = ({
	pageNumber,
	path,
	current,
}: {
	pageNumber: number;
	path: string;
	current: boolean;
}) => {
	return (
		<li className={clsx("m-2", current ? "font-bold" : null)}>
			<Link href={path as Route}>{pageNumber}</Link>
		</li>
	);
};
