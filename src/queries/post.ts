import { QueryClient, useQuery } from "@tanstack/react-query";
import { unstable_cache } from "next/cache";
import { getQueryClient } from "~/lib/react-query/getQueryClient";

const getBaseUrl = () => {
	if (typeof window === "undefined") {
		return `http://localhost:3000`;
	}

	return ``;
};

export async function getHello() {
	const res = await fetch(`${getBaseUrl()}${"/api/hello"}`, { cache: "no-store" });
	return res.json();
}

export async function getCachedHello() {
	// console.debug("cookieStore: ", cookieStore);
	const cacheFn = unstable_cache(async () => getHello(), ["hello"], {
		revalidate: 3000,
	});
	return cacheFn();
}

export const useHelloQuery = () => {
	return useQuery({ queryKey: ["hydrate-hello"], queryFn: getHello });
};

export const prefetchHelloQuery = async (queryClient: QueryClient) => {
	return queryClient.prefetchQuery({ queryKey: ["hydrate-hello"], queryFn: getCachedHello });
};
