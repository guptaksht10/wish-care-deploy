import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import slugify from "slugify";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 12);
  const category = searchParams.get("category");
  const shopId = searchParams.get("shopId");
  const featured = searchParams.get("featured");

  const where: any = {};
  if (category) where.category = category;
  if (shopId) where.shopId = shopId;
  if (featured === "true") where.isFeatured = true;

  const products = await prisma.product.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      shop: {
        select: {
          id: true,
          name: true,
          logo: true,
        },
      },
      _count: {
        select: {
          likes: true,
          reviews: true,
        },
      },
    },
  });

  const total = await prisma.product.count({ where });

  return NextResponse.json({
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    shopId,
    name,
    description,
    price,
    image,
    category,
    tags,
    stock,
    isFeatured,
  } = body;

  if (!shopId || !name || !price) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // 🔐 Verify shop ownership
  const shop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      owner: { email: session.user.email },
    },
    select: { id: true },
  });

  if (!shop) {
    return NextResponse.json(
      { error: "Not allowed to add product to this shop" },
      { status: 403 }
    );
  }

  const slug = slugify(name, { lower: true, strict: true });

  // slug uniqueness
  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: "Product with same name already exists" },
      { status: 400 }
    );
  }

  const product = await prisma.product.create({
    data: {
      shopId,
      name,
      slug,
      description,
      price,
      image,
      category,
      tags: tags ?? [],
      stock: stock ?? 0,
      isFeatured: isFeatured ?? false,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
