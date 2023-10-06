"use client";

import { type Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchBar = () => {
	/* eslint-disable */
	const { push } = useRouter();

	const searchParams = useSearchParams();
	const query = searchParams.get("query");

	const [inputValue, setInputValue] = useState(query || "");

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		searchForQuery(inputValue);
	};

	const searchForQuery = (query: string) => {
		if (!query.length) {
			return null;
		}
		const queryPath = `/search?query=${query}`;
		push(queryPath as Route);
	};

	useEffect(() => {
		const timeoutID = setTimeout(() => {
			searchForQuery(inputValue);
		}, 2000);

		return () => {
			clearTimeout(timeoutID);
		};
		/* eslint-disable */
	}, [inputValue]);

	return (
		<form onSubmit={onSubmit}>
			<label className="sr-only" htmlFor="query">
				Search for:
			</label>
			<input
				className="border-2 border-red-500"
				type="text"
				name="query"
				id="query"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<input type="submit" value="Submit form" className="sr-only" />
		</form>
	);
};
