export async function GET(request: Request) {
	const data = {
		n: Math.random(),
		a: "a",
	};

	console.debug(`API Hello Response: ${JSON.stringify(data)} `);
	return Response.json(data);
}
