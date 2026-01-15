import {getServerSession} from "next-auth";
import {role} from "@prisma/client";

import {prisma} from "@/lib/prisma";
import slugify from "slugify";

export async function POST(req : Request) {
    const session = await getServerSession();

    if (! session ?. user ?. email) {
        return Response.json({
            error: "Unauthorized"
        }, {status: 401});
    }

    const body = await req.json();
    const {name, description, logo, gstin} = body;

    if (!name) {
        return Response.json({
            error: "Shop name required"
        }, {status: 400});
    }

    const slug = slugify(name, {
        lower: true,
        strict: true
    });

    const userShop = await prisma.shop.findFirst({
        where: {
            owner: {
                email: session.user.email !
            }
        }
    });

    if (userShop) {
        return Response.json({
            error: "Shop already exists",
            shopSlug: userShop.slug
        }, {status: 409});
    }


    const existingShop = await prisma.shop.findUnique({where: {
            slug
        }});

    if (existingShop) {
        return Response.json({
            error: "Shop already exists"
        }, {status: 409});
    }


    const result = await prisma.$transaction(async (tx) => {
        const shop = await tx.shop.create({
            data: {
                name,
                slug,
                description,
                logo,
                gstin,
                owner: {
                    connect: {
                        email: session.user.email !
                    }
                }
            }
        });

        await tx.user.update({
            where: {
                email: session.user.email !
            },
            data: {
                role: role.seller
            }
        });

        return shop;
    });

    return Response.json(result, {status: 201});
}


export async function GET() {
    const session = await getServerSession();
    if (! session ?. user ?. email) {
        return Response.json({
            error: "Unauthorized"
        }, {status: 401});
    }

    const shops = await prisma.shop.findMany({
        where: {
            owner: {
                email: session.user.email !
            }
        },
        select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
            isVerified: true,
            createdAt: true
        }
    });

    return Response.json(shops);
}
