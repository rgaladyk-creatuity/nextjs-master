import { TypedDocumentString } from "@/gql/graphql";

export async function executeGraphql<TResult, TVariables>({
	query,
	variables,
	cache,
	next,
	headers,
}: {
	query: TypedDocumentString<TResult, TVariables>;
	cache?: RequestCache;
	headers?: HeadersInit;
	next?: NextFetchRequestConfig;
} & (TVariables extends { [_key: string]: never }
	? { variables?: never }
	: { variables: TVariables })): Promise<TResult> {
	if (!process.env.GRAPHQL_URL) {
		throw TypeError("GRAPHQL_URL is not defined");
	}

	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
			// refresh:
			// cache === "no-cache" || cache === "no-store"
			// ? `${crypto.randomUUID()}-${crypto.randomUUID()}`
			// : undefined,
		}),
		cache,
		next,
		headers: {
			// authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}`,
			...headers,
			"Content-Type": "application/json",
		},
	});

	const graphqlResponse = await res.json();

	if (graphqlResponse.errors) {
		console.error(graphqlResponse.errors);
		const errorMessage = graphqlResponse.errors[0] ? graphqlResponse.errors[0].message : "";
		throw TypeError(`GraphQL Error: ${errorMessage}`, {
			cause: graphqlResponse.errors,
		});
	}

	return graphqlResponse.data;
}
