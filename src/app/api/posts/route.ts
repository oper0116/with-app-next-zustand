import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";

export async function GET(request: Request) {
	const result = await prisma.post.findMany();

	return NextResponse.json({ result });
}
