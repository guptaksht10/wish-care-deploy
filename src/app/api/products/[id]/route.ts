import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";

type Params = {
  id: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params; // ✅ await params

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      shop: true,
      reviews: {
        include: { user: true },
      },
      _count: {
        select: {
          likes: true,
          wishlists: true,
        },
      },
    },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params; // ✅

  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const data = await req.json();

  const product = await prisma.product.findUnique({
    where: { id },
    select: { shopId: true },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  const ownsShop = await prisma.shop.findFirst({
    where: {
      id: product.shopId,
      owner: { email: session.user.email },
    },
  });

  if (!ownsShop) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const updated = await prisma.product.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params; // ✅

  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const product = await prisma.product.findUnique({
    where: { id },
    select: { shopId: true },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  const ownsShop = await prisma.shop.findFirst({
    where: {
      id: product.shopId,
      owner: { email: session.user.email },
    },
  });

  if (!ownsShop) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
