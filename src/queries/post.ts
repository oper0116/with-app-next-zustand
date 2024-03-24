import { QueryClient, useQuery } from "@tanstack/react-query";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
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
	const cacheFn = unstable_cache(async () => getHello(), ["hello"], {
		revalidate: 30000,
	});
	return cacheFn();
}

export const useHelloQuery = () => {
	return useQuery({ queryKey: ["hydrate-hello"], queryFn: getHello });
};

export const prefetchHelloQuery = async (queryClient: QueryClient) => {
	return queryClient.prefetchQuery({ queryKey: ["hydrate-hello"], queryFn: getCachedHello });
};

export const getPostById = async ({ id }: { id: string }) => {
	const params = {};

	const res = await fetch(`${getBaseUrl()}${`/api/posts/${id}`}`);
	return res.json();
	// const res = await fetch(`${getBaseUrl()}${"/api/posts"}`, { method: "post", headers: { "content-Type": "application/json", body: JSON.stringify() } });
};

export const insertPost = async () => {
	const params = {
		title: "타이틀1",
		content: "콘텐츠1",
		published: false,
		author: 1,
		authorId: "oper0116@naver.com",
	};
	const res = await fetch(`${getBaseUrl()}${"/api/posts"}`, { method: "post", headers: { "content-Type": "application/json", body: JSON.stringify(params) } });

	return res;
};
