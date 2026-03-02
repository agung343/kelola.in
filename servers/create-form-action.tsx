"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod"

const schema = z.object({
    title: z.string().trim().min(2, "Nama form minimal 2 karakter")
})

export type ReturnState = {
    success: boolean
    errors?: {
        title?: string
    }
    message?: string
}

export async function CreateFormAction(prevState: ReturnState, formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session || !session.user) {
        redirect("/auth")
    }

    const user = session.user
    const business = await prisma.business.findUnique({
        where: {
            ownerId: user.id
        }
    })

    const raw = {
        title: formData.get("title") as string
    }

    const parsed = schema.safeParse(raw)
    if (!parsed.success) {
        const fieldErrors = parsed.error.flatten().fieldErrors
        return {
            success: true,
            errors: {
                title: fieldErrors.title?.[0]
            }
        }
    }
}