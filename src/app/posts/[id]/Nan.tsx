"use client";

import { useQuery } from "@tanstack/react-query";
import { getHello } from "~/lib/network/hello";

const HydrationTest = () => {
	const { data } = useQuery({ queryKey: ["hydrate-hello"], queryFn: getHello });

	return <>{JSON.stringify(data)}</>;
};

export default HydrationTest;
