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
		<li>
			<Link
				href={path as Route}
				className={clsx(
					"m-2",
					current ? "border-b-2 border-solid border-green-500 font-bold" : null,
				)}
			>
				{pageNumber}
			</Link>
		</li>
	);
};
