"use client";

import { PropsWithChildren } from "react";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { getQueryClient } from "./getQueryClient";

const Provider = ({ children }: PropsWithChildren) => {
	const queryClient = getQueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
		</QueryClientProvider>
	);
};

export default Provider;
