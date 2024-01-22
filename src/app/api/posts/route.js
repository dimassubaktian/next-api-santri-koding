import { NextResponse } from "next/server";

import prisma from "../../../../prisma/client";

export async function GET() {
    /** get all post */
    const post = await prisma.post.findMany();

    /** return response as json */
    return NextResponse.json(
        {
            success: true,
            message: "List Data Post",
            data: post,
        },
        {
            status: 200,
        }
    );
}

export async function POST(req) {
    /** get all request params */
    const { title, content } = await req.json();
    /** store new post to database */
    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
        },
    });

    /** return response as json */
    return NextResponse.json(
        {
            success: true,
            message: "Post created successfully",
            data: post,
        },
        {
            status: 201,
        }
    );
}
