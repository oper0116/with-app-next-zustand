import { dehydrate } from "@tanstack/react-query";
import { Metadata, ResolvingMetadata } from "next";
import HydrationBoundary from "~/lib/react-query/Hydration";
import { getQueryClient } from "~/lib/react-query/getQueryClient";

import HydrationTest from "./Nan";
import { prefetchPostsQuery } from "~/queries/post";

type Props = {
	params: { id: string };
};

// async function getData(id: string) {
// 	// console.debug("Call getData");
// 	return {
// 		n: Math.random(),
// 	};
// }

// async function getCachedData(id: string) {
// 	const cookieStore = cookies();
// 	// console.debug("cookieStore: ", cookieStore);
// 	const cacheFn = unstable_cache(async (id) => getData(id), ["data"], { tags: [`data-${id}`] });
// 	return cacheFn(id);
// }

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
	// const data = await getCachedHello();
	// console.debug("data: ", data);
	return {
		title: "AAA",
	};
}

export default async function Page({ params }: Props) {
	const queryClient = getQueryClient();
	await prefetchPostsQuery(queryClient);
	const dehydratedState = dehydrate(queryClient);
	return (
		<HydrationBoundary state={dehydratedState}>
			<>
				<h1>My Page {params.id}</h1>
				<HydrationTest />
			</>
		</HydrationBoundary>
	);
}
