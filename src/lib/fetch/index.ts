export const getBaseUrl = () => {
	if (typeof window === "undefined") {
		return `http://localhost:3000`;
	}

	return ``;
};

export const fetchGet = async (url = "") => {
	const response = await fetch(`${getBaseUrl()}${url}`);
	return response;
};

export const fetchPost = async (url: string = "", { contentType = "application/json", cache = "no-cache", data = {} }: { contentType: string; cache: RequestCache | undefined; data: any }) => {
	const response = await fetch(`${getBaseUrl()}${url}`, {
		cache,
		headers: {
			"Content-Type": contentType,
			body: JSON.stringify(data),
		},
	});
	return response;
};
