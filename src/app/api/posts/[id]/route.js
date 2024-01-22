import { NextResponse } from "next/server";

//import prisma client
import prisma from "../../../../../prisma/client";

export async function GET(req, { params }) {
    const id = parseInt(params.id);

    const post = await prisma.post.findUnique({
        where: {
            id,
        },
    });

    if (!post) {
        return NextResponse.json(
            {
                success: true,
                message: "Detail data not found",
                data: null,
            },
            {
                status: 404,
            }
        );
    }

    return NextResponse.json(
        {
            success: true,
            message: "Detail Data",
            data: post,
        },
        {
            status: 200,
        }
    );
}

export async function PATCH(request, { params }) {
    //get params id
    const id = parseInt(params.id);

    //get request data
    const { title, content } = await request.json();

    //update data
    const post = await prisma.post.update({
        where: {
            id,
        },
        data: {
            title: title,
            content: content,
            updatedAt: new Date(),
        },
    });

    //return response JSON
    return NextResponse.json(
        {
            sucess: true,
            message: "Data Post Updated!",
            data: post,
        },
        {
            status: 200,
        }
    );
}

export async function DELETE(request, { params }) {
    //get params id
    const id = parseInt(params.id);

    //delete data
    await prisma.post.delete({
        where: {
            id,
        },
    });

    //return response JSON
    return NextResponse.json(
        {
            sucess: true,
            message: "Data Post Deleted!",
        },
        {
            status: 200,
        }
    );
}
