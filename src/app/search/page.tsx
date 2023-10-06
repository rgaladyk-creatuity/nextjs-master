import { SearchResults } from "@/components/organisms/SearchResults/SearchResults";

export default function Page({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	return <SearchResults query={searchParams?.query?.toString() || ""} />;
}
