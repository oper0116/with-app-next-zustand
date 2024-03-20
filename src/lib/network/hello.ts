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
