"use client";

import { usePostsQuery } from "~/queries/post";

const HydrationTest = () => {
	const { data } = usePostsQuery();

	return <>{JSON.stringify(data)}</>;
};

export default HydrationTest;
