"use server";
import { useGetSession } from "@/lib/useGetSession";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import prisma from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  price: z.number().min(1, "Harga harus di atas 0"),
  categoryId: z.cuid("Pilih kategori"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type ReturnState = {
  success: boolean;
  errors?: {
    name?: string;
    price?: string;
    category?: string
  };
  message?: string;
};

export async function CreateProduct(
  prevState: ReturnState,
  formData: FormData
): Promise<ReturnState> {
  const session = await useGetSession()
  if (!session || !session.user) {
    redirect("/auth");
  }
  const user = session.user;

  const raw = {
    name: formData.get("name") as string,
    price: Number(formData.get("price")),
    categoryId: formData.get("category"),
    description: formData.get("description") as string,
    imageUrl: formData.get("imageUrl") as string,
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      errors: {
        name: fieldErrors.name?.[0],
        price: fieldErrors.price?.[0],
        category: fieldErrors.categoryId?.[0]
      },
    };
  }

  const business = await prisma.business.findUnique({
    where: { ownerId: user.id },
  });
  if (!business) {
    redirect("/home");
  }


  const slug = slugify(parsed.data.name, { replacement: "-", lower: true });

  await prisma.product.create({
    data: {
      name: parsed.data.name,
      slug,
      price: parsed.data.price,
      description: parsed.data.description,
      imageUrl: parsed.data.imageUrl,
      businessId: business?.id,
      categoryId: parsed.data.categoryId,
      userId: user.id,
    },
  });

  revalidatePath(`/product/catalog`);
  
  redirect("/product/catalog")
}

export async function DeleteProduct(id: string) {
  const session = await useGetSession();
  if (!session) {
    throw new Error("Session expired");
  }
  const user = session.user;

  const product = await prisma.product.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });
  if (!product) {
    throw new Error("Product is not existed");
  }

  await prisma.product.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      isActive: false,
    },
  });
  revalidatePath(`/product/catalog}`)

  return {
    success: true
  }
}

export async function RestoreProduct(id: string) {
  const session = await useGetSession();
  if (!session) {
    throw new Error("Session expired");
  }
  const user = session.user;

  const product = await prisma.product.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });
  if (!product) {
    throw new Error("Product is not existed");
  }

  await prisma.product.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      isActive: true,
    },
  });
  revalidatePath(`/product/catalog}`)

  return {
    success: true
  }
}

export async function CreateCategoryAction(prevState: ReturnState, formData: FormData):Promise<ReturnState> {
  const session = await useGetSession()
  if (!session) {
    throw new Error("Session Expired")
  }
  const user = session.user

  const business = await prisma.business.findUnique({
    where: {ownerId: user.id},
    select: {id: true}
  })
  if (!business) {
    return {
      success: false,
      message: "Kamu belum setting profile usaha"
    }
  }
  
  const category = formData.get("name") as string
  if (category.trim().length < 1) {
    return {
      success: false,
      message: "Nama kategori tidak boleh kosong"
    }
  }

  const existedCategory = await prisma.category.findFirst({
    where: {
      businessId: business.id,
      name: category
    }
  })
  if (existedCategory) {
    return {
      success: false,
      message: "Kamu sudah punya kategori ini"
    }
  }

  await prisma.category.create({
    data: {
      name: category,
      businessId: business.id
    }
  })

  revalidatePath(`/product/create-catalog`)

  return {
    success: true,
    message: "Berhasil menambahkan kategori"
  }
}

export async function EditProductAction(slug: string, prevState: ReturnState, formData: FormData):Promise<ReturnState> {
  const session = await useGetSession()
  if (!session) {
    redirect("/auth")
  }
  const user = session.user
  const business = await prisma.business.findUnique({
    where: {
      ownerId: user.id
    },
    select: {
      id: true
    }
  })

  const product = await prisma.product.findFirst({
    where: {
      slug,
      userId: user.id,
      businessId: business!.id,
    }
  })
  if (!product) {
    return {
      success: false,
      message: "Produk tidak ditemukan"
    }
  }

  const raw = {
    name: formData.get("name") as string,
    price: Number(formData.get("price")),
    categoryId: formData.get("category"),
    description: formData.get("description") as string,
    imageUrl: formData.get("imageUrl")?.toString() || product.imageUrl ,
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      errors: {
        name: fieldErrors.name?.[0],
        price: fieldErrors.price?.[0],
        category: fieldErrors.categoryId?.[0]
      },
    };
  }

  const newSlug = slugify(parsed.data.name, { replacement: "-", lower: true });

  try {
    await prisma.product.update({
      where: {
        userId: user.id,
        id: product.id
      },
      data: {
        name: parsed.data.name,
        slug: newSlug,
        price: parsed.data.price,
        description: parsed.data.description,
        imageUrl: parsed.data.imageUrl,
        categoryId: parsed.data.categoryId,
      }
    })    
  } catch (error) {
    console.error("Something went wrong", error)
    return {
      success: false,
      message: "Gagal update produk"
    }
  }
  revalidatePath("/product/catalog")

  redirect("/product/catalog")
}