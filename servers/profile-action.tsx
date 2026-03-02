"use server";
import { headers } from "next/headers";
import slugify from "slugify"
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { z } from "zod";
import type { ProfileFormState } from "@/types/profile";

const schema = z.object({
    name: z.string().min(2, "Nama Usaha minimal 2 karakter"),
    whatsAppNumber: z.string().regex(/^[0-9]+$/).refine((val) => {
        const cleaned = val.replace(/\D/g, "")
        return cleaned.length >=10 && cleaned.length <= 15
    }, {
        message: "Format nomor tidak didukung"
    }),
    instagramAccount: z.string().optional(),
    tiktokAccount: z.string().optional(),
    description: z.string().optional(),
    address: z.string().optional()
})

export async function BusinessProfileAction(prevState: ProfileFormState, formData: FormData): Promise<ProfileFormState> {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session || !session.user) {
        redirect("/auth")
    }

    const user = session.user

    const raw = {
        name: formData.get("name") as string,
        whatsAppNumber: formData.get("whatsAppNumber") as string,
        instagramAccount: formData.get("instagramAccount") as string,
        tiktokAccount: formData.get("tiktokAccount") as string,
        address: formData.get("address") as string,
        description: formData.get("description") as string
    }

    const parsed = schema.safeParse(raw)
    if (!parsed.success) {
       const fieldErrors = parsed.error.flatten().fieldErrors
       return {
        success: false,
        errors: {
            name: fieldErrors.name?.[0],
            whatsAppNumber: fieldErrors.whatsAppNumber?.[0]
        }
       }
    }

    const business = await prisma.business.findUnique({
        where: {
            ownerId: user.id
        }
    })
    const slug = slugify(parsed.data.name, {replacement: "-", lower: true})

    if (!business) {
        await prisma.business.create({
            data: {
                isOnBoarding: true,
                name: parsed.data.name,
                slug,
                description: parsed.data.description,
                address: parsed.data.address,
                whatsAppNumber: parsed.data.whatsAppNumber,
                instagramAccount: parsed.data.instagramAccount,
                tiktokAccount: parsed.data.tiktokAccount,
                ownerId: user.id
            }
        })
    } else {
        await prisma.business.update({
            where: {
                ownerId: user.id
            },
            data: {
                name: parsed.data.name,
                slug,
                description: parsed.data.description,
                address: parsed.data.address,
                whatsAppNumber: parsed.data.whatsAppNumber,
                instagramAccount: parsed.data.instagramAccount,
                tiktokAccount: parsed.data.tiktokAccount,
            }
        })
    }

    return {
        success: true
    }
}