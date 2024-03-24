import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";

export async function GET(request: Request) {
	const requestedEmail = "oper0116@gmail.com";

	const user = await prisma.user.findUnique({
		where: { email: requestedEmail },
	});

	if (!user) {
		return NextResponse.json({ resultCode: "404", message: "데이터를 찾을수 없습니다." });
	}

	return NextResponse.json({ user });
}

export async function POST(request: Request) {
	const data = {
		email: "oper0116@gmail.com",
		name: "한동희",
	};

	const user = await prisma.user.create({
		data: {
			email: "oper0116@gmail.com",
			name: "한동희",
		},
	});

	console.debug("user : ", user);

	return NextResponse.json({ data });
}
