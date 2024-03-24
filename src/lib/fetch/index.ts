export const getBaseUrl = () => {
	if (typeof window === "undefined") {
		return `http://localhost:3000`;
	}

	return ``;
};
