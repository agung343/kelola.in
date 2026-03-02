import prisma from "@/lib/prisma"

export default async function CreateFormPage({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id

    const business = await prisma.business.findUnique({
        where: {id}
    })
    if (!business || !business.isOnBoarding) {
        return <h1 className="text-2xl text-red-500 font-semibold text-center">Lengkapi profil usaha kamu.</h1>
    }
}