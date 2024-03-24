import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
	const prisma = new PrismaClient();
	const { slug } = params;

	const post = await prisma.post.findUnique({ where: { id: Number(slug) } });

	if (!post) {
		return NextResponse.json({ resultCode: "404", message: "데이터를 찾을수 없습니다." });
	}

	return NextResponse.json({ post });
}

export async function POST(request: Request) {
	console.debug("request: ", request);

	const prisma = new PrismaClient();
	const params = {
		title: "타이틀1",
		content: "콘텐츠1",
		published: false,
		authorId: 1,
	};
	const result = await prisma.post.create({ data: { ...params } });

	return NextResponse.json({ resultCode: "200" });
}
