import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Params = {
  slug: string;
};

export async function GET(
  req: NextRequest,
  context: { params: Promise<Params> }
) {
  const { slug } = await context.params;

  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const shop = await prisma.shop.findUnique({
      where: { slug },

      select: {
        id: true,
        name: true,
        slug: true,

        owner: {
          select: {
            email: true,
            username: true,
            image: true,
          },
        },
      },
    });

    if (!shop) {
      return NextResponse.json(
        { error: "Shop not found" },
        { status: 404 }
      );
    }

    if (shop.owner.email !== session.user.email) {
      return NextResponse.json(
        { error: "Forbidden: Not your shop" },
        { status: 403 }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        shopId: shop.id,
        stock: { gt: 0 },
      },

      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        slug: true,
      },
    });

    return NextResponse.json({
      ...shop,
      products,
    });

  } catch (error) {
    console.error("SHOP_GET_ERROR", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
