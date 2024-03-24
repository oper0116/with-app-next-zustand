import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { unstable_cache } from "next/cache";

import { getBaseUrl } from "~/lib/fetch";

const postKeys = {
	basic: ["posts"] as const,
	lists: () => [...postKeys.basic, "list"] as const,
	list: () => [...postKeys.lists(), {}] as const,
	details: () => [...postKeys.basic, "detail"] as const,
	detail: (id: number) => [...postKeys.details(), id] as const,
	insert: () => [...postKeys.basic, "insert"] as const,
};

// http://localhost:3000/api/posts
export const getPosts = async () => {
	const res = await fetch(`${getBaseUrl()}${`/api/posts`}`, { cache: "no-store" });
	const data = await res.json();
	return data;
};

export const getPostById = async ({ id }: { id: string }) => {
	const params = {};
	const res = await fetch(`${getBaseUrl()}${`/api/posts/${id}`}`);
	return await res.json();
};

export const insertPost = async ({}: { title: string; content: string; published: boolean; authorId?: number }) => {
	const params = {
		title: "타이틀1",
		content: "콘텐츠1",
		published: false,
		author: 1,
		authorId: "oper0116@naver.com",
	};
	const res = await fetch(`${getBaseUrl()}${"/api/posts"}`, { method: "post", headers: { "content-Type": "application/json", body: JSON.stringify(params) } });

	return await res.json();
};

export async function getCachedPosts() {
	const cacheFn = unstable_cache(async () => getPosts(), [...postKeys.lists()], {
		revalidate: 30000,
	});
	return cacheFn();
}

export const prefetchPostsQuery = (queryClient: QueryClient) => {
	return queryClient.prefetchQuery({ queryKey: [...postKeys.lists()], queryFn: getCachedPosts });
};

export const usePostsQuery = () => {
	return useQuery({
		queryKey: [...postKeys.lists()],
		queryFn: getPosts,
	});
};

export const usePostMutationQuery = () => {
	return useMutation({
		mutationKey: [postKeys.insert],
		mutationFn: insertPost,
	});
};
