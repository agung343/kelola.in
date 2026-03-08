'use client'
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc"

export default function Auth() {
    async function handleLogin() {
        await signIn.social({
            provider: "google",
            callbackURL: "/beranda"
        })
    }
    return(
        <div className="min-w-full mx-auto my-12">
            <div className="w-full max-w-md mx-auto bg-white shadow-md border rounded-2xl p-6">
                <div className="text-center space-y-2 mb-4">
                    <h1 className="text-2xl font-semibold">
                        Masuk Kelola.in 
                    </h1>
                </div>
                <Button onClick={handleLogin} className="w-full h-11 text-sm font-semibold">
                   <FcGoogle /> Masuk dengan Google
                </Button>
            </div>
        </div>
    )
}