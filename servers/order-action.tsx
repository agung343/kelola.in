"use server";
import prisma from "@/lib/prisma";
import { useGetSession } from "@/lib/useGetSession";
import { z } from "zod";
import { normalizeWhatsappNumber } from "@/lib/whatsapp-format";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { RupiahFormat, DateFormat } from "@/lib/indonesian-format";

const itemSchema = z.object({
  id: z.string(),
  quantity: z.coerce.number(),
});

const schema = z.object({
  name: z.string().trim().min(1, "Nama tidak boleh kosong"),
  whatsAppNumber: z
    .string()
    .regex(/^[0-9]+$/)
    .refine(
      (val) => {
        const cleaned = val.replace(/\D/g, "");
        return cleaned.length >= 10 && cleaned.length <= 15;
      },
      {
        message: "Format nomor tidak didukung",
      }
    ),
  address: z.string().optional(),
  bookingDate: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(itemSchema).min(1, "Keranjang kosong"),
});

export type OrderState = {
  success: boolean;
  errors?: {
    name?: string;
    whatsAppNumber?: string;
    items?: string;
  };
  message?: string;
  waUrl?: string;
};

export async function CreateNewOrder(
  slug: string,
  prevState: OrderState,
  formData: FormData
): Promise<OrderState> {
  const raw = {
    name: formData.get("name") as string,
    whatsAppNumber: formData.get("whatsAppNumber") as string,
    address: formData.get("address") as string,
    bookingDate: formData.get("bookingDate") as string,
    notes: formData.get("notes") as string,
    items: formData.get("items")
      ? JSON.parse(formData.get("items") as string)
      : [],
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      errors: {
        name: fieldErrors.name?.[0],
        whatsAppNumber: fieldErrors.whatsAppNumber?.[0],
        items: fieldErrors.items?.[0],
      },
    };
  }

  const business = await prisma.business.findFirst({
    where: { slug },
    select: { id: true, whatsAppNumber: true },
  });
  if (!business) {
    throw new Error("Toko tidak ada");
  }

  const parsedItems = parsed.data.items;
  if (!parsedItems.length) {
    return {
      success: false,
      message: "Keranjang kosong!",
    };
  }
  const productIds = parsedItems.map((i) => i.id);
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      businessId: business.id,
    },
  });
  if (products.length !== parsedItems.length) {
    return {
      success: false,
      message: "Produk tidak valid",
    };
  }

  const productMap = new Map(products.map((p) => [p.id, p]));
  let totalAmount = 0;

  const orderItemData = parsedItems.map((item) => {
    const product = productMap.get(item.id);
    if (!product) throw new Error("Produk tidak valid");

    const subTotal = product.price * item.quantity;
    totalAmount += subTotal;

    return {
      productId: product.id,
      quantity: item.quantity,
      price: product.price,
      subTotal,
    };
  });

  try {
    await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          customerName: parsed.data.name,
          customerPhone: parsed.data.whatsAppNumber,
          customerAddress: parsed.data.address,
          bookingDate: parsed.data.bookingDate
            ? new Date(parsed.data.bookingDate)
            : null,
          totalAmount,
          businessId: business.id,
          notes: parsed.data.notes,
        },
      });

      for (const item of orderItemData) {
        await tx.orderItem.create({
          data: {
            ...item,
            orderId: order.id,
          },
        });
      }
    });

    const message = `
    Formulir Order

  Nama: ${parsed.data.name}
  Nomer WA: ${parsed.data.whatsAppNumber}
  ${parsed.data.address && `Alamat: ${parsed.data.address ?? "-"}`}
  ${
    parsed.data.bookingDate &&
    `Tanggal Pengambilan/pengiriman: ${DateFormat(parsed.data.bookingDate)}`
  }
  ${parsed.data.notes && `Catatan: ${parsed.data.notes}`}
  total: ${RupiahFormat(totalAmount)}

    Item Pesanan:
    ${orderItemData
      .map((item, index) => {
        const product = productMap.get(item.productId);
        return `${index + 1}. ${product?.name} x ${item.quantity}`;
      })
      .join("\n")}
    `;

    const encodedMessage = encodeURIComponent(message);
    const ownerWhatsAppNumber = normalizeWhatsappNumber(
      business.whatsAppNumber
    );

    const waUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodedMessage}`;

    return {
      success: true,
      message: "Pesanan kamu sedang diproses",
      waUrl,
    };
  } catch (error) {
    return {
      success: false,
      message: "Terjadi kesalahan server",
    };
  }
}

export async function CanceledOrderAction(id: string) {
  const session = await useGetSession();
  if (!session) {
    redirect("/auth");
  }
  const user = session.user;

  const business = await prisma.business.findUnique({
    where: {
      ownerId: user.id,
    },
    select: {
      id: true,
    },
  });
  const existingOrder = await prisma.order.findUnique({
    where: { id, businessId: business?.id },
  });
  if (!existingOrder) throw new Error("Order tidak ditemukan");

  try {
    await prisma.order.update({
      where: {
        id,
        businessId: business?.id,
      },
      data: {
        status: "Dibatalkan",
      },
    });

    revalidatePath("/order");
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function CompletedOrderAction(id: string) {
  const session = await useGetSession();
  if (!session) {
    redirect("/auth");
  }
  const user = session.user;

  const business = await prisma.business.findUnique({
    where: {
      ownerId: user.id,
    },
    select: {
      id: true,
    },
  });
  const existingOrder = await prisma.order.findUnique({
    where: { id, businessId: business?.id },
  });
  if (!existingOrder) throw new Error("Order tidak ditemukan");

  try {
    await prisma.order.update({
      where: {
        id,
        businessId: business?.id,
      },
      data: {
        status: "Selesai",
      },
    });

    revalidatePath("/order");
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function AddOrderAction(
  slug: string,
  prevState: OrderState,
  formData: FormData
): Promise<OrderState> {
  const raw = {
    name: formData.get("name") as string,
    whatsAppNumber: formData.get("whatsAppNumber") as string,
    address: formData.get("address")?.toString() || null,
    bookingDate: formData.get("bookingDate")?.toString() || null,
    notes: formData.get("notes")?.toString() || null,
    items: formData.get("items")
      ? JSON.parse(formData.get("items") as string)
      : [],
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      errors: {
        name: fieldErrors.name?.[0],
        whatsAppNumber: fieldErrors.whatsAppNumber?.[0],
        items: fieldErrors.items?.[0],
      },
    };
  }

  const business = await prisma.business.findFirst({
    where: {
      slug,
    },
    select: { id: true },
  });
  if (!business) {
    throw new Error("profil usaha belum update")
  }

  const customerPhone = parsed.data.whatsAppNumber;

  const parsedItems = parsed.data.items;
  if (!parsedItems.length) {
    return {
      success: false,
      message: "Keranjang kosong",
    };
  }
  const productIds = parsedItems.map((i) => i.id);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, businessId: business!.id },
  });
  if (products.length !== parsedItems.length) {
    return {
      success: false,
      message: "Produk tidak valid",
    };
  }

  const productMap = new Map(products.map((p) => [p.id, p]));
  let totalAmount = 0;

  const orderItemData = parsedItems.map((item) => {
    const product = productMap.get(item.id);
    if (!product) throw new Error("Produk tidak valid");

    const subTotal = product.price * item.quantity;
    totalAmount += subTotal;

    return {
      productId: product.id,
      quantity: item.quantity,
      price: product.price,
      subTotal,
    };
  });

  try {
    await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          customerName: parsed.data.name,
          customerPhone,
          customerAddress: parsed.data.address,
          bookingDate: parsed.data.bookingDate
            ? new Date(parsed.data.bookingDate)
            : null,
          totalAmount,
          businessId: business.id,
          notes: parsed.data.notes,
        },
      });

      for (const item of orderItemData) {
        await tx.orderItem.create({
          data: {
            ...item,
            orderId: order.id,
          },
        });
      }
    });

    return {
      success: true,
      message: "Berhasil Menyimpan",
    };
  } catch (error) {
    console.error("Something went wrong", error);
    return {
      success: false,
      message: "Terjadi kesalahan server",
    };
  }
}
