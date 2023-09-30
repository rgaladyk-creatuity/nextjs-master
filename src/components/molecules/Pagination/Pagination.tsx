import { PaginationLink } from "@/components/atoms/PaginationLink/PaginationLink";

export const Pagination = ({
	path,
	currentPage,
	totalPages,
}: {
	path: string;
	currentPage: number;
	totalPages: number;
}) => {
	if (currentPage > totalPages || totalPages < 2) {
		return null;
	}

	const emptyArray = Array.from({ length: totalPages });
	return (
		<ul className="flex" aria-label="Pagination">
			{emptyArray.map((_, index) => {
				return (
					<PaginationLink
						key={index}
						current={currentPage === index + 1}
						pageNumber={index + 1}
						path={`${path}/${index + 1}`}
					/>
				);
			})}
		</ul>
	);
};
