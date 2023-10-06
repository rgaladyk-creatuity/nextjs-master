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
		uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clihaom3j03ep01te1dg24yp5/master",
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
