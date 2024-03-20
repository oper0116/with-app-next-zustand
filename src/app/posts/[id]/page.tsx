import { dehydrate, useQuery } from "@tanstack/react-query";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { getHello } from "~/lib/network/hello";
import HydrationBoundary from "~/lib/react-query/Hydration";
import { getQueryClient } from "~/lib/react-query/getQueryClient";

import HydrationTest from "./Nan";

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

export default async function Page({ params }: Props) {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({ queryKey: ["hydrate-hello"], queryFn: getHello });
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
