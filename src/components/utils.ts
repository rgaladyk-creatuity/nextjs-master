import { TypedDocumentString } from "@/gql/graphql";
import { GraphQLResponse } from "./types";

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
	next?: NextFetchRequestConfig | undefined;
} & (TVariables extends { [key: string]: never }
	? { variables?: never }
	: { variables: TVariables })): Promise<TResult> {
	// if (!process.env.GRAPHQL_URL) {
	// 	throw TypeError("GRAPHQL_URL is not defined");
	// }

	const res = await fetch(
		"https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnjei8w52zs301uf5kqp3qii/master",
		{
			method: "POST",
			body: JSON.stringify({
				query,
				variables,
			}),
			cache,
			next,
			headers: {
				...headers,
				"Content-Type": "application/json",
				Authorization:
					"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2OTY4ODY2ODEsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xuamVpOHc1MnpzMzAxdWY1a3FwM3FpaS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNDBiOTE5ZGUtNjk5Ny00NjVjLTg4MDctYjE3ZjUyMTc0ODBkIiwianRpIjoiY2tsdXpicmxwNW9sOTAxeHY3MzI1OHRqZCJ9.TeBA91JCCXwXojh-CAPjuDnDlXhyqAeE3_rZ2TinbWlBBPDXJnOmQZET6us-o0Bua50FxHniOBYpKnC1qDnjdqZ46AJUycZ9xMxbMB1cILwjyLWOefAKUI1X6Y9dyEm69q23SN_xWt25kpNL0b5XdGT5UrvvEVI-wRO4sIr2w8fCN1zHHLagwmOeWIQrpdGFpQdsE-v5CRctCdIibK0OYIuRMOmXrNyiC9kWoJ3ZeeAn3Ihkvasn4Ha6tzsT3DK2Uegcp7x0bsMp2VUYO0IncDrQwv8nPpaA1COWUKOJeQQkCq3Es_kehlRGtYINLRYkbBD6sxpdk-Ut3GRSeYzdt1TYAX3cKLtXGihSZsK2gg7yLZaVC0G9d_U2qZpgrShVML01RXvh2ze_shfxCD7QGL_bz9q7nwwzpCdjaHRz5p6eHfmzwMmmAZdKAx_8MFFNWqYM7dOxOeO01b7BIQOjXjFqbF3yjk9toWjZmSTmCO-_Sk7Ml76tmO7dFCIOwW9QHI2s88nGw4fUmsJHIwUsa0jey3-0zbrSIax2D8xHvVP8xl2vcVMXd2d2Nw7Mwv5WfkF6oCJfCEm_JBTuwkBdQhEaofI23M6iZ4eW3ujWzi8QIy7Z7zdbWXeB-oZ3WdDH-yMhjUriEffxLP9ptn_jiuRbTIaCLL_tMBqPiyxh0qw",
			},
		},
	);

	const graphqlResponse = (await res.json()) as GraphQLResponse<TResult>;

	if (graphqlResponse.errors) {
		console.log(graphqlResponse.errors);
		throw TypeError(`GraphQL Error`, {
			cause: graphqlResponse.errors,
		});
	}

	return graphqlResponse.data;
}
