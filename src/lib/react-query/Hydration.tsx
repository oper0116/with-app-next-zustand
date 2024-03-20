import { HydrationBoundary as RQHyrationBoundary, HydrationBoundaryProps } from "@tanstack/react-query";

function HydrationBoundary(props: HydrationBoundaryProps) {
	return <RQHyrationBoundary {...props} />;
}

export default HydrationBoundary;
