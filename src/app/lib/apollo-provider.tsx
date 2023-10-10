"use client";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
	NextSSRInMemoryCache,
	NextSSRApolloClient,
	SSRMultipartLink,
	ApolloNextAppProvider,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
	const httpLink = new HttpLink({
		uri: process.env.GRAPHQL_URL,
	});

	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache(),
		link:
			typeof window === "undefined"
				? ApolloLink.from([
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
				  ])
				: httpLink,
	});
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
	return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
