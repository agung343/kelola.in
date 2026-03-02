import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const business = await prisma.business.findUnique({
        where: {
            ownerId: session!.user.id
        },
        select: {
            isOnBoarding: true
        }
    })
    const notCompleted = !business || !business.isOnBoarding

    return (
        <div>
            <h1 className="text-2xl font-bold">Welcome {session?.user.name}</h1>
            {notCompleted && <p className="text-red-400 border-2 border-red-500 text-sm text-center font-light w-2xl py-1">Oh no! Your business profile is not complete, Go here to complete it to increase productivity</p>}
        </div>
    )
}